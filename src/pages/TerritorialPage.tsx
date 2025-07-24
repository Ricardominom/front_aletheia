import React, { useState } from 'react';
import { Trophy, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import ElectoralStructureCard from '../components/territorial/ElectoralStructureCard';
import EventsCard from '../components/territorial/EventsCard';
import PromotionCard from '../components/territorial/PromotionCard';
import SegmentCampaignCard from '../components/territorial/SegmentCampaignCard';
import MobilizationCard from '../components/territorial/MobilizationCard';

// Definición de regiones de Bolivia
export const BOLIVIA_REGIONS = [
  { id: 'pando', name: 'Pando', location: 'Norte' },
  { id: 'beni', name: 'Beni', location: 'Norte-Centro' },
  { id: 'la-paz', name: 'La Paz', location: 'Oeste' },
  { id: 'oruro', name: 'Oruro', location: 'Oeste-Centro' },
  { id: 'cochabamba', name: 'Cochabamba', location: 'Centro' },
  { id: 'potosi', name: 'Potosí', location: 'Suroeste' },
  { id: 'chuquisaca', name: 'Chuquisaca', location: 'Sur-Centro' },
  { id: 'tarija', name: 'Tarija', location: 'Sur' },
  { id: 'santa-cruz', name: 'Santa Cruz', location: 'Este' },
];

// Datos mock por región para demostración
const generateRegionData = () => {
  const data: Record<string, any> = {};
  BOLIVIA_REGIONS.forEach(region => {
    data[region.id] = {
      defenders: Math.floor(Math.random() * 150) + 50,
      targetDefenders: 200,
      events: Math.floor(Math.random() * 8) + 2,
      promotedCount: Math.floor(Math.random() * 80) + 20,
      targetPromoters: 100,
      segments: Math.floor(Math.random() * 5) + 3,
    };
  });
  return data;
};

export default function TerritorialPage() {
  const getTerritorialData = useDashboardStore(state => state.getTerritorialData);

  // Calcular progreso por región para la competencia
  const getRegionProgress = (regionId: string) => {
    const data = getTerritorialData(regionId);
    const defenderProgress = (data.defenders.length / data.targetDefenders) * 100;
    const promotionProgress = (data.promotedCount / data.targetPromoters) * 100;
    return (defenderProgress + promotionProgress) / 2;
  };

  // Ordenar regiones por progreso
  const rankedRegions = BOLIVIA_REGIONS
    .map(region => ({
      ...region,
      progress: getRegionProgress(region.id),
      data: getTerritorialData(region.id)
    }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header con selector de región y toggle de competencia */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Territorial</h1>
            <p className="text-gray-400">Gestión territorial por regiones de Bolivia</p>
          </div>
        </div>

        {/* Grid layout para las cards existentes */}
        <div className="grid grid-cols-12 gap-8">
          {/* Primera fila - cards más grandes */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ElectoralStructureCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <EventsCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <PromotionCard />
          </div>
          
          {/* Segunda fila - cards más pequeñas */}
          <div className="col-span-12 md:col-span-6">
            <SegmentCampaignCard />
          </div>
          <div className="col-span-12 md:col-span-6">
            <MobilizationCard />
          </div>
        </div>
      </div>
    </div>
  );
}