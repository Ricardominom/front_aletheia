import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import DayDModal from './DayDModal';

interface DayDStats {
  totalPollingStations: number;
  coveredPollingStations: number;
  files: File[];
}

export default function DayDCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<DayDStats>({
    totalPollingStations: 1000,
    coveredPollingStations: 750,
    files: [],
  });

  useEffect(() => {
    fetch('/api/estrategia/diad')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setStats({
            totalPollingStations: data.total_casillas,
            coveredPollingStations: data.casillas_cubiertas,
            files: [],
          });
        }
      });
  }, []);

  const handleUpdateStats = async (newStats: DayDStats) => {
    const response = await fetch('/api/estrategia/diad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPollingStations: newStats.totalPollingStations,
        coveredPollingStations: newStats.coveredPollingStations,
      }),
    });
    if (response.ok) {
      setStats(newStats);
    } else {
      alert('Error al actualizar Día D');
    }
  };

  // Calculate days until election day (May 1st, 2025)
  const electionDate = new Date('2025-05-01');
  const today = new Date();
  const daysUntil = Math.ceil((electionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate coverage percentage
  const coveragePercentage = (stats.coveredPollingStations / stats.totalPollingStations) * 100;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="h-full glassmorphic-container p-6 cursor-pointer group hover:border-primary/40 transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-white mb-4">DÍA D</h3>
        
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Polling Stations */}
            <div className="bg-card/50 rounded-lg p-4 border border-primary/20 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stats.totalPollingStations.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 text-center">
                Total de Casillas
              </div>
            </div>

            {/* Covered Polling Stations */}
            <div className="bg-card/50 rounded-lg p-4 border border-primary/20 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-accent-teal mb-1">
                {stats.coveredPollingStations.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 text-center">
                Casillas Cubiertas
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Cobertura</span>
              <span className="text-sm font-medium text-accent-teal">{coveragePercentage.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-background/50 rounded-lg overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Progress bar */}
              <div 
                className="h-full bg-accent-teal relative transition-all duration-300"
                style={{ width: `${coveragePercentage}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Days Until Counter */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Faltan {daysUntil} días</span>
          </div>
        </div>
      </div>

      <DayDModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stats={stats}
        onUpdateStats={handleUpdateStats}
      />
    </>
  );
}