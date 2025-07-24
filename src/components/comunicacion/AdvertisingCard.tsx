import React, { useEffect, useState } from 'react';
import { Megaphone } from 'lucide-react';
import AdvertisingModal from './AdvertisingModal';

interface AdvertisingProgress {
  target: number;
  current: number;
}

export default function AdvertisingCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advertisingProgress, setAdvertisingProgress] = useState<AdvertisingProgress>({
    target: 100,
    current: 45,
  });

  useEffect(() => {
    fetch('/api/comunicacion/publicidad')
      .then(res => res.json())
      .then(data => {
        if (data) setAdvertisingProgress({ target: data.meta, current: data.entregada });
      });
  }, []);

  const handleUpdateProgress = async (progress: AdvertisingProgress) => {
    const response = await fetch('/api/comunicacion/publicidad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: progress.target, current: progress.current }),
    });
    if (response.ok) {
      setAdvertisingProgress(progress);
    } else {
      alert('Error al actualizar progreso de publicidad');
    }
  };

  const progressPercentage = (advertisingProgress.current / advertisingProgress.target) * 100;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Publicidad</h3>
            <p className="text-gray-400 text-base">Total de publicidad entregada</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-teal/20 rounded-full blur-xl group-hover:bg-accent-teal/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-teal/10 p-5 rounded-full group-hover:bg-accent-teal/20 transition-colors duration-300">
              <Megaphone className="w-12 h-12 text-accent-teal" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="text-6xl font-bold text-accent-teal text-neon animate-float">
            {advertisingProgress.current}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progreso</span>
              <span className="text-accent-teal font-medium">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-background/50 rounded-lg overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Target bar */}
              <div className="absolute inset-0 bg-accent-teal/10"></div>
              
              {/* Progress bar */}
              <div 
                className="h-full bg-accent-teal relative transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/30 rounded-lg p-2 border border-primary/20">
              <div className="text-xs text-gray-400">Meta</div>
              <div className="text-lg font-bold text-white">{advertisingProgress.target}</div>
            </div>
            <div className="bg-background/30 rounded-lg p-2 border border-primary/20">
              <div className="text-xs text-gray-400">Entregada</div>
              <div className="text-lg font-bold text-accent-teal">{advertisingProgress.current}</div>
            </div>
          </div>
        </div>
      </div>

      <AdvertisingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        advertisingProgress={advertisingProgress}
        onUpdateProgress={handleUpdateProgress}
      />
    </>
  );
}