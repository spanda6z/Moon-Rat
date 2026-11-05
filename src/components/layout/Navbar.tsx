import { useState } from 'react';
import { Volume2, VolumeX, Menu, X, User as UserIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { User } from '../../types';
import { cosmicAudio } from '../../lib/audio';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  currentTab,
  onNavigate,
  currentUser,
  onOpenAuth,
  onOpenDashboard,
  onOpenAdmin,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleToggleAudio = () => {
    const active = cosmicAudio.toggle();
    setIsAudioActive(active);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'narrative', label: 'The Narrative' },
    { id: 'token', label: 'Token' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'community', label: 'Community' },
    { id: 'feed', label: 'Feed' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleMemeLabClick = () => {
    if (!currentUser) {
      onOpenAuth();
    } else {
      onNavigate('memelab');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#06080e]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left text-lg font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            🐀
          </span>
          <span className="font-display tracking-wider">MOON RAT</span>
          <span className="text-xs font-mono font-medium text-amber-400/90 ml-1">$MRAT</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === item.id
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ambient Cosmic Sound Generator Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioActive ? 'Mute Cosmic Ambience' : 'Play Cosmic Ambience'}
            className={`p-2 rounded-lg border transition-all ${
              isAudioActive
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isAudioActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Admin portal if admin */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors whitespace-nowrap shrink-0"
              title="Admin Panel"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* User Account / Dashboard or Login */}
          {currentUser ? (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition-colors"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.username}
                referrerPolicy="no-referrer"
                className="h-6 w-6 rounded-full object-cover border border-amber-400/40"
              />
              <span className="text-xs font-medium text-slate-200 hidden sm:inline whitespace-nowrap">
                {currentUser.username}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition-colors whitespace-nowrap"
            >
              <UserIcon className="h-3.5 w-3.5" />
              <span>Log In</span>
            </button>
          )}

          {/* Primary CTA: Enter Meme Lab */}
          <button
            onClick={handleMemeLabClick}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-lg hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/25 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
            <span>Enter Meme Lab</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090c15] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentTab === item.id
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleMemeLabClick}
              className="text-left px-3 py-2 rounded-md text-sm font-semibold text-amber-300 bg-amber-500/10 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Meme Lab Studio</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            {currentUser ? (
              <button
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-slate-200 font-medium"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.username}
                  className="h-7 w-7 rounded-full object-cover border border-amber-400"
                />
                <span>@{currentUser.username} Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-medium text-slate-200 border border-slate-700 rounded-lg"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
