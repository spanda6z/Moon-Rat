import { useState } from 'react';
import { Copy, Check, MessageSquare, Send, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { TokenConfig } from '../../types';

interface FooterProps {
  onNavigate: (tab: string) => void;
  tokenConfig: TokenConfig;
}

export default function Footer({ onNavigate, tokenConfig }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenConfig.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#04060b] pt-16 pb-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Quote banner */}
        <div className="mb-14 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-cyan-500/10 p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-2">The Lunar Directive</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-display">
              “THE MOON IS NOT THE DESTINATION. IT’S JUST THE BEGINNING.”
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
              Built on community grit, space duct tape, and relentless decentralized culture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-base shadow-md shadow-amber-400/20">
                🐀
              </span>
              <span className="text-xl font-black text-white font-display tracking-wider">MOON RAT</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                $MRAT
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Moon Rat is a meme-driven Web3 movement built around a determined space rodent on a cosmic journey. Uniting creators, memers, and diamond-pawed holders across the internet.
            </p>

            {/* Contract Bar */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 block mb-1.5">Official Contract Address ({tokenConfig.network})</span>
              <div className="flex items-center gap-2 max-w-md bg-slate-900/90 border border-slate-800 rounded-lg p-2 font-mono text-xs">
                <span className="truncate text-slate-300 select-all">{tokenConfig.contractAddress}</span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-amber-400 transition-colors shrink-0"
                  title="Copy official contract address"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Ecosystem
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('narrative')} className="hover:text-amber-400 transition-colors">
                  The Narrative & Lore
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('token')} className="hover:text-amber-400 transition-colors">
                  Tokenomics ($MRAT)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-amber-400 transition-colors">
                  Cosmic Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('memelab')} className="hover:text-amber-400 transition-colors text-amber-400/90 font-medium">
                  Meme Lab Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('feed')} className="hover:text-amber-400 transition-colors">
                  Community Feed
                </button>
              </li>
            </ul>
          </div>

          {/* Social Outposts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Rat Pack Outposts
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Send className="h-3.5 w-3.5 text-sky-400" />
                  <span>Telegram Hub</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Discord Burrow</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <span>DexScreener Chart</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Warning */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              Disclaimer: $MRAT is a meme community coin for digital culture, entertainment, and creative memes. Always verify the official contract address.
            </span>
          </div>
          <div className="text-slate-500 whitespace-nowrap">
            © {new Date().getFullYear()} Moon Rat Foundation. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
