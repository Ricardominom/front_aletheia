import React, { useState } from 'react';
import { X, Users, Building, FileText } from 'lucide-react';

interface AdversarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (adversario: { nombre: string; partido: string; descripcion: string }) => void;
}

export default function AdversarioModal({ isOpen, onClose, onSubmit }: AdversarioModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    partido: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.partido.trim()) {
      newErrors.partido = 'El partido es requerido';
    } else if (formData.partido.trim().length < 3) {
      newErrors.partido = 'El partido debe tener al menos 3 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ nombre: '', partido: '', descripcion: '' });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({ nombre: '', partido: '', descripcion: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-2xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="bg-accent-pink/10 p-2 rounded-lg">
              <Users className="w-6 h-6 text-accent-pink" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-neon">Nuevo Adversario</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nombre Completo del Adversario
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-pink" />
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={`w-full bg-background/90 border ${
                  errors.nombre ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                placeholder="Ej: Carlos Mendoza"
                maxLength={100}
              />
            </div>
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Partido */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Partido o Agrupación Política
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-pink" />
              <input
                type="text"
                value={formData.partido}
                onChange={(e) => handleInputChange('partido', e.target.value)}
                className={`w-full bg-background/90 border ${
                  errors.partido ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                placeholder="Ej: Partido Opositor A"
                maxLength={150}
              />
            </div>
            {errors.partido && (
              <p className="text-red-400 text-xs mt-1">{errors.partido}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Descripción y Perfil
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-accent-pink" />
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                className={`w-full bg-background/90 border ${
                  errors.descripcion ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 resize-none focus:outline-none focus:border-primary/40 transition-colors`}
                rows={4}
                placeholder="Describe el perfil del adversario, su experiencia, fortalezas, debilidades, etc..."
                maxLength={500}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              {errors.descripcion && (
                <p className="text-red-400 text-xs">{errors.descripcion}</p>
              )}
              <p className="text-gray-500 text-xs ml-auto">
                {formData.descripcion.length}/500 caracteres
              </p>
            </div>
          </div>

          {/* Preview */}
          {formData.nombre && formData.partido && formData.descripcion && (
            <div className="bg-background/30 border border-primary/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Vista Previa</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent-pink/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent-pink" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{formData.nombre}</h3>
                    <p className="text-accent-pink text-sm">{formData.partido}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-2">{formData.descripcion}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent-pink/10 border border-accent-pink/50 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300 text-neon"
            >
              Registrar Adversario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}