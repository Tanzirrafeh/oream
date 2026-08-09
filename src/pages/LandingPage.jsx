import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Network, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2, 
  FileCode, 
  Quote, 
  Star 
} from 'lucide-react';
import { useOream } from '../context/OreamContext';

export default function LandingPage({ setActivePage }) {
  const { groups } = useOream();

  return (
    <div className="pt-20">
      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-full grid-bg opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1A4D3A] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00D9FF] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00D97E]/30 bg-[#00D97E]/10">
              <img src="/oream_logo.png" alt="Oream Official Emblem" className="w-5 h-5 rounded-full object-cover" />
              <span className="text-xs font-semibold text-[#00D97E] tracking-wide uppercase">Arc Testnet Native • USDC Gas</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1]">
              Transform every <span className="text-[#00D97E]">recurring expense</span> into a seamless flow.
            </h1>
            
            <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
              Formalized cycle payments for roommates and group subscriptions on Arc. Define the group once, contribute USDC each cycle, and track live member status transparently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActivePage('create')}
                className="px-8 py-4 rounded-lg bg-[#00D97E] text-[#1A1A1A] font-semibold text-base hover:bg-[#00b569] transition-all neon-glow flex items-center justify-center gap-2 group"
              >
                <span>Create Group Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setActivePage('dashboard')}
                className="px-8 py-4 rounded-lg glass-panel text-white font-medium text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Live Dashboard</span>
              </button>
            </div>
          </div>

          {/* Fake UI Mockup */}
          <div className="relative">
            <div className="relative rounded-2xl glass-panel p-6 border border-white/10 shadow-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <img src="/oream_logo.png" alt="Oream Brand" className="w-6 h-6 rounded-md object-cover" />
                  <span className="text-xs font-bold text-white tracking-wider">OREAM PROTOCOL</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono">dashboard.oream.io</div>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-neutral-400 mb-1">Current Pool Collected</div>
                  <div className="text-2xl font-semibold text-white tracking-tight">2,250 USDC</div>
                  <div className="text-xs text-[#00D97E] mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 100% Target Met
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-neutral-400 mb-1">Arc Settlement</div>
                  <div className="text-2xl font-semibold text-white tracking-tight">&lt; 1.0s</div>
                  <div className="text-xs text-[#00D9FF] mt-2 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Sub-second Finality
                  </div>
                </div>
              </div>

              {/* Graph Visualization (7 Bars - Exact Structure preserved) */}
              <div className="h-32 flex items-end gap-2 px-2">
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[40%] rounded-t-sm opacity-50"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[60%] rounded-t-sm opacity-60"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[30%] rounded-t-sm opacity-40"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[80%] rounded-t-sm opacity-80"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[55%] rounded-t-sm opacity-60"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[95%] rounded-t-sm shadow-[0_0_15px_#00D97E]"></div>
                <div className="flex-1 bg-gradient-to-t from-[#00D97E]/20 to-[#00D97E] h-[70%] rounded-t-sm opacity-70"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-20 right-8 px-3 py-1.5 bg-[#1A1A1A]/90 border border-[#00D97E]/30 backdrop-blur-md rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
                <img src="/oream_logo.png" alt="Oream Icon" className="w-4 h-4 rounded-full" />
                <span className="text-xs text-white">USDC Payment Verified ✅</span>
              </div>
            </div>
            {/* Decorative Glow Behind */}
            <div className="absolute -inset-4 bg-[#00D97E] opacity-20 blur-2xl -z-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 3. TRUST BAR */}
      <section className="border-y border-white/5 bg-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-70 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 group">
              <ShieldCheck className="text-[#00D97E] w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide">ARC TESTNET NATIVE</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Cpu className="text-[#9D00FF] w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide">CIRCLE CCTP V2 & APP KIT</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Zap className="text-[#00D9FF] w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide">SUB-SECOND FINALITY</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Lock className="text-[#00D97E] w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide">USDC NATIVE GAS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Complete Shared-Expense Platform</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Automated onchain cycle tracking designed for roommates, subscriptions, and recurring group payments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-[#1F1F1F] border border-white/5 hover:border-[#00D97E] transition-all duration-300 hover:bg-[#252525]">
              <div className="w-12 h-12 rounded-lg bg-[#1A4D3A]/50 flex items-center justify-center mb-6 text-[#00D97E] group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">Recurring Cycles</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Set fixed contribution amounts and cycle deadlines. Each period resets automatically upon completion.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-[#1F1F1F] border border-white/5 hover:border-[#00D97E] transition-all duration-300 hover:bg-[#252525]">
              <div className="w-12 h-12 rounded-lg bg-[#1A4D3A]/50 flex items-center justify-center mb-6 text-[#00D9FF] group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">Smart Pool Release</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Funds auto-release to recipient when 100% collected, or manually by admin if deadline passes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-2xl bg-[#1F1F1F] border border-white/5 hover:border-[#00D97E] transition-all duration-300 hover:bg-[#252525]">
              <div className="w-12 h-12 rounded-lg bg-[#1A4D3A]/50 flex items-center justify-center mb-6 text-[#9D00FF] group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">Cycle Audit Trail</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Transparent onchain records of who paid on time, who missed, and when recipient funds were transferred.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-8 rounded-2xl bg-[#1F1F1F] border border-white/5 hover:border-[#00D97E] transition-all duration-300 hover:bg-[#252525]">
              <div className="w-12 h-12 rounded-lg bg-[#1A4D3A]/50 flex items-center justify-center mb-6 text-[#A8D5A8] group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">Live Status Badges</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Real-time Paid / Unpaid badges, progress bar, and countdown timer for every member in the group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. API / CONTRACT SECTION */}
      <section id="integration" className="py-24 bg-[#151515] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Powered by Arc Smart Contracts <br />& Circle Infrastructure.
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Oream smart contract (<code className="text-[#00D97E]">Oream.sol</code>) handles cycle state, USDC transfer approvals, instant pool releases, and historic payment tracking on Arc.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-[#00D97E] w-5 h-5" />
                <span className="text-neutral-300">Native USDC gas fees on Arc Testnet</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-[#00D97E] w-5 h-5" />
                <span className="text-neutral-300">Circle App Kit & CCTP cross-chain bridge support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-[#00D97E] w-5 h-5" />
                <span className="text-neutral-300">Event-driven status updates (<code className="text-[#00D9FF]">Contributed</code> & <code className="text-[#00D9FF]">CycleReleased</code>)</span>
              </li>
            </ul>

            <div className="flex gap-4">
              <button 
                onClick={() => setActivePage('create')}
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00D9FF] text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <FileCode className="w-4 h-4 text-[#00D9FF]" />
                <span>Launch Group Contract</span>
              </button>
            </div>
          </div>

          {/* Code Block */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00D97E] to-[#00D9FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-xl bg-[#0F0F0F] border border-white/10 p-6 shadow-2xl font-mono text-xs md:text-sm overflow-x-auto">
              {/* Window Controls */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              
              {/* Code */}
              <pre className="text-neutral-300">
                <span className="text-[#9D00FF]">import</span> &#123; createPublicClient, http &#125; <span className="text-[#9D00FF]">from</span> <span className="text-[#A8D5A8]">'viem'</span>;{"\n"}
                <span className="text-[#9D00FF]">import</span> &#123; arcTestnet &#125; <span className="text-[#9D00FF]">from</span> <span className="text-[#A8D5A8]">'viem/chains'</span>;{"\n\n"}
                <span className="text-[#565656]">// 1. Member approves & contributes USDC</span>{"\n"}
                <span className="text-[#9D00FF]">const</span> txHash = <span className="text-[#9D00FF]">await</span> oreamContract.<span className="text-[#00D9FF]">contribute</span>(&#123;{"\n"}
                {"  "}groupId: <span className="text-[#F0F0F0]">1</span>,{"\n"}
                {"  "}account: <span className="text-[#A8D5A8]">'0x2546...ECEc30'</span>{"\n"}
                &#125;);{"\n\n"}
                <span className="text-[#565656]">// 2. Contract verifies collection target</span>{"\n"}
                <span className="text-[#9D00FF]">if</span> (cycleCollected == totalTarget) &#123;{"\n"}
                {"  "}<span className="text-[#00D97E]">console</span>.log(<span className="text-[#A8D5A8]">'Pool Released to Recipient 🚀'</span>);{"\n"}
                &#125;
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="workflow" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How Oream Workflow Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Follow the 3-step cycle to automate group rent, subscription splits, and recurring expense tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#00D97E]/30 to-transparent -z-10"></div>

            {/* Step 1 */}
            <div className="relative group">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#1A1A1A] border border-[#00D97E]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,126,0.1)] group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <span className="text-3xl font-bold text-[#00D97E]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Creates Group</h3>
              <p className="text-sm text-neutral-400 px-8">
                Set member wallet addresses, fixed per-member USDC contribution share, cycle length (e.g. 30 days), and recipient wallet address.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#1A1A1A] border border-[#00D97E]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,126,0.1)] group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <span className="text-3xl font-bold text-[#00D97E]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Members Contribute Share</h3>
              <p className="text-sm text-neutral-400 px-8">
                Members open group dashboard, approve USDC, and click "Contribute". Status flips to "Paid ✅" instantly in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#1A1A1A] border border-[#00D97E]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,126,0.1)] group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <span className="text-3xl font-bold text-[#00D97E]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto or Manual Release</h3>
              <p className="text-sm text-neutral-400 px-8">
                Pooled USDC releases to recipient when 100% collected (or manual admin trigger if deadline passes). New cycle starts automatically!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#151515]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
            Trusted by Roommates & Dev Teams
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-8 rounded-2xl bg-[#1A1A1A] border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-[#1A4D3A] w-8 h-8 opacity-50" />
              <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "No more chasing roommate Venmo payments every 1st of the month. Oream gives us a clear status board and automatically transfers rent to our landlord when everyone pays."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00D9FF] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                  RM
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Ricardo Mendes</div>
                  <div className="text-xs text-neutral-500">Apartment Rent Admin</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-2xl bg-[#1A1A1A] border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-[#1A4D3A] w-8 h-8 opacity-50" />
              <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "We split our Web3 infrastructure and node provider costs across 4 dev partners using Oream on Arc. Sub-second finality with USDC gas makes contributions effortless."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9D00FF] flex items-center justify-center text-white font-bold text-sm">
                  AL
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Ana Lima</div>
                  <div className="text-xs text-neutral-500">Lead Dev @ NodeGuild</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-2xl bg-[#1A1A1A] border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-[#1A4D3A] w-8 h-8 opacity-50" />
              <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "The historic cycle log is incredible. We can verify past monthly payments instantly without digging through old bank receipts."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00D97E] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                  CS
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Carlos Silva</div>
                  <div className="text-xs text-neutral-500">Co-living Coordinator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#1A4D3A] opacity-30"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D97E] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,217,126,0.4)] border border-[#00D97E]/50">
            <img src="/oream_logo.png" alt="Oream Official Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Ready to streamline your recurring shared expenses?
          </h2>
          <p className="text-neutral-400 text-lg mb-10">
            Create your first group on Arc Testnet in less than 2 minutes.
          </p>
          
          <button 
            onClick={() => setActivePage('create')}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#00D97E] text-[#1A1A1A] font-bold text-lg hover:bg-[#00b569] transition-all neon-glow hover:scale-105 transform duration-200"
          >
            <span>Create Shared Group Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
