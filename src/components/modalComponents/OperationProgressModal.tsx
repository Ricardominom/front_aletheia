import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function OperationProgressModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    campaign: 1,
    progress: 0,
    delay: 0,
  });

  const handleSubmit = () => {
    store.updateOperationProgress(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Progreso de Operación"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Microcampaña</label>
          <select
            name="campaign"
            value={formData.campaign}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>Microcampaña {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Progreso (%)</label>
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
          <label className="block text-sm font-medium text-gray-400 mb-1">Retraso (%)</label>
          <input
            type="number"
            name="delay"
            value={formData.delay}
            onChange={handleInputChange}
            step="0.01"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="5.0"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}