import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import PostActions from "@/components/molecules/PostActions";
import ApperIcon from "@/components/ApperIcon";
import TextArea from "@/components/atoms/TextArea";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-toastify";
const PostCard = ({ 
  className, 
  post, 
  onLike, 
  onComment, 
  onShare,
  ...props 
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  const handleCommentToggle = () => {
    setShowCommentForm(!showCommentForm);
    if (!showCommentForm) {
      setCommentText("");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await onComment(post.Id, { content: commentText.trim() });
      setCommentText("");
      setShowCommentForm(false);
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentCancel = () => {
    setCommentText("");
    setShowCommentForm(false);
  };
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
        onComment={handleCommentToggle}
        onShare={onShare}
      />

      {/* Inline Comment Form */}
      {showCommentForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar 
                src="/api/placeholder/32/32" 
                alt="Your avatar" 
                size="sm"
              />
              <div className="flex-1">
                <TextArea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="resize-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCommentCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!commentText.trim() || isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.article>
  );
};

export default PostCard;