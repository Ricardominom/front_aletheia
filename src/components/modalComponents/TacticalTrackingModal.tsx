import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

interface TacticalFormData {
  date: string;
  candidate: string;
  percentage: number;
  trend?: 'up' | 'down';
}

const INITIAL_FORM_DATA: TacticalFormData = {
  date: new Date().toISOString().split('T')[0],
  candidate: 'CANDIDATO PROPIO',
  percentage: 0,
};

export default function TacticalTrackingModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState<TacticalFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof TacticalFormData, string>>>({});

  useEffect(() => {
    if (isOpen) {
      const existingData = store.tacticalData
        .filter(data => data.candidate === formData.candidate)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      if (existingData) {
        setFormData({
          date: existingData.date,
          candidate: existingData.candidate,
          percentage: existingData.percentage,
        });
      } else {
        setFormData(INITIAL_FORM_DATA);
      }
    }
  }, [isOpen, formData.candidate, store.tacticalData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TacticalFormData, string>> = {};

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (formData.percentage < 0 || formData.percentage > 100) {
      newErrors.percentage = 'El porcentaje debe estar entre 0 y 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        // Find previous data point for this candidate
        const previousData = store.tacticalData
          .filter(data => data.candidate === formData.candidate)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        // Calculate trend
        const trend = previousData
          ? formData.percentage > previousData.percentage ? 'up' as const : 'down' as const
          : 'up' as const;

        // Update store with new data
        store.updateTacticalData({
          ...formData,
          trend,
        });

        onClose();
      } catch (error) {
        console.error('Error al actualizar datos tácticos:', error);
        setErrors(prev => ({
          ...prev,
          general: 'Error al guardar los datos. Por favor, intente nuevamente.',
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'percentage' ? Number(value) : value,
    }));

    // Clear error when field is modified
    if (errors[name as keyof TacticalFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof TacticalFormData];
        return newErrors;
      });
    }
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Tracking Táctico"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`w-full bg-background/90 border ${errors.date ? 'border-error' : 'border-primary/20'} rounded-lg px-4 py-2 text-gray-200`}
          />
          {errors.date && (
            <p className="text-error text-xs mt-1">{errors.date}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Candidato</label>
          <select
            name="candidate"
            value={formData.candidate}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
          >
            <option>CANDIDATO PROPIO</option>
            <option>OPOSITOR 1</option>
            <option>OPOSITOR 2</option>
            <option>NO SABE/NO CONTESTÓ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Porcentaje</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            max="100"
            className={`w-full bg-background/90 border ${errors.percentage ? 'border-error' : 'border-primary/20'} rounded-lg px-4 py-2 text-gray-200`}
            placeholder="47.0"
          />
          {errors.percentage && (
            <p className="text-error text-xs mt-1">{errors.percentage}</p>
          )}
        </div>
        {errors.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-error text-sm">{errors.general}</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}