import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function TimelineModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    week: 'S1',
    planned: 0,
    executed: 0,
  });

  const handleSubmit = () => {
    store.updateTimeline(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'week' ? value : Number(value),
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Timeline"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Semana</label>
          <select
            name="week"
            value={formData.week}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`S${i + 1}`}>Semana {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Planeado</label>
          <input
            type="number"
            name="planned"
            value={formData.planned}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="Valor planeado"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Ejercido</label>
          <input
            type="number"
            name="executed"
            value={formData.executed}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="Valor ejercido"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}