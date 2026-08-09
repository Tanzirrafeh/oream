import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  History, 
  Wallet, 
  Users, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  Zap, 
  RefreshCw,
  Droplet,
  Layers,
  ExternalLink
} from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function GroupDashboard({ groupId, setActivePage, setSelectedGroupId }) {
  const { 
    groups, 
    activeWallet, 
    setActiveWallet, 
    mockWallets, 
    allowances, 
    approveUsdc, 
    contribute, 
    manualRelease,
    setBridgeModalOpen,
    setWalletsDrawerOpen,
    usdcBalance
  } = useOream();

  const group = groups.find((g) => g.groupId === groupId) || groups[0];

  if (!group) {
    return (
      <div className="pt-32 text-center text-neutral-400">
        <p>No group found. Please create a group first.</p>
        <button 
          onClick={() => setActivePage('create')} 
          className="mt-4 px-6 py-2 rounded-lg bg-[#00D97E] text-[#1A1A1A] font-semibold"
        >
          Create Group
        </button>
      </div>
    );
  }

  const currentCycle = group.currentCycle;
  const currentCyclePaid = group.paidStatus[currentCycle] || {};
  const paidCount = Object.values(currentCyclePaid).filter(Boolean).length;
  const amountPerMember = group.amountPerMember;
  const totalMembers = group.members.length;
  const totalCollected = paidCount * amountPerMember;
  const targetTotal = totalMembers * amountPerMember;
  const progressPercent = Math.min(100, Math.round((totalCollected / targetTotal) * 100));

  // Calculate days remaining
  const elapsedMs = Date.now() - group.cycleStartTime;
  const cycleTotalMs = group.cycleLengthDays * 24 * 60 * 60 * 1000;
  const remainingMs = Math.max(0, cycleTotalMs - elapsedMs);
  const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
  const isOverdue = remainingMs <= 0;

  // Connected wallet status
  const isConnectedMember = group.members.some((m) => m.address.toLowerCase() === activeWallet.address.toLowerCase());
  const hasPaidCurrentCycle = !!currentCyclePaid[activeWallet.address];
  const isAdmin = activeWallet.address.toLowerCase() === group.admin.toLowerCase();
  const currentAllowance = allowances[group.groupId] || 0;
  const isAllowanceApproved = currentAllowance >= amountPerMember;

  const [isApproving, setIsApproving] = useState(false);
  const [isContributing, setIsContributing] = useState(false);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      approveUsdc(group.groupId, 10000);
      setIsApproving(false);
    }, 600);
  };

  const handleContribute = () => {
    setIsContributing(true);
    setTimeout(() => {
      contribute(group.groupId);
      setIsContributing(false);
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1A4D3A] opacity-15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Top Navigation & Group Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00D97E]/10 border border-[#00D97E]/30 text-[#00D97E] uppercase">
                Group #{group.groupId}
              </span>
              <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                Arc Testnet Contract:
                <a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline flex items-center gap-0.5">
                  0x8888...8888 <ExternalLink className="w-3 h-3" />
                </a>
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{group.name}</h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Circle CCTP Bridge Banner Button */}
            <button
              onClick={() => setBridgeModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#9D00FF]/20 border border-[#9D00FF]/50 text-white text-xs font-semibold hover:bg-[#9D00FF]/30 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(157,0,255,0.2)]"
            >
              <Zap className="w-4 h-4 text-[#9D00FF]" />
              <span>Circle CCTP Bridge</span>
            </button>

            {/* Group Switcher */}
            {groups.length > 1 && (
              <select
                value={group.groupId}
                onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-[#00D97E]"
              >
                {groups.map((g) => (
                  <option key={g.groupId} value={g.groupId} className="bg-[#1A1A1A]">
                    Group #{g.groupId}: {g.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={() => setActivePage('history')}
              className="px-4 py-2 rounded-xl glass-panel text-white text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <History className="w-4 h-4 text-[#00D9FF]" />
              <span>Past Cycles History</span>
            </button>
          </div>
        </div>

        {/* Demo Wallet Switcher & Circle Faucet Banner */}
        <div className="p-4 rounded-xl bg-[#1F1F1F] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
            <Wallet className="w-4 h-4 text-[#00D97E]" />
            <span>Active Persona: <strong>{activeWallet.name}</strong> ({activeWallet.address.slice(0, 6)}...{activeWallet.address.slice(-4)})</span>
            {isAdmin && <span className="px-2 py-0.5 rounded text-[10px] bg-[#9D00FF]/20 text-[#9D00FF] font-semibold border border-[#9D00FF]/40">ADMIN</span>}
            <span className="text-neutral-500">|</span>
            <span className="text-[#00D97E] font-bold">Balance: {usdcBalance.toLocaleString()} USDC</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWalletsDrawerOpen(true)}
              className="px-3 py-1 rounded-lg bg-[#00D97E]/10 border border-[#00D97E]/30 text-[#00D97E] text-xs font-semibold hover:bg-[#00D97E]/20 flex items-center gap-1 transition-all mr-2"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>Get Faucet USDC</span>
            </button>

            <span className="text-[11px] text-neutral-400">Switch:</span>
            {mockWallets.map((w) => (
              <button
                key={w.address}
                onClick={() => setActiveWallet(w)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  w.address === activeWallet.address
                    ? 'bg-[#00D97E] text-[#1A1A1A] font-bold shadow-[0_0_10px_rgba(0,217,126,0.3)]'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {w.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Cycle Overview Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Collection Progress */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>Cycle #{currentCycle} Progress</span>
              <span className="text-[#00D97E] font-semibold">{progressPercent}% Target Met</span>
            </div>

            <div className="text-3xl font-bold text-white tracking-tight">
              {totalCollected.toLocaleString()} <span className="text-lg font-normal text-neutral-400">/ {targetTotal.toLocaleString()} USDC</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00D97E] to-[#00D9FF] transition-all duration-500 shadow-[0_0_12px_#00D97E]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="text-[11px] text-neutral-400 flex justify-between">
              <span>{paidCount} of {totalMembers} members paid</span>
              <span>{targetTotal - totalCollected} USDC remaining</span>
            </div>
          </div>

          {/* Card 2: Cycle Time Remaining */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>Cycle Schedule</span>
              <Clock className="w-4 h-4 text-[#00D9FF]" />
            </div>

            <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-2">
              {isOverdue ? (
                <span className="text-red-400">Cycle Overdue</span>
              ) : (
                <>
                  <span>{remainingDays}</span>
                  <span className="text-lg font-normal text-neutral-400">days left</span>
                </>
              )}
            </div>

            <div className="text-xs text-neutral-400">
              Length: {group.cycleLengthDays} Days • Reset every cycle
            </div>

            <div className="text-[11px] text-neutral-500 font-mono">
              Started: {new Date(group.cycleStartTime).toLocaleDateString()}
            </div>
          </div>

          {/* Card 3: Recipient & Admin info */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3 text-xs">
            <div className="text-neutral-400 font-semibold uppercase tracking-wider">Group Metadata</div>
            
            <div>
              <div className="text-neutral-400">Recipient Payout Address:</div>
              <div className="font-mono text-white text-xs mt-0.5 truncate">{group.recipient}</div>
            </div>

            <div>
              <div className="text-neutral-400">Group Admin:</div>
              <div className="font-mono text-[#00D97E] text-xs mt-0.5 truncate">{group.admin}</div>
            </div>

            <div>
              <div className="text-neutral-400">Share per Member:</div>
              <div className="text-sm font-semibold text-white mt-0.5">{amountPerMember} USDC</div>
            </div>
          </div>
        </div>

        {/* Member Status Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Current Cycle #{currentCycle} Member Tracker</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Solidity Event Listener: <code className="text-[#00D97E]">Contributed(groupId, cycle, member)</code></p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#00D97E]/10 border border-[#00D97E]/30 text-xs text-[#00D97E] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00D97E] animate-pulse"></span>
              Arc Event Stream Active
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-xs text-neutral-400 font-semibold uppercase">
                  <th className="py-4 px-6">Member</th>
                  <th className="py-4 px-6">Wallet Address</th>
                  <th className="py-4 px-6">Share Owed</th>
                  <th className="py-4 px-6 text-center">Cycle #{currentCycle} Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {group.members.map((member, idx) => {
                  const isPaid = !!currentCyclePaid[member.address];
                  const isUserActive = member.address.toLowerCase() === activeWallet.address.toLowerCase();

                  return (
                    <tr key={idx} className={`hover:bg-white/5 transition-colors ${isUserActive ? 'bg-[#00D97E]/5' : ''}`}>
                      <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                        <span>{member.name}</span>
                        {isUserActive && (
                          <span className="text-[10px] bg-[#00D97E]/20 text-[#00D97E] font-semibold px-2 py-0.5 rounded border border-[#00D97E]/40">
                            Connected Active
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-neutral-400">
                        {member.address}
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">
                        {amountPerMember} USDC
                      </td>
                      <td className="py-4 px-6 text-center">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D97E]/20 text-[#00D97E] text-xs font-semibold border border-[#00D97E]/40 shadow-[0_0_10px_rgba(0,217,126,0.2)]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Paid ✅
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/40">
                            <Clock className="w-3.5 h-3.5" />
                            Unpaid ⏳
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member & Admin Action Panel */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Member Action Panel */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#00D97E]" />
              Member Action Panel (Arc Native USDC Gas)
            </h3>

            {!isConnectedMember ? (
              <p className="text-xs text-neutral-400">
                The currently connected persona (<code>{activeWallet.name}</code>) is not a member of this group. Switch wallet persona above to test contribution.
              </p>
            ) : hasPaidCurrentCycle ? (
              <div className="p-4 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#00D97E] mx-auto" />
                <div className="text-sm font-bold text-white">You have paid for Cycle #{currentCycle}!</div>
                <p className="text-xs text-neutral-300">
                  Your share of {amountPerMember} USDC is deposited into the Arc vault contract.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300">
                  You owe <strong>{amountPerMember} USDC</strong> for Cycle #{currentCycle}. Approve USDC allowance and click Contribute to complete your payment on Arc Testnet.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Step 1: Approve */}
                  <button
                    onClick={handleApprove}
                    disabled={isAllowanceApproved || isApproving}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      isAllowanceApproved
                        ? 'bg-white/10 text-neutral-400 cursor-not-allowed border border-white/10'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {isApproving ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#00D97E]" />
                    ) : isAllowanceApproved ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00D97E]" />
                    ) : null}
                    <span>{isAllowanceApproved ? 'USDC Approved ✅' : '1. Approve USDC'}</span>
                  </button>

                  {/* Step 2: Contribute */}
                  <button
                    onClick={handleContribute}
                    disabled={!isAllowanceApproved || isContributing}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isAllowanceApproved
                        ? 'bg-[#00D97E] text-[#1A1A1A] hover:bg-[#00b569] neon-glow'
                        : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    {isContributing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    <span>Contribute {amountPerMember} USDC</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Action Panel (Manual Release) */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#9D00FF]" />
              Admin Controls
            </h3>

            {!isAdmin ? (
              <p className="text-xs text-neutral-400">
                Only the group admin (<code>{group.admin.slice(0, 6)}...</code>) can execute manual pool releases if the cycle deadline passes. Switch to Alex (Admin) to view controls.
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300">
                  If the cycle deadline passes or members are delayed, you can manually trigger a release to transfer whatever USDC is currently collected ({totalCollected} USDC) to the recipient.
                </p>

                <button
                  onClick={() => manualRelease(group.groupId)}
                  disabled={totalCollected === 0}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    totalCollected > 0
                      ? 'bg-[#9D00FF] text-white hover:bg-[#8B00E0] shadow-[0_0_15px_rgba(157,0,255,0.4)]'
                      : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Release Funds ({totalCollected} USDC) & Advance Cycle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
