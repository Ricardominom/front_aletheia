import React, { useEffect, useState } from 'react';
import DayDCard from '../components/estrategia/DayDCard';
import StrategyPlanningCard from '../components/estrategia/StrategyPlanningCard';
import PrecampaignCard from '../components/estrategia/PrecampaignCard';
import StrategicCalendarCard from '../components/estrategia/StrategicCalendarCard';
import DebateCard from '../components/estrategia/DebateCard';

export default function EstrategiaPage() {
  // Opcional: puedes levantar estados globales aquí si quieres compartir datos entre tarjetas
  // pero cada Card ya está conectada a la API REST según propuesta.sql y rutas/back implementadas.
  // Por lo tanto, solo asegúrate de que cada Card use fetch a /api/estrategia/* como ya está hecho.

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-[1920px] mx-auto grid grid-cols-3 gap-4">
        {/* First row - DayD and Strategy Planning */}
        <DayDCard />
        <StrategyPlanningCard />
        
        {/* Right column - Precampaign (spans both rows) */}
        <div className="row-span-2">
          <PrecampaignCard />
        </div>
        
        {/* Second row - Calendar (2/3) and Debate (1/3) */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <StrategicCalendarCard />
          </div>
          <div className="col-span-1">
            <DebateCard />
          </div>
        </div>
      </div>
    </div>
  );
}