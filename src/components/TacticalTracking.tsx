import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTacticalData } from "../hooks/useTactical";
import { formatPercentage, formatDate } from "../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface MetricCardProps {
  value: string;
  label: string;
  sublabel: string;
  trend: "up" | "down";
  color: "teal" | "pink";
}

function MetricCard({ value, label, sublabel, trend, color }: MetricCardProps) {
  return (
    <div className={`target-card p-4 group animate-scale-in`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
          color === "teal" ? "bg-accent-teal" : "bg-accent-pink"
        }`}
      ></div>

      <div className="flex items-baseline gap-1">
        <div
          className={`text-[48px] font-bold ${
            color === "teal"
              ? "text-accent-teal text-neon"
              : "text-accent-pink text-neon"
          } leading-none tracking-tight animate-float`}
        >
          {value}
          <span className="text-[32px]">%</span>
          <span
            className={`text-xl ml-2 ${
              trend === "up" ? "text-accent-teal" : "text-accent-pink"
            }`}
          >
            {trend === "up" ? "▲" : "▼"}
          </span>
        </div>
      </div>
      <div className="text-[10px] text-gray-300 uppercase mt-2 leading-tight group-hover:text-white transition-colors duration-300">
        {label}
        <div className="text-[9px] text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

export default function TacticalTracking() {
  const { data: tacticalData, loading } = useTacticalData();

  if (loading) {
    return (
      <div className="glassmorphic-container p-5 h-[480px] overflow-hidden animate-scale-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Cargando datos tácticos...</div>
        </div>
      </div>
    );
  }

  // Sort tactical data by date
  const sortedData = [...tacticalData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get unique dates
  const uniqueDates = Array.from(new Set(sortedData.map((item) => item.date)));

  // Format dates for display
  const formattedDates = uniqueDates.map((date) => formatDate(date));

  // Prepare data series for each candidate
  const getCandidateData = (candidate: string) => {
    return uniqueDates.map((date) => {
      const dataPoint = sortedData.find(
        (item) => item.date === date && item.candidate === candidate
      );
      return dataPoint ? dataPoint.percentage : null;
    });
  };

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "CANDIDATO PROPIO",
        data: getCandidateData("CANDIDATO PROPIO"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(20, 184, 166, 0.5)");
          gradient.addColorStop(0.5, "rgba(20, 184, 166, 0.2)");
          gradient.addColorStop(1, "rgba(20, 184, 166, 0)");
          return gradient;
        },
        borderColor: "#14B8A6",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#14B8A6",
        pointBorderColor: "rgba(20, 184, 166, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#14B8A6",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
      {
        label: "OPOSITOR 1",
        data: getCandidateData("OPOSITOR 1"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(236, 72, 153, 0.5)");
          gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.2)");
          gradient.addColorStop(1, "rgba(236, 72, 153, 0)");
          return gradient;
        },
        borderColor: "#EC4899",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#EC4899",
        pointBorderColor: "rgba(236, 72, 153, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#EC4899",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
      {
        label: "OPOSITOR 2",
        data: getCandidateData("OPOSITOR 2"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
          gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.2)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        borderColor: "#3B82F6",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "rgba(59, 130, 246, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#3B82F6",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
      {
        label: "NO SABE/NO CONTESTÓ",
        data: getCandidateData("NO SABE/NO CONTESTÓ"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(147, 197, 253, 0.5)");
          gradient.addColorStop(0.5, "rgba(147, 197, 253, 0.2)");
          gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
          return gradient;
        },
        borderColor: "#93C5FD",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#93C5FD",
        pointBorderColor: "rgba(147, 197, 253, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#93C5FD",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#94a3b8",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(10, 10, 10, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(20, 184, 166, 0.2)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(20, 184, 166, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return value + "%";
          },
        },
        border: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
  };

  const getLatestData = (candidate: string) => {
    const candidateData = sortedData
      .filter((item) => item.candidate === candidate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return candidateData[0] || { percentage: 0, trend: "up" as const };
  };

  // Calculate variances
  const getVariance = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  const latestPropio = getLatestData("CANDIDATO PROPIO");
  const previousPropio = 42.2; // Example previous value
  const votoVariance = getVariance(latestPropio.percentage, previousPropio);

  const currentConocimiento = 27.79;
  const previousConocimiento = 25.0;
  const conocimientoVariance = getVariance(
    currentConocimiento,
    previousConocimiento
  );

  const currentSaldo = 30.09;
  const previousSaldo = 32.0;
  const saldoVariance = getVariance(currentSaldo, previousSaldo);

  return (
    <div className="glassmorphic-container p-5 h-[480px] overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>

      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative">
        TRACKING TÁCTICO
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>

      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          value={formatPercentage(latestPropio.percentage)}
          label="INTENCIÓN DE VOTO"
          sublabel="MARZO 2025"
          trend={latestPropio.trend}
          color="teal"
        />
        <MetricCard
          value={"0"}
          label="VARIANZA EN INTENCIÓN DE VOTO"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(votoVariance) >= 0 ? "up" : "down"}
          color={Number(votoVariance) >= 0 ? "teal" : "pink"}
        />
        <MetricCard
          value={"0"}
          label="VARIANZA EN CONOCIMIENTO"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(conocimientoVariance) >= 0 ? "up" : "down"}
          color={Number(conocimientoVariance) >= 0 ? "teal" : "pink"}
        />
        <MetricCard
          value={"0"}
          label="VARIANZA EN SALDO DE OPINIÓN"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(saldoVariance) >= 0 ? "up" : "down"}
          color={Number(saldoVariance) >= 0 ? "teal" : "pink"}
        />
      </div>

      <div className="mt-4 h-[260px] relative">
        {/* Chart container with enhanced 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/60 to-card/40 rounded-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] rounded-lg"></div>

        {/* Mountain effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg"></div>

        <div className="relative h-full">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Footer with timestamp and legend - Now with better spacing and overflow handling */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="text-xs text-gray-300">
          ÚLTIMA ACTUALIZACIÓN:{" "}
          {new Date(uniqueDates[uniqueDates.length - 1])
            .toLocaleString("es-ES", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .toUpperCase()}{" "}
          HRS
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-teal"></div>
            <span>CANDIDATO PROPIO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-pink"></div>
            <span>OPOSITOR 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>OPOSITOR 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            <span>NO SABE/NO CONTESTÓ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
