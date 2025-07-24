import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Segment {
  id: string;
  name: string;
}

interface SegmentCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  segments: Segment[];
  onAddSegment: (segment: Segment) => void;
}

export default function SegmentCampaignModal({
  isOpen,
  onClose,
  segments,
  onAddSegment,
}: SegmentCampaignModalProps) {
  const [isAddingSegment, setIsAddingSegment] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSegment({
      id: Date.now().toString(),
      ...newSegment,
    });
    setNewSegment({ name: '' });
    setIsAddingSegment(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-7xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-3xl font-semibold text-white text-neon">Campaña por Segmento</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsAddingSegment(true)}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Agregar Segmento</span>
            </button>
          </div>

          {isAddingSegment ? (
            <form onSubmit={handleSubmit} className="bg-background/30 p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4">Nuevo Segmento</h4>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del Segmento</label>
                <input
                  type="text"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment({ name: e.target.value })}
                  className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  placeholder="Ej: Ambientalistas"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddingSegment(false)}
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
          ) : (
            <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  className="bg-background/30 border border-primary/20 rounded-xl p-4 hover:border-primary/40 transition-all duration-300"
                >
                  <h4 className="text-lg font-medium text-white">
                    {segment.name}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}