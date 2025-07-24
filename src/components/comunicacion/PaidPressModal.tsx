import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon } from 'lucide-react';

interface PaidPress {
  id: string;
  title: string;
  url: string;
  media: string;
  imageUrl: string;
  description?: string;
  domain?: string;
}

interface PaidPressModalProps {
  isOpen: boolean;
  onClose: () => void;
  paidPress: PaidPress[];
  onAddPress: (press: PaidPress) => void;
}

export default function PaidPressModal({
  isOpen,
  onClose,
  paidPress,
  onAddPress,
}: PaidPressModalProps) {
  const [isAddingPress, setIsAddingPress] = useState(false);
  const [newPress, setNewPress] = useState({
    title: '',
    url: '',
    media: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract domain from URL
    let domain = '';
    try {
      const url = new URL(newPress.url);
      domain = url.hostname.replace('www.', '');
    } catch (e) {
      domain = 'ejemplo.com';
    }

    // Get preview data based on URL content
    const previewData = getPreviewData(newPress.url);

    onAddPress({
      id: Date.now().toString(),
      ...newPress,
      ...previewData,
      domain,
    });
    setNewPress({ title: '', url: '', media: '' });
    setIsAddingPress(false);
  };

  // Function to generate preview data based on URL
  const getPreviewData = (url: string) => {
    // In a real application, you would fetch this data from the URL
    // For this example, we'll simulate different previews based on URL content
    if (url.includes('entrevista')) {
      return {
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        description: 'Entrevista exclusiva sobre las propuestas y visión para el futuro de la ciudad.',
      };
    } else if (url.includes('analisis')) {
      return {
        imageUrl: 'https://images.pexels.com/photos/7376/startup-photos.jpg',
        description: 'Análisis detallado de las propuestas económicas y su impacto en la comunidad.',
      };
    } else if (url.includes('cobertura')) {
      return {
        imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
        description: 'Cobertura completa del evento central de la campaña con gran participación ciudadana.',
      };
    }
    
    // Default preview data
    return {
      imageUrl: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
      description: 'Nota de prensa sobre la campaña y sus avances.',
    };
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
          <h3 className="text-3xl font-semibold text-white text-neon">Prensa Pagada</h3>
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
              onClick={() => setIsAddingPress(true)}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Agregar Nota</span>
            </button>
          </div>

          {isAddingPress ? (
            <form onSubmit={handleSubmit} className="bg-background/30 p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4">Nueva Nota de Prensa</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Título de la Nota</label>
                  <input
                    type="text"
                    value={newPress.title}
                    onChange={(e) => setNewPress({ ...newPress, title: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={newPress.url}
                      onChange={(e) => setNewPress({ ...newPress, url: e.target.value })}
                      className="w-full bg-background/90 border border-primary/20 rounded-lg pl-11 pr-4 py-2 text-gray-200"
                      placeholder="https://ejemplo.com/nota"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Medio de Comunicación</label>
                  <input
                    type="text"
                    value={newPress.media}
                    onChange={(e) => setNewPress({ ...newPress, media: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddingPress(false)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {paidPress.map((press) => (
                <div
                  key={press.id}
                  className="bg-background/30 border border-primary/20 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300"
                >
                  {/* WhatsApp-style Link Preview */}
                  <a 
                    href={press.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* Image */}
                    <div className="relative h-48">
                      <img
                        src={press.imageUrl}
                        alt={press.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      {/* Domain */}
                      <div className="text-sm text-primary uppercase tracking-wide">
                        {press.domain}
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-medium text-white line-clamp-2">
                        {press.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {press.description}
                      </p>

                      {/* Media Source */}
                      <div className="pt-2 text-sm text-gray-500 border-t border-primary/10">
                        {press.media}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}