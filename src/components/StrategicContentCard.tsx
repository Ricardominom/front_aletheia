import React from 'react';
import { Target, TrendingUp, DollarSign, FileText } from 'lucide-react';

export default function StrategicContentCard() {
  const indicators = [
    { type: "CONTENIDOS ESTRATÉGICOS", value: 241, icon: Target, color: "accent-teal" },
    { type: "CONTENIDOS ESTRATÉGICOS REALIZADOS", value: 332, icon: FileText, color: "primary" },
    { type: "META GASTO PAUTA", value: "$375, 000", icon: TrendingUp, color: "accent-pink" },
    { type: "GASTO PAUTA", value: "$235, 180", icon: DollarSign, color: "secondary" }
  ];

  return (
    <div className="glassmorphic-container p-6 h-full animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative z-10">
        DIGITAL
      </h2>
      
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="target-card p-3 flex flex-col items-center justify-center text-center relative group animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            {/* Icon */}
            <div className="relative mb-2">
              <div className={`absolute -inset-1 bg-${indicator.color}/10 rounded-full blur-lg animate-pulse-slow`}></div>
              <div className={`relative bg-${indicator.color}/10 p-1 rounded-full`}>
                <indicator.icon className={`w-4 h-4 text-${indicator.color}`} />
              </div>
            </div>
            
            {/* Value with glow effect */}
            <div className="relative mb-2">
              <div className={`absolute -inset-2 bg-${indicator.color}/10 rounded-full blur-xl animate-pulse-slow`}></div>
              <div className={`relative text-[18px] font-bold text-${indicator.color} leading-none tracking-tight text-neon-strong`}>
                {typeof indicator.value === 'string' && indicator.value.includes('K') ? (
                  <>
                    ${indicator.value}
                  </>
                ) : (
                  indicator.value
                )}
              </div>
            </div>
            
            {/* Label */}
            <div className="text-[8px] text-gray-300 uppercase leading-tight max-w-[90px] group-hover:text-white transition-colors duration-300 text-center">
              {indicator.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}