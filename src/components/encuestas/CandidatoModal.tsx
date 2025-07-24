import React, { useState } from 'react';
import { X, Users, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface CandidatoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (candidato: {
    nombre: string;
    intencionVoto: number;
    varianzaIntencion: number;
    varianzaConocimiento: number;
    varianzaSaldoOpinion: number;
  }) => void;
}

export default function CandidatoModal({ isOpen, onClose, onSubmit }: CandidatoModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    intencionVoto: 0,
    varianzaIntencion: 0,
    varianzaConocimiento: 0,
    varianzaSaldoOpinion: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Candidatos predefinidos comunes
  const candidatosPredefinidos = [
    'CANDIDATO PROPIO',
    'OPOSITOR 1',
    'OPOSITOR 2',
    'OPOSITOR 3',
    'NO SABE/NO CONTESTÓ',
    'VOTO EN BLANCO',
    'VOTO NULO'
  ];

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del candidato es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.intencionVoto < 0 || formData.intencionVoto > 100) {
      newErrors.intencionVoto = 'La intención de voto debe estar entre 0 y 100%';
    }

    if (formData.varianzaIntencion < -100 || formData.varianzaIntencion > 100) {
      newErrors.varianzaIntencion = 'La varianza debe estar entre -100 y 100%';
    }

    if (formData.varianzaConocimiento < -100 || formData.varianzaConocimiento > 100) {
      newErrors.varianzaConocimiento = 'La varianza debe estar entre -100 y 100%';
    }

    if (formData.varianzaSaldoOpinion < -100 || formData.varianzaSaldoOpinion > 100) {
      newErrors.varianzaSaldoOpinion = 'La varianza debe estar entre -100 y 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCandidatoPredefinido = (nombre: string) => {
    setFormData(prev => ({ ...prev, nombre }));
    if (errors.nombre) {
      setErrors(prev => ({ ...prev, nombre: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      intencionVoto: 0,
      varianzaIntencion: 0,
      varianzaConocimiento: 0,
      varianzaSaldoOpinion: 0
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]">
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
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-neon">Agregar Candidato</h3>
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
          {/* Nombre del Candidato */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nombre del Candidato
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={`w-full bg-background/90 border ${
                  errors.nombre ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                placeholder="Nombre del candidato o opción"
                maxLength={100}
              />
            </div>
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
            )}
            
            {/* Candidatos Predefinidos */}
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-2">Opciones comunes:</p>
              <div className="flex flex-wrap gap-2">
                {candidatosPredefinidos.map((candidato) => (
                  <button
                    key={candidato}
                    type="button"
                    onClick={() => handleCandidatoPredefinido(candidato)}
                    className="px-3 py-1 text-xs bg-primary/10 border border-primary/20 rounded-full text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    {candidato}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Intención de Voto */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Intención de Voto (%)
            </label>
            <div className="relative">
              <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="number"
                value={formData.intencionVoto}
                onChange={(e) => handleInputChange('intencionVoto', parseFloat(e.target.value) || 0)}
                className={`w-full bg-background/90 border ${
                  errors.intencionVoto ? 'border-red-500' : 'border-primary/20'
                } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                placeholder="0.0"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            {errors.intencionVoto && (
              <p className="text-red-400 text-xs mt-1">{errors.intencionVoto}</p>
            )}
          </div>

          {/* Varianzas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Varianza en Intención de Voto (%)
              </label>
              <div className="relative">
                <TrendingUp className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  formData.varianzaIntencion >= 0 ? 'text-green-400' : 'text-red-400 rotate-180'
                }`} />
                <input
                  type="number"
                  value={formData.varianzaIntencion}
                  onChange={(e) => handleInputChange('varianzaIntencion', parseFloat(e.target.value) || 0)}
                  className={`w-full bg-background/90 border ${
                    errors.varianzaIntencion ? 'border-red-500' : 'border-primary/20'
                  } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                  placeholder="0.0"
                  min="-100"
                  max="100"
                  step="0.1"
                />
              </div>
              {errors.varianzaIntencion && (
                <p className="text-red-400 text-xs mt-1">{errors.varianzaIntencion}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Varianza en Conocimiento (%)
              </label>
              <div className="relative">
                <TrendingUp className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  formData.varianzaConocimiento >= 0 ? 'text-green-400' : 'text-red-400 rotate-180'
                }`} />
                <input
                  type="number"
                  value={formData.varianzaConocimiento}
                  onChange={(e) => handleInputChange('varianzaConocimiento', parseFloat(e.target.value) || 0)}
                  className={`w-full bg-background/90 border ${
                    errors.varianzaConocimiento ? 'border-red-500' : 'border-primary/20'
                  } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                  placeholder="0.0"
                  min="-100"
                  max="100"
                  step="0.1"
                />
              </div>
              {errors.varianzaConocimiento && (
                <p className="text-red-400 text-xs mt-1">{errors.varianzaConocimiento}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Varianza en Saldo de Opinión (%)
              </label>
              <div className="relative">
                <TrendingUp className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  formData.varianzaSaldoOpinion >= 0 ? 'text-green-400' : 'text-red-400 rotate-180'
                }`} />
                <input
                  type="number"
                  value={formData.varianzaSaldoOpinion}
                  onChange={(e) => handleInputChange('varianzaSaldoOpinion', parseFloat(e.target.value) || 0)}
                  className={`w-full bg-background/90 border ${
                    errors.varianzaSaldoOpinion ? 'border-red-500' : 'border-primary/20'
                  } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                  placeholder="0.0"
                  min="-100"
                  max="100"
                  step="0.1"
                />
              </div>
              {errors.varianzaSaldoOpinion && (
                <p className="text-red-400 text-xs mt-1">{errors.varianzaSaldoOpinion}</p>
              )}
            </div>
          </div>

          {/* Preview */}
          {formData.nombre && (
            <div className="bg-background/30 border border-primary/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Vista Previa</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white font-medium">{formData.nombre}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formData.intencionVoto.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Intención de Voto</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3 text-center">
                <div>
                  <div className={`text-sm font-medium ${
                    formData.varianzaIntencion >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formData.varianzaIntencion > 0 ? '+' : ''}{formData.varianzaIntencion.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Var. Intención</div>
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    formData.varianzaConocimiento >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formData.varianzaConocimiento > 0 ? '+' : ''}{formData.varianzaConocimiento.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Var. Conocimiento</div>
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    formData.varianzaSaldoOpinion >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formData.varianzaSaldoOpinion > 0 ? '+' : ''}{formData.varianzaSaldoOpinion.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Var. Saldo Opinión</div>
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
              Agregar Candidato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}