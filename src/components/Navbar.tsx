import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, MapPin, Home, LogOut, Lightbulb, BarChart3, Users, MapIcon } from 'lucide-react';
import LogoutDialog from './LogoutDialog';
import { useDashboardStore } from '../store/dashboardStore';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const setCurrentUser = useDashboardStore(state => state.setCurrentUser);

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    setCurrentUser(null);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Determine if we're in editor mode
  const isEditorMode = location.pathname.includes('/editor');
  const dashboardPath = isEditorMode ? '/dashboard/editor' : '/dashboard';

  // Dashboard sub-tabs
  const dashboardTabs = [
    { name: 'Encuestas', icon: BarChart3, path: '/encuestas' },
    { name: 'Adversarios', icon: Users, path: `${dashboardPath}?tab=adversarios` },
    { name: 'Cochabamba', icon: MapIcon, path: `${dashboardPath}?tab=cochabamba` },
  ];

  const navItems = [
    { name: 'Comunicación', icon: MessageSquare, path: '/comunicacion' },
    { name: 'Territorial', icon: MapPin, path: '/territorial' },
    { name: 'Estrategia', icon: Lightbulb, path: '/estrategia' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-b border-primary/20 z-50">
        <div className="container mx-auto h-full px-4">
          <div className="flex items-center justify-between h-full">
            {/* Left side - Home button */}
            <Link
              to={dashboardPath}
              className={`flex items-center gap-2 px-4 h-full text-sm font-medium transition-all duration-300 relative ${
                isActive(dashboardPath)
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Home className="w-8 h-8" />
              {isActive(dashboardPath) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </Link>

            {/* Center - Navigation items */}
            <div className="flex items-center justify-center flex-1">
              {/* Dashboard sub-tabs - always visible */}
              <div className="flex items-center">
                {dashboardTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActiveTab = tab.path.startsWith('/encuestas') 
                    ? location.pathname === '/encuestas'
                    : location.pathname.includes('/dashboard') && 
                      location.search.includes(`tab=${tab.path.split('=')[1]}`);
                  return (
                    <Link
                      key={tab.name}
                      to={tab.path}
                      className={`flex items-center gap-2 px-5 h-full text-sm font-medium transition-all duration-300 relative ${
                        isActiveTab
                          ? 'text-primary'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                      {isActiveTab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
              
              {/* Regular navigation items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-5 h-full text-sm font-medium transition-all duration-300 relative ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side - Logout Button */}
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-md rounded-lg hover:bg-card hover:shadow-neon transition-all duration-300"
            >
              <LogOut className="w-5 h-5 text-primary group-hover:animate-pulse-slow" />
              <span className="text-gray-400 group-hover:text-white">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Centered Logout Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}