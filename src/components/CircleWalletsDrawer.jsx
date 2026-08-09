import React, { useState } from 'react';
import { X, Wallet, Key, Droplet, Layers, ExternalLink, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function CircleWalletsDrawer({ isOpen, onClose }) {
  const { usdcBalance, setUsdcBalance, addNotification, activeWallet } = useOream();
  const [faucetLoading, setFaucetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('wallets'); // 'wallets' | 'faucet' | 'gateway'

  if (!isOpen) return null;

  const handleClaimFaucet = () => {
    setFaucetLoading(true);
    setTimeout(() => {
      setUsdcBalance((prev) => prev + 1000);
      setFaucetLoading(false);
      addNotification('Claimed +1,000 Testnet USDC from Circle Faucet!', 'success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#1A1A1A] border-l border-white/10 p-6 text-white space-y-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00D97E]/20 border border-[#00D97E]/40 flex items-center justify-center text-[#00D97E]">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Circle Developer Platform</h3>
                <p className="text-[11px] text-neutral-400">Programmable Wallets & Gateway SDK</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('wallets')}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'wallets' ? 'bg-[#00D97E] text-[#1A1A1A] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Wallets
            </button>
            <button
              onClick={() => setActiveTab('faucet')}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'faucet' ? 'bg-[#00D97E] text-[#1A1A1A] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              USDC Faucet
            </button>
            <button
              onClick={() => setActiveTab('gateway')}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'gateway' ? 'bg-[#00D97E] text-[#1A1A1A] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Gateway
            </button>
          </div>

          {/* TAB 1: WALLETS */}
          {activeTab === 'wallets' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <span>Arc Native USDC Balance</span>
                  <span className="text-[#00D97E] font-semibold">Live Testnet</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {usdcBalance.toLocaleString()} <span className="text-sm font-normal text-[#00D97E]">USDC</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono">
                  Wallet: {activeWallet.address}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00D9FF]">
                  <Key className="w-4 h-4" />
                  <span>Circle Developer-Controlled Wallets</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Custodial wallets powered by Circle Web3 Services SDK (`@circle-fin/user-controlled-wallets` / `@circle-fin/developer-controlled-wallets`).
                </p>
                <div className="text-[11px] bg-black/40 p-2.5 rounded-lg border border-white/5 font-mono text-neutral-300">
                  Entity Secret ID: <code>env.CIRCLE_ENTITY_SECRET</code><br />
                  App ID: <code>arc-oream-vault-v1</code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9D00FF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>User-Controlled Modular Wallets</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Web2 social logins (Google, Passkeys) with ERC-4337 Smart Account Abstraction and USDC Gas Station sponsorship.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: FAUCET */}
          {activeTab === 'faucet' && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#00D97E]/20 border border-[#00D97E]/40 mx-auto flex items-center justify-center text-[#00D97E]">
                <Droplet className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Circle USDC Faucet</h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Get instant testnet USDC on Arc Testnet to simulate recurring group deposits and cycle payouts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-left text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Target Address:</span>
                  <span className="font-mono text-white">{activeWallet.address.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Network:</span>
                  <span className="text-[#00D97E] font-semibold">Arc Testnet (Chain #50401)</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Payout Token:</span>
                  <span className="font-bold text-white">Native USDC (6 Decimals)</span>
                </div>
              </div>

              <button
                onClick={handleClaimFaucet}
                disabled={faucetLoading}
                className="w-full py-4 rounded-xl bg-[#00D97E] text-[#1A1A1A] font-bold text-sm hover:bg-[#00b569] neon-glow flex items-center justify-center gap-2"
              >
                {faucetLoading ? (
                  <span>Claiming Testnet USDC...</span>
                ) : (
                  <>
                    <Droplet className="w-4 h-4" />
                    <span>Claim +1,000 Testnet USDC</span>
                  </>
                )}
              </button>

              <a
                href="https://faucet.circle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#00D9FF] hover:underline"
              >
                Open Official Circle Web Faucet <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* TAB 3: GATEWAY */}
          {activeTab === 'gateway' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1A4D3A]/40 to-[#1A1A1A] border border-[#00D97E]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00D97E]">
                  <Zap className="w-4 h-4" />
                  <span>Circle Gateway & Nanopayments</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Aggregates USDC liquidity across Ethereum, Arbitrum, Base, Optimism, and Arc into a unified spendable balance.
                </p>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                  <span className="text-neutral-400">Unified USDC Balance:</span>
                  <span className="font-bold text-[#00D97E]">{(usdcBalance * 1.5).toLocaleString()} USDC</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs">
                <div className="font-semibold text-white">x402 Micropayment Protocol</div>
                <p className="text-neutral-400 text-[11px]">
                  Enables instant gas-free nanopayments down to $0.000001 for automated keeper bots triggering cycle releases.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[11px] text-neutral-500">
          <span>Circle API Status: <span className="text-[#00D97E]">Operational ✅</span></span>
          <a href="https://developers.circle.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
            Docs <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
