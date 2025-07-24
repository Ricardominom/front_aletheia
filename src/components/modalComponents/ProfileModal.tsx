import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function ProfileModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState(store.profile);

  const handleSubmit = () => {
    store.updateProfile(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Perfil"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Porcentaje de Cumplimiento</label>
          <input
            type="number"
            name="compliance"
            value={formData.compliance}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="27.36"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL de Imagen</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
      </div>
    </ModalWrapper>
  );
}