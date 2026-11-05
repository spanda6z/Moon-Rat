import { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Heart, MessageSquare, 
  Flame, Lock, Eye, CheckCircle2, ChevronRight, Layers, Trophy
} from 'lucide-react';
import { TokenConfig, Post } from '../../types';

interface HomeSectionsProps {
  onNavigate: (tab: string) => void;
  tokenConfig: TokenConfig;
  posts: Post[];
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onPostClick: (post: Post) => void;
  onLikeToggle: (postId: string) => void;
}

export default function HomeSections({
  onNavigate,
  tokenConfig,
  posts,
  onOpenAuth,
  isLoggedIn,
  onPostClick,
  onLikeToggle,
}: HomeSectionsProps) {
  const [activeNarrativeStep, setActiveNarrativeStep] = useState(0);

  const narrativeChapters = [
    {
      title: '01. The Sewer Awakening',
      subtitle: 'Earth was no longer enough',
      description: 'Crawling out of manhole grate #42 into the rainy night, one rodent saw the full moon illuminating the grime and made an eternal vow: We are leaving this rock.',
      image: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    },
    {
      title: '02. Backyard Aerodynamics',
      subtitle: 'Galvanized tin and high-grade duct tape',
      description: 'Equipped with a rusted 10mm wrench, an improvised oxygen canister, and pure meme determination, Moon Rat assembled the world’s first rodent-piloted orbital rocket.',
      image: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    },
    {
      title: '03. Lunar Soil Touchdown',
      subtitle: 'Looking back at a quiet planet',
      description: 'Paws planted firmly on lunar regolith. Looking back at Earth while claiming the eternal cheese reserves for every meme creator in web3 history.',
      image: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    },
  ];

  const whyPillars = [
    {
      title: 'Decentralized Rodent Spirit',
      desc: 'No venture capital overlords. Moon Rat belongs 100% to the creators, memers, and diamond paws holding the line.',
      icon: ShieldCheck,
      color: 'text-amber-400',
    },
    {
      title: '0% Tax & Burned Liquidity',
      desc: 'Zero buy tax, zero sell tax. 100% of the initial liquidity pool tokens were permanently sent to the cosmic burn vault.',
      icon: Lock,
      color: 'text-cyan-400',
    },
    {
      title: 'Meme Lab Creator Engine',
      desc: 'Not just passive hype. An on-chain and web3 creative suite where top meme architects get rewarded, tipped, and spotlighted.',
      icon: Zap,
      color: 'text-purple-400',
    },
    {
      title: 'Unstoppable Internet Culture',
      desc: 'Memes are the true native language of Web3. Moon Rat transcends fleeting cycles through timeless storytelling and lore.',
      icon: Flame,
      color: 'text-rose-400',
    },
  ];

  const featuredMemes = posts.slice(0, 3);

  return (
    <div className="relative z-10 space-y-24 sm:space-y-32 py-12">
      
      {/* SECTION 1: ABOUT MOON RAT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-[#090d18]/90 p-8 sm:p-12 lg:p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                The Cosmic Paradigm
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight [text-wrap:balance]">
                A rodent with a dream, a wrench, and a one-way ticket to the stars.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                In a crypto space dominated by generic corporate tokens and recycled mascots, Moon Rat represents the grit of the underdog. Born in the damp underbelly of the city streets, our mascot engineered his own destiny through sheer ingenuity.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Moon Rat is an open creative sandbox. We blend decentralized finance with interactive meme creation, crowd-sourced lore, and digital culture where every member of the Rat Pack has a voice in shaping the mission.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('narrative')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors"
                >
                  <span>Read Full Lore</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </button>
                <button
                  onClick={() => onNavigate('community')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 font-medium text-sm transition-colors"
                >
                  <span>Meet The Community</span>
                </button>
              </div>
            </div>

            {/* Asymmetric visual bento feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 aspect-[4/3] group shadow-2xl">
                <img
                  src="/assets/aistudio/IMG_6516_d24652b4.jpeg"
                  alt="Moon Rat assembling his rocket in the meadow"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-300 flex justify-between items-center bg-black/60 backdrop-blur-md p-2.5 rounded-lg border border-white/10">
                  <span>BLUEPRINT: RODENT-V1</span>
                  <span className="text-amber-400 font-bold">100% COMMUNITY GRIT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHY MOON RAT? */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
            Core Fundamentals
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight [text-wrap:balance]">
            Why the Rat Pack Always Wins
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered from day zero to be fair, viral, unruggable, and powered by user-generated comedy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyPillars.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#080c16]/80 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 w-fit ${p.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>RULE #{idx + 1}</span>
                  <span className="text-emerald-400">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: THE NARRATIVE PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">The Chronicled Lore</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display mt-1">
                The Odyssey in Three Acts
              </h2>
            </div>
            <button
              onClick={() => onNavigate('narrative')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Interactive Storytelling</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Act Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {narrativeChapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveNarrativeStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeNarrativeStep === idx
                      ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-lg shadow-amber-500/10'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-white">{ch.title}</span>
                    <span className="text-xs font-mono text-amber-400">{ch.subtitle}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {ch.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Visual Display for selected act */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-[16/10] bg-slate-900 shadow-2xl">
                <img
                  src={narrativeChapters[activeNarrativeStep].image}
                  alt={narrativeChapters[activeNarrativeStep].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white font-display">
                    {narrativeChapters[activeNarrativeStep].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {narrativeChapters[activeNarrativeStep].description}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: TOKEN INFORMATION PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#0b0f1d] to-[#070912] p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">Token Mechanics</span>
              <h2 className="text-3xl font-extrabold text-white font-display mt-1">
                $MRAT Token Allocation
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Zero mint authority, verified immutable contract, fair community distribution.
              </p>
            </div>
            <button
              onClick={() => onNavigate('token')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all whitespace-nowrap self-start md:self-auto"
            >
              <span>View Full Tokenomics</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokenConfig.allocations.map(alloc => (
              <div
                key={alloc.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-white tabular-nums">
                    {alloc.percentage}%
                  </span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: alloc.color }}
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-200">{alloc.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{alloc.description}</p>
                <div className="pt-2 text-[11px] font-mono text-slate-400">{alloc.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MEME LAB INTRODUCTION PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-500/20 bg-[#080d1a] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>USER-GENERATED WEAPONRY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-tight [text-wrap:balance]">
                The Meme Lab: Where Community Becomes Culture.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                We built an integrated meme canvas directly into the website. Choose from official Moon Rat templates, customize captions, upload your own images, tag, and publish straight into the live community feed.
              </p>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>No wallet needed — simple username & password authentication</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Interactive meme canvas editor with custom text & sticker layers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Admin curated "Featured Moon Rat Meme" spotlight badges</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (isLoggedIn) onNavigate('memelab');
                    else onOpenAuth();
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 fill-slate-950" />
                  <span>Launch Meme Studio</span>
                </button>
              </div>
            </div>

            {/* Meme Lab Preview Frame */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
                  <span>MEME_STUDIO // CANVAS_LIVE</span>
                  <span className="text-emerald-400">READY</span>
                </div>
                <div className="mt-3 relative rounded-xl overflow-hidden aspect-video border border-slate-800">
                  <img
                    src="/assets/aistudio/IMG_6514_4330a477.jpeg"
                    alt="Moon Rat on the Moon"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-0 right-0 text-center px-4">
                    <span className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      WHEN THEY SAID
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center px-4">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 font-display uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      THE MOON WAS CHEESE
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST COMMUNITY MEMES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-mono">Social Stream</span>
            <h2 className="text-3xl font-extrabold text-white font-display mt-1">
              Latest Community Memes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('feed')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Feed Memes</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMemes.map(post => (
            <div
              key={post.id}
              onClick={() => onPostClick(post)}
              className="rounded-2xl border border-slate-800/80 bg-[#070b14] overflow-hidden hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-bold text-[10px] font-mono px-2 py-0.5 rounded shadow">
                      FEATURED
                    </div>
                  )}
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="h-6 w-6 rounded-full object-cover border border-amber-400/30"
                    />
                    <span className="text-xs font-semibold text-slate-300">@{post.username}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.caption}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeToggle(post.id);
                  }}
                  className={`flex items-center gap-1.5 hover:text-rose-400 transition-colors ${
                    post.isLiked ? 'text-rose-500' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                  <span className="tabular-nums font-mono">{post.likesCount}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span className="tabular-nums font-mono">{post.commentsCount}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: ROADMAP PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-[#070b16] p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">Trajectory</span>
              <h2 className="text-3xl font-extrabold text-white font-display mt-1">
                The Cosmic Roadmap
              </h2>
            </div>
            <button
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Complete Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">PHASE 01 · COMPLETE</span>
              <h3 className="text-sm font-bold text-white">The Rat Awakens</h3>
              <p className="text-xs text-slate-400">Fair launch, LP locked forever, and social outposts deployed.</p>
            </div>
            <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 space-y-2 relative">
              <span className="text-xs font-mono font-bold text-amber-400">PHASE 02 · ACTIVE</span>
              <h3 className="text-sm font-bold text-white">Meme Invasion</h3>
              <p className="text-xs text-slate-400">Interactive Meme Lab live, creator bounties, CoinGecko tracking.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-slate-400">PHASE 03 · UPCOMING</span>
              <h3 className="text-sm font-bold text-white">Moon Mission</h3>
              <p className="text-xs text-slate-400">Cheese Vault staking, CEX listings, and global rat events.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-slate-400">PHASE 04 · BEYOND</span>
              <h3 className="text-sm font-bold text-white">Beyond The Moon</h3>
              <p className="text-xs text-slate-400">Animated mini-series, physical astronaut merch, interplanetary bridges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: JOIN THE COMMUNITY (CTA) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-purple-600/15 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              The Cosmic Invitation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight [text-wrap:balance]">
              JOIN THE RAT PACK.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Don’t stay trapped underground. Board the rocket, build memes with thousands of creators worldwide, and help write web3 history.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (isLoggedIn) onNavigate('memelab');
                  else onOpenAuth();
                }}
                className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-400/20 transition-all active:scale-95"
              >
                Join & Create Memes Now
              </button>
              <button
                onClick={() => onNavigate('community')}
                className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
              >
                Community Outposts
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
