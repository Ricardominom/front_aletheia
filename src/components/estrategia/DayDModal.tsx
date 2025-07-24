import React, { useState } from 'react';
import { X, Calendar, Upload, FileText } from 'lucide-react';

interface DayDStats {
  totalPollingStations: number;
  coveredPollingStations: number;
  files: File[];
}

interface DayDModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DayDStats;
  onUpdateStats: (stats: DayDStats) => void;
}

export default function DayDModal({ isOpen, onClose, stats, onUpdateStats }: DayDModalProps) {
  const [formData, setFormData] = useState(stats);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({
      ...formData,
      files: [...stats.files, ...selectedFiles],
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate coverage percentage
  const coveragePercentage = (formData.coveredPollingStations / formData.totalPollingStations) * 100;

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
          <h3 className="text-3xl font-semibold text-white text-neon">Configuración Día D</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Número Total de Casillas
              </label>
              <input
                type="number"
                value={formData.totalPollingStations}
                onChange={(e) => setFormData({ ...formData, totalPollingStations: parseInt(e.target.value) })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Casillas con Representantes
              </label>
              <input
                type="number"
                value={formData.coveredPollingStations}
                onChange={(e) => setFormData({ ...formData, coveredPollingStations: parseInt(e.target.value) })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                min="0"
                max={formData.totalPollingStations}
                required
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Cobertura</span>
              <span className="text-accent-teal font-medium">{coveragePercentage.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-background/50 rounded-lg overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Progress bar */}
              <div 
                className="h-full bg-accent-teal relative transition-all duration-300"
                style={{ width: `${coveragePercentage}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cargar Archivos
            </label>
            <div className="space-y-4">
              {/* File Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                />
                <div className="h-32 bg-background/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-primary mb-2" />
                  <span className="text-gray-400">Arrastre o seleccione archivos</span>
                </div>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg p-3 border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-gray-300">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}