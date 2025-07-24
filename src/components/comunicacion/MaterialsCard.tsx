import React, { useEffect, useState } from 'react';
import { FileBox } from 'lucide-react';
import MaterialsModal from './MaterialsModal';

interface MaterialsProgress {
  target: number;
  current: number;
}

export default function MaterialsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialsProgress, setMaterialsProgress] = useState<MaterialsProgress>({
    target: 100,
    current: 50,
  });

  useEffect(() => {
    fetch('/api/comunicacion/materiales')
      .then(res => res.json())
      .then(data => {
        if (data) setMaterialsProgress({ target: data.meta, current: data.producidos });
      });
  }, []);

  const handleUpdateProgress = async (progress: MaterialsProgress) => {
    const response = await fetch('/api/comunicacion/materiales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: progress.target, current: progress.current }),
    });
    if (response.ok) {
      setMaterialsProgress(progress);
    } else {
      alert('Error al actualizar progreso de materiales');
    }
  };

  const progressPercentage = (materialsProgress.current / materialsProgress.target) * 100;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Materiales</h3>
            <p className="text-gray-400 text-base">Total de materiales producidos</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"></div>
            <div className="relative bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <FileBox className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="text-6xl font-bold text-primary text-neon animate-float">
            {materialsProgress.current}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progreso</span>
              <span className="text-primary font-medium">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-background/50 rounded-lg overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Target bar */}
              <div className="absolute inset-0 bg-primary/10"></div>
              
              {/* Progress bar */}
              <div 
                className="h-full bg-primary relative transition-all duration-300"
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
              <div className="text-lg font-bold text-white">{materialsProgress.target}</div>
            </div>
            <div className="bg-background/30 rounded-lg p-2 border border-primary/20">
              <div className="text-xs text-gray-400">Producidos</div>
              <div className="text-lg font-bold text-primary">{materialsProgress.current}</div>
            </div>
          </div>
        </div>
      </div>

      <MaterialsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        materialsProgress={materialsProgress}
        onUpdateProgress={handleUpdateProgress}
      />
    </>
  );
}