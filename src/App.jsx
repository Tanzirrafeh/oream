import React, { useState } from 'react';
import { OreamProvider, useOream } from './context/OreamContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CreateGroup from './pages/CreateGroup';
import GroupDashboard from './pages/GroupDashboard';
import GroupHistory from './pages/GroupHistory';
import CircleBridgeModal from './components/CircleBridgeModal';
import CircleWalletsDrawer from './components/CircleWalletsDrawer';
import TxLogsModal from './components/TxLogsModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function NotificationContainer() {
  const { notifications } = useOream();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl glass-panel border shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in ${
            n.type === 'error'
              ? 'bg-red-950/80 border-red-500/50 text-red-200'
              : 'bg-[#1A1A1A]/90 border-[#00D97E]/50 text-white'
          }`}
        >
          {n.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#00D97E] shrink-0 mt-0.5" />
          )}
          <div className="text-xs font-medium leading-snug">{n.message}</div>
        </div>
      ))}
    </div>
  );
}

function MainContent() {
  const { 
    bridgeModalOpen, 
    setBridgeModalOpen, 
    walletsDrawerOpen, 
    setWalletsDrawerOpen 
  } = useOream();

  const [activePage, setActivePage] = useState('landing'); // 'landing' | 'create' | 'dashboard' | 'history'
  const [selectedGroupId, setSelectedGroupId] = useState(1);
  const [txLogsModalOpen, setTxLogsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenTxLogs={() => setTxLogsModalOpen(true)}
      />

      <main className="flex-grow">
        {activePage === 'landing' && (
          <LandingPage setActivePage={setActivePage} />
        )}
        {activePage === 'create' && (
          <CreateGroup setActivePage={setActivePage} setSelectedGroupId={setSelectedGroupId} />
        )}
        {activePage === 'dashboard' && (
          <GroupDashboard 
            groupId={selectedGroupId} 
            setActivePage={setActivePage} 
            setSelectedGroupId={setSelectedGroupId} 
          />
        )}
        {activePage === 'history' && (
          <GroupHistory groupId={selectedGroupId} setActivePage={setActivePage} />
        )}
      </main>

      <Footer />
      <NotificationContainer />

      {/* Circle & Arc Interactive Modals */}
      <CircleBridgeModal 
        isOpen={bridgeModalOpen} 
        onClose={() => setBridgeModalOpen(false)} 
        targetGroupId={selectedGroupId}
      />
      <CircleWalletsDrawer 
        isOpen={walletsDrawerOpen} 
        onClose={() => setWalletsDrawerOpen(false)} 
      />
      <TxLogsModal 
        isOpen={txLogsModalOpen} 
        onClose={() => setTxLogsModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <OreamProvider>
      <MainContent />
    </OreamProvider>
  );
}
