import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import DebateModal from './DebateModal';

interface DebateTheme {
  id: string;
  title: string;
  strategy: string;
}

export default function DebateCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themes, setThemes] = useState<DebateTheme[]>([]);

  useEffect(() => {
    fetch('/api/estrategia/debate')
      .then(res => res.json())
      .then(data => setThemes(
        data.map((t: any) => ({
          id: t.id,
          title: t.titulo,
          strategy: t.estrategia,
        }))
      ));
  }, []);

  const handleAddTheme = async (theme: Omit<DebateTheme, 'id'>) => {
    const response = await fetch('/api/estrategia/debate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    });
    if (response.ok) {
      const t = await response.json();
      setThemes([...themes, {
        id: t.id,
        title: t.titulo,
        strategy: t.estrategia,
      }]);
    } else {
      alert('Error al guardar eje temático');
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="h-full glassmorphic-container p-6 cursor-pointer group hover:border-primary/40 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">DEBATE</h3>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-teal/20 rounded-full blur-xl group-hover:bg-accent-teal/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-teal/10 p-2 rounded-full group-hover:bg-accent-teal/20 transition-colors duration-300">
              <MessageSquare className="w-5 h-5 text-accent-teal" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-xs text-gray-400 uppercase">Ejes Temáticos</h4>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100%-6rem)]">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-card/50 rounded-lg p-2 border border-primary/20"
              >
                <div className="text-sm text-white font-medium truncate">{theme.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DebateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        themes={themes}
        onUpdateThemes={(newThemes) => {
          const last = newThemes[newThemes.length - 1];
          if (last && !last.id) {
            handleAddTheme(last);
          }
          setThemes(newThemes);
        }}
      />
    </>
  );
}