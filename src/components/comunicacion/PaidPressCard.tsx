import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import PaidPressModal from './PaidPressModal';

interface PaidPress {
  id: string;
  title: string;
  url: string;
  media: string;
  imageUrl: string;
  description?: string;
  domain?: string;
}

export default function PaidPressCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paidPress, setPaidPress] = useState<PaidPress[]>([]);

  useEffect(() => {
    fetch('/api/comunicacion/prensa-pagada')
      .then(res => res.json())
      .then(data => setPaidPress(
        data.map((p: any) => ({
          id: p.id,
          title: p.titulo,
          url: p.url,
          media: p.medio,
          imageUrl: p.imagen_url,
          description: p.descripcion,
          domain: p.dominio,
        }))
      ));
  }, []);

  const handleAddPress = async (newPress: Omit<PaidPress, 'id'>) => {
    const response = await fetch('/api/comunicacion/prensa-pagada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPress),
    });
    if (response.ok) {
      const p = await response.json();
      setPaidPress([...paidPress, {
        id: p.id,
        title: p.titulo,
        url: p.url,
        media: p.medio,
        imageUrl: p.imagen_url,
        description: p.descripcion,
        domain: p.dominio,
      }]);
    } else {
      alert('Error al guardar nota de prensa');
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
            <h3 className="text-2xl font-semibold text-white">Prensa Pagada</h3>
            <p className="text-gray-400 text-base">Total de notas colocadas</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"></div>
            <div className="relative bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <Newspaper className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-6xl font-bold text-primary text-neon animate-float">
            {paidPress.length}
          </div>
        </div>
      </div>

      <PaidPressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paidPress={paidPress}
        onAddPress={handleAddPress}
      />
    </>
  );
}