import { useState } from 'react';
import { 
  User as UserIcon, Calendar, Heart, Sparkles, Edit3, Check, 
  ArrowLeft, Grid, Activity, MessageSquare, Camera, Shield 
} from 'lucide-react';
import { User, Post } from '../../types';
import { UserService, PostService } from '../../lib/storage';

interface ProfilePageProps {
  userId: string;
  currentUser: User | null;
  onNavigate: (tab: string) => void;
  onPostClick: (post: Post) => void;
  onProfileUpdated: () => void;
}

export default function ProfilePage({
  userId,
  currentUser,
  onNavigate,
  onPostClick,
  onProfileUpdated,
}: ProfilePageProps) {
  const profileUser = UserService.getUserById(userId) || currentUser;
  const isOwner = currentUser?.id === profileUser?.id;

  const [activeTab, setActiveTab] = useState<'memes' | 'liked' | 'activity'>('memes');
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(profileUser?.bio || '');
  const [editAvatar, setEditAvatar] = useState(profileUser?.avatarUrl || '');

  if (!profileUser) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p>Astronaut rodent not found.</p>
        <button onClick={() => onNavigate('feed')} className="mt-4 text-amber-400 underline">
          Return to Feed
        </button>
      </div>
    );
  }

  // Fetch all posts for statistics
  const allPosts = PostService.getPosts('latest');
  const userPosts = allPosts.filter(p => p.userId === profileUser.id);
  const likedPosts = allPosts.filter(p => p.isLiked);
  const totalLikesReceived = userPosts.reduce((acc, p) => acc + p.likesCount, 0);

  const avatarChoices = [
    '/assets/aistudio/IMG_6514_4330a477.jpeg',
    '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    '/assets/aistudio/IMG_6517_75c881e2.jpeg',
  ];

  const handleSaveProfile = () => {
    UserService.updateProfile(profileUser.id, {
      bio: editBio,
      avatarUrl: editAvatar,
    });
    setIsEditing(false);
    onProfileUpdated();
  };

  return (
    <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Top back link */}
      <button
        onClick={() => onNavigate('feed')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Feed</span>
      </button>

      {/* Profile Header Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#080d19] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={profileUser.avatarUrl}
                alt={profileUser.username}
                referrerPolicy="no-referrer"
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
              />
              {profileUser.role === 'admin' && (
                <span className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold shadow">
                  <Shield className="h-4 w-4" />
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                  @{profileUser.username}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {profileUser.role.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                {profileUser.bio}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined {new Date(profileUser.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Edit Profile if owner */}
          {isOwner && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900/80 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          )}

        </div>

        {/* Statistics Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono text-slate-400 block">MEMES POSTED</span>
            <span className="text-2xl font-black font-mono text-white tabular-nums mt-0.5 block">
              {userPosts.length}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block">LIKES RECEIVED</span>
            <span className="text-2xl font-black font-mono text-rose-400 tabular-nums mt-0.5 block">
              {totalLikesReceived}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 block">ASTRONAUT LEVEL</span>
            <span className="text-2xl font-black font-mono text-amber-400 mt-0.5 block">
              {userPosts.length > 5 ? 'Commander' : 'Orbital Cadet'}
            </span>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#090d18] p-6 space-y-6">
            <h2 className="text-lg font-bold text-white font-display">Edit Astronaut Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">Select Avatar</label>
                <div className="flex gap-3">
                  {avatarChoices.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setEditAvatar(url)}
                      className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition-all ${
                        editAvatar === url ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60'
                      }`}
                    >
                      <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-amber-400 focus:outline-none resize-none"
                  placeholder="Tell the Rat Pack about your journey..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Switcher: Memes / Liked Posts / Activity */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('memes')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'memes'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="h-4 w-4" />
          <span>Created Memes ({userPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'liked'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Liked Posts ({likedPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'activity'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>Activity Log</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'memes' && (
        userPosts.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-xs">
            No memes published yet by this astronaut.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPosts.map(post => (
              <div
                key={post.id}
                onClick={() => onPostClick(post)}
                className="rounded-2xl border border-slate-800 bg-[#080d19] overflow-hidden hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-slate-950 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-400" />
                      {post.likesCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {post.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'liked' && (
        likedPosts.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-xs">
            No liked memes yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likedPosts.map(post => (
              <div
                key={post.id}
                onClick={() => onPostClick(post)}
                className="rounded-2xl border border-slate-800 bg-[#080d19] overflow-hidden hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-slate-950 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[11px] text-slate-400 font-mono">@{post.username}</span>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'activity' && (
        <div className="rounded-2xl border border-slate-800 bg-[#080d19] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">Recent Telemetry Events</h3>
          <div className="space-y-3 text-xs text-slate-300 font-mono">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>🚀 Joined the official Moon Rat expedition</span>
              <span className="text-slate-500">{new Date(profileUser.createdAt).toLocaleDateString()}</span>
            </div>
            {userPosts.map(p => (
              <div key={p.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>🎨 Published meme: "{p.title}"</span>
                <span className="text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
