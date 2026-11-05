import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Upload, Download, Tag, Check, Image as ImageIcon, 
  ArrowLeft, RefreshCw, Send, Lock, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User, Post } from '../../types';
import { PostService } from '../../lib/storage';

interface MemeLabPageProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onNavigate: (tab: string) => void;
  onPostCreated: (post: Post) => void;
}

export default function MemeLabPage({
  currentUser,
  onOpenAuth,
  onNavigate,
  onPostCreated,
}: MemeLabPageProps) {
  // If not logged in, prompt user to log in or sign up
  const isAuth = !!currentUser;

  const defaultTemplates = [
    {
      id: 'tpl_moon_standing',
      name: 'Lunar Touchdown',
      url: '/assets/aistudio/IMG_6514_4330a477.jpeg',
      description: 'Moon Rat standing on lunar soil gazing at Earth',
    },
    {
      id: 'tpl_rocket_building',
      name: 'Rocket Engineering',
      url: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
      description: 'Moon Rat assembling rocket with wrench & duct tape',
    },
    {
      id: 'tpl_sewer_awakening',
      name: 'Sewer Awakening',
      url: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
      description: 'Moon Rat looking up through manhole grate',
    },
  ];

  const availableTags = [
    'Moon Rat',
    'Funny',
    'Community',
    'Space',
    'Crypto',
    'Moon Mission',
    'Rocket Science',
    'Cheese Vault',
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string>(defaultTemplates[0].url);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('WHEN THEY SAID');
  const [bottomText, setBottomText] = useState('THE MOON WAS CHEESE');
  const [textColor, setTextColor] = useState('#ffffff');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Moon Rat', 'Space', 'Funny']);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Redraw meme canvas when inputs change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customImage || selectedTemplate;

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = 800;
      canvas.height = 800;

      // Draw image
      ctx.drawImage(img, 0, 0, 800, 800);

      // Setup meme text styling
      ctx.fillStyle = textColor;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 10;
      ctx.lineJoin = 'round';
      ctx.textAlign = 'center';
      ctx.font = '900 48px Outfit, Impact, sans-serif';

      // Draw Top Text
      if (topText.trim()) {
        ctx.strokeText(topText.toUpperCase(), 400, 75);
        ctx.fillText(topText.toUpperCase(), 400, 75);
      }

      // Draw Bottom Text
      if (bottomText.trim()) {
        ctx.strokeText(bottomText.toUpperCase(), 400, 740);
        ctx.fillText(bottomText.toUpperCase(), 400, 740);
      }

      // Small watermark
      ctx.font = '700 16px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('moonrat.space // $MRAT', 400, 785);
    };
  }, [selectedTemplate, customImage, topText, bottomText, textColor]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomImage(event.target.result as string);
        setErrorMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `moon-rat-meme-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePublish = () => {
    if (!isAuth) {
      onOpenAuth();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!title.trim()) {
      setErrorMessage('Please provide a punchy title for your meme.');
      return;
    }

    setIsPublishing(true);
    setErrorMessage(null);

    const generatedImageUrl = canvas.toDataURL('image/jpeg', 0.88);

    const result = PostService.createPost({
      title: title.trim(),
      caption: caption.trim() || `${topText} — ${bottomText}`,
      imageUrl: generatedImageUrl,
      tags: selectedTags,
    });

    if (result.success && result.post) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onPostCreated(result.post);
      setIsPublishing(false);
      onNavigate('feed');
    } else {
      setErrorMessage(result.error || 'Failed to publish meme.');
      setIsPublishing(false);
    }
  };

  if (!isAuth) {
    return (
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8">
        <div className="p-10 rounded-3xl border border-amber-500/30 bg-[#090d19]/90 backdrop-blur-xl space-y-6">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-amber-400 text-slate-950 text-2xl font-black shadow-lg shadow-amber-400/20">
            <Lock className="h-8 w-8 text-slate-950" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Authentication Required for Meme Lab
            </h1>
            <p className="text-base text-slate-300 max-w-md mx-auto">
              Create an astronaut username to upload and craft memes, build your creator reputation, and share with the Rat Pack.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-400/20 transition-all"
            >
              Log In / Sign Up (Free)
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 font-medium text-sm transition-all"
            >
              Browse Public Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('feed')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go to Community Feed</span>
        </button>

        <span className="text-xs font-mono text-cyan-400">
          MEME LAB STUDIO // CREATOR: @{currentUser.username}
        </span>
      </div>

      {/* Hero Title */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          Moon Rat Meme Lab
        </h1>
        <p className="text-sm text-slate-300">
          Craft viral space memes using official canonical backdrops or your own images. Publish straight to the feed.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Canvas & Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950 p-3 sm:p-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                CANVAS PREVIEW
              </span>
              <span className="text-slate-400">800 × 800 HD</span>
            </div>

            <div className="mt-3 relative rounded-xl overflow-hidden aspect-square bg-slate-900 border border-slate-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Save to Device</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls & Publishing Form */}
        <div className="lg:col-span-6 space-y-6 rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8">
          
          {/* Step 1: Select Template or Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                1. Select Mascot Backdrop
              </label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Custom Image</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {defaultTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setCustomImage(null);
                    setSelectedTemplate(tpl.url);
                  }}
                  className={`rounded-xl overflow-hidden border p-1 text-left transition-all ${
                    !customImage && selectedTemplate === tpl.url
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950'
                  }`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={tpl.url}
                      alt={tpl.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="block text-[11px] font-medium text-slate-300 mt-1 truncate px-1">
                    {tpl.name}
                  </span>
                </button>
              ))}
            </div>

            {customImage && (
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg">
                <span>Custom image loaded</span>
                <button onClick={() => setCustomImage(null)} className="text-rose-400 hover:underline">
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Top & Bottom Captions */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
              2. Meme Captions
            </label>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 font-mono block mb-1">Top Text</span>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="e.g. WHEN THEY SAID"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-mono block mb-1">Bottom Text</span>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="e.g. THE MOON WAS CHEESE"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Text color picker */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 font-mono">Text Color:</span>
                {['#ffffff', '#fde047', '#38bdf8', '#4ade80'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    style={{ backgroundColor: c }}
                    className={`h-6 w-6 rounded-full border transition-all ${
                      textColor === c ? 'scale-110 border-white ring-2 ring-amber-400' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Post Details (Title, Caption, Tags) */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
              3. Post Info & Tags
            </label>

            <div>
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Meme Title *</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your meme a punchy title"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-mono block mb-1">Caption / Lore Notes</span>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder="Add context for the Rat Pack..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-mono block mb-2">Select Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4 fill-slate-950" />
              <span>{isPublishing ? 'Transmitting to Orbit...' : 'Publish Meme to Global Feed'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
