import React, { useState } from 'react';
import { Plus, BarChart3, Calendar, TrendingUp, Users, Trash2 } from 'lucide-react';
import EncuestaModal from '../components/encuestas/EncuestaModal';
import EncuestasTable from '../components/encuestas/EncuestasTable';

export default function EncuestasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glassmorphic-container p-6 animate-scale-in">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
            <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white text-neon">
                    Encuestas
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {/* {encuestas.length} encuesta{encuestas.length !== 1 ? 's' : ''} registrada{encuestas.length !== 1 ? 's' : ''} */}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Agregar Encuesta</span>
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* {encuestas.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No hay encuestas registradas</h3>
                  <p className="text-gray-400 mb-6">Crea la primera encuesta para comenzar el seguimiento</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Encuesta</span>
                  </button>
                </div>
              ) : ( */}
                <EncuestasTable />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      <EncuestaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
      />
    </>
  );
}