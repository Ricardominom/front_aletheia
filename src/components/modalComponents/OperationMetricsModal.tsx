import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function OperationMetricsModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    area: 'DIGITAL',
    progress: 0,
    content: {
      current: 0,
      target: 0,
    },
    impressions: {
      current: 0,
      target: 0,
    },
  });

  const handleSubmit = () => {
    store.updateOperationMetrics(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: Number(value),
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'area' ? value : Number(value),
      }));
    }
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Métricas de Operación"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Área</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            <option>DIGITAL</option>
            <option>TELEFONÍA</option>
            <option>AIRE</option>
            <option>TERRITORIO</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">% Avance</label>
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="31.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Contenidos</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="content.current"
              value={formData.content.current}
              onChange={handleInputChange}
              className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              placeholder="20"
            />
            <input
              type="number"
              name="content.target"
              value={formData.content.target}
              onChange={handleInputChange}
              className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              placeholder="30"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Impresiones</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="impressions.current"
              value={formData.impressions.current}
              onChange={handleInputChange}
              className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              placeholder="1000000"
            />
            <input
              type="number"
              name="impressions.target"
              value={formData.impressions.target}
              onChange={handleInputChange}
              className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              placeholder="1000000"
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}