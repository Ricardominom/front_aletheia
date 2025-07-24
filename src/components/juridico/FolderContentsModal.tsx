import React, { useState } from 'react';
import { X, FileText, Download, Eye, Upload, Plus } from 'lucide-react';

interface FolderFile {
  id: string;
  name: string;
  file: File;
  uploadDate: string;
}

interface Folder {
  id: string;
  name: string;
  description: string;
  date: string;
  type: 'contratos' | 'expedientes-defensa' | 'expedientes-ofensiva';
  files: FolderFile[];
}

interface FolderContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: Folder | null;
  onFileView: (file: File, fileName: string) => void;
  onAddFiles?: (folderId: string, files: FolderFile[]) => void;
}

export default function FolderContentsModal({ 
  isOpen, 
  onClose, 
  folder,
  onFileView,
  onAddFiles
}: FolderContentsModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  if (!isOpen || !folder) return null;

  const handleDownload = (file: File, fileName: string) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleAddFiles = () => {
    if (selectedFiles.length > 0 && onAddFiles && folder) {
      const newFiles: FolderFile[] = selectedFiles.map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        file: file,
        uploadDate: new Date().toISOString()
      }));
      
      onAddFiles(folder.id, newFiles);
      setSelectedFiles([]);
    }
  };

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
          <div>
            <h3 className="text-xl font-semibold text-white text-neon">{folder.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{folder.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Add Files Section - Always visible for defense and offensive folders */}
          {folder.type !== 'contratos' && (
            <div className="mb-6">
              <div className="bg-background/50 border border-primary/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Agregar Archivos</h4>
                
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    multiple
                  />
                  <div className="h-24 bg-card/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                    {selectedFiles.length > 0 ? (
                      <div className="text-center">
                        <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="text-primary">
                          {selectedFiles.length} archivo{selectedFiles.length !== 1 ? 's' : ''} seleccionado{selectedFiles.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-400">Arrastre o seleccione archivos</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddFiles}
                  disabled={selectedFiles.length === 0}
                  className={`w-full mt-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedFiles.length > 0
                      ? 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
                      : 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Archivos</span>
                </button>
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="space-y-4">
            {folder.files.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No hay archivos en esta carpeta
              </div>
            ) : (
              <div className="space-y-2">
                {folder.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-background/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{file.name}</h4>
                        <p className="text-sm text-gray-400">
                          {new Date(file.uploadDate).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onFileView(file.file, file.name)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300 group"
                        title="Ver archivo"
                      >
                        <Eye className="w-5 h-5 text-primary group-hover:text-primary/80" />
                      </button>
                      <button
                        onClick={() => handleDownload(file.file, file.name)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300 group"
                        title="Descargar archivo"
                      >
                        <Download className="w-5 h-5 text-primary group-hover:text-primary/80" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}