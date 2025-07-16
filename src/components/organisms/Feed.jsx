import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import PostCard from "@/components/organisms/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { PostService } from "@/services/api/PostService";

const Feed = ({ 
  className, 
  onPostLike, 
  onPostComment, 
  onPostShare,
  ...props 
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

  const handleComment = async (postId) => {
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
    return <Empty />;
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {posts.map((post, index) => (
        <motion.div
          key={post.Id}
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
  );
};

export default Feed;