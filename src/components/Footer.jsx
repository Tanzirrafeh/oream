import React from 'react';
import { Layers, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] border-t border-white/5 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#00D97E]/40 shadow-[0_0_10px_rgba(0,217,126,0.3)] bg-[#0F0F0F]">
                <img src="/oream_logo.png" alt="Oream Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">OREAM</span>
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Recurring shared-expense collection protocol built on Arc Testnet with native USDC settlement.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-6">Protocol</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#features" className="hover:text-[#00D97E] transition-colors">Shared Expenses</a></li>
              <li><a href="#features" className="hover:text-[#00D97E] transition-colors">Cycle Payment Tracker</a></li>
              <li><a href="#workflow" className="hover:text-[#00D97E] transition-colors">Auto & Manual Release</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-white font-semibold mb-6">Developers</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#integration" className="hover:text-[#00D97E] transition-colors">Arc Network (USDC Gas)</a></li>
              <li><a href="#integration" className="hover:text-[#00D97E] transition-colors">Circle App Kit & CCTP V2</a></li>
              <li><a href="#integration" className="hover:text-[#00D97E] transition-colors">Oream.sol Contract ABI</a></li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h4 className="text-white font-semibold mb-6">Arc Testnet</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" className="hover:text-[#00D97E] transition-colors">Arc Block Explorer</a></li>
              <li><a href="https://faucet.circle.com" target="_blank" rel="noreferrer" className="hover:text-[#00D97E] transition-colors">Circle Faucet (USDC)</a></li>
              <li><a href="https://docs.arc.io" target="_blank" rel="noreferrer" className="hover:text-[#00D97E] transition-colors">Arc Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs">
            © 2026 Oream Protocol. Built on Arc Testnet & Circle Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
