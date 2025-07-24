import React, { useState } from 'react';
import { X, Target } from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotedCount: number;
  onUpdatePromotedCount: (count: number) => void;
  targetPromoters: number;
  onUpdateTargetPromoters: (target: number) => void;
}

export default function PromotionModal({
  isOpen,
  onClose,
  promotedCount,
  onUpdatePromotedCount,
  targetPromoters,
  onUpdateTargetPromoters,
}: PromotionModalProps) {
  const [newCount, setNewCount] = useState<number>(0);
  const [newTarget, setNewTarget] = useState(targetPromoters);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCount > 0) {
      onUpdatePromotedCount(promotedCount + newCount);
      setNewCount(0);
    }
  };

  const handleTargetUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTargetPromoters(newTarget);
  };

  const progress = ((promotedCount / targetPromoters) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-2xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-3xl font-semibold text-white text-neon">Promoción</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Target Form */}
          <div className="bg-background/30 p-6 rounded-xl border border-primary/20">
            <h4 className="text-lg font-semibold text-white mb-4">Meta de Promovidos</h4>
            <form onSubmit={handleTargetUpdate} className="flex gap-4">
              <input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(Math.max(1, parseInt(e.target.value)))}
                className="flex-1 bg-background/50 border border-primary/20 rounded-lg px-4 py-2 text-white"
                min="1"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
              >
                Actualizar Meta
              </button>
            </form>
          </div>

          {/* Add Promoters Form */}
          <div className="bg-background/30 p-6 rounded-xl border border-primary/20">
            <h4 className="text-lg font-semibold text-white mb-4">Registrar Promovidos</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Cantidad de Personas
                </label>
                <input
                  type="number"
                  value={newCount}
                  onChange={(e) => setNewCount(Math.max(0, parseInt(e.target.value)))}
                  className="w-full bg-background/50 border border-primary/20 rounded-lg px-4 py-2 text-white"
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent-pink/10 border border-accent-pink/50 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300 text-neon"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>

          {/* Progress Display */}
          <div className="bg-background/30 p-6 rounded-xl border border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Progreso</span>
              <span className="text-accent-pink font-medium">{progress}%</span>
            </div>
            <div className="h-4 bg-background/50 rounded-lg overflow-hidden">
              <div 
                className="h-full bg-accent-pink transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="mt-4 text-center text-gray-400">
              {promotedCount} de {targetPromoters} personas promovidas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}