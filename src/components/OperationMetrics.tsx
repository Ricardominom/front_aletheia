import React from 'react';
import { useOperationMetrics } from '../hooks/useOperations';
import { formatNumber, formatPercentage } from '../utils/data';

export default function OperationMetrics() {
  const { metrics, loading } = useOperationMetrics();

  if (loading) {
    return (
      <div className="relative">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Cargando métricas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(400px - 1rem)' }}>
        <table className="w-full border-collapse min-w-[1200px]">
          <thead className="sticky top-0 bg-background z-10">
            <tr>
              <th colSpan={3} className="bg-card/50 text-left p-3 text-white text-sm font-medium border-b border-accent-teal/20 backdrop-blur-sm">
                DIGITAL
              </th>
              <th colSpan={2} className="bg-card/50 text-left p-3 text-white text-sm font-medium border-b border-accent-teal/20 backdrop-blur-sm">
                TELEFONÍA
              </th>
              <th colSpan={4} className="bg-card/50 text-left p-3 text-white text-sm font-medium border-b border-accent-teal/20 backdrop-blur-sm">
                AIRE
              </th>
              <th colSpan={3} className="bg-card/50 text-left p-3 text-white text-sm font-medium border-b border-accent-teal/20 backdrop-blur-sm">
                TERRITORIO
              </th>
            </tr>
            <tr className="text-xs uppercase bg-card/50 backdrop-blur-sm">
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">% AVANCE</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">CONTENIDOS</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">IMPRESIONES</th>
              
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">% AVANCE</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">MENSAJES</th>
              
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">% AVANCE</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">CONTENIDOS</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">NOTAS COLOC.</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">IMPACTOS/TIRAJE</th>
              
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">% AVANCE</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">PROMOVIDOS</th>
              <th className="p-3 text-gray-300 font-medium border-b border-accent-teal/20">UTILITARIOS REPARTIDOS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent-teal/10">
            {metrics.map((metric, index) => (
              <tr 
                key={index}
                className="hover:bg-card/50 transition-colors duration-150 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="p-3">
                  <span className={`text-sm font-medium ${metric.progress > 20 ? 'text-accent-teal text-neon' : 'text-accent-pink text-neon'}`}>
                    {formatPercentage(typeof metric.progress === 'number' ? metric.progress : 0)}
                  </span>
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium">
                  {metric.content && typeof metric.content.current === 'number' && typeof metric.content.target === 'number'
                    ? `${formatNumber(metric.content.current)}/${formatNumber(metric.content.target)}`
                    : '—'}
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium whitespace-nowrap">
                  {metric.impressions && typeof metric.impressions.current === 'number' && typeof metric.impressions.target === 'number'
                    ? `${formatNumber(metric.impressions.current)}/${formatNumber(metric.impressions.target)}`
                    : '—'}
                </td>
                <td className="p-3">
                  <span className={`text-sm font-medium ${metric.progress > 20 ? 'text-accent-teal text-neon' : 'text-accent-pink text-neon'}`}>
                    {formatPercentage(typeof metric.progress === 'number' ? metric.progress : 0)}
                  </span>
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium whitespace-nowrap">
                  {metric.impressions && typeof metric.impressions.current === 'number' && typeof metric.impressions.target === 'number'
                    ? `${formatNumber(metric.impressions.current)}/${formatNumber(metric.impressions.target)}`
                    : '—'}
                </td>
                <td className="p-3">
                  <span className={`text-sm font-medium ${metric.progress > 20 ? 'text-accent-teal text-neon' : 'text-accent-pink text-neon'}`}>
                    {formatPercentage(typeof metric.progress === 'number' ? metric.progress : 0)}
                  </span>
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium">
                  {metric.content && typeof metric.content.current === 'number' && typeof metric.content.target === 'number'
                    ? `${formatNumber(metric.content.current)}/${formatNumber(metric.content.target)}`
                    : '—'}
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium">
                  {metric.content && typeof metric.content.current === 'number' && typeof metric.content.target === 'number'
                    ? `${formatNumber(metric.content.current)}/${formatNumber(metric.content.target)}`
                    : '—'}
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium whitespace-nowrap">
                  {metric.impressions && typeof metric.impressions.current === 'number' && typeof metric.impressions.target === 'number'
                    ? `${formatNumber(metric.impressions.current)}/${formatNumber(metric.impressions.target)}`
                    : '—'}
                </td>
                <td className="p-3">
                  <span className={`text-sm font-medium ${metric.progress > 20 ? 'text-accent-teal text-neon' : 'text-accent-pink text-neon'}`}>
                    {formatPercentage(typeof metric.progress === 'number' ? metric.progress : 0)}
                  </span>
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium">
                  {metric.content && typeof metric.content.current === 'number' && typeof metric.content.target === 'number'
                    ? `${formatNumber(metric.content.current)}/${formatNumber(metric.content.target)}`
                    : '—'}
                </td>
                <td className="p-3 text-gray-300 text-sm font-medium">
                  {metric.content && typeof metric.content.current === 'number' && typeof metric.content.target === 'number'
                    ? `${formatNumber(metric.content.current)}/${formatNumber(metric.content.target)}`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}