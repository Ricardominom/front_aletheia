import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import SpokespersonModal from './SpokespersonModal';

interface Spokesperson {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function SpokespersonCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spokespersons, setSpokespersons] = useState<Spokesperson[]>([]);

  useEffect(() => {
    fetch('/api/comunicacion/voceros')
      .then(res => res.json())
      .then(data => setSpokespersons(
        data.map((s: any) => ({
          id: s.id,
          name: s.nombre,
          email: s.email,
          phone: s.telefono,
        }))
      ));
  }, []);

  const handleAddSpokesperson = async (newSpokesperson: Omit<Spokesperson, 'id'>) => {
    const response = await fetch('/api/comunicacion/voceros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpokesperson),
    });
    if (response.ok) {
      const s = await response.json();
      setSpokespersons([...spokespersons, {
        id: s.id,
        name: s.nombre,
        email: s.email,
        phone: s.telefono,
      }]);
    } else {
      alert('Error al guardar vocero');
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Voceros</h3>
            <p className="text-gray-400 text-base">Número de voceros registrados</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-pink/20 rounded-full blur-xl group-hover:bg-accent-pink/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-pink/10 p-5 rounded-full group-hover:bg-accent-pink/20 transition-colors duration-300">
              <Users className="w-12 h-12 text-accent-pink" />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-6xl font-bold text-accent-pink text-neon animate-float">
            {spokespersons.length}
          </div>
        </div>
      </div>

      <SpokespersonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        spokespersons={spokespersons}
        onAddSpokesperson={handleAddSpokesperson}
      />
    </>
  );
}