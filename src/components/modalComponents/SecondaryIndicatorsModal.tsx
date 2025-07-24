import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function SecondaryIndicatorsModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    type: 'DE LA CAMPAÑA TRANSCURRIDO',
    value: 0,
  });

  const handleSubmit = () => {
    store.updateIndicator(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? Number(value) : value,
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Indicadores Secundarios"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Indicador</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            <option>DE LA CAMPAÑA TRANSCURRIDO</option>
            <option>CRECIMIENTO PROMEDIO</option>
            <option>OBJETIVOS DE LA CAMPAÑA</option>
            <option>AVANCE GENERAL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Valor</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            step="0.01"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="55.4"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}