import React, { useState } from 'react';
import { X, BarChart3, Calendar, Building, Plus, Trash2, Users } from 'lucide-react';
import CandidatoModal from './CandidatoModal.tsx';

interface Candidato {
  id: string;
  nombre: string;
  intencionVoto: number;
  varianzaIntencion: number;
  varianzaConocimiento: number;
  varianzaSaldoOpinion: number;
}

interface EncuestaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (encuesta: {
    nombre: string;
    fecha: string;
    empresa: string;
    candidatos: Candidato[];
  }) => void;
}

export default function EncuestaModal({ isOpen, onClose, onSubmit }: EncuestaModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    empresa: ''
  });
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isCandidatoModalOpen, setIsCandidatoModalOpen] = useState(false);
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

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre de la encuesta es requerido';
    } else if (formData.nombre.trim().length < 5) {
      newErrors.nombre = 'El nombre debe tener al menos 5 caracteres';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'La empresa encuestadora es requerida';
    } else if (formData.empresa.trim().length < 3) {
      newErrors.empresa = 'El nombre de la empresa debe tener al menos 3 caracteres';
    }

    if (candidatos.length === 0) {
      newErrors.candidatos = 'Debe agregar al menos un candidato';
    }

    // Validar que la suma de intención de voto sea aproximadamente 100%
    const totalIntencion = candidatos.reduce((sum, candidato) => sum + candidato.intencionVoto, 0);
    if (candidatos.length > 0 && (totalIntencion < 95 || totalIntencion > 105)) {
      newErrors.candidatos = 'La suma de intención de voto debe estar cerca del 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Llama al backend para crear la encuesta
      const response = await fetch('/api/encuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          candidatos,
        }),
      });
      if (response.ok) {
        const encuesta = await response.json();
        onSubmit(encuesta); // Notifica al padre si es necesario
        handleClose();
      } else {
        alert('Error al guardar encuesta');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddCandidato = (candidato: Omit<Candidato, 'id'>) => {
    const nuevoCandidato: Candidato = {
      ...candidato,
      id: Date.now().toString()
    };
    setCandidatos([...candidatos, nuevoCandidato]);
    
    // Clear candidatos error if it exists
    if (errors.candidatos) {
      setErrors(prev => ({ ...prev, candidatos: '' }));
    }
  };

  const handleDeleteCandidato = (id: string) => {
    setCandidatos(candidatos.filter(candidato => candidato.id !== id));
  };

  const handleClose = () => {
    setFormData({ nombre: '', fecha: '', empresa: '' });
    setCandidatos([]);
    setErrors({});
    onClose();
  };

  const totalIntencionVoto = candidatos.reduce((sum, candidato) => sum + candidato.intencionVoto, 0);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-4xl mx-4 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
          
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-primary/20 sticky top-0 bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-white text-neon">Nueva Encuesta</h3>
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
            {/* Información básica de la encuesta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nombre de la Encuesta
                </label>
                <div className="relative">
                  <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full bg-background/90 border ${
                      errors.nombre ? 'border-red-500' : 'border-primary/20'
                    } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                    placeholder="Ej: Encuesta Municipal Enero 2025"
                    maxLength={200}
                  />
                </div>
                {errors.nombre && (
                  <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Fecha de la Encuesta
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Empresa Encuestadora
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    className={`w-full bg-background/90 border ${
                      errors.empresa ? 'border-red-500' : 'border-primary/20'
                    } rounded-lg pl-11 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary/40 transition-colors`}
                    placeholder="Ej: Encuestadora Nacional"
                    maxLength={150}
                  />
                </div>
                {errors.empresa && (
                  <p className="text-red-400 text-xs mt-1">{errors.empresa}</p>
                )}
              </div>
            </div>

            {/* Sección de Candidatos */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">Candidatos</h4>
                  <p className="text-sm text-gray-400">
                    {candidatos.length} candidato{candidatos.length !== 1 ? 's' : ''} agregado{candidatos.length !== 1 ? 's' : ''}
                    {candidatos.length > 0 && (
                      <span className={`ml-2 ${
                        totalIntencionVoto >= 95 && totalIntencionVoto <= 105 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        (Total: {totalIntencionVoto.toFixed(1)}%)
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCandidatoModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Agregar Candidato</span>
                </button>
              </div>

              {errors.candidatos && (
                <p className="text-red-400 text-xs mb-4">{errors.candidatos}</p>
              )}

              {candidatos.length === 0 ? (
                <div className="text-center py-8 bg-background/30 border border-primary/20 rounded-lg">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No hay candidatos agregados</h3>
                  <p className="text-gray-400 mb-4">Agrega candidatos para completar la encuesta</p>
                  <button
                    type="button"
                    onClick={() => setIsCandidatoModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Candidato</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full bg-background/30 border border-primary/20 rounded-lg">
                    <thead>
                      <tr className="border-b border-primary/20">
                        <th className="text-left p-3 text-gray-400 font-medium">Candidato</th>
                        <th className="text-center p-3 text-gray-400 font-medium">Intención de Voto</th>
                        <th className="text-center p-3 text-gray-400 font-medium">Var. Intención</th>
                        <th className="text-center p-3 text-gray-400 font-medium">Var. Conocimiento</th>
                        <th className="text-center p-3 text-gray-400 font-medium">Var. Saldo Opinión</th>
                        <th className="text-center p-3 text-gray-400 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                      {candidatos.map((candidato) => (
                        <tr key={candidato.id} className="hover:bg-primary/5 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-white font-medium">{candidato.nombre}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-lg font-bold text-primary">
                              {candidato.intencionVoto.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`text-sm font-medium ${
                              candidato.varianzaIntencion >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {candidato.varianzaIntencion > 0 ? '+' : ''}{candidato.varianzaIntencion.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`text-sm font-medium ${
                              candidato.varianzaConocimiento >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {candidato.varianzaConocimiento > 0 ? '+' : ''}{candidato.varianzaConocimiento.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`text-sm font-medium ${
                              candidato.varianzaSaldoOpinion >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {candidato.varianzaSaldoOpinion > 0 ? '+' : ''}{candidato.varianzaSaldoOpinion.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteCandidato(candidato.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                              title="Eliminar candidato"
                            >
                              <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-primary/20">
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
                Crear Encuesta
              </button>
            </div>
          </form>
        </div>
      </div>

      <CandidatoModal
        isOpen={isCandidatoModalOpen}
        onClose={() => setIsCandidatoModalOpen(false)}
        onSubmit={handleAddCandidato}
      />
    </>
  );
}