import React, { useState } from 'react';
import { Plus, X, Calendar, Edit2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  expectedAttendees: number;
  actualAttendees: number;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onAddEvent: (event: Event) => void;
}

interface EditAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onUpdate: (id: string, actualAttendees: number) => void;
}

function EditAttendanceModal({ isOpen, onClose, event, onUpdate }: EditAttendanceModalProps) {
  const [actualAttendees, setActualAttendees] = useState(event.actualAttendees);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(event.id, actualAttendees);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-md mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-xl font-semibold text-white text-neon">Actualizar Asistentes</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6">
          <div className="mb-6">
            <h4 className="text-lg text-white mb-2">{event.title}</h4>
            <p className="text-sm text-gray-400">
              {new Date(event.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Asistentes Esperados</label>
              <input
                type="number"
                value={event.expectedAttendees}
                disabled
                className="w-full bg-background/50 border border-primary/20 rounded-lg px-4 py-2 text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Asistentes Reales</label>
              <input
                type="number"
                value={actualAttendees}
                onChange={(e) => setActualAttendees(parseInt(e.target.value))}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-white"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EventsModal({
  isOpen,
  onClose,
  events,
  onAddEvent,
}: EventsModalProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    expectedAttendees: 0,
    actualAttendees: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      id: Date.now().toString(),
      ...newEvent,
    });
    setNewEvent({ title: '', date: '', expectedAttendees: 0, actualAttendees: 0 });
    setIsAddingEvent(false);
  };

  const handleUpdateAttendance = (id: string, actualAttendees: number) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, actualAttendees } : event
    );
    // Update the parent component's state
    onAddEvent(updatedEvents[0]); // This will trigger a re-render with the updated data
  };

  // Sort events by date in descending order
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
          <h3 className="text-3xl font-semibold text-white text-neon">Eventos</h3>
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
              onClick={() => setIsAddingEvent(true)}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Agregar Evento</span>
            </button>
          </div>

          {isAddingEvent ? (
            <form onSubmit={handleSubmit} className="bg-background/30 p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-6">Nuevo Evento</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Título del Evento</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-3 text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full bg-background/90 border border-primary/20 rounded-lg pl-12 pr-4 py-3 text-gray-200"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Asistentes Esperados</label>
                  <input
                    type="number"
                    value={newEvent.expectedAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, expectedAttendees: parseInt(e.target.value) })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-3 text-gray-200"
                    min="1"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Asistentes Reales</label>
                  <input
                    type="number"
                    value={newEvent.actualAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, actualAttendees: parseInt(e.target.value) })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-3 text-gray-200"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-4 text-gray-400 font-medium">Nombre del Evento</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Fecha del Evento</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Asistentes Esperados</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Asistentes Reales</th>
                    <th className="text-right p-4 text-gray-400 font-medium">% Asistencia</th>
                    <th className="text-center p-4 text-gray-400 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {sortedEvents.map((event) => {
                    const attendancePercentage = (event.actualAttendees / event.expectedAttendees) * 100;
                    const isHighAttendance = attendancePercentage >= 90;
                    const isLowAttendance = attendancePercentage < 70;
                    
                    return (
                      <tr 
                        key={event.id}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <td className="p-4 text-white font-medium">{event.title}</td>
                        <td className="p-4 text-gray-300">
                          {new Date(event.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4 text-right text-gray-300">
                          {event.expectedAttendees.toLocaleString()}
                        </td>
                        <td className="p-4 text-right text-gray-300">
                          {event.actualAttendees.toLocaleString()}
                        </td>
                        <td className={`p-4 text-right font-medium ${
                          isHighAttendance ? 'text-accent-teal' :
                          isLowAttendance ? 'text-accent-pink' :
                          'text-primary'
                        }`}>
                          {attendancePercentage.toFixed(1)}%
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300 group"
                          >
                            <Edit2 className="w-5 h-5 text-primary group-hover:text-primary/80" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Attendance Modal */}
      {editingEvent && (
        <EditAttendanceModal
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          event={editingEvent}
          onUpdate={handleUpdateAttendance}
        />
      )}
    </div>
  );
}