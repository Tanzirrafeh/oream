import React, { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function CreateGroup({ setActivePage, setSelectedGroupId }) {
  const { createGroup, activeWallet } = useOream();

  const [groupName, setGroupName] = useState('Roommates Rent & Shared Utilities');
  const [members, setMembers] = useState([
    { name: 'Alex (Admin)', address: activeWallet.address },
    { name: 'Beatriz', address: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30' },
    { name: 'Charlie', address: '0xbDA57472851178a7ee8022C2538b2857492726E9' }
  ]);
  const [amountPerMember, setAmountPerMember] = useState('750');
  const [cycleLengthDays, setCycleLengthDays] = useState('30');
  const [recipient, setRecipient] = useState('0x9965553D10018447250004490226451904183a41');

  const handleAddMember = () => {
    const nextIdx = members.length + 1;
    setMembers([
      ...members,
      { name: `Member ${nextIdx}`, address: `0x${Math.random().toString(16).slice(2, 12)}...` }
    ]);
  };

  const handleRemoveMember = (index) => {
    if (members.length <= 1) return;
    setMembers(members.filter((_, idx) => idx !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !amountPerMember || !recipient || members.length === 0) {
      alert("Please fill in all required group fields.");
      return;
    }

    const newGroupId = createGroup({
      name: groupName,
      members,
      amountPerMember,
      cycleLengthDays,
      recipient
    });

    setSelectedGroupId(newGroupId);
    setActivePage('dashboard');
  };

  const totalPoolTarget = (parseFloat(amountPerMember) || 0) * members.length;

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1A4D3A] opacity-20 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D97E]/30 bg-[#00D97E]/10 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00D97E]" />
            <span className="text-xs font-semibold text-[#00D97E] uppercase tracking-wide">
              Step 1 • Create Group Contract
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Create a Recurring Expense Group
          </h1>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            Define members, contribution amount, cycle schedule, and recipient address on Arc Testnet.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl space-y-8 bg-[#1A1A1A]/80">
          
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Group Title / Purpose
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Sunset Apartment Rent, SaaS Team Subscription"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E] transition-colors"
              required
            />
          </div>

          {/* Members List */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-neutral-300">
                Group Members ({members.length})
              </label>
              <button
                type="button"
                onClick={handleAddMember}
                className="text-xs font-semibold text-[#00D97E] hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add Member Address
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-xs font-semibold text-neutral-400 w-6 text-center">#{idx + 1}</span>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                    placeholder="Member Name"
                    className="w-1/3 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E]"
                    required
                  />
                  <input
                    type="text"
                    value={member.address}
                    onChange={(e) => handleMemberChange(idx, 'address', e.target.value)}
                    placeholder="0x... Wallet Address"
                    className="w-2/3 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E]"
                    required
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amount & Cycle Length */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Contribution Share per Member (USDC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amountPerMember}
                  onChange={(e) => setAmountPerMember(e.target.value)}
                  placeholder="e.g. 750"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E] transition-colors"
                  required
                />
                <span className="absolute right-4 top-3.5 text-xs font-semibold text-[#00D97E]">USDC</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Cycle Length (Days)
              </label>
              <input
                type="number"
                value={cycleLengthDays}
                onChange={(e) => setCycleLengthDays(e.target.value)}
                placeholder="e.g. 30"
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E] transition-colors"
                required
              />
            </div>
          </div>

          {/* Recipient Address */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Recipient Wallet Address (Funds Payout Destination)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x... Landlord or Service Recipient Address"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D97E] transition-colors"
              required
            />
            <p className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-[#00D97E]" />
              Funds auto-release to this address when 100% of cycle contributions are submitted.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-[#00D97E]/10 border border-[#00D97E]/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400 uppercase font-semibold">Total Target per Cycle</div>
              <div className="text-xl font-bold text-[#00D97E]">{totalPoolTarget.toLocaleString()} USDC</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-neutral-400 font-semibold">Schedule</div>
              <div className="text-sm font-medium text-white">Every {cycleLengthDays || 0} Days</div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#00D97E] text-[#1A1A1A] font-bold text-base hover:bg-[#00b569] transition-all neon-glow flex items-center justify-center gap-2"
          >
            <span>Create & Deploy Group Contract</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
