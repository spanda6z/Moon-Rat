import { useState } from 'react';
import { X, Lock, User as UserIcon, AlertCircle, Sparkles, Check } from 'lucide-react';
import { UserService } from '../../lib/storage';
import { User } from '../../types';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setIsLoading(false);
          return;
        }

        const res = await UserService.signUp(username, password);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Failed to register.');
        }
      } else {
        const res = await UserService.login(username, password);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Failed to log in.');
        }
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoUser: string) => {
    setUsername(demoUser);
    setPassword('admin123');
    setIsLoading(true);
    const res = await UserService.login(demoUser, 'admin123');
    if (res.success && res.user) {
      onSuccess(res.user);
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 text-xl font-black shadow-lg shadow-amber-400/20">
            🐀
          </div>
          <h2 className="text-2xl font-black text-white font-display">
            {mode === 'login' ? 'Welcome Back, Astronaut' : 'Enlist in the Rat Pack'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Log in to publish memes, like posts, and contribute to the lore.'
              : 'Sign up with just a username and password. No wallet required.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. astro_rodent"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Verifying Coordinates...' : mode === 'login' ? 'Enter Moon Base' : 'Launch New Account'}
          </button>
        </form>

        {/* Instant Demo Accounts for fast testing */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <span className="text-[10px] font-mono text-slate-400 block text-center uppercase tracking-wider">
            Quick 1-Click Crew Pass (Demo)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('commander_rat')}
              className="flex-1 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-400 hover:border-amber-400 transition-colors"
            >
              👑 Commander (Admin)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('chedda_whisperer')}
              className="flex-1 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-400 hover:border-cyan-400 transition-colors"
            >
              🎨 Chedda (Creator)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
