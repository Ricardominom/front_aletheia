import React, { useState } from 'react';
import { PlusCircle, Target, TrendingUp, DollarSign } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Income {
  id: string;
  title: string;
  concept: string;
  amount: number;
  date: string;
}

export default function FinanzasPage() {
  const [targetAmount, setTargetAmount] = useState('');
  const [savedTarget, setSavedTarget] = useState<number | null>(null);
  const [incomeTitle, setIncomeTitle] = useState('');
  const [incomeConcept, setIncomeConcept] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomes, setIncomes] = useState<Income[]>([]);
  const chartRef = React.useRef<ChartJS | null>(null);

  const accumulatedAmount = incomes.reduce((sum, income) => sum + income.amount, 0);
  const remainingAmount = savedTarget ? savedTarget - accumulatedAmount : 0;
  const progressPercentage = savedTarget ? (accumulatedAmount / savedTarget) * 100 : 0;

  const handleSaveTarget = () => {
    if (targetAmount) {
      setSavedTarget(parseFloat(targetAmount));
      setTargetAmount('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIncome: Income = {
      id: Date.now().toString(),
      title: incomeTitle,
      concept: incomeConcept,
      amount: parseFloat(incomeAmount),
      date: new Date().toISOString(),
    };

    setIncomes([...incomes, newIncome]);
    setIncomeTitle('');
    setIncomeConcept('');
    setIncomeAmount('');
  };

  const chartData = {
    labels: incomes.map(income => new Date(income.date).toLocaleDateString('es-MX')),
    datasets: [
      {
        label: 'Ingresos Individuales',
        data: incomes.map(income => income.amount),
        borderColor: '#6B8EE7',
        backgroundColor: 'rgba(107, 142, 231, 0.5)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6B8EE7',
      },
      {
        label: 'Ingresos Acumulados',
        data: incomes.map((_, index) => {
          return incomes
            .slice(0, index + 1)
            .reduce((sum, income) => sum + income.amount, 0);
        }),
        borderColor: '#3E9B9B',
        backgroundColor: 'rgba(62, 155, 155, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#3E9B9B',
      },
      {
        label: 'Meta',
        data: Array(Math.max(1, incomes.length)).fill(savedTarget || 0),
        borderColor: '#F88379',
        borderDash: [5, 5],
        tension: 0,
        fill: false,
        pointRadius: 0,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(10, 26, 30, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(62, 155, 155, 0.2)',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context: any) {
            return `$ ${context.parsed.y.toLocaleString('es-MX')}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(62, 155, 155, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(62, 155, 155, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: function(value: any) {
            return `$ ${value.toLocaleString('es-MX')}`;
          }
        },
        min: 0,
        max: Math.max(savedTarget || 0, ...incomes.map((_, index) => 
          incomes
            .slice(0, index + 1)
            .reduce((sum, income) => sum + income.amount, 0)
        )) * 1.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-[1920px] mx-auto space-y-8">
        {/* Top Forms in a grid */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 1. Target Amount Form or Widget */}
          <div className="glassmorphic-container p-6">
            {savedTarget ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Meta de Recaudación</h2>
                  <button
                    onClick={() => setSavedTarget(null)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Editar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-400">Meta</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      ${savedTarget.toLocaleString('es-MX')}
                    </div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-accent-teal" />
                      <span className="text-sm text-gray-400">Acumulado</span>
                    </div>
                    <div className="text-xl font-bold text-accent-teal">
                      ${accumulatedAmount.toLocaleString('es-MX')}
                    </div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-accent-pink" />
                      <span className="text-sm text-gray-400">Restante</span>
                    </div>
                    <div className="text-xl font-bold text-accent-pink">
                      ${remainingAmount.toLocaleString('es-MX')}
                    </div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-400">Progreso</span>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {progressPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className="h-2 bg-card/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white mb-4">Cifra Objetivo de Recaudación</h2>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="flex-1 bg-card/50 border border-primary/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40"
                    placeholder="Ingrese la cifra objetivo"
                  />
                  <button 
                    onClick={handleSaveTarget}
                    className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    Guardar
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 2. Income Form */}
          <div className="glassmorphic-container p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Agregar Ingreso</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={incomeTitle}
                  onChange={(e) => setIncomeTitle(e.target.value)}
                  className="flex-1 bg-card/50 border border-primary/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40"
                  placeholder="Título"
                  required
                />
                <input
                  type="number"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  className="w-32 bg-card/50 border border-primary/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40"
                  placeholder="Monto"
                  required
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={incomeConcept}
                  onChange={(e) => setIncomeConcept(e.target.value)}
                  className="flex-1 bg-card/50 border border-primary/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary/40"
                  placeholder="Concepto"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group whitespace-nowrap"
                >
                  <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Agregar</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Timeline Chart and Income List */}
        <div className="grid grid-cols-12 gap-6">
          {/* Timeline Chart */}
          <div className="col-span-8 glassmorphic-container p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Línea de Tiempo de Ingresos</h2>
              <div className="flex items-center gap-3 bg-card/50 px-4 py-2 rounded-lg border border-primary/20">
                <TrendingUp className="w-5 h-5 text-accent-teal" />
                <div>
                  <div className="text-sm text-gray-400">Monto Acumulado</div>
                  <div className="text-xl font-bold text-accent-teal">
                    $ {accumulatedAmount.toLocaleString('es-MX')}
                  </div>
                  {savedTarget && (
                    <div className="text-xs text-gray-400">
                      {progressPercentage.toFixed(1)}% del objetivo
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <Line 
                data={chartData} 
                options={chartOptions} 
                ref={chartRef}
              />
            </div>
          </div>

          {/* Income List */}
          <div className="col-span-4 glassmorphic-container p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Ingresos Registrados</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {incomes.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  No hay ingresos registrados
                </div>
              ) : (
                incomes.map((income) => (
                  <div
                    key={income.id}
                    className="bg-card/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors"
                  >
                    <h3 className="text-white font-medium mb-2">{income.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{income.concept}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-medium">
                        ${income.amount.toLocaleString('es-MX')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(income.date).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}