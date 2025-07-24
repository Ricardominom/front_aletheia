import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function CampaignProgressModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    campaign: 'GENERAL',
    progress: 0,
    trend: 'up' as const,
  });

  const handleSubmit = () => {
    store.updateCampaignProgress(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value,
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Progreso de Campaña"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Campaña</label>
          <select
            name="campaign"
            value={formData.campaign}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            <option>GENERAL</option>
            <option>TERRITORIO</option>
            <option>DIGITAL</option>
            <option>AIRE</option>
            <option>TELEFONÍA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Porcentaje de Avance</label>
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleInputChange}
            step="0.01"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="27.36"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Tendencia</label>
          <select
            name="trend"
            value={formData.trend}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            <option value="up">Subida ▲</option>
            <option value="down">Bajada ▼</option>
          </select>
        </div>
      </div>
    </ModalWrapper>
  );
}