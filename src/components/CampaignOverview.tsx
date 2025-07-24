import React from "react";
import { useDashboardStore } from "../store/dashboardStore";

interface CampaignOverviewProps {
  title: string;
  subtitle: string;
  profileImage?: string;
}

export default function CampaignOverview({
  title,
  subtitle,
}: CampaignOverviewProps) {
  const { profile, _hasHydrated } = useDashboardStore((state) => ({
    profile: state.profile,
    _hasHydrated: state._hasHydrated,
  }));

  return (
    <div className="glassmorphic-container p-6 h-full relative overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/15 to-transparent opacity-70"></div>
      <div className="absolute -inset-[100px] bg-gradient-to-b from-background/0 via-primary/8 to-background/0 blur-3xl opacity-40 animate-pulse-slow"></div>

      <div className="flex flex-col items-center justify-center h-full space-y-6 relative z-10">
        {/* Profile Image Container */}
        <div className="relative w-28 h-28 animate-float">
          {/* Outer Glow */}
          <div className="absolute -inset-3 bg-gradient-radial from-accent-teal/40 to-accent-pink/40 blur-xl"></div>

          {/* Inner Glow Ring with improved 3D effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-accent-teal/50 via-primary/40 to-accent-pink/50 blur-sm animate-rotate"></div>

          {/* Image Container with glassmorphic effect */}
          <div className="relative w-28 h-28 overflow-hidden backdrop-blur-sm shadow-neon rounded-full">
            {/* Base layer for depth */}
            <div className="absolute inset-0 bg-card/70 backdrop-blur-md"></div>

            {/* Shimmer Effect - more pronounced */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"
              style={{ backgroundSize: "200% 100%" }}
            ></div>

            {/* Profile Image */}
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-300"
            />

            {/* Hover Glow - more vibrant */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-teal/30 via-transparent to-accent-pink/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Text Content with enhanced effects */}
        <div className="text-center space-y-1 relative z-10">
          {/* Title with stronger glow effect */}
          <h3 className="text-5xl font-bold text-white tracking-tight text-neon-strong">
            <span className="relative">
              {/* {profile.compliance} */}0%
              <div className="absolute -inset-3 bg-primary/25 blur-lg -z-10"></div>
            </span>
          </h3>

          {/* Subtitle with improved hover effect */}
          <p className="text-base text-gray-300 font-medium transition-colors duration-300 relative group hover:text-white">
            {profile.name}
            <span className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow transition-all duration-500 blur-sm"></span>
          </p>

          {/* Additional subtitle */}
          <p className="text-sm text-gray-400 font-light">
            Cumplimiento General
          </p>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-primary/10 to-transparent"></div>

      {/* Subtle particle effects */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
      <div
        className="absolute top-3/4 left-1/2 w-2 h-2 bg-accent-teal rounded-full animate-pulse-slow"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent-pink rounded-full animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
}
