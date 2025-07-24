import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Clock, Trash2, Tag, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdversarioModal from './AdversarioModal';
import ActualizacionModal from './ActualizacionModal';

interface Adversario {
  id: string;
  nombre: string;
  partido: string;
  descripcion: string;
  fechaCreacion: Date;
}

interface Actualizacion {
  id: string;
  adversarioId: string;
  adversarioNombre: string;
  mensaje: string;
  tipo: 'positiva' | 'negativa' | 'neutral';
  fecha: string;
  hora: string;
  fechaCreacion: Date;
}

export default function AdversariosTable() {
  const [adversarios, setAdversarios] = useState<Adversario[]>([]);
  const [actualizaciones, setActualizaciones] = useState<Actualizacion[]>([]);
  const [isAdversarioModalOpen, setIsAdversarioModalOpen] = useState(false);
  const [isActualizacionModalOpen, setIsActualizacionModalOpen] = useState(false);

  // Cargar adversarios desde el backend al montar el componente
  useEffect(() => {
    fetch('/api/adversarios')
      .then(res => res.json())
      .then(data => {
        setAdversarios(
          data.map((a: any) => ({
            ...a,
            fechaCreacion: new Date(a.fechaCreacion),
          }))
        );
      });
  }, []);

  // Cargar actualizaciones desde el backend al montar el componente
  useEffect(() => {
    fetch('/api/adversarios/actualizaciones')
      .then(res => res.json())
      .then(data => {
        setActualizaciones(
          data.map((a: any) => ({
            ...a,
            fechaCreacion: new Date(a.fechaCreacion),
          }))
        );
      });
  }, []);

  const handleAddAdversario = async (nuevoAdversario: Omit<Adversario, 'id' | 'fechaCreacion'>) => {
    const response = await fetch('/api/adversarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAdversario),
    });
    if (response.ok) {
      const adversario = await response.json();
      setAdversarios([
        { ...adversario, fechaCreacion: new Date(adversario.fechaCreacion) },
        ...adversarios,
      ]);
    } else {
      alert('Error al guardar adversario');
    }
  };

  const handleAddActualizacion = async (
    nuevaActualizacion: Omit<Actualizacion, 'id' | 'fechaCreacion' | 'adversarioNombre'>
  ) => {
    const adversario = adversarios.find(a => a.id === nuevaActualizacion.adversarioId);
    if (!adversario) return;

    const payload = {
      ...nuevaActualizacion,
      adversarioNombre: adversario.nombre,
    };

    const response = await fetch('/api/adversarios/actualizaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const actualizacion = await response.json();
      setActualizaciones([
        { ...actualizacion, fechaCreacion: new Date(actualizacion.fechaCreacion) },
        ...actualizaciones,
      ]);
    } else {
      alert('Error al guardar actualización');
    }
  };

  const handleDeleteAdversario = async (id: string) => {
    const response = await fetch(`/api/adversarios/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setAdversarios(adversarios.filter(adversario => adversario.id !== id));
      setActualizaciones(actualizaciones.filter(act => act.adversarioId !== id));
    } else {
      alert('Error al eliminar adversario');
    }
  };

  const handleDeleteActualizacion = async (id: string) => {
    const response = await fetch(`/api/adversarios/actualizaciones/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setActualizaciones(actualizaciones.filter(actualizacion => actualizacion.id !== id));
    } else {
      alert('Error al eliminar actualización');
    }
  };

  const formatFechaCreacion = (fecha: Date | string) => {
    const dateObj = fecha instanceof Date ? fecha : new Date(fecha);
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + dateObj.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFechaEvento = (fecha: string, hora: string) => {
    const fechaObj = new Date(fecha);
  if (isNaN(fechaObj.getTime())) return ''; 
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' a las ' + hora;
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return <TrendingUp className="w-4 h-4" />;
      case 'negativa':
        return <TrendingDown className="w-4 h-4" />;
      case 'neutral':
        return <Minus className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'negativa':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'neutral':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
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

  const actualizacionesOrdenadas = [...actualizaciones].sort((a, b) =>
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  return (
    <>
      <div className="space-y-6">
        {/* Sección de Adversarios */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 to-primary/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-accent-pink/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-accent-pink" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Adversarios Registrados
                </h2>
                <p className="text-gray-400 text-sm">
                  {adversarios.length} adversario{adversarios.length !== 1 ? 's' : ''} registrado{adversarios.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAdversarioModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nuevo Adversario</span>
            </button>
          </div>

          {/* Adversarios Grid */}
          <div className="relative z-10">
            {adversarios.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay adversarios registrados</h3>
                <p className="text-gray-400 mb-6">Registra el primer adversario para comenzar el seguimiento</p>
                <button
                  onClick={() => setIsAdversarioModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Registrar Adversario</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adversarios.map((adversario, index) => (
                  <div
                    key={adversario.id}
                    className="bg-card/50 border border-accent-pink/20 rounded-lg p-4 hover:border-accent-pink/40 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold">{adversario.nombre}</h3>
                      <button
                        onClick={() => handleDeleteAdversario(adversario.id)}
                        className="p-1 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                        title="Eliminar adversario"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    </div>
                    <p className="text-accent-pink text-sm font-medium mb-2">{adversario.partido}</p>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{adversario.descripcion}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Registrado: {formatFechaCreacion(adversario.fechaCreacion)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sección de Actualizaciones */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Actualizaciones de Adversarios
                </h2>
                <p className="text-gray-400 text-sm">
                  {actualizaciones.length} actualización{actualizaciones.length !== 1 ? 'es' : ''} registrada{actualizaciones.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsActualizacionModalOpen(true)}
              disabled={adversarios.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group ${
                adversarios.length === 0
                  ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nueva Actualización</span>
            </button>
          </div>

          {/* Actualizaciones Table */}
          <div className="relative z-10">
            {actualizaciones.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay actualizaciones</h3>
                <p className="text-gray-400 mb-6">
                  {adversarios.length === 0 
                    ? 'Primero registra un adversario para poder crear actualizaciones'
                    : 'Crea la primera actualización para comenzar el seguimiento'
                  }
                </p>
                {adversarios.length > 0 && (
                  <button
                    onClick={() => setIsActualizacionModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Actualización</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left p-4 text-gray-400 font-medium">Adversario</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Actualización</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Tipo</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Fecha del Evento</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Registrado</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {actualizacionesOrdenadas.map((actualizacion, index) => (
                      <tr 
                        key={actualizacion.id}
                        className="hover:bg-primary/5 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent-pink/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-accent-pink" />
                            </div>
                            <span className="text-white font-medium">{actualizacion.adversarioNombre}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-md">
                            <p className="text-white leading-relaxed">
                              {actualizacion.mensaje}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getTipoColor(actualizacion.tipo)}`}>
                            {getTipoIcon(actualizacion.tipo)}
                            <span>{getTipoLabel(actualizacion.tipo)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm">
                              {formatFechaEvento(actualizacion.fecha, actualizacion.hora)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {formatFechaCreacion(actualizacion.fechaCreacion)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteActualizacion(actualizacion.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                            title="Eliminar actualización"
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
        </div>
      </div>

      {/* Modals */}
      <AdversarioModal
        isOpen={isAdversarioModalOpen}
        onClose={() => setIsAdversarioModalOpen(false)}
        onSubmit={handleAddAdversario}
      />

      <ActualizacionModal
        isOpen={isActualizacionModalOpen}
        onClose={() => setIsActualizacionModalOpen(false)}
        onSubmit={handleAddActualizacion}
        adversarios={adversarios}
      />
    </>
  );
}