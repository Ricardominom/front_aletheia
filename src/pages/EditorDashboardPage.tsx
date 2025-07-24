import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LogOut, Edit3 } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import CampaignProgress from '../components/CampaignProgress';
import CampaignOverview from '../components/CampaignOverview';
import SecondaryIndicators from '../components/SecondaryIndicators';
import FinanceStatus from '../components/FinanceStatus';
import TacticalTracking from '../components/TacticalTracking';
import SocialListening from '../components/SocialListening';
import OperationProgress from '../components/OperationProgress';
import OperationMetrics from '../components/OperationMetrics';
import LogoutDialog from '../components/LogoutDialog';

// Import all modal components
import ProfileModal from '../components/modalComponents/ProfileModal';
import CampaignProgressModal from '../components/modalComponents/CampaignProgressModal';
import FinanceModal from '../components/modalComponents/FinanceModal';
import SecondaryIndicatorsModal from '../components/modalComponents/SecondaryIndicatorsModal';
import TacticalTrackingModal from '../components/modalComponents/TacticalTrackingModal';
import SocialListeningModal from '../components/modalComponents/SocialListeningModal';
import OperationProgressModal from '../components/modalComponents/OperationProgressModal';
import OperationMetricsModal from '../components/modalComponents/OperationMetricsModal';
import AvisosTable from '../components/cochabamba/AvisosTable';
import AdversariosTable from '../components/adversarios/AdversariosTable';

export default function EditorDashboardPage() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('encuestas');
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentUser, _hasHydrated } = useDashboardStore(state => ({
    setCurrentUser: state.setCurrentUser,
    _hasHydrated: state._hasHydrated
  }));

  // Update active tab based on URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab && ['adversarios', 'cochabamba'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('encuestas');
    }
  }, [location.search]);

  // Set current user when component mounts
  useEffect(() => {
    setCurrentUser('editor');
  }, [setCurrentUser]);

  // Show loading state until hydrated
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
        
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="glassmorphic-container p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    setCurrentUser(null);
    navigate('/');
  };

  const EditButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 p-2 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20 transition-all duration-300 group z-20"
    >
      <Edit3 className="w-4 h-4 text-primary group-hover:text-primary/80" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
      {/* Background overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>

      {/* Main content with padding to account for navbar */}
      <div className="pt-20 p-4 lg:p-6 min-h-screen">
        <div className="max-w-[1920px] mx-auto space-y-4 relative">
          {/* Tab Content */}
          {activeTab === 'encuestas' && (
            <>
              {/* Top Section */}
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6 grid grid-cols-6 gap-4">
                  {/* Left column - top section */}
                  <div className="col-span-2 relative">
                    <EditButton onClick={() => setActiveModal('profile')} />
                    <CampaignOverview 
                      title="27.36%" 
                      subtitle="Cumplimiento General" 
                      profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </div>
                  
                  {/* Left column - bottom section */}
                  <div className="col-span-6 relative">
                    <EditButton onClick={() => setActiveModal('campaign-progress')} />
                    <CampaignProgress />
                  </div>
                </div>

                {/* Right columns - full height */}
                <div className="col-span-12 lg:col-span-3 relative">
                  <EditButton onClick={() => setActiveModal('secondary-indicators')} />
                  <SecondaryIndicators />
                </div>
                <div className="col-span-12 lg:col-span-3 relative">
                  <EditButton onClick={() => setActiveModal('finance')} />
                  <FinanceStatus />
                </div>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6 relative">
                  <EditButton onClick={() => setActiveModal('tactical-tracking')} />
                  <TacticalTracking />
                </div>
                <div className="col-span-12 lg:col-span-6 relative">
                  <EditButton onClick={() => setActiveModal('social-listening')} />
                  <SocialListening />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-12 gap-4 mt-5">
                <div className="col-span-12 lg:col-span-4 relative">
                  <EditButton onClick={() => setActiveModal('operation-progress')} />
                  <div className="dashboard-card p-4 h-[400px] overflow-y-auto">
                    <OperationProgress />
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-8 relative">
                  <EditButton onClick={() => setActiveModal('operation-metrics')} />
                  <div className="dashboard-card p-4 h-[400px] overflow-y-auto">
                    <OperationMetrics />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'adversarios' && (
            <AdversariosTable />
          )}

          {activeTab === 'cochabamba' && (
            <AvisosTable />
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsLogoutDialogOpen(true)}
          className="group flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg hover:bg-card hover:border-primary/40 transition-all duration-300"
        >
          <LogOut className="w-5 h-5 text-primary group-hover:animate-pulse" />
          <span className="text-gray-400 group-hover:text-gray-200">Cerrar Sesión</span>
        </button>
      </div>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />

      {/* All Modals */}
      <ProfileModal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
      />
      <CampaignProgressModal
        isOpen={activeModal === 'campaign-progress'}
        onClose={() => setActiveModal(null)}
      />
      <FinanceModal
        isOpen={activeModal === 'finance'}
        onClose={() => setActiveModal(null)}
      />
      <SecondaryIndicatorsModal
        isOpen={activeModal === 'secondary-indicators'}
        onClose={() => setActiveModal(null)}
      />
      <TacticalTrackingModal
        isOpen={activeModal === 'tactical-tracking'}
        onClose={() => setActiveModal(null)}
      />
      <SocialListeningModal
        isOpen={activeModal === 'social-listening'}
        onClose={() => setActiveModal(null)}
      />
      <OperationProgressModal
        isOpen={activeModal === 'operation-progress'}
        onClose={() => setActiveModal(null)}
      />
      <OperationMetricsModal
        isOpen={activeModal === 'operation-metrics'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}