import { useState } from 'react';
import { 
  Copy, Check, ShieldCheck, Flame, Coins, Lock, ExternalLink, 
  Settings, ArrowLeft, AlertTriangle, Calculator, Sparkles
} from 'lucide-react';
import { TokenConfig } from '../../types';

interface TokenPageProps {
  tokenConfig: TokenConfig;
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export default function TokenPage({ tokenConfig, onNavigate, onOpenAdmin, isAdmin }: TokenPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeAlloc, setActiveAlloc] = useState<string | null>(null);
  const [simTokens, setSimTokens] = useState<number>(100000);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenConfig.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculatedValueUsd = (simTokens * parseFloat(tokenConfig.priceUsd.replace('$', ''))).toFixed(2);

  return (
    <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        {isAdmin && (
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Edit Token Data (Admin)</span>
          </button>
        )}
      </div>

      {/* Main Title & Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          Tokenomics Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight [text-wrap:balance]">
          $MRAT Token Economics
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Built for sustainability, transparent fair launch, and empowering creators in the Moon Rat ecosystem.
        </p>
      </div>

      {/* Official Security Warning Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
          <div className="text-xs sm:text-sm text-slate-300">
            <span className="font-bold text-white">Always verify the official contract address: </span>
            Never buy tokens from unverified links or fake copycats.
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shrink-0">
          AUDIT: IMMUTABLE
        </span>
      </div>

      {/* Contract & Core Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contract Card */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-lg">
                🐀
              </span>
              <div>
                <h2 className="text-lg font-bold text-white font-display">{tokenConfig.name}</h2>
                <span className="text-xs font-mono text-amber-400">{tokenConfig.symbol}</span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {tokenConfig.network}
            </span>
          </div>

          {/* Copyable Contract Address */}
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-2">Verified Contract Address</label>
            <div className="flex items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs">
              <span className="truncate text-slate-200 select-all font-mono">{tokenConfig.contractAddress}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">TOTAL SUPPLY</span>
              <span className="text-sm font-bold font-mono text-white mt-1 block">
                {tokenConfig.totalSupply}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">CIRCULATING</span>
              <span className="text-sm font-bold font-mono text-white mt-1 block">
                {tokenConfig.circulatingSupply}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">PERMANENT BURN</span>
              <span className="text-sm font-bold font-mono text-rose-400 mt-1 block">
                {tokenConfig.burnedPercentage}% of Supply
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">BUY / SELL TAX</span>
              <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
                0% / 0% (Zero Tax)
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">LIQUIDITY STATUS</span>
              <span className="text-sm font-bold font-mono text-cyan-400 mt-1 block">
                100% Burned Forever
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">CURRENT HOLDERS</span>
              <span className="text-sm font-bold font-mono text-amber-400 mt-1 block">
                {tokenConfig.holdersCount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://dexscreener.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors"
            >
              <span>DexScreener Live Chart</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://solscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors"
            >
              <span>View On Explorer</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

        {/* Right Column: Holdings Calculator */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Calculator className="h-5 w-5" />
              <h2 className="text-base font-bold text-white font-display">Cheese Holdings Simulator</h2>
            </div>
            <p className="text-xs text-slate-400">
              Calculate the nominal value and projected meme power of your $MRAT bags.
            </p>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono text-slate-400 block">Enter $MRAT Amount:</label>
              <input
                type="number"
                value={simTokens}
                onChange={e => setSimTokens(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
              />

              <div className="flex gap-2">
                {[10000, 50000, 100000, 500000].map(val => (
                  <button
                    key={val}
                    onClick={() => setSimTokens(val)}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-mono block">ESTIMATED FIAT EQUIVALENT</span>
              <div className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                ${calculatedValueUsd} USD
              </div>
              <span className="text-[11px] text-slate-400 block">
                Based on current reference price: {tokenConfig.priceUsd}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Pack Status:</span>
            <span className="text-emerald-400 font-mono font-semibold">
              {simTokens > 200000 ? '🚀 Orbital Commander' : '🧀 Scout Rodent'}
            </span>
          </div>
        </div>

      </div>

      {/* Visual Token Allocation Breakdown */}
      <div className="rounded-3xl border border-slate-800 bg-[#070b15] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Supply Distribution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Token Allocation Breakdown
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Total Cap: <span className="text-white font-mono font-bold">1,000,000,000 $MRAT</span>
          </div>
        </div>

        {/* Visual Allocation Bar */}
        <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-900 border border-slate-800">
          {tokenConfig.allocations.map(alloc => (
            <div
              key={alloc.id}
              style={{
                width: `${alloc.percentage}%`,
                backgroundColor: alloc.color,
              }}
              title={`${alloc.label}: ${alloc.percentage}%`}
              className="h-full transition-all cursor-pointer hover:opacity-90"
              onMouseEnter={() => setActiveAlloc(alloc.id)}
            />
          ))}
        </div>

        {/* Allocation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokenConfig.allocations.map(alloc => {
            const isHovered = activeAlloc === alloc.id;
            return (
              <div
                key={alloc.id}
                onMouseEnter={() => setActiveAlloc(alloc.id)}
                onMouseLeave={() => setActiveAlloc(null)}
                className={`p-5 rounded-2xl border transition-all ${
                  isHovered
                    ? 'border-amber-400/80 bg-slate-900 shadow-xl'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-white tabular-nums">
                    {alloc.percentage}%
                  </span>
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: alloc.color }}
                  />
                </div>
                <h3 className="text-sm font-bold text-white mt-2 font-display">{alloc.label}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alloc.description}</p>
                <div className="pt-3 mt-3 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                  {alloc.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
