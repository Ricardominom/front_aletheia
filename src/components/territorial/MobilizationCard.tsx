import React from 'react';
import { Users } from 'lucide-react';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';

export default function MobilizationCard() {
  return (
    <div className="glassmorphic-container p-4 h-[300px] flex flex-col relative">
      {/* Total en esquina superior derecha */}
      <div className="absolute top-4 right-4 bg-primary/20 border border-primary/40 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-primary font-bold text-lg leading-none">--</div>
          <div className="text-xs text-gray-400 mt-1">Próximamente</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Movilización</h3>
          <p className="text-gray-400 text-sm">Próximamente</p>
        </div>
      </div>

      {/* Lista de regiones con scroll */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2" style={{ maxHeight: '180px' }}>
        {BOLIVIA_REGIONS.map((region, index) => {
          const isTop = index < 3;
          const rankColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];
          const rankColor = isTop ? rankColors[index] : 'text-gray-400';
          
          return (
            <div
              key={region.id}
              className="bg-card/30 border border-gray-700 rounded-lg p-3 opacity-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${rankColor} bg-current/10`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="text-gray-400 font-medium">
                      {region.name}
                    </h4>
                    <p className="text-xs text-gray-500">{region.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 font-bold text-2xl">
                    --
                  </div>
                  <div className="text-xs text-gray-500">próximamente</div>
                </div>
              </div>
              
              <div className="h-1.5 bg-background/30 rounded-lg overflow-hidden">
                <div className="h-full bg-gray-600/30 w-0" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          Funcionalidad en desarrollo
        </span>
      </div>
    </div>
  );
}