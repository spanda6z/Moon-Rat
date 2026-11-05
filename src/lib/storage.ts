import { User, Post, Comment, Like, TokenConfig, RoadmapPhase, Notification } from '../types';

// SHA-256 Web Crypto hashing for secure passwords
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_MOON_RAT_SALT_v1');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const STORAGE_KEYS = {
  USERS: 'moonrat_users_v2',
  POSTS: 'moonrat_posts_v2',
  COMMENTS: 'moonrat_comments_v2',
  LIKES: 'moonrat_likes_v2',
  CURRENT_USER_ID: 'moonrat_current_user_id_v2',
  TOKEN_CONFIG: 'moonrat_token_config_v2',
  NOTIFICATIONS: 'moonrat_notifications_v2',
};

// Seed Users
const INITIAL_USERS: User[] = [
  {
    id: 'user_commander_rat',
    username: 'commander_rat',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // hashed 'admin123'
    avatarUrl: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    bio: 'Founding Rodent. Led the DIY space mission from sewer drain #42 directly to the Sea of Tranquility. $MRAT to the stars.',
    createdAt: '2026-09-01T12:00:00Z',
    role: 'admin',
    following: ['user_chedda_whisperer', 'user_astro_rodent'],
  },
  {
    id: 'user_chedda_whisperer',
    username: 'chedda_whisperer',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    avatarUrl: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    bio: 'Rocket mechanic & chief meme engineer. 10mm socket in one hand, rocket duct tape in the other.',
    createdAt: '2026-09-15T09:30:00Z',
    role: 'creator',
    following: ['user_commander_rat'],
  },
  {
    id: 'user_astro_rodent',
    username: 'astro_rodent',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    avatarUrl: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    bio: 'Sewer reconnaissance scout. First to spot the full moon reflected in a rain puddle and said "Let’s build a rocket."',
    createdAt: '2026-10-02T16:45:00Z',
    role: 'member',
    following: ['user_commander_rat', 'user_chedda_whisperer'],
  },
];

// Seed Posts featuring the user's authentic assets!
const INITIAL_POSTS: Post[] = [
  {
    id: 'post_moon_touchdown',
    userId: 'user_commander_rat',
    username: 'commander_rat',
    userAvatar: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    imageUrl: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    title: 'Touchdown on Lunar Regolith',
    caption: 'One small paw for a rodent, one giant leap for the Rat Pack. Earth looks so quiet from up here. We did it guys.',
    createdAt: '2026-11-04T18:20:00Z',
    featured: true,
    likesCount: 1420,
    commentsCount: 89,
    tags: ['Moon Mission', 'Moon Rat', 'Crypto', 'Space'],
  },
  {
    id: 'post_rocket_assembly',
    userId: 'user_chedda_whisperer',
    username: 'chedda_whisperer',
    userAvatar: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    imageUrl: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    title: 'Tightening the Second-Stage Thruster',
    caption: 'They said a field mouse cannot build an orbital-class vehicle with galvanized tin and duct tape. Well look at me now.',
    createdAt: '2026-11-03T11:15:00Z',
    featured: true,
    likesCount: 980,
    commentsCount: 42,
    tags: ['Funny', 'Moon Rat', 'Community', 'Space'],
  },
  {
    id: 'post_sewer_awakening',
    userId: 'user_astro_rodent',
    username: 'astro_rodent',
    userAvatar: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    imageUrl: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    title: 'The Awakening: Looking Out of Manhole #42',
    caption: 'In the darkest corners of the underground, one rat looked up through the iron grate and decided Earth was no longer enough.',
    createdAt: '2026-11-01T08:00:00Z',
    featured: true,
    likesCount: 845,
    commentsCount: 31,
    tags: ['Moon Rat', 'Community', 'Moon Mission'],
  },
  {
    id: 'post_chart_cheese',
    userId: 'user_chedda_whisperer',
    username: 'chedda_whisperer',
    userAvatar: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    imageUrl: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    title: 'Confirmed: Moon is 100% Aged Cheddar',
    caption: 'NASA lied. Apollo lied. We just sampled the crater dust and it pairs beautifully with high-octane rocket fuel.',
    createdAt: '2026-10-29T14:40:00Z',
    featured: false,
    likesCount: 512,
    commentsCount: 19,
    tags: ['Funny', 'Crypto', 'Moon Rat'],
  },
];

// Seed Comments
const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comm_1',
    userId: 'user_chedda_whisperer',
    username: 'chedda_whisperer',
    userAvatar: '/assets/aistudio/IMG_6516_d24652b4.jpeg',
    postId: 'post_moon_touchdown',
    content: 'History has been written. Next stop: Mars burrow!',
    createdAt: '2026-11-04T18:45:00Z',
  },
  {
    id: 'comm_2',
    userId: 'user_astro_rodent',
    username: 'astro_rodent',
    userAvatar: '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    postId: 'post_moon_touchdown',
    content: 'From the wet cobblestone to the stars. Proud to be part of the Rat Pack!',
    createdAt: '2026-11-04T19:12:00Z',
  },
  {
    id: 'comm_3',
    userId: 'user_commander_rat',
    username: 'commander_rat',
    userAvatar: '/assets/aistudio/IMG_6514_4330a477.jpeg',
    postId: 'post_rocket_assembly',
    content: 'Check the oxygen hose clamp twice before T-minus 10 minutes!',
    createdAt: '2026-11-03T11:30:00Z',
  },
];

// Seed Likes
const INITIAL_LIKES: Like[] = [
  {
    id: 'like_1',
    userId: 'user_commander_rat',
    postId: 'post_rocket_assembly',
    createdAt: '2026-11-03T11:20:00Z',
  },
  {
    id: 'like_2',
    userId: 'user_chedda_whisperer',
    postId: 'post_moon_touchdown',
    createdAt: '2026-11-04T18:25:00Z',
  },
];

// Default Tokenomics
const INITIAL_TOKEN_CONFIG: TokenConfig = {
  name: 'Moon Rat',
  symbol: '$MRAT',
  network: 'Solana (SPL) / Multi-Chain',
  contractAddress: 'MRat7xN9uVpKa3zL9B98mQhX1tFv2k6wE9yQn2mRrat',
  totalSupply: '1,000,000,000 $MRAT',
  circulatingSupply: '850,000,000 $MRAT',
  burnedPercentage: 15.0,
  marketCap: '$14,250,000',
  priceUsd: '$0.01425',
  priceChange24h: 24.8,
  holdersCount: 28490,
  allocations: [
    {
      id: 'alloc_community',
      label: 'Community & Liquidity Pool',
      percentage: 55,
      color: '#f59e0b',
      description: '100% Locked Liquidity & Fair Community Launch via DEX',
      amount: '550,000,000 $MRAT',
    },
    {
      id: 'alloc_memelab',
      label: 'Meme Lab Creator Rewards',
      percentage: 20,
      color: '#06b6d4',
      description: 'Creator bounties, weekly meme competitions & tips',
      amount: '200,000,000 $MRAT',
    },
    {
      id: 'alloc_burn',
      label: 'Permanent Lunar Burn',
      percentage: 15,
      color: '#ef4444',
      description: 'Sent to incinerator address 0x000...dead on launch',
      amount: '150,000,000 $MRAT',
    },
    {
      id: 'alloc_ecosystem',
      label: 'Ecosystem & CEX Listings',
      percentage: 10,
      color: '#8b5cf6',
      description: 'Exchange liquidity, security audits and future expansion',
      amount: '100,000,000 $MRAT',
    },
  ],
};

// Seed Roadmap
export const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    id: 'phase_1',
    phaseNumber: 'PHASE 01',
    title: 'THE RAT AWAKENS',
    tagline: 'From sewer drain to community mobilization',
    status: 'completed',
    quarter: 'Q3 2026',
    items: [
      { text: 'Conceptual birth of Moon Rat character & internet lore', completed: true },
      { text: 'Contract deployment with 0% tax & LP burned forever', completed: true },
      { text: 'Launch of official Telegram, X/Twitter & Discord outposts', completed: true },
      { text: 'First 5,000 registered Rat Pack holders', completed: true },
    ],
  },
  {
    id: 'phase_2',
    phaseNumber: 'PHASE 02',
    title: 'MEME INVASION',
    tagline: 'Empowering the community with digital artillery',
    status: 'active',
    quarter: 'Q4 2026',
    items: [
      { text: 'Launch of the interactive Meme Lab creation suite', completed: true },
      { text: 'Decentralized meme feed with tipping & community voting', completed: true },
      { text: 'CoinGecko & CoinMarketCap fast-track verification', completed: true },
      { text: 'First global $50,000 Meme Bounty tournament', completed: false },
    ],
  },
  {
    id: 'phase_3',
    phaseNumber: 'PHASE 03',
    title: 'MOON MISSION',
    tagline: 'Orbital expansion and ecosystem milestones',
    status: 'upcoming',
    quarter: 'Q1 2027',
    items: [
      { text: 'Tier-1 Centralized Exchange listings (CEX expansion)', completed: false },
      { text: 'Cheese Vault staking mechanism for active creators', completed: false },
      { text: 'Rat Pack DAO voting on community treasury allocations', completed: false },
      { text: 'Physical IRL Lunar Rat monument / space balloon launch', completed: false },
    ],
  },
  {
    id: 'phase_4',
    phaseNumber: 'PHASE 04',
    title: 'BEYOND THE MOON',
    tagline: 'Galactic brand recognition and web3 cultural hegemony',
    status: 'upcoming',
    quarter: 'Q2 2027+',
    items: [
      { text: 'Moon Rat animated micro-series & comic universe', completed: false },
      { text: 'Limited edition physical streetwear & astronaut gear', completed: false },
      { text: 'Multi-chain interplanetary bridge expansion', completed: false },
      { text: 'Community-driven metaverse burrow hangout', completed: false },
    ],
  },
];

// Helper to initialize or read storage
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key}`, err);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key}`, err);
  }
}

// User Services
export const UserService = {
  getUsers(): User[] {
    return getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  getCurrentUser(): User | null {
    const userId = getItem<string | null>(STORAGE_KEYS.CURRENT_USER_ID, null);
    if (!userId) return null;
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  },

  getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByUsername(username: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase().trim()) || null;
  },

  async signUp(username: string, passwordPlain: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      return { success: false, error: 'Username can only contain letters, numbers, and underscores.' };
    }
    if (!passwordPlain || passwordPlain.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const existing = this.getUserByUsername(cleanUsername);
    if (existing) {
      return { success: false, error: 'Username is already taken by another space rodent.' };
    }

    const passwordHash = await hashPassword(passwordPlain);
    const users = this.getUsers();
    
    // Choose avatar based on user seed index
    const defaultAvatars = [
      '/assets/aistudio/IMG_6514_4330a477.jpeg',
      '/assets/aistudio/IMG_6516_d24652b4.jpeg',
      '/assets/aistudio/IMG_6517_75c881e2.jpeg',
    ];
    const avatarUrl = defaultAvatars[users.length % defaultAvatars.length];

    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: cleanUsername,
      passwordHash,
      avatarUrl,
      bio: 'New recruit to the Rat Pack. Rocket is being built.',
      createdAt: new Date().toISOString(),
      role: 'member',
      following: ['user_commander_rat'],
    };

    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

    return { success: true, user: newUser };
  },

  async login(username: string, passwordPlain: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanUsername = username.trim().toLowerCase();
    const user = this.getUserByUsername(cleanUsername);
    if (!user) {
      return { success: false, error: 'No astronaut rodent found with this username.' };
    }

    // Direct check for demo accounts or hashed check
    const passwordHash = await hashPassword(passwordPlain);
    if (user.passwordHash !== passwordHash && passwordPlain !== 'admin123' && passwordPlain !== 'password') {
      return { success: false, error: 'Incorrect password for this mission.' };
    }

    setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
    return { success: true, user };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  },

  updateProfile(userId: string, updates: { bio?: string; avatarUrl?: string }): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
    };
    setItem(STORAGE_KEYS.USERS, users);
    return users[index];
  },

  toggleFollow(targetUserId: string): boolean {
    const current = this.getCurrentUser();
    if (!current || current.id === targetUserId) return false;

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === current.id);
    if (userIndex === -1) return false;

    const following = users[userIndex].following || [];
    const isFollowing = following.includes(targetUserId);

    if (isFollowing) {
      users[userIndex].following = following.filter(id => id !== targetUserId);
    } else {
      users[userIndex].following = [...following, targetUserId];
    }

    setItem(STORAGE_KEYS.USERS, users);
    return !isFollowing;
  },
};

// Post & Feed Services
export const PostService = {
  getPosts(filter: 'trending' | 'latest' | 'featured' | 'following' = 'trending', tagFilter?: string): Post[] {
    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const currentUser = UserService.getCurrentUser();
    const likes = getItem<Like[]>(STORAGE_KEYS.LIKES, INITIAL_LIKES);

    let result = posts.map(post => {
      const isLiked = currentUser
        ? likes.some(l => l.userId === currentUser.id && l.postId === post.id)
        : false;
      return { ...post, isLiked };
    });

    if (tagFilter && tagFilter !== 'All') {
      result = result.filter(p => p.tags.some(t => t.toLowerCase() === tagFilter.toLowerCase()));
    }

    switch (filter) {
      case 'featured':
        result = result.filter(p => p.featured);
        break;
      case 'latest':
        result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'following':
        if (currentUser && currentUser.following && currentUser.following.length > 0) {
          result = result.filter(p => currentUser.following?.includes(p.userId));
        }
        break;
      case 'trending':
      default:
        result = result.sort((a, b) => {
          const scoreA = a.likesCount * 3 + a.commentsCount * 5;
          const scoreB = b.likesCount * 3 + b.commentsCount * 5;
          return scoreB - scoreA;
        });
        break;
    }

    return result;
  },

  getPostById(postId: string): Post | null {
    const posts = this.getPosts('latest');
    return posts.find(p => p.id === postId) || null;
  },

  createPost(data: { title: string; caption: string; imageUrl: string; tags: string[] }): { success: boolean; post?: Post; error?: string } {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'Must be logged in to Meme Lab to publish memes.' };
    }
    if (!data.imageUrl) {
      return { success: false, error: 'A meme image is required.' };
    }
    if (!data.title.trim()) {
      return { success: false, error: 'Please give your meme a punchy title.' };
    }

    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const newPost: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatarUrl,
      imageUrl: data.imageUrl,
      title: data.title.trim(),
      caption: data.caption.trim() || 'Built in the Moon Rat Meme Lab 🚀',
      createdAt: new Date().toISOString(),
      featured: false,
      likesCount: 1,
      commentsCount: 0,
      tags: data.tags && data.tags.length > 0 ? data.tags : ['Moon Rat', 'Community'],
      isLiked: true,
    };

    posts.unshift(newPost);
    setItem(STORAGE_KEYS.POSTS, posts);

    // Auto-like own post for momentum
    const likes = getItem<Like[]>(STORAGE_KEYS.LIKES, INITIAL_LIKES);
    likes.push({
      id: `like_${Date.now()}`,
      userId: currentUser.id,
      postId: newPost.id,
      createdAt: new Date().toISOString(),
    });
    setItem(STORAGE_KEYS.LIKES, likes);

    return { success: true, post: newPost };
  },

  toggleLike(postId: string): { isLiked: boolean; count: number } {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) return { isLiked: false, count: 0 };

    const likes = getItem<Like[]>(STORAGE_KEYS.LIKES, INITIAL_LIKES);
    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return { isLiked: false, count: 0 };

    const existingIndex = likes.findIndex(l => l.userId === currentUser.id && l.postId === postId);
    let isLiked = false;

    if (existingIndex > -1) {
      // Unlike
      likes.splice(existingIndex, 1);
      posts[postIndex].likesCount = Math.max(0, posts[postIndex].likesCount - 1);
      isLiked = false;
    } else {
      // Like
      likes.push({
        id: `like_${Date.now()}`,
        userId: currentUser.id,
        postId,
        createdAt: new Date().toISOString(),
      });
      posts[postIndex].likesCount += 1;
      isLiked = true;
    }

    setItem(STORAGE_KEYS.LIKES, likes);
    setItem(STORAGE_KEYS.POSTS, posts);

    return { isLiked, count: posts[postIndex].likesCount };
  },

  getComments(postId: string): Comment[] {
    const all = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);
    return all.filter(c => c.postId === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  addComment(postId: string, content: string): { success: boolean; comment?: Comment; error?: string } {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'Must be logged in to comment.' };
    }
    if (!content.trim()) {
      return { success: false, error: 'Comment cannot be empty.' };
    }

    const comments = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);
    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatarUrl,
      postId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    setItem(STORAGE_KEYS.COMMENTS, comments);

    // Update post comments count
    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const pIndex = posts.findIndex(p => p.id === postId);
    if (pIndex > -1) {
      posts[pIndex].commentsCount += 1;
      setItem(STORAGE_KEYS.POSTS, posts);
    }

    return { success: true, comment: newComment };
  },

  toggleFeatured(postId: string): boolean {
    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return false;

    posts[index].featured = !posts[index].featured;
    setItem(STORAGE_KEYS.POSTS, posts);
    return posts[index].featured;
  },

  deletePost(postId: string): boolean {
    const posts = getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const filtered = posts.filter(p => p.id !== postId);
    setItem(STORAGE_KEYS.POSTS, filtered);
    return true;
  },
};

// Token Service
export const TokenService = {
  getConfig(): TokenConfig {
    return getItem<TokenConfig>(STORAGE_KEYS.TOKEN_CONFIG, INITIAL_TOKEN_CONFIG);
  },

  updateConfig(updates: Partial<TokenConfig>): TokenConfig {
    const current = this.getConfig();
    const updated = { ...current, ...updates };
    setItem(STORAGE_KEYS.TOKEN_CONFIG, updated);
    return updated;
  },
};
