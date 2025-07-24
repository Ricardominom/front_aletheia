import React, { useEffect, useState } from 'react';
import { useCampaigns } from '../hooks/useCampaign';
import { formatPercentage } from '../utils/data';

export default function CampaignProgress() {
  const { loading } = useCampaigns();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/dashboard/campana')
      .then(res => res.json())
      .then(data => setCampaigns(
        data.map((a: any) => ({
          ...a,
          name: a.campaign,
          progress: a.progress,
          trend: a.trend
        }))
      ));
}, []);

  if (loading) {
    return (
      <div className="glassmorphic-container p-5 animate-scale-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Cargando datos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphic-container p-6 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-card/80 backdrop-blur-md -z-10"></div>
      
      {/* Glowing accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-accent-teal/0 via-accent-teal/30 to-accent-teal/0 blur-sm"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-accent-pink/0 via-accent-pink/30 to-accent-pink/0 blur-sm"></div>
      
      <h2 className="text-lg font-semibold text-white sticky top-0 z-10 text-neon mb-4 tracking-wider">
        PROGRESO DE CAMPAÑAS
      </h2>
      
      {/* Progress Indicators */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {campaigns.map((item, index) => (
          <div 
            key={item.id}
            className="target-card p-4 animate-scale-in hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md -z-10"></div>
            
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${
              item.trend === 'up' ? 'bg-accent-teal' : 'bg-[#F88379]'
            }`}></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className={`text-2xl font-bold leading-none tracking-tight ${
                item.trend === 'up' ? 'text-accent-teal text-neon' : 'text-[#F88379] text-neon'
              }`}>
                {item.progress}%
                <span className={`ml-1 text-lg ${
                  item.trend === 'up' ? 'text-accent-teal/80' : 'text-[#F88379]/80'
                }`}>
                  {item.trend === 'up' ? '▲' : '▼'}
                </span>
              </div>
            </div>
            <div className="text-[11px] text-gray-300 uppercase mt-3 leading-tight font-medium">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bars */}
      <div className="space-y-4">
        {campaigns.map((item, index) => (
          <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center gap-6">
              <div className="w-20 text-xs font-medium text-gray-300 text-right">
                {item.name}
              </div>
              <div className="flex-1 h-4 bg-card/50 rounded-full overflow-hidden relative">
                {/* Progress bar */}
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    item.trend === 'up' ? 'bg-accent-teal' : 'bg-[#F88379]'
                  }`}
                  style={{ width: `${item.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Background grid pattern */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
                  backgroundSize: '5px 5px'
                }}></div>
              </div>
              <div className="w-14 text-right text-xs font-medium text-gray-300">
                {item.progress}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}