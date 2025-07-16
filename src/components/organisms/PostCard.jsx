import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import PostActions from "@/components/molecules/PostActions";
import ApperIcon from "@/components/ApperIcon";

const PostCard = ({ 
  className, 
  post, 
  onLike, 
  onComment, 
  onShare,
  ...props 
}) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <motion.article
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={post.user?.avatar} 
            alt={post.user?.displayName} 
            size="md"
            isOnline={post.user?.isOnline}
          />
          <div>
            <h4 className="font-semibold text-gray-900">{post.user?.displayName}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>@{post.user?.username}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        <motion.button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="MoreHorizontal" className="h-4 w-4 text-gray-400" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
        
        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.map((hashtag, index) => (
              <motion.span
                key={index}
                className="text-primary hover:text-primary/80 cursor-pointer text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                #{hashtag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={cn(
            "grid gap-2 rounded-lg overflow-hidden",
            post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}>
            {post.images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <PostActions
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
      />
    </motion.article>
  );
};

export default PostCard;