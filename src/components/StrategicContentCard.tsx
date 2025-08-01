import React from 'react';
import { Target, TrendingUp, DollarSign, FileText } from 'lucide-react';

export default function StrategicContentCard() {
  return (
    <div className="glassmorphic-container p-6 h-full animate-scale-in relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-xl font-semibold text-white mb-6 text-neon relative z-10">
        CONTENIDOS ESTRATÉGICOS
        <div className="absolute left-0 -bottom-2 h-0.5 w-20 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>
      
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-5rem)] relative z-10">
        {/* Contenidos Estratégicos Meta */}
        <div className="target-card p-4 flex flex-col items-center justify-center text-center relative group animate-scale-in hover:scale-105 transition-transform duration-300">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-teal rounded-t-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-accent-teal/20 rounded-full blur-lg animate-pulse-slow"></div>
            <div className="relative bg-accent-teal/10 p-2 rounded-full">
              <Target className="w-6 h-6 text-accent-teal" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-accent-teal/15 rounded-lg blur-lg"></div>
            <div className="relative text-3xl font-bold text-accent-teal leading-none tracking-tight text-neon animate-float">
              241
            </div>
          </div>
          
          {/* Label */}
          <div className="text-xs text-gray-300 uppercase leading-tight font-medium group-hover:text-white transition-colors duration-300 text-center">
            Meta
            <div className="text-[10px] text-gray-400 normal-case mt-1 group-hover:text-gray-300 transition-colors duration-300">
              Contenidos Estratégicos
            </div>
          </div>
        </div>

        {/* Contenidos Estratégicos Realizados */}
        <div className="target-card p-4 flex flex-col items-center justify-center text-center relative group animate-scale-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '100ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse-slow"></div>
            <div className="relative bg-primary/10 p-2 rounded-full">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-primary/15 rounded-lg blur-lg"></div>
            <div className="relative text-3xl font-bold text-primary leading-none tracking-tight text-neon animate-float">
              332
            </div>
          </div>
          
          {/* Label */}
          <div className="text-xs text-gray-300 uppercase leading-tight font-medium group-hover:text-white transition-colors duration-300 text-center">
            Realizados
            <div className="text-[10px] text-gray-400 normal-case mt-1 group-hover:text-gray-300 transition-colors duration-300">
              Contenidos Estratégicos
            </div>
          </div>
        </div>

        {/* Meta Gasto Pauta */}
        <div className="target-card p-4 flex flex-col items-center justify-center text-center relative group animate-scale-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '200ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-pink rounded-t-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-accent-pink/20 rounded-full blur-lg animate-pulse-slow"></div>
            <div className="relative bg-accent-pink/10 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-accent-pink" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-accent-pink/15 rounded-lg blur-lg"></div>
            <div className="relative text-2xl font-bold text-accent-pink leading-none tracking-tight text-neon animate-float">
              $375K
            </div>
          </div>
          
          {/* Label */}
          <div className="text-xs text-gray-300 uppercase leading-tight font-medium group-hover:text-white transition-colors duration-300 text-center">
            Meta Pauta
            <div className="text-[10px] text-gray-400 normal-case mt-1 group-hover:text-gray-300 transition-colors duration-300">
              Gasto en Publicidad
            </div>
          </div>
        </div>

        {/* Gasto Pauta */}
        <div className="target-card p-4 flex flex-col items-center justify-center text-center relative group animate-scale-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '300ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-t-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-secondary/20 rounded-full blur-lg animate-pulse-slow"></div>
            <div className="relative bg-secondary/10 p-2 rounded-full">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-secondary/15 rounded-lg blur-lg"></div>
            <div className="relative text-2xl font-bold text-secondary leading-none tracking-tight text-neon animate-float">
              $235K
            </div>
          </div>
          
          {/* Label */}
          <div className="text-xs text-gray-300 uppercase leading-tight font-medium group-hover:text-white transition-colors duration-300 text-center">
            Gasto Actual
            <div className="text-[10px] text-gray-400 normal-case mt-1 group-hover:text-gray-300 transition-colors duration-300">
              Publicidad Ejecutada
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrategicContentCard