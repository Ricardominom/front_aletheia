import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface EarnedMedia {
  id: string;
  title: string;
  url: string;
  media: string;
}

interface EarnedMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedMedia: EarnedMedia[];
  onAddMedia: (media: EarnedMedia) => void;
}

export default function EarnedMediaModal({ isOpen, onClose, earnedMedia, onAddMedia }: EarnedMediaModalProps) {
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: '',
    url: '',
    media: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMedia({
      id: Date.now().toString(),
      ...newMedia,
    });
    setNewMedia({ title: '', url: '', media: '' });
    setIsAddingMedia(false);
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
          <h3 className="text-3xl font-semibold text-white text-neon">Earned Media</h3>
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
              onClick={() => setIsAddingMedia(true)}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Agregar Nota</span>
            </button>
          </div>

          {isAddingMedia ? (
            <form onSubmit={handleSubmit} className="bg-background/30 p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4">Nueva Nota de Earned Media</h4>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Título de la Nota</label>
                  <input
                    type="text"
                    value={newMedia.title}
                    onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
                  <input
                    type="url"
                    value={newMedia.url}
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Medio de Comunicación</label>
                  <input
                    type="text"
                    value={newMedia.media}
                    onChange={(e) => setNewMedia({ ...newMedia, media: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddingMedia(false)}
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
              {earnedMedia.map((media) => (
                <div
                  key={media.id}
                  className="bg-background/30 border border-primary/20 rounded-xl p-4 hover:border-primary/40 transition-all duration-300 flex flex-col gap-2"
                >
                  <h4 className="text-lg font-medium text-white">
                    {media.title}
                  </h4>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 w-12">URL:</span>
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors truncate"
                    >
                      {media.url}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 w-12">Medio:</span>
                    <span className="text-gray-200">{media.media}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}