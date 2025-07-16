import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import ApperIcon from "@/components/ApperIcon";
import { PostService } from "@/services/api/PostService";
import { toast } from "react-toastify";

const CommentModal = ({ 
  isOpen, 
  onClose, 
  post,
  className,
  ...props 
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && post) {
      loadComments();
    }
  }, [isOpen, post]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await PostService.getComments(post.Id);
      setComments(data);
    } catch (err) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const comment = await PostService.addComment(post.Id, newComment.trim());
      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={cn(
            "bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar 
                src={post?.user?.avatar} 
                alt={post?.user?.displayName} 
                size="md"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post?.user?.displayName}</h3>
                <p className="text-sm text-gray-500">@{post?.user?.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Post Content */}
          <div className="p-6 border-b border-gray-100">
            <p className="text-gray-800 leading-relaxed mb-3">{post?.content}</p>
            {post?.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-primary text-sm font-medium"
                  >
                    #{hashtag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="MessageCircle" className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3"
                  >
                    <Avatar 
                      src={comment.user?.avatar} 
                      alt={comment.user?.displayName} 
                      size="sm"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {comment.user?.displayName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="p-6 border-t border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a comment..."
                className="resize-none"
                rows={3}
              />
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="min-w-[100px]"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    "Comment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommentModal;