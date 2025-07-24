import React, { useState } from 'react';
import { X, Tag, Calendar, Clock, Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Adversario {
  id: string;
  nombre: string;
  partido: string;
  descripcion: string;
  fechaCreacion: Date;
}

interface ActualizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (actualizacion: { 
    adversarioId: string; 
    mensaje: string; 
    tipo: 'positiva' | 'negativa' | 'neutral';
    fecha: string; 
    hora: string 
  }) => void;
  adversarios: Adversario[];
}

export default function ActualizacionModal({ isOpen, onClose, onSubmit, adversarios }: ActualizacionModalProps) {
  const [formData, setFormData] = useState({
    adversarioId: '',
    mensaje: '',
    tipo: 'neutral' as 'positiva' | 'negativa' | 'neutral',
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

    if (!formData.adversarioId) {
      newErrors.adversarioId = 'Debe seleccionar un adversario';
    }

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
      setFormData({ adversarioId: '', mensaje: '', tipo: 'neutral', fecha: '', hora: '' });
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
    setFormData({ adversarioId: '', mensaje: '', tipo: 'neutral', fecha: '', hora: '' });
    setErrors({});
    onClose();
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return <TrendingUp className="w-5 h-5" />;
      case 'negativa':
        return <TrendingDown className="w-5 h-5" />;
      case 'neutral':
        return <Minus className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'negativa':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'neutral':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'Positiva para nosotros';
      case 'negativa':
        return 'Negativa para nosotros';
      case 'neutral':
        return 'Neutral';
      default:
        return 'Neutral';
    }
  };

  const selectedAdversario = adversarios.find(a => a.id === formData.adversarioId);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-3xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-neon">Nueva Actualización</h3>
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
          {/* Adversario */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Seleccionar Adversario
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <select
                value={formData.adversarioId}
                onChange={(e) => handleInputChange('adversarioId', e.target.value)}
                className={`w-full bg-background/90 border ${
                  errors.adversarioId ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
              >
                <option value="">Seleccione un adversario...</option>
                {adversarios.map(adversario => (
                  <option key={adversario.id} value={adversario.id}>
                    {adversario.nombre} - {adversario.partido}
                  </option>
                ))}
              </select>
            </div>
            {errors.adversarioId && (
              <p className="text-red-400 text-xs mt-1">{errors.adversarioId}</p>
            )}
          </div>

          {/* Tipo de Actualización */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Tipo de Actualización
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['positiva', 'negativa', 'neutral'] as const).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => handleInputChange('tipo', tipo)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.tipo === tipo
                      ? getTipoColor(tipo)
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {getTipoIcon(tipo)}
                    <span className="text-sm font-medium">{getTipoLabel(tipo)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Descripción de la Actualización
            </label>
            <textarea
              value={formData.mensaje}
              onChange={(e) => handleInputChange('mensaje', e.target.value)}
              className={`w-full bg-background/90 border ${
                errors.mensaje ? 'border-red-500' : 'border-primary/20'
              } rounded-lg px-4 py-3 text-gray-200 resize-none focus:outline-none focus:border-primary/40 transition-colors`}
              rows={4}
              placeholder="Describe qué hizo el adversario, declaraciones, eventos, etc..."
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.mensaje && (
                <p className="text-red-400 text-xs">{errors.mensaje}</p>
              )}
              <p className="text-gray-500 text-xs ml-auto">
                {formData.mensaje.length}/1000 caracteres
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
          {selectedAdversario && formData.mensaje && formData.fecha && formData.hora && (
            <div className="bg-background/30 border border-primary/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Vista Previa</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-pink/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent-pink" />
                    </div>
                    <span className="text-white font-medium">{selectedAdversario.nombre}</span>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getTipoColor(formData.tipo)}`}>
                    {getTipoIcon(formData.tipo)}
                    <span>{getTipoLabel(formData.tipo)}</span>
                  </div>
                </div>
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
              Crear Actualización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}