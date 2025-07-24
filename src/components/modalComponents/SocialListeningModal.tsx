import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BaseModalProps } from './types';
import ModalWrapper from './ModalWrapper';

export default function SocialListeningModal({ isOpen, onClose }: BaseModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState({
    mentions: store.socialListening.mentions,
    impressions: store.socialListening.impressions,
    witnesses: [...store.socialListening.witnesses],
  });

  const handleSubmit = () => {
    store.updateSocialListening(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const addWitness = () => {
    setFormData(prev => ({
      ...prev,
      witnesses: [...prev.witnesses, { username: '', content: '' }],
    }));
  };

  const removeWitness = (index: number) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index),
    }));
  };

  const updateWitness = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.map((witness, i) =>
        i === index ? { ...witness, [field]: value } : witness
      ),
    }));
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Editar Escucha Social"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Menciones (K)</label>
          <input
            type="number"
            name="mentions"
            value={formData.mentions}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="40.0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Impresiones (M)</label>
          <input
            type="number"
            name="impressions"
            value={formData.impressions}
            onChange={handleInputChange}
            step="0.1"
            className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
            placeholder="1.3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Testigos en Vivo</label>
          <div className="space-y-3 mt-2">
            {formData.witnesses.map((witness, index) => (
              <div key={index} className="space-y-2 p-3 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Testigo #{index + 1}</span>
                  {index > 0 && (
                    <button
                      onClick={() => removeWitness(index)}
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={witness.username}
                  onChange={(e) => updateWitness(index, 'username', e.target.value)}
                  placeholder="@usuario"
                  className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 mb-2"
                />
                <textarea
                  value={witness.content}
                  onChange={(e) => updateWitness(index, 'content', e.target.value)}
                  placeholder="Contenido del tweet"
                  className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 resize-none"
                  rows={2}
                />
              </div>
            ))}
            <button
              onClick={addWitness}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Testigo</span>
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}