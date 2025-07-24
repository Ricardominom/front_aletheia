import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDashboardStore } from '../store/dashboardStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BudgetTimelineProps {
  title: string;
}

export default function BudgetTimeline({ title }: BudgetTimelineProps) {
  const { timeline, _hasHydrated } = useDashboardStore(state => ({
    timeline: state.timeline,
    _hasHydrated: state._hasHydrated
  }));

  const data = {
    labels: timeline.map(item => item.week),
    datasets: [
      {
        label: 'Planeado',
        data: timeline.map(item => item.planned),
        borderColor: '#14B8A6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        pointRadius: 3,
        pointBackgroundColor: '#14B8A6',
        tension: 0.4,
        borderWidth: 2,
        order: 2,
        fill: true,
      },
      {
        label: 'Ejercido',
        data: timeline.map(item => item.executed),
        borderColor: '#F88379',
        backgroundColor: 'rgba(248, 131, 121, 0.1)',
        pointRadius: 3,
        pointBackgroundColor: '#F88379',
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
        order: 1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 10,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(10, 26, 30, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(20, 184, 166, 0.2)',
        borderWidth: 1,
        padding: 8,
        bodyFont: {
          size: 11,
        },
        titleFont: {
          size: 12,
          weight: 'bold',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(20, 184, 166, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 9,
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          color: 'rgba(20, 184, 166, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 10,
          },
          padding: 6,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="glassmorphic-container p-6 h-full relative animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F88379]/10 rounded-full blur-3xl"></div>

      <div className="absolute -inset-[100px] bg-gradient-to-b from-background/0 via-primary/5 to-background/0 blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm rounded-lg p-1 border border-primary/20">
        <div className="text-error text-sm font-bold leading-none">-1.91%</div>
        <div className="text-gray-400 text-[8px] uppercase mt-0.5 max-w-[100px] leading-tight">
          Varianza en el ejercicio de avance de campaña
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-accent-teal/0 via-accent-teal/30 to-accent-teal/0 blur-sm">
        
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-4 text-neon relative z-10">{title}</h3>
      
      <div className="h-[calc(100%-4rem)] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-[#F88379]/5"></div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}