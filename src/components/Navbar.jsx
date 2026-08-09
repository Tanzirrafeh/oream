import React, { useState } from 'react';
import { Layers, Wallet, ChevronDown, PlusCircle, RefreshCw, Droplet, Cpu, Zap } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function Navbar({ activePage, setActivePage, onOpenTxLogs }) {
  const { 
    activeWallet, 
    setActiveWallet, 
    mockWallets, 
    usdcBalance, 
    setBridgeModalOpen, 
    setWalletsDrawerOpen 
  } = useOream();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-[#1A1A1A]/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActivePage('landing')} 
          className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00D97E]/40 shadow-[0_0_15px_rgba(0,217,126,0.3)] group-hover:scale-105 group-hover:border-[#00D97E] transition-all bg-[#0F0F0F] flex items-center justify-center">
            <img 
              src="/oream_logo.png" 
              alt="Oream Logo" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // Fallback if image load fails
                e.target.style.display = 'none';
              }}
            />
            <Layers className="w-5 h-5 text-[#00D97E] absolute inset-0 m-auto hidden group-hover:block" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tighter text-white group-hover:text-[#00D97E] transition-colors">
              OREAM
            </span>
            <div className="text-[9px] font-mono text-[#00D97E] tracking-widest uppercase">Arc & Circle</div>
          </div>
        </button>

        {/* Navigation Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setActivePage('landing')} 
            className={`text-xs uppercase font-semibold tracking-wider transition-colors ${activePage === 'landing' ? 'text-[#00D97E]' : 'text-neutral-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActivePage('dashboard')} 
            className={`text-xs uppercase font-semibold tracking-wider transition-colors ${activePage === 'dashboard' ? 'text-[#00D97E]' : 'text-neutral-400 hover:text-white'}`}
          >
            Vault Dashboard
          </button>
          <button 
            onClick={() => setActivePage('create')} 
            className={`text-xs uppercase font-semibold tracking-wider transition-colors ${activePage === 'create' ? 'text-[#00D97E]' : 'text-neutral-400 hover:text-white'}`}
          >
            Create Group
          </button>
          <button
            onClick={() => setBridgeModalOpen(true)}
            className="text-xs uppercase font-semibold tracking-wider text-[#9D00FF] hover:text-white flex items-center gap-1 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Circle Bridge</span>
          </button>
        </div>

        {/* Action Controls & Wallet Pill */}
        <div className="flex items-center gap-3">
          
          {/* Arc Network Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#00D97E] animate-pulse"></span>
            <span className="font-semibold text-white">Arc Testnet</span>
            <span className="text-[10px] text-[#00D97E] font-mono">#50401</span>
          </div>

          {/* USDC Balance Pill (Clickable -> Opens Circle Drawer & Faucet) */}
          <button
            onClick={() => setWalletsDrawerOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 text-xs font-bold text-[#00D97E] hover:bg-[#00D97E]/20 transition-all shadow-[0_0_10px_rgba(0,217,126,0.15)]"
          >
            <Droplet className="w-3.5 h-3.5 text-[#00D97E]" />
            <span>{usdcBalance.toLocaleString()} USDC</span>
          </button>

          {/* Onchain Tx Logs Inspector */}
          <button
            onClick={onOpenTxLogs}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D9FF] text-[#00D9FF] hover:bg-white/10 transition-colors"
            title="Inspect Arc Testnet Event Emissions"
          >
            <Cpu className="w-4 h-4" />
          </button>

          {/* Active Wallet Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D97E]/50 text-xs text-neutral-200 transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-[#00D97E]" />
              <span className="font-mono">{activeWallet.name.split(' ')[0]} ({activeWallet.address.slice(0, 4)}...)</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel bg-[#1F1F1F] border border-white/10 shadow-2xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-white/5 text-[10px] uppercase font-semibold text-neutral-400 tracking-wider flex justify-between">
                  <span>Switch Test Persona</span>
                  <span className="text-[#00D97E]">Arc Testnet</span>
                </div>
                {mockWallets.map((wallet) => (
                  <button
                    key={wallet.address}
                    onClick={() => {
                      setActiveWallet(wallet);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/5 transition-colors ${
                      wallet.address === activeWallet.address ? 'text-[#00D97E] font-medium bg-white/5' : 'text-neutral-300'
                    }`}
                  >
                    <span>{wallet.name}</span>
                    <span className="font-mono text-[10px] text-neutral-500">{wallet.address.slice(0, 6)}...</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Group Button */}
          <button
            onClick={() => setActivePage('create')}
            className="px-4 py-2.5 rounded-xl bg-[#00D97E] text-[#1A1A1A] text-xs font-bold hover:bg-[#00b569] transition-all neon-glow flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Group</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
