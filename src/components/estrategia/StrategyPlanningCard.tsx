import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import StrategyPlanningModal from './StrategyPlanningModal';

interface Strategy {
  id: string;
  date: string;
  description: string;
  file: File | null;
}

export default function StrategyPlanningCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    fetch('/api/estrategia/planeacion')
      .then(res => res.json())
      .then(data => setStrategies(
        data.map((s: any) => ({
          id: s.id,
          date: s.fecha,
          description: s.descripcion,
          file: null // archivos no soportados en fetch simple, requiere backend especial para upload
        }))
      ));
  }, []);

  const handleAddStrategy = async (strategy: Omit<Strategy, 'id'>) => {
    const response = await fetch('/api/estrategia/planeacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: strategy.date,
        description: strategy.description,
        // fileName y fileUrl pueden ir aquí si implementas upload
      }),
    });
    if (response.ok) {
      const s = await response.json();
      setStrategies([...strategies, {
        id: s.id,
        date: s.fecha,
        description: s.descripcion,
        file: null
      }]);
    } else {
      alert('Error al guardar estrategia');
    }
  };

  // Get the 3 most recent strategies
  const recentStrategies = strategies
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 min-h-[240px] cursor-pointer group hover:border-primary/40 transition-all duration-300"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Section */}
          <div className="col-span-4 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 ring-2 ring-primary/20">
                <img
                  src="https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg"
                  alt="Manfred Reyes Villa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-white font-medium text-center">Manfred Reyes Villa</h4>
              <p className="text-sm text-gray-400 text-center">Candidato a la Alcaldía</p>
            </div>
          </div>

          {/* Strategy Section */}
          <div className="col-span-8 bg-card/50 rounded-lg p-4 border border-primary/20">
            <h4 className="text-sm text-gray-400 uppercase mb-3">Estrategias Recientes</h4>
            {recentStrategies.length > 0 ? (
              <div className="space-y-2">
                {recentStrategies.map((strategy) => (
                  <div key={strategy.id} className="bg-background/30 p-2 rounded-lg space-y-1">
                    <p className="text-sm text-white line-clamp-2">{strategy.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(strategy.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No hay estrategias registradas</p>
            )}
          </div>
        </div>
      </div>

      <StrategyPlanningModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        strategies={strategies}
        onUpdateStrategies={(newStrategies) => {
          // Si agregas desde el modal, llama a handleAddStrategy para persistir
          const last = newStrategies[newStrategies.length - 1];
          if (last && !last.id) {
            handleAddStrategy(last);
          }
          setStrategies(newStrategies);
        }}
      />
    </>
  );
}