import {useState, useEffect} from 'react';

export default function OperationProgress() {
  
  const [operationProgress, setOperationProgress] = useState<any[]>([]);

  useEffect(() => {
      fetch('/api/dashboard/operacion')
        .then(res => res.json())
        .then(data => setOperationProgress(
          data.map((a: any) => ({
            ...a,
            progress: a.progress,
            delay: a.delay,
            campaign: a.campaign
          }))
        ));
  }, []);


  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white sticky top-0 bg-background py-2 z-10 text-neon relative">
        AVANCE GENERAL DE LA OPERACIÓN
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>
      
      <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(400px - 4rem)' }}>
        {operationProgress.map((campaign, index) => {
          const remaining = 100 - campaign.progress - campaign.delay;
          
          return (
            <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">MICROCAMPAÑA {campaign.campaign}</span>
                <span className="text-sm font-medium text-accent-teal text-neon">{campaign.progress}%</span>
              </div>
              
              <div className="h-2 rounded-full overflow-hidden flex bg-card/50 border border-accent-teal/20 relative">
                {/* Progress section - Teal */}
                <div 
                  className="h-full bg-accent-teal transition-all duration-300 relative"
                  style={{ width: `${campaign.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Delay section - Pink */}
                <div 
                  className="h-full bg-accent-pink transition-all duration-300 relative"
                  style={{ width: `${campaign.delay}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Remaining section with grid pattern */}
                <div 
                  className="h-full transition-all duration-300 relative"
                  style={{ width: `${remaining}%` }}
                >
                  <div className="absolute inset-0 bg-white/5"></div>
                  <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
                    backgroundSize: '5px 5px'
                  }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}