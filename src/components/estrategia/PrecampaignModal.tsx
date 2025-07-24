import React, { useState } from 'react';
import { X, Calendar, Plus } from 'lucide-react';

interface Requirement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  responsible: string;
  priority: 'high' | 'medium' | 'low';
  category: 'legal' | 'administrative' | 'communication' | 'logistics';
  attachments?: File[];
}

interface PrecampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequirement: (requirement: Requirement) => void;
}

export default function PrecampaignModal({
  isOpen,
  onClose,
  onAddRequirement,
}: PrecampaignModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newRequirement, setNewRequirement] = useState({
    title: '',
    description: '',
    dueDate: '',
    responsible: '',
    priority: 'medium' as const,
    category: 'administrative' as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRequirement({
      id: Date.now().toString(),
      completed: false,
      ...newRequirement,
      attachments: selectedFiles,
    });
    setNewRequirement({
      title: '',
      description: '',
      dueDate: '',
      responsible: '',
      priority: 'medium',
      category: 'administrative',
    });
    setSelectedFiles([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

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
          <h3 className="text-3xl font-semibold text-white text-neon">Nuevo Requisito</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Título</label>
              <input
                type="text"
                value={newRequirement.title}
                onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
              <textarea
                value={newRequirement.description}
                onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 resize-none"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Fecha Límite</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="date"
                  value={newRequirement.dueDate}
                  onChange={(e) => setNewRequirement({ ...newRequirement, dueDate: e.target.value })}
                  className="w-full bg-background/90 border border-primary/20 rounded-lg pl-12 pr-4 py-2 text-gray-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Responsable</label>
              <input
                type="text"
                value={newRequirement.responsible}
                onChange={(e) => setNewRequirement({ ...newRequirement, responsible: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Prioridad</label>
              <select
                value={newRequirement.priority}
                onChange={(e) => setNewRequirement({ ...newRequirement, priority: e.target.value as 'high' | 'medium' | 'low' })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                required
              >
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
              <select
                value={newRequirement.category}
                onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value as 'legal' | 'administrative' | 'communication' | 'logistics' })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                required
              >
                <option value="legal">Legal</option>
                <option value="administrative">Administrativo</option>
                <option value="communication">Comunicación</option>
                <option value="logistics">Logística</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Archivos Adjuntos</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                />
                <div className="h-24 bg-background/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-400">Arrastre o seleccione archivos</span>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-2 max-h-[100px] overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg p-2"
                    >
                      <span className="text-sm text-gray-300 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
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