import React from 'react';
import { Target, TrendingUp, DollarSign, FileText } from 'lucide-react';

export default function StrategicContentCard() {
  return (
    <div className="glassmorphic-container p-6 h-full animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative z-10">
        CONTENIDOS ESTRATÉGICOS
      </h2>
      
      <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
        {/* Contenidos Estratégicos Meta */}
        <div className="target-card p-6 flex flex-col items-center justify-center text-center relative group animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-accent-teal/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative bg-accent-teal/10 p-3 rounded-full">
              <Target className="w-8 h-8 text-accent-teal" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-accent-teal/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative text-[36px] font-bold text-white leading-none tracking-tight text-neon-strong">
              241
            </div>
          </div>
          
          {/* Label */}
          <div className="text-[9px] text-gray-300 uppercase leading-tight max-w-[120px] group-hover:text-white transition-colors duration-300 text-center">
            CONTENIDOS ESTRATÉGICOS META
          </div>
        </div>

        {/* Contenidos Estratégicos Realizados */}
        <div className="target-card p-6 flex flex-col items-center justify-center text-center relative group animate-scale-in" style={{ animationDelay: '100ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative bg-primary/10 p-3 rounded-full">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative text-[36px] font-bold text-white leading-none tracking-tight text-neon-strong">
              332
            </div>
          </div>
          
          {/* Label */}
          <div className="text-[9px] text-gray-300 uppercase leading-tight max-w-[120px] group-hover:text-white transition-colors duration-300 text-center">
            CONTENIDOS ESTRATÉGICOS REALIZADOS
          </div>
        </div>

        {/* Meta Gasto Pauta */}
        <div className="target-card p-6 flex flex-col items-center justify-center text-center relative group animate-scale-in" style={{ animationDelay: '200ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-accent-pink/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative bg-accent-pink/10 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-accent-pink" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-accent-pink/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative text-[24px] font-bold text-white leading-none tracking-tight text-neon-strong">
              375,000
            </div>
          </div>
          
          {/* Label */}
          <div className="text-[9px] text-gray-300 uppercase leading-tight max-w-[120px] group-hover:text-white transition-colors duration-300 text-center">
            META GASTO PAUTA
          </div>
        </div>

        {/* Gasto Pauta */}
        <div className="target-card p-6 flex flex-col items-center justify-center text-center relative group animate-scale-in" style={{ animationDelay: '300ms' }}>
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Icon */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative bg-secondary/10 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-secondary" />
            </div>
          </div>
          
          {/* Value with glow effect */}
          <div className="relative mb-3">
            <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="relative text-[24px] font-bold text-white leading-none tracking-tight text-neon-strong">
              235,180
            </div>
          </div>
          
          {/* Label */}
          <div className="text-[9px] text-gray-300 uppercase leading-tight max-w-[120px] group-hover:text-white transition-colors duration-300 text-center">
            GASTO PAUTA
          </div>
        </div>
      </div>
    </div>
  );
}