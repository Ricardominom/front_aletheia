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
  const [isZoomed, setIsZoomed] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === CIRCUMSCRIPTION_MAPS.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000);

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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setIsAutoPlaying(false); // Pause auto-play when zooming
  };

  return (
    <div className="glassmorphic-container p-1 h-[480px] overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-center mb-2 relative">
        <h2 className="text-base font-semibold text-white text-neon text-center">
          Cochabamba - {currentMap.title}
        </h2>
        
        <div className="absolute right-0 flex items-center gap-3">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Map className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-bold text-primary">
            {currentIndex + 1} / {CIRCUMSCRIPTION_MAPS.length}
          </span>
        </div>
      </div>

      {/* Carousel Container with Zoom */}
      <div className={`relative h-[440px] rounded-lg overflow-hidden group ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
        {/* Background for image container */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md"></div>
        
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div 
            className={`relative w-full h-full transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            onClick={toggleZoom}
          >
            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-teal/10 rounded-lg animate-pulse"></div>
            
            {/* Map Image */}
            <img
              src={currentMap.url}
              alt={currentMap.title}
              className={`w-full h-full object-contain transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {CIRCUMSCRIPTION_MAPS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Zoom indicator */}
        {isZoomed && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 border border-primary/20">
              <span className="text-xs text-primary font-medium">Zoom</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}