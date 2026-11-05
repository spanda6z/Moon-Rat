export interface User {
  id: string;
  username: string;
  passwordHash: string;
  avatarUrl: string;
  bio: string;
  createdAt: string;
  role: 'admin' | 'creator' | 'member';
  following?: string[]; // user IDs
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  title: string;
  caption: string;
  createdAt: string;
  featured: boolean;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  postId: string;
  content: string;
  createdAt: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface TokenAllocation {
  id: string;
  label: string;
  percentage: number;
  color: string;
  description: string;
  amount: string;
}

export interface TokenConfig {
  name: string;
  symbol: string;
  network: string;
  contractAddress: string;
  totalSupply: string;
  circulatingSupply: string;
  burnedPercentage: number;
  marketCap: string;
  priceUsd: string;
  priceChange24h: number;
  holdersCount: number;
  allocations: TokenAllocation[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: string;
  title: string;
  tagline: string;
  status: 'completed' | 'active' | 'upcoming';
  quarter: string;
  items: { text: string; completed: boolean }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'like' | 'comment' | 'featured' | 'system';
}
