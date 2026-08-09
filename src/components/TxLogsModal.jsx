import React from 'react';
import { X, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function TxLogsModal({ isOpen, onClose }) {
  const { txLogs } = useOream();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-white space-y-6 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00D97E]/20 border border-[#00D97E]/40 flex items-center justify-center text-[#00D97E]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Arc Testnet Onchain Event Inspector
              </h3>
              <p className="text-[11px] text-neutral-400">Live Solidity Contract Event Emissions & Transaction Hashes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logs Table */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {txLogs.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 space-y-2">
              <ShieldCheck className="w-10 h-10 mx-auto text-neutral-600" />
              <p className="text-sm">No transaction events recorded in this session yet.</p>
              <p className="text-xs">Create a group, approve USDC, or contribute to see live event logs.</p>
            </div>
          ) : (
            txLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#00D97E]/20 text-[#00D97E] font-bold border border-[#00D97E]/30">
                    Event: {log.eventName}
                  </span>
                  <span className="text-[10px] text-neutral-400">{log.timestamp}</span>
                </div>

                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-500">Transaction Hash:</span>
                  <a
                    href="https://testnet.arcscan.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00D9FF] hover:underline flex items-center gap-1"
                  >
                    {log.txHash.slice(0, 14)}...{log.txHash.slice(-6)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-2 rounded bg-black/40 border border-white/5 text-[11px] text-neutral-300">
                  {JSON.stringify(log.data, null, 2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs text-neutral-400 shrink-0">
          <span>Network: <strong>Arc Testnet (Chain 50401)</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
