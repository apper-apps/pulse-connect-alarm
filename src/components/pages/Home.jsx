import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHomeData } from "@/hooks/useHomeData";
import ApperIcon from "@/components/ApperIcon";
import SuggestedUsers from "@/components/organisms/SuggestedUsers";
import ActiveUsers from "@/components/organisms/ActiveUsers";
import StatsCard from "@/components/organisms/StatsCard";
import ChatModal from "@/components/organisms/ChatModal";
import CreatePostModal from "@/components/organisms/CreatePostModal";
import Feed from "@/components/organisms/Feed";
import TrendingCard from "@/components/organisms/TrendingCard";
import Header from "@/components/organisms/Header";
import StoriesBar from "@/components/organisms/StoriesBar";
import { cn } from "@/utils/cn";

const Home = ({ className, ...props }) => {
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

const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState(null);

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

const handlePostCreated = () => {
    if (refetch) {
      refetch();
    }
  };

  const handlePostLike = (postId) => {
    console.log("Post liked:", postId);
  };

  const handlePostComment = (postId, comment) => {
    console.log("Post commented:", postId, comment);
  };

  const handlePostShare = (postId) => {
    console.log("Post shared:", postId);
  };

  const handleFollowToggle = (userId) => {
    setFollowingUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

const handleSearch = (query) => {
    setSearchQuery(query || "");
    console.log("Search query:", query);
  };
  const handleStoryClick = (storyId) => {
    console.log("Story clicked:", storyId);
  };

const handleTrendClick = (hashtag) => {
    const trend = trends.find(t => t.hashtag === hashtag);
    setSelectedTrend(trend);
    setIsSuggestionsOpen(true);
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
              onPostLike={handlePostLike}
              onPostComment={handlePostComment}
              onPostShare={handlePostShare}
              className="flex-1"
            />
          </div>
          
{/* Right Sidebar */}
          <div className="hidden xl:block xl:w-80 space-y-6">
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

      {/* Suggestions Modal */}
      {isSuggestionsOpen && selectedTrend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                #{selectedTrend.hashtag} Suggestions
              </h3>
              <button
                onClick={() => setIsSuggestionsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ApperIcon name="TrendingUp" className="h-4 w-4" />
                <span>{selectedTrend.postCount.toLocaleString()} posts</span>
                <span className="text-success">+{selectedTrend.percentChange}%</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Related Suggestions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="text-sm">#{selectedTrend.hashtag}tips</span>
                    <span className="text-xs text-gray-500">2.1k posts</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="text-sm">#{selectedTrend.hashtag}guide</span>
                    <span className="text-xs text-gray-500">1.8k posts</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="text-sm">#{selectedTrend.hashtag}community</span>
                    <span className="text-xs text-gray-500">3.2k posts</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleSearch(`#${selectedTrend.hashtag}`);
                    setIsSuggestionsOpen(false);
                  }}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Search Posts
                </button>
                <button
                  onClick={() => setIsSuggestionsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;