import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function FinanceModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState(store.finance);

  const handleSubmit = () => {
    store.updateFinance(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      title="Editar Estado Financiero"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Presupuesto Ejercido (%)</label>
          <input
            type="number"
            name="exercisedBudget"
            value={formData.exercisedBudget}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="55.4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Presupuesto Devengado (%)</label>
          <input
            type="number"
            name="accruedBudget"
            value={formData.accruedBudget}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="55.4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Atraso en Programación (%)</label>
          <input
            type="number"
            name="scheduleDelay"
            value={formData.scheduleDelay}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="-5.2"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}