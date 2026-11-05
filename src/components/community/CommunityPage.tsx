import { useState } from 'react';
import { 
  Users, MessageSquare, Send, Sparkles, ArrowRight, ShieldCheck, 
  ArrowLeft, ExternalLink, Trophy, Flame, Check, Copy, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../../types';

interface CommunityPageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
  currentUser: User | null;
}

export default function CommunityPage({ onNavigate, onOpenAuth, currentUser }: CommunityPageProps) {
  const [callsign, setCallsign] = useState(currentUser ? currentUser.username : 'LunarCadet');
  const [passGenerated, setPassGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const stats = [
    { label: 'Rat Pack Members', value: '28,490+', change: '+14% this week', icon: Users, color: 'text-amber-400' },
    { label: 'Memes Created', value: '14,280+', change: '+320 today', icon: Sparkles, color: 'text-cyan-400' },
    { label: 'Active Creators', value: '1,840+', change: 'Verified memers', icon: Trophy, color: 'text-purple-400' },
    { label: 'Meme Raids Conducted', value: '94', change: '100% viral rate', icon: Flame, color: 'text-rose-400' },
  ];

  const socialLinks = [
    {
      name: 'X (Twitter)',
      tagline: 'Meme raids, live updates, spaces, and community highlights.',
      handle: '@MoonRatSol',
      members: '32.4K Followers',
      url: 'https://twitter.com',
      buttonText: 'Follow on X',
      badgeColor: 'bg-black text-white border-slate-700',
    },
    {
      name: 'Telegram Group',
      tagline: 'Main command bridge. 24/7 banter, raiding voice chats, and announcements.',
      handle: 't.me/MoonRatOfficial',
      members: '18.9K Members',
      url: 'https://t.me',
      buttonText: 'Join Telegram',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    },
    {
      name: 'Discord Citadel',
      tagline: 'Meme Lab workshops, art bounties, lore debates, and bot games.',
      handle: 'discord.gg/moonrat',
      members: '12.1K Members',
      url: 'https://discord.com',
      buttonText: 'Enter Discord',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    },
  ];

  const handleGeneratePass = () => {
    setPassGenerated(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.origin + '?ref=' + callsign);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono text-amber-400">
          GLOBAL RAT PACK OUTPOSTS
        </span>
      </div>

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          The Underground Army
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight [text-wrap:balance]">
          JOIN THE RAT PACK.
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          The Moon Rat community is not a passive telegram audience. We are a decentralized collective of memers, artists, developers, and diamond paws steering this rocket toward lunar sovereignty.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-[#080d19]/80 backdrop-blur-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{stat.label}</span>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-emerald-400 font-mono">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Official Outposts Grid */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-black text-white font-display">Official Channels</h2>
          <p className="text-xs text-slate-400 mt-1">
            Beware of impersonators. Only join official outposts linked here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((social, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-[#090d18] p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-display">{social.name}</h3>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${social.badgeColor}`}>
                    {social.members}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{social.tagline}</p>
                <div className="text-xs font-mono text-amber-400/90">{social.handle}</div>
              </div>

              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{social.buttonText}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Rat Pack ID Card Generator */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#0b1021] to-[#070a14] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              ASTRONAUT REGISTRATION
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display leading-tight">
              Mint Your Official Rat Pack Crew Pass
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every astronaut rodent needs credentials. Customize your callsign and claim your digital crew pass to signify your status in the Moon Rat expedition.
            </p>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono text-slate-400 block">Astronaut Callsign</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16))}
                  placeholder="Enter your callsign"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                />
                <button
                  onClick={handleGeneratePass}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all whitespace-nowrap"
                >
                  Issue Pass
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyInvite}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Invite Link Copied!' : 'Copy Recruitment Link'}</span>
              </button>
            </div>
          </div>

          {/* Holographic Pass Display */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-amber-400/40 bg-gradient-to-br from-slate-900 via-[#0a0f1e] to-slate-950 p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐀</span>
                  <div>
                    <h3 className="text-xs font-black text-white font-display">MOON RAT EXPEDITION</h3>
                    <span className="text-[10px] font-mono text-amber-400">CREW PASS · CLASS I</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              <div className="py-6 flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl overflow-hidden border border-amber-400/50 bg-slate-950 shrink-0">
                  <img
                    src="/assets/aistudio/IMG_6514_4330a477.jpeg"
                    alt="Moon Rat Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">ASTRONAUT CALLSIGN</div>
                  <div className="text-lg font-black text-white font-mono tracking-wide">
                    @{callsign || 'MoonCadet'}
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                    ID: MR-{Math.abs(callsign.split('').reduce((a, b) => a + b.charCodeAt(0), 0) * 42).toString().padStart(6, '0')}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>DESTINATION: LUNAR REGOLITH</span>
                <span className="text-slate-300 font-bold">100% UNRUGGABLE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
