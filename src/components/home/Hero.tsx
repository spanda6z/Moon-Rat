import { useState } from 'react';
import { Sparkles, Compass, Copy, Check, TrendingUp, Flame, Users, Coins } from 'lucide-react';
import { TokenConfig } from '../../types';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  tokenConfig: TokenConfig;
}

export default function Hero({ onNavigate, onOpenAuth, isLoggedIn, tokenConfig }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenConfig.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMemeLabClick = () => {
    if (isLoggedIn) {
      onNavigate('memelab');
    } else {
      onOpenAuth();
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden pt-8 pb-16">
      
      {/* Background glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Mission Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>MISSION: APOLLO RODENT-1 · STATUS: REACHING ORBIT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.08] [text-wrap:balance]">
              THE RAT IS GOING TO THE MOON.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Moon Rat is more than a token. It’s a meme, a movement, and a community building its own identity across the internet.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleMemeLabClick}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-xl hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/25 active:scale-95 transition-all whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4 fill-slate-950" />
                <span>Enter Meme Lab</span>
              </button>

              <button
                onClick={() => onNavigate('narrative')}
                className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 border border-slate-700/80 bg-slate-900/60 rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all whitespace-nowrap"
              >
                <Compass className="h-4 w-4 text-cyan-400" />
                <span>Explore the Narrative</span>
              </button>
            </div>

            {/* Contract Bar */}
            <div className="pt-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center justify-between gap-2 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-[10px]">
                    CA
                  </span>
                  <span className="truncate text-slate-300 select-all font-mono">
                    {tokenConfig.contractAddress}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center gap-1.5 text-[11px] transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature (Moon Rat on Lunar Surface) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Cinematic Frame */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/50 shadow-2xl shadow-cyan-950/40 glow-lunar group">
              <img
                src="/assets/aistudio/IMG_6514_4330a477.jpeg"
                alt="Moon Rat standing triumphantly on the lunar surface overlooking Earth"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-transparent to-transparent opacity-80" />

              {/* Character Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#090d18]/85 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <h2 className="text-sm font-bold text-white font-display">Moon Rat #001</h2>
                      <p className="text-xs text-slate-400">Coordinates: Sea of Tranquility</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('narrative')}
                    className="text-xs font-semibold text-amber-400 hover:underline"
                  >
                    Read Lore →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Live Market & Community KPI Strip */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-sm">
          
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Coins className="h-4 w-4 text-amber-400" />
              <span>Token Price ($MRAT)</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                {tokenConfig.priceUsd}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5 inline" />
                +{tokenConfig.priceChange24h}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Market Cap</span>
            </div>
            <div className="mt-1">
              <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                {tokenConfig.marketCap}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Users className="h-4 w-4 text-purple-400" />
              <span>Rat Pack Army</span>
            </div>
            <div className="mt-1">
              <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                {tokenConfig.holdersCount.toLocaleString()} Holders
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Flame className="h-4 w-4 text-rose-500" />
              <span>Permanent Burn</span>
            </div>
            <div className="mt-1">
              <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                {tokenConfig.burnedPercentage}% Incinerated
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
