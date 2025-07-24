import React from 'react';
import { X } from 'lucide-react';

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file?: File;
  fileName: string;
}

export default function FileViewerModal({ isOpen, onClose, file, fileName }: FileViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-4xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <h3 className="text-xl font-semibold text-white text-neon">{fileName}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {file ? (
            file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt={fileName}
                className="w-full h-auto rounded-lg"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
              />
            ) : (
              <iframe
                src={URL.createObjectURL(file)}
                className="w-full h-[600px] rounded-lg border border-primary/20"
                title={fileName}
              />
            )
          ) : (
            <div className="text-center text-gray-400">
              No se pudo cargar el archivo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}