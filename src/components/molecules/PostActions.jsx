import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const PostActions = ({ 
  className, 
  post, 
  onLike, 
  onComment, 
  onShare,
  isLiked = false,
  ...props 
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    setIsAnimating(true);
    
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
      toast.success("Like removed");
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      toast.success("Post liked!");
    }
    
    setTimeout(() => setIsAnimating(false), 300);
    onLike?.(post.Id);
  };

const handleComment = () => {
    onComment?.();
  };

  const handleShare = () => {
    onShare?.(post.Id);
    toast.success("Post shared!");
  };

  return (
    <div className={cn("flex items-center space-x-6", className)} {...props}>
      <motion.button
        onClick={handleLike}
        className="flex items-center space-x-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <ApperIcon 
            name="Heart" 
            className={cn(
              "h-5 w-5 transition-colors",
              liked ? "fill-red-500 text-red-500" : "text-gray-500 group-hover:text-red-500",
              isAnimating && "heart-pop"
            )}
          />
        </div>
        <span className={cn(
          "text-sm font-medium transition-colors",
          liked ? "text-red-500" : "text-gray-500 group-hover:text-red-500"
        )}>
          {likeCount}
        </span>
      </motion.button>

      <motion.button
        onClick={handleComment}
        className="flex items-center space-x-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ApperIcon 
          name="MessageCircle" 
          className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors"
        />
        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
          {post.comments}
        </span>
      </motion.button>

      <motion.button
        onClick={handleShare}
        className="flex items-center space-x-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ApperIcon 
          name="Share" 
          className="h-5 w-5 text-gray-500 group-hover:text-green-500 transition-colors"
        />
        <span className="text-sm font-medium text-gray-500 group-hover:text-green-500 transition-colors">
          {post.shares}
        </span>
      </motion.button>
    </div>
  );
};

export default PostActions;