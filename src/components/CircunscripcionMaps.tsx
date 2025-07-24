import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Map } from 'lucide-react';

const CIRCUMSCRIPTION_MAPS = [
  {
    id: 20,
    url: 'https://raw.githubusercontent.com/Esporadix-team/imagenes_logos/refs/heads/main/AletheiaMapsImages/CIRCUNSCRIPCION%20-%2020.png',
    title: 'CIRCUNSCRIPCIÓN 20'
  },
  {
    id: 21,
    url: 'https://raw.githubusercontent.com/Esporadix-team/imagenes_logos/refs/heads/main/AletheiaMapsImages/CIRCUNSCRIPCION%20-%2021.png',
    title: 'CIRCUNSCRIPCIÓN 21'
  },
  {
    id: 22,
    url: 'https://raw.githubusercontent.com/Esporadix-team/imagenes_logos/refs/heads/main/AletheiaMapsImages/CIRCUNSCRIPCION%20-%2022.png',
    title: 'CIRCUNSCRIPCIÓN 22'
  },
  {
    id: 23,
    url: 'https://raw.githubusercontent.com/Esporadix-team/imagenes_logos/refs/heads/main/AletheiaMapsImages/CIRCUNSCRIPCION%20-%2023.png',
    title: 'CIRCUNSCRIPCIÓN 23'
  }
];

export default function CircunscripcionMaps() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === CIRCUMSCRIPTION_MAPS.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? CIRCUMSCRIPTION_MAPS.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === CIRCUMSCRIPTION_MAPS.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentMap = CIRCUMSCRIPTION_MAPS[currentIndex];

  return (
    <div className="glassmorphic-container p-5 h-[480px] overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-white text-neon relative">
            MAPAS DE CIRCUNSCRIPCIÓN
            <div className="absolute left-0 -bottom-1 h-0.5 w-12 bg-gradient-to-r from-primary via-accent-teal to-primary rounded-full"></div>
          </h2>
          <p className="text-xs text-gray-400 mt-1">{currentMap.title}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Map className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs text-gray-400">
            {currentIndex + 1} / {CIRCUMSCRIPTION_MAPS.length}
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[400px] rounded-lg overflow-hidden group">
        {/* Background for image container */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md"></div>
        
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4 text-primary" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-1">
          <div className="relative w-full h-full max-w-none">
            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-teal/10 rounded-lg animate-pulse"></div>
            
            {/* Map Image */}
            <img
              src={currentMap.url}
              alt={currentMap.title}
              className="w-full h-full object-contain rounded-lg"
              onLoad={(e) => {
                // Hide loading placeholder when image loads
                const target = e.target as HTMLImageElement;
                const placeholder = target.previousElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'none';
                }
              }}
            />

            {/* Image overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {CIRCUMSCRIPTION_MAPS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-4'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute top-2 right-2 z-20">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-1.5 border border-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}