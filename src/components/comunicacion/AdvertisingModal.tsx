import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AdvertisingProgress {
  target: number;
  current: number;
}

interface AdvertisingModalProps {
  isOpen: boolean;
  onClose: () => void;
  advertisingProgress: AdvertisingProgress;
  onUpdateProgress: (progress: AdvertisingProgress) => void;
}

export default function AdvertisingModal({ isOpen, onClose, advertisingProgress, onUpdateProgress }: AdvertisingModalProps) {
  const [newProgress, setNewProgress] = useState(advertisingProgress);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgress(newProgress);
    onClose(); // Close the modal after updating
  };

  const progressPercentage = (newProgress.current / newProgress.target) * 100;

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
          <h3 className="text-3xl font-semibold text-white text-neon">Progreso de Publicidad</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Meta de Publicidad</label>
                <input
                  type="number"
                  name="target"
                  value={newProgress.target}
                  onChange={(e) => setNewProgress({ ...newProgress, target: parseInt(e.target.value) })}
                  className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Publicidad Entregada</label>
                <input
                  type="number"
                  name="current"
                  value={newProgress.current}
                  onChange={(e) => setNewProgress({ ...newProgress, current: parseInt(e.target.value) })}
                  className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  min="0"
                  max={newProgress.target}
                  required
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso</span>
                <span className="text-accent-teal font-medium">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="h-6 bg-background/50 rounded-lg overflow-hidden relative">
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
              <div className="bg-background/30 rounded-lg p-4 border border-primary/20">
                <div className="text-sm text-gray-400">Meta</div>
                <div className="text-2xl font-bold text-white">{newProgress.target}</div>
              </div>
              <div className="bg-background/30 rounded-lg p-4 border border-primary/20">
                <div className="text-sm text-gray-400">Entregada</div>
                <div className="text-2xl font-bold text-accent-teal">{newProgress.current}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-accent-teal/10 border border-accent-teal/50 rounded-lg text-accent-teal hover:bg-accent-teal/20 transition-all duration-300 text-neon"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}