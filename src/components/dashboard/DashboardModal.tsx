import { useState } from 'react';
import { 
  X, User as UserIcon, Grid, Plus, Bell, Settings, LogOut, 
  Heart, MessageSquare, Sparkles, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { User, Post } from '../../types';
import { PostService } from '../../lib/storage';

interface DashboardModalProps {
  currentUser: User;
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (tab: string) => void;
  onViewProfile: (userId: string) => void;
  onOpenAdmin: () => void;
}

export default function DashboardModal({
  currentUser,
  onClose,
  onLogout,
  onNavigate,
  onViewProfile,
  onOpenAdmin,
}: DashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications' | 'settings'>('overview');

  const allPosts = PostService.getPosts('latest');
  const userPosts = allPosts.filter(p => p.userId === currentUser.id);
  const totalLikes = userPosts.reduce((acc, p) => acc + p.likesCount, 0);
  const totalComments = userPosts.reduce((acc, p) => acc + p.commentsCount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#090d18] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.username}
              className="h-10 w-10 rounded-full object-cover border border-amber-400"
            />
            <div>
              <h2 className="text-base font-bold text-white font-display">@{currentUser.username}</h2>
              <span className="text-xs font-mono text-amber-400">
                {currentUser.role.toUpperCase()} BURROW
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Strip */}
        <div className="px-6 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'notifications' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Notifications (3)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">MEMES POSTED</span>
                  <span className="text-2xl font-black font-mono text-white tabular-nums mt-1 block">
                    {userPosts.length}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">TOTAL LIKES</span>
                  <span className="text-2xl font-black font-mono text-rose-400 tabular-nums mt-1 block">
                    {totalLikes}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">COMMENTS</span>
                  <span className="text-2xl font-black font-mono text-cyan-400 tabular-nums mt-1 block">
                    {totalComments}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('memelab');
                  }}
                  className="p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-between shadow-lg shadow-amber-400/10 hover:opacity-95"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Create New Meme</span>
                  </span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onViewProfile(currentUser.id);
                  }}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-between hover:border-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-amber-400" />
                    <span>View Public Profile</span>
                  </span>
                  <span>→</span>
                </button>
              </div>

              {/* Admin shortcut if applicable */}
              {currentUser.role === 'admin' && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-bold text-white">Founding Commander Controls</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdmin();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Open Admin
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                <Heart className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200">
                    <span className="font-bold text-white">@chedda_whisperer</span> liked your latest transmission.
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">10 minutes ago</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200">
                    Your meme was awarded <span className="text-amber-400 font-bold">Featured Status</span> by admin!
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">2 hours ago</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs">
                <MessageSquare className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200">
                    <span className="font-bold text-white">@astro_rodent</span> left a comment on your post.
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">1 day ago</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">Account Security</span>
                <p className="text-slate-400">
                  Password is cryptographic SHA-256 hashed on this browser. Never share your password with anyone.
                </p>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out of Moon Rat</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#070a14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>USER_ID: {currentUser.id.slice(0, 16)}</span>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-rose-400 hover:underline"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
}
