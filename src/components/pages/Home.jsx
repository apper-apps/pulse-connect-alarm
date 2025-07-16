import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Feed from "@/components/organisms/Feed";
import StoriesBar from "@/components/organisms/StoriesBar";
import StatsCard from "@/components/organisms/StatsCard";
import TrendingCard from "@/components/organisms/TrendingCard";
import SuggestedUsers from "@/components/organisms/SuggestedUsers";
import ActiveUsers from "@/components/organisms/ActiveUsers";
import CreatePostModal from "@/components/organisms/CreatePostModal";
import ChatModal from "@/components/organisms/ChatModal";
import { useHomeData } from "@/hooks/useHomeData";

const Home = ({ className, ...props }) => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  
  const {
    currentUser,
    stats,
    trends,
    stories,
    suggestedUsers,
    activeUsers,
    loading,
    error,
    refetch
  } = useHomeData();

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  const handlePostCreated = () => {
    refetch();
  };

  const handleFollowToggle = (userId) => {
    setFollowingUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleStoryClick = (storyId) => {
    console.log("Story clicked:", storyId);
  };

  const handleTrendClick = (hashtag) => {
    console.log("Trend clicked:", hashtag);
  };

const handleUserClick = (userId) => {
    console.log("User clicked:", userId);
  };

  const handleChatClick = (user) => {
    setSelectedChatUser(user);
    setIsChatModalOpen(true);
  };
  return (
    <div className={cn("min-h-screen bg-background", className)} {...props}>
      <Header 
        currentUser={currentUser}
        onCreatePost={handleCreatePost}
        onSearch={handleSearch}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <StatsCard stats={stats} />
            <TrendingCard 
              trends={trends}
              onTrendClick={handleTrendClick}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <StoriesBar 
              stories={stories}
              onStoryClick={handleStoryClick}
            />
            <Feed 
              onPostLike={(postId) => console.log("Post liked:", postId)}
              onPostComment={(postId) => console.log("Post commented:", postId)}
              onPostShare={(postId) => console.log("Post shared:", postId)}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <SuggestedUsers 
              users={suggestedUsers}
              onFollowToggle={handleFollowToggle}
              followingUsers={followingUsers}
            />
<ActiveUsers 
              activeUsers={activeUsers}
              onUserClick={handleUserClick}
              onChatClick={handleChatClick}
            />
          </div>
        </div>
      </div>

<CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={handlePostCreated}
        currentUser={currentUser}
      />

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        selectedUser={selectedChatUser}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Home;