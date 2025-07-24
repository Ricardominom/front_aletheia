import React, { useState } from 'react';
import { Users, BarChart3 } from 'lucide-react';
import SegmentCampaignModal from './SegmentCampaignModal';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';
import { useDashboardStore } from '../../store/dashboardStore';

interface Segment {
  id: string;
  name: string;
}

export default function SegmentCampaignCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const { getTerritorialData, addSegment } = useDashboardStore(state => ({
    getTerritorialData: state.getTerritorialData,
    addSegment: state.addSegment,
  }));

  // Calcular datos para todas las regiones
  const regionsData = BOLIVIA_REGIONS.map(region => {
    const data = getTerritorialData(region.id);
    return {
      ...region,
      segmentsCount: data.segments.length,
      data
    };
  }).sort((a, b) => b.segmentsCount - a.segmentsCount);

  // Calcular totales generales
  const totalSegments = regionsData.reduce((sum, region) => sum + region.segmentsCount, 0);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    setIsModalOpen(true);
  };

  const handleAddSegment = (segment: Omit<Segment, 'id'>) => {
    if (selectedRegion) {
      addSegment(selectedRegion, segment);
    }
  };

  const selectedRegionData = selectedRegion ? getTerritorialData(selectedRegion) : null;

  return (
    <>
      <div className="glassmorphic-container p-4 h-[300px] flex flex-col relative">
        {/* Total en esquina superior derecha */}
        <div className="absolute top-4 right-4 bg-primary/20 border border-primary/40 rounded-lg px-3 py-2 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-primary font-bold text-lg leading-none">{totalSegments}</div>
            <div className="text-xs text-gray-400 mt-1">segmentos</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Campaña por Segmento</h3>
            <p className="text-gray-400 text-sm">Segmentos por región</p>
          </div>
        </div>

        {/* Lista de regiones con scroll */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2" style={{ maxHeight: '180px' }}>
          {regionsData.map((region, index) => {
            const isTop = index < 3;
            const rankColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];
            const rankColor = isTop ? rankColors[index] : 'text-gray-400';
            
            return (
              <div
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                className="bg-card/50 border border-primary/20 rounded-lg p-3 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${rankColor} bg-current/10`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-primary transition-colors">
                        {region.name}
                      </h4>
                      <p className="text-xs text-gray-400">{region.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold text-2xl">
                      {region.segmentsCount}
                    </div>
                    <div className="text-xs text-gray-400">segmentos</div>
                  </div>
                </div>
                
                {/* Indicador visual */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-background/50 rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((region.segmentsCount / Math.max(...regionsData.map(r => r.segmentsCount), 1)) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {region.segmentsCount > 0 ? 'Configurado' : 'Sin segmentos'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedRegion && selectedRegionData && (
        <SegmentCampaignModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRegion(null);
          }}
          segments={selectedRegionData.segments}
          onAddSegment={handleAddSegment}
        />
      )}
    </>
  );
}