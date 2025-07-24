import React from 'react';
import { X } from 'lucide-react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ModalWrapper({ isOpen, onClose, onSubmit, title, children }: ModalWrapperProps) {
  if (!isOpen) return null;

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
          {children}
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
            onClick={onSubmit}
            className="px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 text-neon"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}