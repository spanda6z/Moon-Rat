import { useState } from 'react';
import { 
  Heart, MessageSquare, Share2, Sparkles, Filter, Plus, 
  Flame, Clock, Star, Users, Check, ShieldCheck, Trash2
} from 'lucide-react';
import { Post, User } from '../../types';

interface FeedPageProps {
  posts: Post[];
  currentUser: User | null;
  onPostClick: (post: Post) => void;
  onLikeToggle: (postId: string) => void;
  onNavigateToMemeLab: () => void;
  onViewUserProfile: (userId: string) => void;
  onToggleFeatured?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export default function FeedPage({
  posts,
  currentUser,
  onPostClick,
  onLikeToggle,
  onNavigateToMemeLab,
  onViewUserProfile,
  onToggleFeatured,
  onDeletePost,
}: FeedPageProps) {
  const [activeTab, setActiveTab] = useState<'trending' | 'latest' | 'featured' | 'following'>('trending');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const tags = ['All', 'Moon Rat', 'Space', 'Funny', 'Crypto', 'Moon Mission', 'Community'];

  // Filter posts
  let filteredPosts = [...posts];

  // Tab filter
  if (activeTab === 'featured') {
    filteredPosts = filteredPosts.filter(p => p.featured);
  } else if (activeTab === 'latest') {
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (activeTab === 'following') {
    if (currentUser?.following && currentUser.following.length > 0) {
      filteredPosts = filteredPosts.filter(p => currentUser.following?.includes(p.userId));
    } else {
      filteredPosts = [];
    }
  } else {
    // Trending
    filteredPosts.sort((a, b) => (b.likesCount * 3 + b.commentsCount * 5) - (a.likesCount * 3 + a.commentsCount * 5));
  }

  // Tag filter
  if (selectedTag !== 'All') {
    filteredPosts = filteredPosts.filter(p => p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
  }

  const handleShare = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '#post-' + postId);
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header & Quick CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Decentralized Social Wire
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display mt-1">
            Community Meme Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore and curate the latest visual warfare created by the Rat Pack worldwide.
          </p>
        </div>

        <button
          onClick={onNavigateToMemeLab}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Post Meme</span>
        </button>
      </div>

      {/* Navigation Tabs (Functional Segmented Control) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'trending'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>🔥 Trending</span>
          </button>

          <button
            onClick={() => setActiveTab('latest')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'latest'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>🆕 Latest</span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'featured'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            <span>⭐ Featured</span>
          </button>

          <button
            onClick={() => setActiveTab('following')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'following'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>👤 Following</span>
          </button>
        </div>

        {/* Tag Filters (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-slate-800 text-amber-400 border border-amber-400/40 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

      </div>

      {/* Feed Stream */}
      {filteredPosts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-slate-800 bg-[#080c16] space-y-4">
          <div className="h-12 w-12 mx-auto rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">No memes in this frequency yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {activeTab === 'following'
              ? 'You are not following any creators with posts yet. Follow fellow astronaut rodents!'
              : 'Be the first pioneer to publish a meme with this tag!'}
          </p>
          <button
            onClick={onNavigateToMemeLab}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Open Meme Lab
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onPostClick(post)}
              className="rounded-2xl border border-slate-800/90 bg-[#080d19] overflow-hidden hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              {/* Creator header */}
              <div className="p-4 pb-3 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewUserProfile(post.userId);
                  }}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover border border-amber-400/40"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-200 hover:text-amber-400 block">
                      @{post.username}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </button>

                {/* Admin or featured indicator */}
                <div className="flex items-center gap-1.5">
                  {post.featured && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                      FEATURED
                    </span>
                  )}
                  {currentUser?.role === 'admin' && onToggleFeatured && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFeatured(post.id);
                      }}
                      title={post.featured ? 'Unfeature Meme' : 'Feature Meme'}
                      className="p-1 rounded text-slate-400 hover:text-amber-400"
                    >
                      <Star className={`h-4 w-4 ${post.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  )}
                  {currentUser?.role === 'admin' && onDeletePost && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this meme post?')) onDeletePost(post.id);
                      }}
                      title="Delete post (Admin)"
                      className="p-1 rounded text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Meme visual */}
              <div className="relative aspect-square bg-slate-950 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details & Tags */}
              <div className="p-4 space-y-2">
                <h2 className="text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>

                {/* Unboxed clean text metadata tags with separators */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-slate-400">
                  {post.tags.map((t, idx) => (
                    <span key={idx}>
                      #{t}
                      {idx < post.tags.length - 1 && <span className="text-slate-700 ml-1.5">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="px-4 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeToggle(post.id);
                  }}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                  <span className="font-mono tabular-nums">{post.likesCount}</span>
                </button>

                <div className="flex items-center gap-1.5 hover:text-slate-200">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-mono tabular-nums">{post.commentsCount}</span>
                </div>

                <button
                  onClick={(e) => handleShare(e, post.id)}
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                  title="Share meme"
                >
                  {copiedPostId === post.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="text-[10px]">Share</span>
                    </>
                  )}
                </button>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
}
