import { useState, useEffect } from 'react';
import { Plus, MessageSquare, Calendar, Clock, Trash2 } from 'lucide-react';
import AvisoModal from './AvisoModal';

export default function AvisosTable() {
  const [avisos, setAvisos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/avisos')
      .then(res => res.json())
      .then(data => setAvisos(
        data.map((a: any) => ({
          ...a,
          fechaCreacion: new Date(a.fechaCreacion),
        }))
      ));
  }, []);

  const handleAddAviso = async (nuevoAviso: { mensaje: string; fecha: string; hora: string }) => {
    const response = await fetch('/api/avisos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAviso),
    });
    if (response.ok) {
      const aviso = await response.json();
      setAvisos([{ ...aviso, fechaCreacion: new Date(aviso.fechaCreacion) }, ...avisos]);
    } else {
      alert('Error al guardar aviso');
    }
  };

  const handleDeleteAviso = async (id: string) => {
    const response = await fetch(`/api/avisos/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setAvisos(avisos.filter(aviso => aviso.id !== id));
    } else {
      alert('Error al eliminar aviso');
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

  const avisosOrdenados = [...avisos].sort((a, b) =>
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  return (
    <>
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
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white text-neon">
                Avisos Cochabamba
              </h2>
              <p className="text-gray-400 text-sm">
                {avisos.length} aviso{avisos.length !== 1 ? 's' : ''} registrado{avisos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Nuevo Aviso</span>
          </button>
        </div>

        {/* Table */}
        <div className="relative z-10">
          {avisos.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">No hay avisos</h3>
              <p className="text-gray-400 mb-6">Crea el primer aviso para comenzar</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Crear Aviso</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-4 text-gray-400 font-medium">Mensaje</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Fecha del Evento</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Creado</th>
                    <th className="text-center p-4 text-gray-400 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {avisosOrdenados.map((aviso, index) => (
                    <tr 
                      key={aviso.id}
                      className="hover:bg-primary/5 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="p-4">
                        <div className="max-w-md">
                          <p className="text-white font-medium leading-relaxed">
                            {aviso.mensaje}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            {formatFechaEvento(aviso.fecha, aviso.hora)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            {formatFechaCreacion(aviso.fechaCreacion)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteAviso(aviso.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                          title="Eliminar aviso"
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

      <AvisoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAviso}
      />
    </>
  );
}