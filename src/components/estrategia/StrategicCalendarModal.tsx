import React, { useState, useMemo } from 'react';
import { Plus, X, Calendar, CheckCircle, Circle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

interface StrategicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onUpdateEvents: (events: Event[]) => void;
}

export default function StrategicCalendarModal({
  isOpen,
  onClose,
  events,
  onUpdateEvents,
}: StrategicCalendarModalProps) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
  });

  // Group events by date - moved before conditional return
  const groupedEvents = useMemo(() => {
    const grouped = new Map<string, Event[]>();
    
    // Sort events by date first
    const sortedEvents = [...events].sort((a, b) => 
      new Date(b.date + 'T12:00:00').getTime() - new Date(a.date + 'T12:00:00').getTime()
    );
    
    // Group events by date
    sortedEvents.forEach(event => {
      const dateKey = event.date;
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(event);
    });
    
    return grouped;
  }, [events]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure we're using the date as is, without timezone conversion
    const updatedEvents = [...events, {
      id: Date.now().toString(),
      ...newEvent,
      completed: false,
    }];
    onUpdateEvents(updatedEvents);
    setNewEvent({ title: '', date: '' });
  };

  const toggleEventStatus = (eventToUpdate: Event) => {
    const updatedEvents = events.map(event => 
      event.id === eventToUpdate.id 
        ? { ...event, completed: !event.completed }
        : event
    );
    onUpdateEvents(updatedEvents);
  };

  const formatDate = (dateString: string) => {
    // Add time to ensure consistent date handling
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-3xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-3xl font-semibold text-white text-neon">Calendario Estratégico</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Add Event Form */}
            <form onSubmit={handleSubmit} className="bg-background/30 p-4 rounded-xl border border-primary/20">
              <h4 className="text-lg font-semibold text-white mb-4">Nuevo Evento</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Nombre del Evento
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Fecha del Evento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full bg-background/90 border border-primary/20 rounded-lg pl-12 pr-4 py-2 text-gray-200"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Evento</span>
                </button>
              </div>
            </form>

            {/* Events List */}
            <div className="bg-background/30 p-4 rounded-xl border border-primary/20">
              <h4 className="text-lg font-semibold text-white mb-4">Eventos</h4>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                {groupedEvents.size === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    No hay eventos registrados
                  </div>
                ) : (
                  Array.from(groupedEvents.entries()).map(([date, dateEvents]) => (
                    <div key={date} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(date)}</span>
                        <span className="text-gray-400">
                          ({dateEvents.length} evento{dateEvents.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="space-y-2 pl-6">
                        {dateEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start gap-3 bg-background/50 rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                          >
                            <button
                              onClick={() => toggleEventStatus(event)}
                              className="mt-0.5 text-gray-400 hover:text-gray-300 transition-colors"
                            >
                              {event.completed ? (
                                <CheckCircle className="w-5 h-5 text-accent-teal" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium ${
                                event.completed 
                                  ? 'text-accent-teal line-through decoration-accent-teal decoration-2' 
                                  : 'text-white'
                              }`}>
                                {event.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}