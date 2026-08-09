import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, RefreshCw, Layers, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { useOream } from '../context/OreamContext';

const SUPPORTED_CHAINS = [
  { id: 'ethereum-sepolia', name: 'Ethereum Sepolia', domainId: 0, icon: '🔷' },
  { id: 'arbitrum-sepolia', name: 'Arbitrum Sepolia', domainId: 3, icon: '🟦' },
  { id: 'optimism-sepolia', name: 'Optimism Sepolia', domainId: 2, icon: '🔴' },
  { id: 'base-sepolia', name: 'Base Sepolia', domainId: 6, icon: '🔵' },
  { id: 'solana-devnet', name: 'Solana Devnet', domainId: 5, icon: '🟣' },
];

export default function CircleBridgeModal({ isOpen, onClose, targetGroupId }) {
  const { addNotification, usdcBalance, setUsdcBalance } = useOream();

  const [sourceChain, setSourceChain] = useState(SUPPORTED_CHAINS[0]);
  const [amount, setAmount] = useState('500');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStep, setBridgeStep] = useState(0); // 0: Idle, 1: Burn on Source, 2: Circle Attestation, 3: Mint on Arc, 4: Done
  const [txHash, setTxHash] = useState('');

  if (!isOpen) return null;

  const handleStartBridge = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid USDC amount to bridge.');
      return;
    }

    setIsBridging(true);
    setBridgeStep(1);

    // Step 1: Burn on Source Chain (CCTP V2 TokenMessenger)
    setTimeout(() => {
      setBridgeStep(2);

      // Step 2: Circle Iris Attestation API
      setTimeout(() => {
        setBridgeStep(3);

        // Step 3: Mint native USDC on Arc Testnet
        setTimeout(() => {
          setBridgeStep(4);
          const mockTx = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}...`;
          setTxHash(mockTx);
          setUsdcBalance((prev) => prev + parseFloat(amount));
          addNotification(
            `Successfully bridged ${amount} USDC from ${sourceChain.name} to Arc Testnet via Circle CCTP V2!`,
            'success'
          );
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleReset = () => {
    setIsBridging(false);
    setBridgeStep(0);
    setTxHash('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-white space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#9D00FF]/20 border border-[#9D00FF]/40 flex items-center justify-center text-[#9D00FF]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Circle CCTP V2 Crosschain Bridge
              </h3>
              <p className="text-[11px] text-neutral-400">Bridge USDC from any EVM/Solana chain to Arc Testnet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression View */}
        {bridgeStep === 0 && (
          <div className="space-y-5">
            {/* Source Chain Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Source Blockchain
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_CHAINS.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSourceChain(chain)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs font-medium ${
                      sourceChain.id === chain.id
                        ? 'bg-[#9D00FF]/20 border-[#9D00FF] text-white shadow-[0_0_12px_rgba(157,0,255,0.3)]'
                        : 'bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{chain.icon}</span>
                    <div className="truncate">
                      <div>{chain.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Domain #{chain.domainId}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Chain (Fixed to Arc Testnet) */}
            <div className="p-3 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">🪐</span>
                <div>
                  <div className="font-bold text-[#00D97E]">Destination: Arc Testnet</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Chain ID #50401 • Native USDC Gas</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#00D97E]/20 text-[#00D97E] font-bold">Fast Transfer &lt;500ms</span>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Amount to Bridge (USDC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg focus:outline-none focus:border-[#9D00FF]"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-[#9D00FF]">USDC</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleStartBridge}
              className="w-full py-4 rounded-xl bg-[#9D00FF] hover:bg-[#8B00E0] text-white font-bold text-sm shadow-[0_0_20px_rgba(157,0,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span>Bridge USDC with Circle CCTP V2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Active Bridging Animation Steps */}
        {bridgeStep > 0 && bridgeStep < 4 && (
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#9D00FF]/20 border border-[#9D00FF]/50 mx-auto flex items-center justify-center animate-pulse">
              <RefreshCw className="w-8 h-8 text-[#9D00FF] animate-spin" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-1">Processing Circle CCTP V2 Transfer</h4>
              <p className="text-xs text-neutral-400">
                Bridging {amount} USDC from {sourceChain.name} to Arc Testnet
              </p>
            </div>

            <div className="space-y-3 max-w-xs mx-auto text-xs text-left">
              <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                bridgeStep > 1 ? 'bg-[#00D97E]/10 border-[#00D97E]/40 text-[#00D97E]' : 'bg-white/5 border-white/10 text-neutral-400'
              }`}>
                {bridgeStep > 1 ? <CheckCircle2 className="w-4 h-4 text-[#00D97E]" /> : <RefreshCw className="w-4 h-4 animate-spin text-[#9D00FF]" />}
                <span>1. Burning USDC on {sourceChain.name} (DepositForBurn)</span>
              </div>

              <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                bridgeStep > 2 ? 'bg-[#00D97E]/10 border-[#00D97E]/40 text-[#00D97E]' : bridgeStep === 2 ? 'bg-[#9D00FF]/10 border-[#9D00FF]/40 text-white' : 'bg-white/5 border-white/10 text-neutral-400'
              }`}>
                {bridgeStep > 2 ? <CheckCircle2 className="w-4 h-4 text-[#00D97E]" /> : bridgeStep === 2 ? <RefreshCw className="w-4 h-4 animate-spin text-[#9D00FF]" /> : <div className="w-4 h-4 rounded-full border border-neutral-600"></div>}
                <span>2. Circle Iris Attestation Verification (&lt;500ms)</span>
              </div>

              <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                bridgeStep === 3 ? 'bg-[#9D00FF]/10 border-[#9D00FF]/40 text-white' : 'bg-white/5 border-white/10 text-neutral-400'
              }`}>
                {bridgeStep === 3 ? <RefreshCw className="w-4 h-4 animate-spin text-[#9D00FF]" /> : <div className="w-4 h-4 rounded-full border border-neutral-600"></div>}
                <span>3. Minting Native USDC on Arc Testnet (ReceiveMessage)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success View */}
        {bridgeStep === 4 && (
          <div className="py-6 space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#00D97E]/20 border border-[#00D97E]/50 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#00D97E]" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-1">CCTP Bridge Complete! 🎉</h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                <strong>{amount} USDC</strong> has been minted directly onto Arc Testnet and added to your wallet balance.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1 text-left">
              <div className="text-neutral-400 flex justify-between">
                <span>Arc ArcScan Tx Hash:</span>
                <a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline flex items-center gap-1">
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-[#00D97E] truncate">{txHash}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10"
              >
                Bridge Another Token
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#00D97E] text-[#1A1A1A] text-xs font-bold hover:bg-[#00b569] neon-glow"
              >
                Done & Continue to Vault
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
