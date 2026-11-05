import { useState } from 'react';
import { 
  X, ShieldCheck, Users, Star, Trash2, Edit3, Check, 
  Coins, Sparkles, Tag, Plus, AlertCircle 
} from 'lucide-react';
import { User, Post, TokenConfig } from '../../types';
import { PostService, UserService, TokenService } from '../../lib/storage';

interface AdminModalProps {
  onClose: () => void;
  tokenConfig: TokenConfig;
  onTokenConfigUpdated: (newConfig: TokenConfig) => void;
  onPostUpdated: () => void;
}

export default function AdminModal({
  onClose,
  tokenConfig,
  onTokenConfigUpdated,
  onPostUpdated,
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<'memes' | 'token' | 'users'>('memes');
  
  // Memes management
  const [posts, setPosts] = useState<Post[]>(PostService.getPosts('latest'));
  
  // Users management
  const [users] = useState<User[]>(UserService.getUsers());

  // Token configuration state
  const [contractAddress, setContractAddress] = useState(tokenConfig.contractAddress);
  const [network, setNetwork] = useState(tokenConfig.network);
  const [priceUsd, setPriceUsd] = useState(tokenConfig.priceUsd);
  const [marketCap, setMarketCap] = useState(tokenConfig.marketCap);
  const [holdersCount, setHoldersCount] = useState(tokenConfig.holdersCount);
  const [tokenSaved, setTokenSaved] = useState(false);

  const handleToggleFeature = (postId: string) => {
    PostService.toggleFeatured(postId);
    setPosts(PostService.getPosts('latest'));
    onPostUpdated();
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to permanently delete this post?')) {
      PostService.deletePost(postId);
      setPosts(PostService.getPosts('latest'));
      onPostUpdated();
    }
  };

  const handleSaveTokenConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = TokenService.updateConfig({
      contractAddress: contractAddress.trim(),
      network: network.trim(),
      priceUsd: priceUsd.trim(),
      marketCap: marketCap.trim(),
      holdersCount: Number(holdersCount) || tokenConfig.holdersCount,
    });
    onTokenConfigUpdated(updated);
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl rounded-3xl border border-amber-500/40 bg-[#070b16] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-400 text-slate-950">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Command Center & Administration</h2>
              <span className="text-xs font-mono text-amber-400">FOUNDING ASTRONAUT PRIVILEGES ACTIVE</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('memes')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'memes' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Meme Moderation & Feature ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('token')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'token' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Token Economics Config
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'users' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Registered Astronauts ({users.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* MEMES MODERATION */}
          {activeTab === 'memes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Manage community submissions. Mark as "FEATURED" to highlight on homepage.</span>
                <span>{posts.filter(p => p.featured).length} Featured</span>
              </div>

              <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-14 w-14 rounded-lg object-cover border border-slate-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white truncate">{post.title}</h3>
                          {post.featured && (
                            <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 block truncate">
                          By @{post.username} · {post.likesCount} Likes · {post.commentsCount} Comments
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFeature(post.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          post.featured
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Star className="h-3.5 w-3.5" />
                        <span>{post.featured ? 'Unfeature' : 'Feature'}</span>
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOKEN CONFIGURATION */}
          {activeTab === 'token' && (
            <form onSubmit={handleSaveTokenConfig} className="space-y-4 max-w-xl">
              <div className="text-xs text-slate-400">
                Modify live contract address and market metrics. Updates will immediately reflect across the entire application.
              </div>

              {tokenSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Token specifications saved successfully!</span>
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Contract Address</label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Network / Chain</label>
                  <input
                    type="text"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Price (USD)</label>
                  <input
                    type="text"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Market Cap</label>
                  <input
                    type="text"
                    value={marketCap}
                    onChange={(e) => setMarketCap(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Holders Count</label>
                  <input
                    type="number"
                    value={holdersCount}
                    onChange={(e) => setHoldersCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
              >
                Save Token Configuration
              </button>
            </form>
          )}

          {/* USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                {users.map((u) => (
                  <div key={u.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl}
                        alt={u.username}
                        className="h-10 w-10 rounded-full object-cover border border-amber-400/40"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">@{u.username}</span>
                        <span className="text-xs text-slate-400">{u.bio}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-semibold">
                      {u.role.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close Admin
          </button>
        </div>

      </div>
    </div>
  );
}
