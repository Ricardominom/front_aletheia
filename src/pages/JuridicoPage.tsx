import React, { useState } from 'react';
import { Upload, FolderPlus, Folder, FileText, X } from 'lucide-react';
import FileViewerModal from '../components/juridico/FileViewerModal';
import FolderContentsModal from '../components/juridico/FolderContentsModal';

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

interface FileUploadFormProps {
  onSubmit: (formData: FormData) => void;
  title: string;
  multiple?: boolean;
}

function FileUploadForm({ onSubmit, title, multiple = false }: FileUploadFormProps) {
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('fileName', fileName);
      formData.append('description', description);
      onSubmit(formData);
      
      setFileName('');
      setDescription('');
      setSelectedFiles([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full bg-card/50 border border-primary/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40"
          placeholder="Nombre de la carpeta"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-card/50 border border-primary/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40 resize-none"
          placeholder="Descripción"
          rows={2}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
            {/* File Upload Button - Always visible */}
            <div className="relative mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple={multiple}
              />
              <div className="h-20 bg-background/50 border border-primary/20 rounded-lg flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 mb-1 text-gray-400" />
                <span className="text-sm text-center text-gray-400">
                  {multiple ? 'Arrastre o seleccione archivos' : 'Arrastre o seleccione un archivo'}
                </span>
              </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background/50 rounded-lg p-2"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-300 truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={selectedFiles.length === 0}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedFiles.length > 0
              ? 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              : 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>Crear Carpeta</span>
        </button>
      </div>
    </form>
  );
}

function FolderGrid({ folders, onFolderClick }: { folders: Folder[], onFolderClick: (folder: Folder) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onFolderClick(folder)}
          className="bg-card/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <Folder className="w-5 h-5 text-primary group-hover:text-primary/80" />
            <h3 className="text-white font-medium truncate">{folder.name}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{folder.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-xs">{new Date(folder.date).toLocaleDateString('es-MX')}</p>
            {folder.files.length > 0 && (
              <span className="text-xs text-primary">
                {folder.files.length} archivo{folder.files.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function JuridicoPage() {
  const [activeTab, setActiveTab] = useState('contratos');
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ file: File; name: string } | null>(null);
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: '1',
      name: 'Contrato de Servicios',
      description: 'Documentación relacionada con contratos de servicios generales',
      date: '2025-03-22',
      type: 'contratos',
      files: []
    },
    {
      id: '2',
      name: 'Expediente de Defensa 001',
      description: 'Documentación de expedientes de defensa del primer trimestre',
      date: '2025-03-23',
      type: 'expedientes-defensa',
      files: []
    },
    {
      id: '3',
      name: 'Expediente de Ofensiva 2025-001',
      description: 'Expediente de ofensiva del caso principal',
      date: '2025-03-24',
      type: 'expedientes-ofensiva',
      files: []
    }
  ]);

  const handleFileUpload = (formData: FormData) => {
    const files = formData.getAll('files') as File[];
    const newFolder: Folder = {
      id: Date.now().toString(),
      name: formData.get('fileName') as string,
      description: formData.get('description') as string,
      date: new Date().toISOString(),
      type: activeTab as 'contratos' | 'expedientes-defensa' | 'expedientes-ofensiva',
      files: files.map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        file: file,
        uploadDate: new Date().toISOString()
      }))
    };
    
    setFolders([...folders, newFolder]);
  };

  const handleAddFiles = (folderId: string, newFiles: FolderFile[]) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        const updatedFolder = {
          ...folder,
          files: [...folder.files, ...newFiles]
        };
        // Update the selected folder if it's currently open
        if (selectedFolder?.id === folder.id) {
          setSelectedFolder(updatedFolder);
        }
        return updatedFolder;
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  const tabs = [
    { id: 'contratos', label: 'Contratos' },
    { id: 'expedientes-defensa', label: 'Expedientes de Defensa' },
    { id: 'expedientes-ofensiva', label: 'Expedientes de Ofensiva' }
  ];

  const filteredFolders = folders.filter(folder => folder.type === activeTab);

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Base de Datos Jurídica</h1>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-card/50 p-1 rounded-lg mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="glassmorphic-container p-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              {activeTab === 'contratos' && 'Subir Contrato'}
              {activeTab === 'expedientes-defensa' && 'Subir Expediente de Defensa'}
              {activeTab === 'expedientes-ofensiva' && 'Subir Expediente de Ofensiva'}
            </h2>
            <FileUploadForm 
              onSubmit={handleFileUpload} 
              title={activeTab} 
              multiple={activeTab !== 'contratos'}
            />
            
            {/* Display folders */}
            {filteredFolders.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-white mt-8 mb-4">Carpetas Creadas</h3>
                <FolderGrid 
                  folders={filteredFolders} 
                  onFolderClick={(folder) => {
                    if (folder.type === 'contratos') {
                      if (folder.files[0]) {
                        setSelectedFile({ file: folder.files[0].file, name: folder.files[0].name });
                      }
                    } else {
                      setSelectedFolder(folder);
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        file={selectedFile?.file}
        fileName={selectedFile?.name || ''}
      />

      {/* Folder Contents Modal */}
      <FolderContentsModal
        isOpen={!!selectedFolder}
        onClose={() => setSelectedFolder(null)}
        folder={selectedFolder}
        onFileView={(file, fileName) => {
          setSelectedFile({ file, name: fileName });
          setSelectedFolder(null);
        }}
        onAddFiles={handleAddFiles}
      />
    </div>
  );
}