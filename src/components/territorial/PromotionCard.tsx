import React, { useState } from 'react';
import { Users, Target } from 'lucide-react';
import PromotionModal from './PromotionModal';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';
import { useDashboardStore } from '../../store/dashboardStore';

export default function PromotionCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const { getTerritorialData, updatePromotedCount, updateTargetPromoters } = useDashboardStore(state => ({
    getTerritorialData: state.getTerritorialData,
    updatePromotedCount: state.updatePromotedCount,
    updateTargetPromoters: state.updateTargetPromoters,
  }));

  // Calcular datos para todas las regiones
  const regionsData = BOLIVIA_REGIONS.map(region => {
    const data = getTerritorialData(region.id);
    const progress = ((data.promotedCount / data.targetPromoters) * 100);
    return {
      ...region,
      promotedCount: data.promotedCount,
      targetPromoters: data.targetPromoters,
      progress,
      data
    };
  }).sort((a, b) => b.progress - a.progress);

  // Calcular totales generales
  const totalPromoted = regionsData.reduce((sum, region) => sum + region.promotedCount, 0);
  const totalTargetPromoters = regionsData.reduce((sum, region) => sum + region.targetPromoters, 0);
  const totalProgress = totalTargetPromoters > 0 ? (totalPromoted / totalTargetPromoters) * 100 : 0;

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    setIsModalOpen(true);
  };

  const handleUpdatePromotedCount = (count: number) => {
    if (selectedRegion) {
      updatePromotedCount(selectedRegion, count);
    }
  };

  const handleUpdateTargetPromoters = (target: number) => {
    if (selectedRegion) {
      updateTargetPromoters(selectedRegion, target);
    }
  };

  const selectedRegionData = selectedRegion ? getTerritorialData(selectedRegion) : null;

  return (
    <>
      <div className="glassmorphic-container p-4 h-[300px] flex flex-col relative">
        {/* Total en esquina superior derecha */}
        <div className="absolute top-4 right-4 bg-accent-pink/20 border border-accent-pink/40 rounded-lg px-3 py-2 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-accent-pink font-bold text-lg leading-none">
              {totalPromoted}/{totalTargetPromoters}
            </div>
            <div className="text-xs text-gray-400 mt-1">{totalProgress.toFixed(1)}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent-pink/10 p-2 rounded-lg">
            <Users className="w-6 h-6 text-accent-pink" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Promoción</h3>
            <p className="text-gray-400 text-sm">Promovidos por región</p>
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
                      <h4 className="text-white font-medium group-hover:text-accent-pink transition-colors">
                        {region.name}
                      </h4>
                      <p className="text-xs text-gray-400">{region.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent-pink font-bold">
                      {region.promotedCount}/{region.targetPromoters}
                    </div>
                    <div className="text-xs text-gray-400">
                      {region.progress.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="h-1.5 bg-background/50 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-accent-pink transition-all duration-300"
                    style={{ width: `${Math.min(region.progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedRegion && selectedRegionData && (
        <PromotionModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRegion(null);
          }}
          promotedCount={selectedRegionData.promotedCount}
          onUpdatePromotedCount={handleUpdatePromotedCount}
          targetPromoters={selectedRegionData.targetPromoters}
          onUpdateTargetPromoters={handleUpdateTargetPromoters}
        />
      )}
    </>
  );
}