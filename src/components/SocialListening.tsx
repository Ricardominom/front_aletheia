import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSocialMetrics } from "../hooks/useSocial";
import { formatNumber } from "../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface MetricCardProps {
  value: number;
  unit: string;
  label: string;
  trend: "up" | "down";
  sublabel: string;
  color?: "teal" | "pink";
}

function MetricCard({
  value,
  unit,
  label,
  trend,
  sublabel,
  color = "teal",
}: MetricCardProps) {
  return (
    <div className="target-card p-3 animate-scale-in relative group">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
          color === "teal" ? "bg-accent-teal" : "bg-accent-pink"
        }`}
      ></div>

      <div className="flex items-start justify-between">
        <div
          className={`text-3xl font-bold ${
            color === "teal"
              ? "text-accent-teal text-neon"
              : "text-accent-pink text-neon"
          } leading-none tracking-tight flex items-baseline gap-1 animate-float`}
        >
          {value}
          <span className="text-xl">{unit}</span>
          <span
            className={`text-base ml-1 ${
              trend === "up" ? "text-accent-teal" : "text-accent-pink"
            }`}
          >
            {trend === "up" ? "▲" : "▼"}
          </span>
        </div>
      </div>
      <div className="text-[10px] text-gray-300 uppercase mt-2 leading-tight group-hover:text-white transition-colors duration-300">
        {label}
        <div className="text-[9px] text-gray-400 normal-case mt-0.5 group-hover:text-gray-300 transition-colors duration-300">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

interface TweetProps {
  avatar: string;
  username: string;
  content: string;
  timestamp: string;
}

function Tweet({ avatar, username, content, timestamp }: TweetProps) {
  return (
    <div className="target-card p-3 animate-slide-up group">
      <div className="flex gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-teal/20 rounded-full animate-pulse-slow"></div>
          <img
            src={avatar}
            alt={username}
            className="relative w-8 h-8 rounded-full ring-1 ring-accent-teal/30"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-accent-teal group-hover:text-accent-teal/80 transition-colors duration-300">
              {username}
            </span>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <p className="text-xs text-gray-300 mt-1 line-clamp-2 group-hover:text-white transition-colors duration-300">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

const avatars = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];

export default function SocialListening() {
  const { metrics, loading } = useSocialMetrics();
  const [currentTweets, setCurrentTweets] = useState<Array<TweetProps>>([]);

  useEffect(() => {
    if (metrics) {
      const tweets = metrics.witnesses.slice(0, 3).map((witness, index) => ({
        avatar: avatars[index],
        username: witness.username,
        content: witness.content,
        timestamp: new Date(witness.timestamp).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setCurrentTweets(tweets);
    }
  }, [metrics]);

  if (loading || !metrics) {
    return (
      <div className="glassmorphic-container p-5 h-[480px] overflow-hidden animate-scale-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Cargando datos sociales...</div>
        </div>
      </div>
    );
  }

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );

  const data = {
    labels: hours,
    datasets: [
      {
        data: [
          400, 600, 300, 500, 400, 300, 250, 200, 400, 2000, 1000, 800, 600,
          1000, 600, 500, 600, 500, 800, 1000, 1200, 1800, 1000, 800,
        ],
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#14B8A6",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(10, 26, 30, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(20, 184, 166, 0.2)",
        borderWidth: 1,
        padding: 8,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 11,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(20, 184, 166, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 9,
          },
          maxRotation: 0,
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
            size: 9,
          },
          callback: (value: number) => formatNumber(value),
        },
        min: 0,
        max: 2000,
      },
    },
  };

  return (
    <div className="glassmorphic-container p-5 h-[480px] overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>

      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative">
        ESCUCHA SOCIAL
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <MetricCard
          value={metrics.mentions}
          unit="K"
          label="MENCIONES"
          trend="up"
          sublabel="EN LAS ÚLTIMAS 24 HRS"
          color="teal"
        />
        <MetricCard
          value={metrics.impressions}
          unit="M"
          label="IMPRESIONES"
          trend="up"
          sublabel="EN LAS ÚLTIMAS 24 HRS"
          color="teal"
        />
        <MetricCard
          value={metrics.reputation}
          unit="%"
          label="CAMBIOS EN REPUTACIÓN POSITIVA"
          trend="up"
          sublabel="EN LAS ÚLTIMAS 24 HRS"
          color="teal"
        />
        <MetricCard
          value={metrics.notes}
          unit="/30"
          label="NOTAS Y MENCIONES EN MEDIOS"
          trend="down"
          sublabel="EN LAS ÚLTIMAS 24 HRS"
          color="pink"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Chart */}
        <div className="col-span-2">
          <div className="h-[280px] mountain-chart relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-lg"></div>
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Tweets */}
        <div className="space-y-2">
          <div className="target-card p-3">
            <div className="text-xs text-gray-300 text-center uppercase font-medium mb-2">
              TESTIGOS EN VIVO
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[250px] pr-2">
              {currentTweets.map((tweet, index) => (
                <Tweet
                  key={index}
                  avatar={tweet.avatar}
                  username={tweet.username}
                  content={tweet.content}
                  timestamp={tweet.timestamp}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
