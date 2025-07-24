import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: string;
}

export default function EditModal({ isOpen, onClose, title, type }: EditModalProps) {
  const store = useDashboardStore();
  const [formData, setFormData] = useState(() => {
    switch (type) {
      case 'profile':
        return { ...store.profile };
      case 'finance':
        return { ...store.finance };
      case 'social-listening':
        return {
          mentions: store.socialListening.mentions,
          impressions: store.socialListening.impressions,
          witnesses: [...store.socialListening.witnesses],
        };
      default:
        return {};
    }
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    switch (type) {
      case 'profile':
        store.updateProfile(formData);
        break;
      case 'timeline':
        store.updateTimeline(formData as any);
        break;
      case 'campaign-progress':
        store.updateCampaignProgress(formData as any);
        break;
      case 'secondary-indicators':
        store.updateIndicator(formData as any);
        break;
      case 'finance':
        store.updateFinance(formData);
        break;
      case 'tactical-tracking':
        store.updateTacticalData(formData as any);
        break;
      case 'social-listening':
        store.updateSocialListening(formData);
        break;
      case 'operation-progress':
        store.updateOperationProgress(formData as any);
        break;
      case 'operation-metrics':
        store.updateOperationMetrics(formData as any);
        break;
    }
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSocialItem = () => {
    setFormData(prev => ({
      ...prev,
      witnesses: [...(prev.witnesses || []), { username: '', content: '' }],
    }));
  };

  const removeSocialItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index),
    }));
  };

  const updateSocialItem = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const renderForm = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
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
                value={formData.compliance || ''}
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
                value={formData.imageUrl || ''}
                onChange={handleInputChange}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Semana</label>
              <select
                name="week"
                value={formData.week || ''}
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
                value={formData.planned || ''}
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
                value={formData.executed || ''}
                onChange={handleInputChange}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="Valor ejercido"
              />
            </div>
          </div>
        );

      case 'campaign-progress':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Campaña</label>
              <select
                name="campaign"
                value={formData.campaign || ''}
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
                value={formData.progress || ''}
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
                value={formData.trend || ''}
                onChange={handleInputChange}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              >
                <option value="up">Subida ▲</option>
                <option value="down">Bajada ▼</option>
              </select>
            </div>
          </div>
        );

      case 'secondary-indicators':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Indicador</label>
              <select
                name="type"
                value={formData.type || ''}
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
                value={formData.value || ''}
                onChange={handleInputChange}
                step="0.01"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="55.4"
              />
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Presupuesto Ejercido (%)</label>
              <input
                type="number"
                name="exercisedBudget"
                value={formData.exercisedBudget || ''}
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
                value={formData.accruedBudget || ''}
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
                value={formData.scheduleDelay || ''}
                onChange={handleInputChange}
                step="0.1"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="-5.2"
              />
            </div>
          </div>
        );

      case 'tactical-tracking':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Fecha</label>
              <input
                type="date"
                name="date"
                value={formData.date || ''}
                onChange={handleInputChange}
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Candidato</label>
              <select
                name="candidate"
                value={formData.candidate || ''}
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
                value={formData.percentage || ''}
                onChange={handleInputChange}
                step="0.01"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="47.0"
              />
            </div>
          </div>
        );

      case 'social-listening':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Menciones (K)</label>
              <input
                type="number"
                name="mentions"
                value={formData.mentions || ''}
                onChange={handleInputChange}
                step="0.1"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="40.0"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Impresiones (M)</label>
              <input
                type="number"
                name="impressions"
                value={formData.impressions || ''}
                onChange={handleInputChange}
                step="0.1"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="1.3"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Testigos en Vivo</label>
              <div className="space-y-3">
                {formData.witnesses?.map((item, index) => (
                  <div key={index} className="space-y-2 p-3 border border-primary/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Testigo #{index + 1}</span>
                      {index > 0 && (
                        <button
                          onClick={() => removeSocialItem(index)}
                          className="text-secondary hover:text-secondary/80 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.username}
                      onChange={(e) => updateSocialItem(index, 'username', e.target.value)}
                      placeholder="@usuario"
                      className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 mb-2"
                    />
                    <textarea
                      value={item.content}
                      onChange={(e) => updateSocialItem(index, 'content', e.target.value)}
                      placeholder="Contenido del tweet"
                      className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 resize-none"
                      rows={2}
                    />
                  </div>
                ))}
                <button
                  onClick={addSocialItem}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Testigo</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'operation-progress':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Microcampaña</label>
              <select
                name="campaign"
                value={formData.campaign || ''}
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
                value={formData.progress || ''}
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
                value={formData.delay || ''}
                onChange={handleInputChange}
                step="0.01"
                className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                placeholder="5.0"
              />
            </div>
          </div>
        );

      case 'operation-metrics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Área</label>
              <select
                name="area"
                value={formData.area || ''}
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
                value={formData.progress || ''}
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
                  value={formData.content?.current || ''}
                  onChange={handleInputChange}
                  className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  placeholder="20"
                />
                <input
                  type="number"
                  name="content.target"
                  value={formData.content?.target || ''}
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
                  value={formData.impressions?.current || ''}
                  onChange={handleInputChange}
                  className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  placeholder="1000000"
                />
                <input
                  type="number"
                  name="impressions.target"
                  value={formData.impressions?.target || ''}
                  onChange={handleInputChange}
                  className="w-1/2 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                  placeholder="1000000"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-400 text-center py-4">
            Formulario en desarrollo
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-card border border-primary/20 rounded-lg w-full max-w-md mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-lg"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-primary/20">
          <h3 className="text-lg font-semibold text-gray-200 text-neon">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {renderForm()}
        </div>

        {/* Footer */}
        <div className="relative flex justify-end gap-3 p-4 border-t border-primary/20">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}