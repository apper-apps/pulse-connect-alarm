import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import PostCard from "@/components/organisms/PostCard";
import { PostService } from "@/services/api/PostService";
import { cn } from "@/utils/cn";

const Feed = ({ 
  className, 
  onPostLike, 
  onPostComment, 
  onPostShare
}) => {
const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PostService.getAll();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await PostService.like(postId);
      onPostLike?.(postId);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };
const handleComment = async (postId, commentData) => {
    if (commentData) {
      // Handle comment submission
      try {
        await PostService.addComment(postId, commentData.content);
        // Update local post comments count
        setPosts(prev => prev.map(post => 
          post.Id === postId 
            ? { ...post, comments: post.comments + 1 }
            : post
        ));
      } catch (err) {
        console.error("Error adding comment:", err);
        throw err;
      }
    }
    onPostComment?.(postId);
  };
  const handleShare = async (postId) => {
    try {
      await PostService.share(postId);
      onPostShare?.(postId);
    } catch (err) {
      console.error("Error sharing post:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPosts} />;
  }

if (posts.length === 0) {
    return <Empty message="No posts yet" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <h2 className="text-xl font-display font-semibold text-gray-800">Latest Posts</h2>
      </div>
      <div className={cn("space-y-6", className)}>
{posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;