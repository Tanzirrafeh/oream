import React, { useState } from 'react';
import { Layers, Wallet, ChevronDown, PlusCircle } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function Navbar({ activePage, setActivePage }) {
  const { activeWallet, setActiveWallet, mockWallets } = useOream();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => setActivePage('landing')} 
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="flex text-[#1A1A1A] bg-[#00D97E] w-8 h-8 rounded-lg items-center justify-center shadow-[0_0_15px_rgba(0,217,126,0.3)]">
            <Layers className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-[#00D97E] group-hover:text-white transition-colors duration-300">
            OREAM
          </span>
        </button>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setActivePage('landing')} 
            className={`text-sm transition-colors ${activePage === 'landing' ? 'text-[#00D97E] font-medium' : 'text-neutral-400 hover:text-[#00D97E]'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActivePage('dashboard')} 
            className={`text-sm transition-colors ${activePage === 'dashboard' ? 'text-[#00D97E] font-medium' : 'text-neutral-400 hover:text-[#00D97E]'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActivePage('create')} 
            className={`text-sm transition-colors ${activePage === 'create' ? 'text-[#00D97E] font-medium' : 'text-neutral-400 hover:text-[#00D97E]'}`}
          >
            Create Group
          </button>
          <a href="#features" className="text-sm text-neutral-400 hover:text-[#00D97E] transition-colors">
            Features
          </a>
          <a href="#integration" className="text-sm text-neutral-400 hover:text-[#00D97E] transition-colors">
            Arc & Circle
          </a>
        </div>

        {/* CTA & Wallet Selector */}
        <div className="flex items-center gap-4">
          {/* Active Wallet Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00D97E]/50 text-xs text-neutral-300 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#00D97E] animate-pulse"></div>
              <Wallet className="w-3.5 h-3.5 text-[#00D97E]" />
              <span className="font-mono">{activeWallet.name} ({activeWallet.address.slice(0, 6)}...{activeWallet.address.slice(-4)})</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel bg-[#1F1F1F] border border-white/10 shadow-2xl py-2 z-50">
                <div className="px-3 py-2 border-b border-white/5 text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Switch Active Test Wallet
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

          {/* Action Button */}
          <button
            onClick={() => setActivePage('create')}
            className="px-5 py-2.5 rounded-full bg-[#00D97E] text-[#1A1A1A] text-sm font-semibold hover:bg-[#00b569] transition-all neon-glow-hover flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
