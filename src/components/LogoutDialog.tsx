import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutDialog({ isOpen, onClose, onConfirm }: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="relative glassmorphic-container p-6 w-full max-w-sm mx-4 animate-scale-in">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
        <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          {/* Icon Container */}
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12 bg-card/50 rounded-full flex items-center justify-center border border-accent-teal/30">
              <div className="absolute inset-0 bg-gradient-radial from-accent-teal/20 to-transparent rounded-full blur-md animate-pulse-slow"></div>
              <LogOut className="w-6 h-6 text-accent-teal" />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-white text-center mb-2 text-neon">
            Cerrar Sesión
          </h3>
          <p className="text-gray-300 text-center mb-6">
            ¿Estás seguro que deseas cerrar la sesión?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-card/50 border border-accent-teal/20 rounded-lg text-gray-300 hover:text-white hover:border-accent-teal/40 transition-all duration-300 backdrop-blur-sm"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-accent-teal/10 border border-accent-teal/50 rounded-lg text-accent-teal hover:bg-accent-teal/20 transition-all duration-300 text-neon backdrop-blur-sm"
            >
              Confirmar
            </button>
          </div>
        </div>

        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-teal/40 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-pink/40 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-teal/40 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-pink/40 rounded-br-lg"></div>
      </div>
    </div>
  );
}