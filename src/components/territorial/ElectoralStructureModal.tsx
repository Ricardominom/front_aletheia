import React, { useState } from 'react';
import { Plus, X, Calendar, Settings } from 'lucide-react';

interface Defender {
  id: string;
  name: string;
  phone: string;
  email: string;
  pollingStation?: string;
}

interface ElectoralStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defenders: Defender[];
  onAddDefender: (defender: Defender) => void;
  electionDate: string;
  onUpdateElectionDate: (date: string) => void;
  targetDefenders: number;
  onUpdateTargetDefenders: (target: number) => void;
  hasInitialConfig: boolean;
  onInitialConfig: (date: string, target: number) => void;
}

export default function ElectoralStructureModal({
  isOpen,
  onClose,
  defenders,
  onAddDefender,
  electionDate,
  onUpdateElectionDate,
  targetDefenders,
  onUpdateTargetDefenders,
  hasInitialConfig,
  onInitialConfig,
}: ElectoralStructureModalProps) {
  const [isAddingDefender, setIsAddingDefender] = useState(false);
  const [showConfig, setShowConfig] = useState(!hasInitialConfig);
  const [tempDate, setTempDate] = useState(electionDate);
  const [tempTarget, setTempTarget] = useState(targetDefenders);
  const [newDefender, setNewDefender] = useState({
    name: '',
    phone: '',
    email: '',
    pollingStation: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDefender({
      id: Date.now().toString(),
      ...newDefender,
    });
    setNewDefender({ name: '', phone: '', email: '', pollingStation: '' });
    setIsAddingDefender(false);
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasInitialConfig) {
      onInitialConfig(tempDate, tempTarget);
    } else {
      onUpdateElectionDate(tempDate);
      onUpdateTargetDefenders(tempTarget);
    }
    setShowConfig(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-7xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-3xl font-semibold text-white text-neon">Estructura Electoral</h3>
          <div className="flex items-center gap-4">
            {hasInitialConfig && (
              <button
                onClick={() => setShowConfig(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span>Configuración</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-7 h-7 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {showConfig ? (
            <form onSubmit={handleConfigSubmit} className="max-w-2xl mx-auto bg-background/30 p-6 rounded-xl border border-primary/20">
              <h4 className="text-xl font-semibold text-white mb-6">Configuración General</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Fecha de Elección</label>
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-accent-teal" />
                    <input
                      type="date"
                      value={tempDate}
                      onChange={(e) => setTempDate(e.target.value)}
                      className="flex-1 bg-background/50 border border-primary/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Meta de Defensores</label>
                  <input
                    type="number"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(parseInt(e.target.value))}
                    className="w-full bg-background/50 border border-primary/20 rounded-lg px-4 py-2 text-white"
                    min="1"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  {hasInitialConfig && (
                    <button
                      type="button"
                      onClick={() => setShowConfig(false)}
                      className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
                  >
                    {hasInitialConfig ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsAddingDefender(true)}
                  className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
                >
                  <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Agregar Defensor</span>
                </button>
              </div>

              {isAddingDefender ? (
                <form onSubmit={handleSubmit} className="bg-background/30 p-6 rounded-xl border border-primary/20 max-w-2xl mx-auto">
                  <h4 className="text-xl font-semibold text-white mb-4">Nuevo Defensor</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        value={newDefender.name}
                        onChange={(e) => setNewDefender({ ...newDefender, name: e.target.value })}
                        className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Celular</label>
                      <input
                        type="tel"
                        value={newDefender.phone}
                        onChange={(e) => setNewDefender({ ...newDefender, phone: e.target.value })}
                        className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={newDefender.email}
                        onChange={(e) => setNewDefender({ ...newDefender, email: e.target.value })}
                        className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Casilla (Opcional)</label>
                      <input
                        type="text"
                        value={newDefender.pollingStation}
                        onChange={(e) => setNewDefender({ ...newDefender, pollingStation: e.target.value })}
                        maxLength={11}
                        className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddingDefender(false)}
                      className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary/20">
                        <th className="text-left p-4 text-gray-400 font-medium">Nombre</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Celular</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Casilla</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                      {defenders.map((defender) => (
                        <tr 
                          key={defender.id}
                          className="hover:bg-primary/5 transition-colors"
                        >
                          <td className="p-4 text-white">{defender.name}</td>
                          <td className="p-4 text-gray-300">{defender.phone}</td>
                          <td className="p-4 text-gray-300">{defender.email}</td>
                          <td className="p-4 text-gray-300">{defender.pollingStation || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}