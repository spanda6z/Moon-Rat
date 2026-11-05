import { useState, useEffect } from 'react';
import { 
  X, Heart, MessageSquare, Share2, Star, Send, ShieldCheck, 
  Trash2, UserPlus, UserCheck, Check, Clock 
} from 'lucide-react';
import { Post, Comment, User } from '../../types';
import { PostService, UserService } from '../../lib/storage';

interface PostDetailModalProps {
  post: Post;
  currentUser: User | null;
  onClose: () => void;
  onLikeToggle: (postId: string) => void;
  onViewUserProfile: (userId: string) => void;
  onOpenAuth: () => void;
  onToggleFeatured?: (postId: string) => void;
  onPostUpdated: () => void;
}

export default function PostDetailModal({
  post,
  currentUser,
  onClose,
  onLikeToggle,
  onViewUserProfile,
  onOpenAuth,
  onToggleFeatured,
  onPostUpdated,
}: PostDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.following?.includes(post.userId) || false
  );

  const creator = UserService.getUserById(post.userId);

  useEffect(() => {
    const list = PostService.getComments(post.id);
    setComments(list);
  }, [post.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    const res = PostService.addComment(post.id, newComment);
    if (res.success && res.comment) {
      setComments([...comments, res.comment]);
      setNewComment('');
      onPostUpdated();
    }
    setIsSubmittingComment(false);
  };

  const handleToggleFollow = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const updated = UserService.toggleFollow(post.userId);
    setIsFollowing(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#post-' + post.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-3xl border border-slate-800 bg-[#070b16] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh]">
          
          {/* Left: Large Meme Visual */}
          <div className="lg:col-span-7 bg-black flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="relative max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              {post.featured && (
                <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-bold text-xs font-mono px-2.5 py-1 rounded shadow-lg">
                  FEATURED MOON RAT MEME
                </div>
              )}
            </div>
          </div>

          {/* Right: Creator Info, Lore, Comments */}
          <div className="lg:col-span-5 flex flex-col justify-between overflow-hidden bg-[#090d19]">
            
            {/* Top section: Creator Header */}
            <div className="p-5 border-b border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pr-8">
                <button
                  onClick={() => {
                    onViewUserProfile(post.userId);
                    onClose();
                  }}
                  className="flex items-center gap-3 text-left hover:opacity-85 transition-opacity"
                >
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover border-2 border-amber-400/50"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-white font-display">@{post.username}</h2>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {creator?.role === 'admin' ? '🛡️ Founding Commander' : '🚀 Space Rodent'}
                    </span>
                  </div>
                </button>

                {currentUser && currentUser.id !== post.userId && (
                  <button
                    onClick={handleToggleFollow}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isFollowing
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-amber-400 text-slate-950 font-bold'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Title & Caption */}
              <div className="space-y-1.5 pt-1">
                <h1 className="text-lg font-bold text-white font-display">{post.title}</h1>
                <p className="text-xs text-slate-300 leading-relaxed">{post.caption}</p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-amber-400/90">
                  {post.tags.map((t, idx) => (
                    <span key={idx}>#{t}</span>
                  ))}
                </div>
              </div>

              {/* Admin toggle if admin */}
              {currentUser?.role === 'admin' && onToggleFeatured && (
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span>Admin Spotlight:</span>
                  <button
                    onClick={() => {
                      onToggleFeatured(post.id);
                      onPostUpdated();
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      post.featured ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {post.featured ? '★ Featured Meme' : 'Mark as Featured'}
                  </button>
                </div>
              )}
            </div>

            {/* Middle: Comments Scroll Area */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[300px] border-b border-slate-800/80">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono block">
                Discussion ({comments.length})
              </span>

              {comments.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 font-mono">
                  No transmissions yet. Be the first to reply!
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5 items-start text-xs">
                    <img
                      src={c.userAvatar}
                      alt={c.username}
                      className="h-7 w-7 rounded-full object-cover border border-slate-700 shrink-0 mt-0.5"
                    />
                    <div className="flex-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-slate-200">@{c.username}</span>
                        <span className="text-slate-500 font-mono">
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom: Likes, Share, Comment Form */}
            <div className="p-5 space-y-3 bg-[#070a14]">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onLikeToggle(post.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    post.isLiked
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold'
                      : 'border-slate-800 text-slate-400 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                  <span className="font-mono text-xs tabular-nums">{post.likesCount} Likes</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? 'Link Copied' : 'Share Link'}</span>
                </button>
              </div>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={currentUser ? 'Write a comment to the Rat Pack...' : 'Log in to join discussion'}
                  disabled={!currentUser}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs focus:border-amber-400 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!currentUser || !newComment.trim() || isSubmittingComment}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
