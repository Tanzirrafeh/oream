import React from 'react';
import { History, ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function GroupHistory({ groupId, setActivePage }) {
  const { groups } = useOream();
  const group = groups.find((g) => g.groupId === groupId) || groups[0];

  if (!group) return null;

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1A4D3A] opacity-15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <button
              onClick={() => setActivePage('dashboard')}
              className="text-xs text-[#00D97E] hover:underline flex items-center gap-1 mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Group Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <History className="w-8 h-8 text-[#00D9FF]" />
              Cycle Payment History • {group.name}
            </h1>
          </div>

          <div className="text-right text-xs text-neutral-400">
            <div>Group ID: #{group.groupId}</div>
            <div>Total Past Cycles Recorded: {group.history.length}</div>
          </div>
        </div>

        {/* History Table */}
        {group.history.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center space-y-3">
            <ShieldCheck className="w-12 h-12 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No Past Cycles Recorded Yet</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Once Cycle #0 completes or is released by admin, the full payment record, paid/missed status badges, and payout timestamp will appear here.
            </p>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-lg font-bold text-white">Completed & Released Cycles Audit Log</h2>
              <span className="text-xs text-[#00D97E] font-mono">Arc Testnet Verified</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-neutral-400 font-semibold uppercase">
                    <th className="py-4 px-6">Cycle</th>
                    <th className="py-4 px-6">Release Status</th>
                    <th className="py-4 px-6">Collected / Target</th>
                    <th className="py-4 px-6">Paid Members</th>
                    <th className="py-4 px-6">Release Date</th>
                    <th className="py-4 px-6 text-right">Explorer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {group.history.map((record, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        {record.cycleName}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          record.status.includes('Auto')
                            ? 'bg-[#00D97E]/20 text-[#00D97E] border-[#00D97E]/40'
                            : 'bg-[#9D00FF]/20 text-[#9D00FF] border-[#9D00FF]/40'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">
                        {record.totalCollected.toLocaleString()} / {record.targetAmount.toLocaleString()} USDC
                      </td>
                      <td className="py-4 px-6 text-xs text-neutral-300">
                        {record.paidMembers ? `${record.paidMembers.length} of ${group.members.length} Paid` : 'All Paid'}
                      </td>
                      <td className="py-4 px-6 text-xs text-neutral-400 font-mono">
                        {new Date(record.releasedTimestamp).toLocaleDateString()} {new Date(record.releasedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="https://testnet.arcscan.app"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#00D9FF] hover:underline"
                        >
                          ArcScan <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
