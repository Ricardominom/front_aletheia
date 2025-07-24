import React, { useState } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';

interface Strategy {
  id: string;
  date: string;
  description: string;
  file: File | null;
}

interface StrategyPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategies: Strategy[];
  onUpdateStrategies: (strategies: Strategy[]) => void;
}

export default function StrategyPlanningModal({ isOpen, onClose, strategies, onUpdateStrategies }: StrategyPlanningModalProps) {
  const [newStrategy, setNewStrategy] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [keyDocuments, setKeyDocuments] = useState<File[]>([]);

  if (!isOpen) return null;

  const resetForm = () => {
    setNewStrategy('');
    setSelectedFile(null);
    setKeyDocuments([]);
  };

  const handleStrategySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const strategy: Strategy = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description: newStrategy,
      file: selectedFile,
    };

    onUpdateStrategies([...strategies, strategy]);
    resetForm();
  };

  const handleStrategyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleKeyDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setKeyDocuments(prev => [...prev, ...files]);
  };

  const removeStrategy = (id: string) => {
    onUpdateStrategies(strategies.filter(strategy => strategy.id !== id));
  };

  const removeKeyDocument = (index: number) => {
    setKeyDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-4xl mx-4 shadow-2xl animate-scale-in overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-3xl font-semibold text-white text-neon">Estrategia y Planeación</h3>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Strategy Form */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Nueva Estrategia</h4>
              <form onSubmit={handleStrategySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Descripción de la Estrategia
                  </label>
                  <textarea
                    value={newStrategy}
                    onChange={(e) => setNewStrategy(e.target.value)}
                    className="w-full h-32 bg-background/90 border border-primary/20 rounded-lg px-4 py-2 text-gray-200 resize-none"
                    placeholder="Describa la estrategia..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Archivo de Estrategia
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleStrategyFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="h-24 bg-background/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                      {selectedFile ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-6 h-6 text-primary" />
                          <span className="text-primary">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-gray-400">Subir archivo de estrategia</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  Guardar Estrategia
                </button>
              </form>
            </div>

            {/* Key Documents */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Documentos Clave</h4>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleKeyDocumentsChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                />
                <div className="h-24 bg-background/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-400">Subir documentos clave</span>
                </div>
              </div>

              {keyDocuments.length > 0 && (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {keyDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-background/50 rounded-lg p-3 border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-gray-300 truncate">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => removeKeyDocument(index)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Strategies List */}
          {strategies.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Estrategias Guardadas</h4>
              <div className="space-y-3">
                {strategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="bg-background/30 p-4 rounded-lg border border-primary/20 flex justify-between items-start"
                  >
                    <div className="space-y-2">
                      <p className="text-white">{strategy.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">
                          {new Date(strategy.date).toLocaleDateString('es-ES')}
                        </span>
                        {strategy.file && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <FileText className="w-4 h-4" />
                            <span>{strategy.file.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeStrategy(strategy.id)}
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}