import React from 'react';
import PaidPressCard from '../components/comunicacion/PaidPressCard';
import EarnedMediaCard from '../components/comunicacion/EarnedMediaCard';
import SpokespersonCard from '../components/comunicacion/SpokespersonCard';
import MaterialsCard from '../components/comunicacion/MaterialsCard';
import AdvertisingCard from '../components/comunicacion/AdvertisingCard';

export default function ComunicacionPage() {
  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-white mb-8">Comunicación</h1>
        
        {/* Top row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PaidPressCard />
          <EarnedMediaCard />
          <SpokespersonCard />
        </div>
        
        {/* Bottom row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MaterialsCard />
          <AdvertisingCard />
        </div>
      </div>
    </div>
  );
}