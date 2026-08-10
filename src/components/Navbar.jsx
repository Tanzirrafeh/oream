import React, { useState } from 'react';
import { Layers, Wallet, ChevronDown, Zap, LogOut, UserCheck, ShieldCheck, Droplet } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function Navbar({ activePage, setActivePage }) {
  const { 
    activeWallet, 
    isConnected,
    walletType,
    disconnectWallet,
    setBridgeModalOpen, 
    setWalletsDrawerOpen,
    setConnectModalOpen
  } = useOream();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121214]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActivePage('landing')} 
          className="flex items-center gap-3.5 group text-left focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2923] to-[#121214] border border-[#00D97E]/30 flex items-center justify-center shadow-sm group-hover:border-[#00D97E] transition-all">
            <img 
              src="/oream_logo.png" 
              alt="Oream Logo" 
              className="w-7 h-7 object-cover rounded-lg" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <Layers className="w-5 h-5 text-[#00D97E] hidden group-hover:block" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#00D97E] transition-colors">
              OREAM
            </span>
          </div>
        </button>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setActivePage('landing')} 
            className={`text-sm font-medium transition-colors ${
              activePage === 'landing' ? 'text-[#00D97E] font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActivePage('dashboard')} 
            className={`text-sm font-medium transition-colors ${
              activePage === 'dashboard' ? 'text-[#00D97E] font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Vault Dashboard
          </button>
          <button
            onClick={() => setBridgeModalOpen(true)}
            className="text-sm font-medium text-neutral-300 hover:text-[#9D00FF] flex items-center gap-1.5 transition-colors"
          >
            <Zap className="w-4 h-4 text-[#9D00FF]" />
            <span>Circle Bridge</span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Network Indicator Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#00D97E] animate-pulse"></span>
            <span className="font-medium text-neutral-200">Arc Testnet</span>
          </div>

          {/* Wallet Button: Connect vs Connected Dropdown */}
          {!isConnected ? (
            <button
              onClick={() => setConnectModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00D97E] text-[#121214] text-xs font-bold hover:bg-[#00b569] transition-all shadow-[0_0_15px_rgba(0,217,126,0.25)]"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-[#00D97E]/50 text-xs text-neutral-200 transition-all"
              >
                {walletType === 'circle' ? (
                  <ShieldCheck className="w-4 h-4 text-[#9D00FF]" />
                ) : (
                  <Wallet className="w-4 h-4 text-[#00D97E]" />
                )}
                <span className="font-mono font-medium">
                  {activeWallet.name.split(' ')[0]} ({activeWallet.address.slice(0, 4)}...)
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#1A1A1E] border border-white/10 shadow-2xl py-2 z-50 animate-fade-in text-xs space-y-1">
                  <div className="px-3.5 py-2 border-b border-white/5 text-[11px] font-semibold text-neutral-400 flex justify-between items-center">
                    <span>Connected Wallet</span>
                    <span className="text-[#00D97E] font-mono uppercase text-[10px]">{walletType}</span>
                  </div>

                  <div className="px-3.5 py-2 text-neutral-300 font-mono text-[11px] truncate">
                    {activeWallet.address}
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setConnectModalOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-neutral-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#00D97E]" />
                    <span>Switch Wallet / Demo Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setWalletsDrawerOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-neutral-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <Droplet className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Circle Developer Platform</span>
                  </button>

                  <div className="border-t border-white/5 pt-1">
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
