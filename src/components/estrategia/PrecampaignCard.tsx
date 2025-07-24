import React, { useEffect, useState } from 'react';
import { Circle, Calendar, User, AlertTriangle, CheckCircle, Plus, Filter } from 'lucide-react';
import PrecampaignModal from './PrecampaignModal';

interface Requirement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  responsible: string;
  priority: 'high' | 'medium' | 'low';
  category: 'legal' | 'administrative' | 'communication' | 'logistics';
  attachments?: File[];
}

export default function PrecampaignCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
  });
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    fetch('/api/estrategia/precampana')
      .then(res => res.json())
      .then(data => setRequirements(
        data.map((r: any) => ({
          id: r.id,
          title: r.titulo,
          description: r.descripcion,
          completed: !!r.completado,
          dueDate: r.fecha_limite,
          responsible: r.responsable,
          priority: r.prioridad,
          category: r.categoria,
        }))
      ));
  }, []);

  const handleAddRequirement = async (req: Omit<Requirement, 'id'>) => {
    const response = await fetch('/api/estrategia/precampana', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: req.title,
        descripcion: req.description,
        fecha_limite: req.dueDate,
        responsable: req.responsible,
        prioridad: req.priority,
        categoria: req.category,
      }),
    });
    if (response.ok) {
      const r = await response.json();
      setRequirements([...requirements, {
        id: r.id,
        title: r.titulo,
        description: r.descripcion,
        completed: !!r.completado,
        dueDate: r.fecha_limite,
        responsible: r.responsable,
        priority: r.prioridad,
        category: r.categoria,
      }]);
    } else {
      alert('Error al guardar requisito');
    }
  };

  const toggleRequirement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRequirements(requirements.map(req =>
      req.id === id ? { ...req, completed: !req.completed } : req
    ));
  };

  // Calculate progress
  const completedCount = requirements.filter(req => req.completed).length;
  const totalCount = requirements.length;
  const progress = (completedCount / totalCount) * 100;

  // Filter and sort requirements
  const filteredRequirements = requirements.filter(req => {
    if (filter.status !== 'all' && 
        ((filter.status === 'completed' && !req.completed) || 
         (filter.status === 'pending' && req.completed))) {
      return false;
    }
    if (filter.category !== 'all' && req.category !== filter.category) {
      return false;
    }
    if (filter.priority !== 'all' && req.priority !== filter.priority) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <>
      <div className="h-full glassmorphic-container p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-white">PRECAMPAÑA Y REGISTRO</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
          >
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl font-bold text-accent-teal mb-1">{completedCount}</div>
            <div className="text-xs text-gray-400">Requisitos Completados</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl font-bold text-accent-pink mb-1">{totalCount - completedCount}</div>
            <div className="text-xs text-gray-400">Requisitos Pendientes</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2 text-primary">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filtros</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-background/30 p-3 rounded-xl border border-primary/20">
              <label className="block text-xs text-gray-400 mb-2">Estado</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-3 py-1.5 text-sm text-gray-200"
              >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>
            <div className="bg-background/30 p-3 rounded-xl border border-primary/20">
              <label className="block text-xs text-gray-400 mb-2">Categoría</label>
              <select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-3 py-1.5 text-sm text-gray-200"
              >
                <option value="all">Todas</option>
                <option value="legal">Legal</option>
                <option value="administrative">Administrativo</option>
                <option value="communication">Comunicación</option>
                <option value="logistics">Logística</option>
              </select>
            </div>
            <div className="bg-background/30 p-3 rounded-xl border border-primary/20">
              <label className="block text-xs text-gray-400 mb-2">Prioridad</label>
              <select
                value={filter.priority}
                onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-3 py-1.5 text-sm text-gray-200"
              >
                <option value="all">Todas</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div className="space-y-3 max-h-[calc(100%-250px)] overflow-y-auto pr-2">
          {filteredRequirements.map((req) => (
            <div 
              key={req.id}
              className="flex items-start gap-3 bg-card/50 rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <button
                onClick={(e) => toggleRequirement(req.id, e)}
                className="mt-0.5 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {req.completed ? (
                  <CheckCircle className="w-5 h-5 text-accent-teal" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`text-sm transition-all duration-300 ${
                  req.completed 
                    ? 'text-accent-teal line-through decoration-accent-teal decoration-2' 
                    : 'text-white'
                }`}>
                  {req.title}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(req.dueDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <User className="w-3 h-3" />
                    <span className="truncate">{req.responsible}</span>
                  </div>
                  {req.priority === 'high' && (
                    <div className="flex items-center gap-1 text-xs text-accent-pink">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Alta Prioridad</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PrecampaignModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddRequirement={handleAddRequirement}
      />
    </>
  );
}