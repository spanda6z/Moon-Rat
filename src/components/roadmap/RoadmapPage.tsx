import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Clock, Rocket, Sparkles, Flag, Star } from 'lucide-react';
import { INITIAL_ROADMAP } from '../../lib/storage';
import { RoadmapPhase } from '../../types';

interface RoadmapPageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export default function RoadmapPage({ onNavigate, onOpenAuth, isLoggedIn }: RoadmapPageProps) {
  const [phases] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);
  const [selectedPhase, setSelectedPhase] = useState<string>(phases[1].id);

  const getStatusBadge = (status: RoadmapPhase['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>MISSION SUCCESS</span>
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Rocket className="h-3.5 w-3.5 animate-pulse" />
            <span>CURRENT THRUSTER BURN</span>
          </span>
        );
      case 'upcoming':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <Clock className="h-3.5 w-3.5" />
            <span>ORBITAL TRAJECTORY</span>
          </span>
        );
    }
  };

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

        <span className="text-xs font-mono text-cyan-400">
          COSMIC ROADMAP · 2026-2027
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          Strategic Flight Path
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight [text-wrap:balance]">
          Moon Rat Mission Roadmap
        </h1>
        <p className="text-base text-slate-300">
          From grassroots subterranean launch to galactic cultural supremacy. Track every milestone achieved and planned.
        </p>
      </div>

      {/* Interactive Phase Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {phases.map((phase) => {
          const isSelected = selectedPhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-amber-400 bg-slate-900/90 shadow-xl shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold">{phase.phaseNumber}</span>
                <span className="text-slate-400">{phase.quarter}</span>
              </div>
              <h3 className="text-base font-bold text-white font-display">{phase.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{phase.tagline}</p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {phase.items.filter(i => i.completed).length} / {phase.items.length} Done
                </span>
                {phase.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                {phase.status === 'active' && <Rocket className="h-4 w-4 text-amber-400" />}
                {phase.status === 'upcoming' && <Star className="h-4 w-4 text-slate-500" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Phase Showcase */}
      {phases.map((phase) => {
        if (phase.id !== selectedPhase) return null;
        return (
          <div
            key={phase.id}
            className="rounded-3xl border border-slate-800 bg-[#080c16] p-6 sm:p-10 lg:p-12 space-y-8 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-amber-400">{phase.phaseNumber}</span>
                  <span className="text-xs font-mono text-slate-400">{phase.quarter}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {phase.title}
                </h2>
                <p className="text-sm text-slate-300">{phase.tagline}</p>
              </div>

              <div>{getStatusBadge(phase.status)}</div>
            </div>

            {/* Checklist of Deliverables */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-mono">
                Mission Milestones & Deliverables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                      item.completed
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-slate-200'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Action Callout */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                Every member of the Rat Pack contributes to accelerating this timeline through the Meme Lab.
              </div>
              <button
                onClick={() => {
                  if (isLoggedIn) onNavigate('memelab');
                  else onOpenAuth();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                Help Fuel The Mission in Meme Lab →
              </button>
            </div>
          </div>
        );
      })}

    </div>
  );
}
