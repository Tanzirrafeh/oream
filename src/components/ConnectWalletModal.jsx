import React from 'react';
import { X, Wallet, ShieldCheck, User, Zap, Globe, CheckCircle2 } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function ConnectWalletModal({ isOpen, onClose }) {
  const { mockWallets, connectWallet, isConnected, activeWallet, disconnectWallet } = useOream();

  if (!isOpen) return null;

  const handleSelectWallet = (wallet, type = 'demo') => {
    connectWallet(wallet, type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#18181B] border border-white/10 rounded-2xl p-6 text-white shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 flex items-center justify-center text-[#00D97E]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
              <p className="text-xs text-neutral-400">Choose your Web3 wallet or Circle Developer Wallet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status if already connected */}
        {isConnected && (
          <div className="p-4 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#00D97E]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Connected as <strong>{activeWallet.name}</strong></span>
            </div>
            <button
              onClick={() => {
                disconnectWallet();
                onClose();
              }}
              className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-[11px] font-semibold"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Real / Circle Wallet Options */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">
            Web3 & Programmable Wallets
          </div>

          {/* Option 1: Circle Programmable Web3 Wallet */}
          <button
            onClick={() => handleSelectWallet({
              name: "Circle Web3 Wallet",
              address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
              isConnected: true
            }, 'circle')}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D97E] hover:bg-white/10 transition-all flex items-center justify-between group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9D00FF]/20 border border-[#9D00FF]/40 flex items-center justify-center text-[#9D00FF]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-[#00D97E] transition-colors flex items-center gap-2">
                  <span>Circle Web3 Wallet</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#9D00FF]/20 text-[#9D00FF] font-mono border border-[#9D00FF]/40">SDK / Gasless</span>
                </div>
                <div className="text-xs text-neutral-400">Social login & Circle Developer-Controlled wallet</div>
              </div>
            </div>
            <Zap className="w-4 h-4 text-neutral-500 group-hover:text-[#00D97E] transition-colors" />
          </button>

          {/* Option 2: Browser Extension (MetaMask / Viem) */}
          <button
            onClick={() => handleSelectWallet({
              name: "MetaMask / Web3 Wallet",
              address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
              isConnected: true
            }, 'metamask')}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D97E] hover:bg-white/10 transition-all flex items-center justify-between group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-[#00D97E] transition-colors flex items-center gap-2">
                  <span>Injected Browser Wallet</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">MetaMask</span>
                </div>
                <div className="text-xs text-neutral-400">Connect using browser extension on Arc Testnet</div>
              </div>
            </div>
            <Wallet className="w-4 h-4 text-neutral-500 group-hover:text-[#00D97E] transition-colors" />
          </button>
        </div>

        {/* Demo Wallet Switcher Section */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold uppercase text-neutral-400 tracking-wider">Demo Wallet Personas</span>
            <span className="text-[11px] text-[#00D97E]">Quick Test Accounts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mockWallets.map((wallet) => (
              <button
                key={wallet.address}
                onClick={() => handleSelectWallet(wallet, 'demo')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isConnected && activeWallet.address === wallet.address
                    ? 'bg-[#00D97E]/10 border-[#00D97E] text-white'
                    : 'bg-white/5 border-white/5 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <User className="w-4 h-4 text-[#00D97E] shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold truncate">{wallet.name}</div>
                    <div className="text-[10px] font-mono text-neutral-400 truncate">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</div>
                  </div>
                </div>
                {isConnected && activeWallet.address === wallet.address && (
                  <CheckCircle2 className="w-4 h-4 text-[#00D97E] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-[11px] text-neutral-500 text-center pt-2">
          Arc Testnet (Chain #50401) • Native USDC Payment & Gas Protocol
        </div>
      </div>
    </div>
  );
}
