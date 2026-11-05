import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Starfield from './components/common/Starfield';
import Hero from './components/home/Hero';
import HomeSections from './components/home/HomeSections';
import NarrativePage from './components/narrative/NarrativePage';
import TokenPage from './components/token/TokenPage';
import RoadmapPage from './components/roadmap/RoadmapPage';
import CommunityPage from './components/community/CommunityPage';
import MemeLabPage from './components/memelab/MemeLabPage';
import FeedPage from './components/feed/FeedPage';
import PostDetailModal from './components/feed/PostDetailModal';
import ProfilePage from './components/profile/ProfilePage';
import AuthModal from './components/auth/AuthModal';
import DashboardModal from './components/dashboard/DashboardModal';
import AdminModal from './components/admin/AdminModal';

import { User, Post, TokenConfig } from './types';
import { UserService, PostService, TokenService } from './lib/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>(TokenService.getConfig());
  
  // Modals & Subpages
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [viewProfileUserId, setViewProfileUserId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    const user = UserService.getCurrentUser();
    setCurrentUser(user);
    refreshPosts();

    // Check URL hash if present
    const hash = window.location.hash.replace('#', '');
    if (['home', 'narrative', 'token', 'roadmap', 'community', 'memelab', 'feed'].includes(hash)) {
      setCurrentTab(hash);
    }
  }, []);

  const refreshPosts = () => {
    const list = PostService.getPosts('trending');
    setPosts(list);
    if (selectedPost) {
      const refreshed = PostService.getPostById(selectedPost.id);
      setSelectedPost(refreshed);
    }
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    setViewProfileUserId(null);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    refreshPosts();
  };

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
    refreshPosts();
  };

  const handleLikeToggle = (postId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    PostService.toggleLike(postId);
    refreshPosts();
  };

  const handleToggleFeatured = (postId: string) => {
    PostService.toggleFeatured(postId);
    refreshPosts();
  };

  const handleDeletePost = (postId: string) => {
    PostService.deletePost(postId);
    refreshPosts();
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
  };

  const handleViewUserProfile = (userId: string) => {
    setViewProfileUserId(userId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-black">
      
      {/* Background Starfield */}
      <Starfield />

      {/* Primary Top Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenDashboard={() => setDashboardOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewProfileUserId ? (
          <ProfilePage
            userId={viewProfileUserId}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onPostClick={(post) => setSelectedPost(post)}
            onProfileUpdated={() => {
              setCurrentUser(UserService.getCurrentUser());
              refreshPosts();
            }}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <>
                <Hero
                  onNavigate={handleNavigate}
                  onOpenAuth={() => setAuthModalOpen(true)}
                  isLoggedIn={!!currentUser}
                  tokenConfig={tokenConfig}
                />
                <HomeSections
                  onNavigate={handleNavigate}
                  tokenConfig={tokenConfig}
                  posts={posts}
                  onOpenAuth={() => setAuthModalOpen(true)}
                  isLoggedIn={!!currentUser}
                  onPostClick={(post) => setSelectedPost(post)}
                  onLikeToggle={handleLikeToggle}
                />
              </>
            )}

            {currentTab === 'narrative' && (
              <NarrativePage
                onNavigate={handleNavigate}
                onOpenAuth={() => setAuthModalOpen(true)}
                isLoggedIn={!!currentUser}
              />
            )}

            {currentTab === 'token' && (
              <TokenPage
                tokenConfig={tokenConfig}
                onNavigate={handleNavigate}
                onOpenAdmin={() => setAdminOpen(true)}
                isAdmin={currentUser?.role === 'admin'}
              />
            )}

            {currentTab === 'roadmap' && (
              <RoadmapPage
                onNavigate={handleNavigate}
                onOpenAuth={() => setAuthModalOpen(true)}
                isLoggedIn={!!currentUser}
              />
            )}

            {currentTab === 'community' && (
              <CommunityPage
                onNavigate={handleNavigate}
                onOpenAuth={() => setAuthModalOpen(true)}
                currentUser={currentUser}
              />
            )}

            {currentTab === 'memelab' && (
              <MemeLabPage
                currentUser={currentUser}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigate={handleNavigate}
                onPostCreated={() => {
                  refreshPosts();
                }}
              />
            )}

            {currentTab === 'feed' && (
              <FeedPage
                posts={posts}
                currentUser={currentUser}
                onPostClick={(post) => setSelectedPost(post)}
                onLikeToggle={handleLikeToggle}
                onNavigateToMemeLab={() => {
                  if (currentUser) handleNavigate('memelab');
                  else setAuthModalOpen(true);
                }}
                onViewUserProfile={handleViewUserProfile}
                onToggleFeatured={handleToggleFeatured}
                onDeletePost={handleDeletePost}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} tokenConfig={tokenConfig} />

      {/* Modals */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          currentUser={currentUser}
          onClose={() => setSelectedPost(null)}
          onLikeToggle={handleLikeToggle}
          onViewUserProfile={handleViewUserProfile}
          onOpenAuth={() => setAuthModalOpen(true)}
          onToggleFeatured={handleToggleFeatured}
          onPostUpdated={refreshPosts}
        />
      )}

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {dashboardOpen && currentUser && (
        <DashboardModal
          currentUser={currentUser}
          onClose={() => setDashboardOpen(false)}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          onViewProfile={handleViewUserProfile}
          onOpenAdmin={() => setAdminOpen(true)}
        />
      )}

      {adminOpen && currentUser?.role === 'admin' && (
        <AdminModal
          onClose={() => setAdminOpen(false)}
          tokenConfig={tokenConfig}
          onTokenConfigUpdated={(newCfg) => setTokenConfig(newCfg)}
          onPostUpdated={refreshPosts}
        />
      )}

    </div>
  );
}
