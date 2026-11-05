import { useState } from 'react';
import { ArrowLeft, Sparkles, Compass, Shield, Rocket, Flame, Quote } from 'lucide-react';

interface NarrativePageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export default function NarrativePage({ onNavigate, onOpenAuth, isLoggedIn }: NarrativePageProps) {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      number: '01',
      title: 'THE AWAKENING UNDERGROUND',
      subtitle: 'Manhole Grate #42 · Subterranean City Grid',
      quote: '“In the darkest corners of the internet, one rat looked up at the moon and decided that Earth was no longer enough.”',
      image: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
      imageCaption: 'Archival capture: Moon Rat peering through the rain-soaked sewer grate toward the night sky.',
      content: [
        'For generations, rodents were told to scurry along the walls, feast on discarded crumbs, and avoid the flashlight beams of giants. But one small rat was built different.',
        'Emerging through the damp brickwork of manhole #42 on a midnight in autumn, he saw a glowing celestial orb through the iron grates. While the other city dwellers saw an unreachable rock in space, Moon Rat saw destiny: an infinite, unblemished domain of cosmic freedom.',
        'Earth was loud, crowded, and rigged against the little guy. The decision was made in a single heartbeat: it was time to leave.',
      ],
    },
    {
      number: '02',
      title: 'BACKYARD AERODYNAMICS & THE 10MM WRENCH',
      subtitle: 'The Meadow Workshop · Galvanized Dreams',
      quote: '“They said a rodent cannot build an orbital propulsion stage. They underestimated what happens when memes replace rocket science.”',
      image: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
      imageCaption: 'Moon Rat assembling the Apollo Rodent-1 using scrap metal, pressurized cylinders, and heavy-duty tape.',
      content: [
        'With no government budget and no billion-dollar aerospace contracts, Moon Rat set up shop in an abandoned meadow. Tools were scrounged from forgotten barns: an oxidized wrench, a spool of industrial duct tape, and a discarded pressurized tank.',
        'Word spread through the underground wires. From every sewer, alley, and server farm, fellow rodents began sending blueprints, moral support, and creative memes. What started as one rat’s obsession turned into a decentralized engineering collective.',
        'Every bolt tightened on the red nosecone was proof that community grit beats institutional inertia every single time.',
      ],
    },
    {
      number: '03',
      title: 'TOUCHDOWN ON LUNAR SOIL',
      subtitle: 'The Sea of Tranquility · 384,400 KM From Home',
      quote: '“One small paw for a rodent, one giant leap for every underdog who ever dreamed.”',
      image: '/assets/aistudio/IMG_6514_4330a477.jpeg',
      imageCaption: 'First photograph beamed back from lunar regolith: Moon Rat gazing upon planet Earth.',
      content: [
        'The launch shook the meadows. The improvised thrusters ignited with a roar that echoed through the web3 cryptosphere. Breaking through Earth’s gravity well, the Apollo Rodent-1 touched down softly on the quiet dust of the Moon.',
        'Stepping out onto the lunar surface, Moon Rat stood upright. From here, all of Earth was just a blue marble without borders, corporations, or cynics.',
        'He looked back at the planet and transmitted the first interplanetary meme message: “The Moon is not the destination. It’s just the beginning.”',
      ],
    },
    {
      number: '04',
      title: 'WHAT DOES MOON RAT REPRESENT?',
      subtitle: 'The Philosophy of the Space Rodent',
      quote: '“We are the underground builders, the relentless memers, the ones who make the impossible look hilarious.”',
      image: '/assets/aistudio/IMG_6514_4330a477.jpeg',
      imageCaption: 'The Rat Pack emblem: fearless, decentralized, and forever reaching higher.',
      content: [
        'Moon Rat is not merely a cute mascot. Moon Rat is the avatar of the internet underdog. It represents every retail trader, meme creator, coder, and dreamer who refuses to stay in the gutter.',
        'Rats are resilient. They survive ice ages, city cleanses, and bear markets. When you give that resilience a rocket and a creative community, you get an unstoppable digital movement.',
        'By holding $MRAT and contributing to the Meme Lab, each community member holds a piece of that rocket ship.',
      ],
    },
    {
      number: '05',
      title: 'BUILDING THE CULTURE TOGETHER',
      subtitle: 'How You Shape the Moon Rat Universe',
      quote: '“A token without a story is numbers on a screen. A story without a community is just text. Together, we are unstoppable.”',
      image: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
      imageCaption: 'Every meme created in the Meme Lab becomes part of the canon.',
      content: [
        'The Moon Rat lore is not written by a central committee. It is crowdsourced through the Meme Lab.',
        'When you create a meme about Moon Rat mining aged cheddar in a lunar crater, or fighting space cats in the asteroid belt, that meme enters our collective feed. The top memes get featured on the official website and rewarded with creator bounties.',
        'This is decentralization in its purest cultural form: a living, breathing internet myth made by the people, for the people.',
      ],
    },
  ];

  const current = chapters[activeChapter];

  return (
    <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono text-amber-400">
          CHAPTER {current.number} OF {chapters.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          Canonical Lore & Universe History
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-tight [text-wrap:balance]">
          The Legend of Moon Rat
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          How an ordinary sewer rat built a backyard rocket, reached lunar orbit, and sparked a global Web3 meme revolution.
        </p>
      </div>

      {/* Chapter Navigation Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {chapters.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => setActiveChapter(idx)}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all border ${
              activeChapter === idx
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-400/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {ch.number} · {ch.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Main Chapter Story Presentation */}
      <div className="rounded-3xl border border-slate-800 bg-[#070b15]/90 p-6 sm:p-10 lg:p-14 backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Chapter Imagery with authentic photos */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 aspect-[4/3] bg-slate-950 shadow-2xl group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-amber-400 border border-slate-800">
                ACT #{current.number}
              </div>
            </div>
            <p className="text-xs text-slate-400 italic text-center px-2">
              {current.imageCaption}
            </p>
          </div>

          {/* Chapter Text & Lore */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-wider">
                {current.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display">
                {current.title}
              </h2>
            </div>

            {/* Quote Callout */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-sm italic relative">
              <Quote className="h-4 w-4 text-amber-400 mb-1 opacity-70" />
              <p className="leading-relaxed">{current.quote}</p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {current.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                disabled={activeChapter === 0}
                onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                ← Previous Act
              </button>

              {activeChapter < chapters.length - 1 ? (
                <button
                  onClick={() => setActiveChapter(activeChapter + 1)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Next Act →
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (isLoggedIn) onNavigate('memelab');
                    else onOpenAuth();
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
                >
                  Write Your Lore in Meme Lab →
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Community Participation Callout */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-cyan-500/10 p-8 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
          Ready to contribute your chapter to the Moon Rat canon?
        </h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          The Meme Lab is open. Design your own space rodent adventures, publish to the global feed, and earn recognition from the Rat Pack.
        </p>
        <button
          onClick={() => {
            if (isLoggedIn) onNavigate('memelab');
            else onOpenAuth();
          }}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 fill-slate-950" />
          <span>Enter Meme Lab</span>
        </button>
      </div>

    </div>
  );
}
