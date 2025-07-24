import React, { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StrategicCalendarModal from './StrategicCalendarModal';

interface Event {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export default function StrategicCalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/estrategia/calendario')
      .then(res => res.json())
      .then(data => setEvents(
        data.map((e: any) => ({
          id: e.id,
          title: e.titulo,
          date: e.fecha,
          completed: !!e.completado,
        }))
      ));
  }, []);

  const handleAddEvent = async (event: Omit<Event, 'id'>) => {
    const response = await fetch('/api/estrategia/calendario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: event.title,
        date: event.date,
      }),
    });
    if (response.ok) {
      const e = await response.json();
      setEvents([...events, {
        id: e.id,
        title: e.titulo,
        date: e.fecha,
        completed: !!e.completado,
      }]);
    } else {
      alert('Error al guardar evento');
    }
  };

  const handleUpdateEvent = async (id: string, completed: boolean) => {
    const response = await fetch(`/api/estrategia/calendario/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    if (response.ok) {
      setEvents(events.map(ev => ev.id === id ? { ...ev, completed } : ev));
    } else {
      alert('Error al actualizar evento');
    }
  };

  const monthNames = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  const daysOfWeek = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, Event[]>();
    events.forEach(event => {
      const dateKey = event.date;
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(event);
    });
    return grouped;
  }, [events]);

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return eventsByDate.get(dateString) || [];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300"
      >
        <h3 className="text-2xl font-semibold text-white mb-6">CALENDARIO ESTRATÉGICO</h3>
        
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousMonth();
            }}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          
          <div className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMonth();
            }}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="p-2 text-xs font-medium text-gray-400 border-b border-primary/20 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil((daysInMonth + startingDay) / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex - startingDay + 1;
                  const isCurrentMonth = day > 0 && day <= daysInMonth;
                  const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const dayEvents = isCurrentMonth ? getEventsForDate(currentDay) : [];
                  const isCurrentDay = isCurrentMonth && isToday(currentDay);
                  
                  // Determine cell color based on events
                  let cellColor = isCurrentDay ? 'bg-primary/20' : '';
                  if (dayEvents.length > 0) {
                    if (dayEvents.every(event => event.completed)) {
                      cellColor = 'bg-accent-teal/20 hover:bg-accent-teal/30';
                    } else {
                      cellColor = 'bg-accent-pink/20 hover:bg-accent-pink/30';
                    }
                  }
                  
                  return (
                    <td
                      key={dayIndex}
                      className={`
                        border border-primary/10 p-4 text-center relative transition-all duration-300
                        ${isCurrentMonth ? cellColor : 'bg-background/50'}
                        group/cell cursor-pointer
                      `}
                    >
                      {isCurrentMonth && (
                        <>
                          <div className={`text-base ${isCurrentDay ? 'text-primary font-bold' : 'text-gray-300'}`}>
                            {day}
                          </div>
                          
                          {/* Event Count Badge - Only show for multiple events */}
                          {dayEvents.length > 1 && (
                            <div className="absolute top-1 right-1 min-w-[20px] h-5 bg-primary/20 rounded-full flex items-center justify-center px-1">
                              <span className="text-xs font-medium text-primary">
                                {dayEvents.length}
                              </span>
                            </div>
                          )}
                          
                          {/* Hover tooltip */}
                          {dayEvents.length > 0 && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                              <div className="bg-background/95 border border-primary/20 rounded-lg p-3 shadow-xl">
                                {dayEvents.map((event) => (
                                  <div key={event.id} className="text-left mb-2 last:mb-0">
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${
                                        event.completed ? 'bg-accent-teal' : 'bg-accent-pink'
                                      }`}></div>
                                      {event.title}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {event.completed ? 'Completado' : 'Pendiente'}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {/* Arrow */}
                              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-background/95 border-r border-b border-primary/20 transform rotate-45"></div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-pink/60"></div>
            <span className="text-xs text-gray-400">Eventos Pendientes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-teal/60"></div>
            <span className="text-xs text-gray-400">Eventos Completados</span>
          </div>
        </div>
      </div>

      <StrategicCalendarModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={events}
        onUpdateEvents={(newEvents) => {
          // Si agregas desde el modal, llama a handleAddEvent o handleUpdateEvent
          const last = newEvents[newEvents.length - 1];
          if (last && !last.id) {
            handleAddEvent(last);
          }
          setEvents(newEvents);
        }}
      />
    </>
  );
}