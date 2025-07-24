import React, { useState } from 'react';
import { X, MessageSquare, Calendar, Clock } from 'lucide-react';

interface AvisoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (aviso: { mensaje: string; fecha: string; hora: string }) => void;
}

export default function AvisoModal({ isOpen, onClose, onSubmit }: AvisoModalProps) {
  const [formData, setFormData] = useState({
    mensaje: '',
    fecha: '',
    hora: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set default date to today
  React.useEffect(() => {
    if (isOpen && !formData.fecha) {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, fecha: today }));
    }
  }, [isOpen, formData.fecha]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    } else {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada < hoy) {
        newErrors.fecha = 'La fecha no puede ser anterior a hoy';
      }
    }

    if (!formData.hora) {
      newErrors.hora = 'La hora es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ mensaje: '', fecha: '', hora: '' });
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
    setFormData({ mensaje: '', fecha: '', hora: '' });
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
            <div className="bg-primary/10 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-neon">Nuevo Aviso</h3>
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
          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Mensaje del Aviso
            </label>
            <textarea
              value={formData.mensaje}
              onChange={(e) => handleInputChange('mensaje', e.target.value)}
              className={`w-full bg-background/90 border ${
                errors.mensaje ? 'border-red-500' : 'border-primary/20'
              } rounded-lg px-4 py-3 text-gray-200 resize-none focus:outline-none focus:border-primary/40 transition-colors`}
              rows={4}
              placeholder="Escribe el mensaje del aviso aquí..."
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.mensaje && (
                <p className="text-red-400 text-xs">{errors.mensaje}</p>
              )}
              <p className="text-gray-500 text-xs ml-auto">
                {formData.mensaje.length}/500 caracteres
              </p>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Fecha del Evento
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleInputChange('fecha', e.target.value)}
                  className={`w-full bg-background/90 border ${
                    errors.fecha ? 'border-red-500' : 'border-primary/20'
                  } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                />
              </div>
              {errors.fecha && (
                <p className="text-red-400 text-xs mt-1">{errors.fecha}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Hora del Evento
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => handleInputChange('hora', e.target.value)}
                  className={`w-full bg-background/90 border ${
                    errors.hora ? 'border-red-500' : 'border-primary/20'
                  } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                />
              </div>
              {errors.hora && (
                <p className="text-red-400 text-xs mt-1">{errors.hora}</p>
              )}
            </div>
          </div>

          {/* Preview */}
          {formData.mensaje && formData.fecha && formData.hora && (
            <div className="bg-background/30 border border-primary/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Vista Previa</h4>
              <div className="space-y-2">
                <p className="text-white">{formData.mensaje}</p>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {new Date(formData.fecha + 'T' + formData.hora).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{formData.hora}</span>
                  </div>
                </div>
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
              className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
            >
              Crear Aviso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}