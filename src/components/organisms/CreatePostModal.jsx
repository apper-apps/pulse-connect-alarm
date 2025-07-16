import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { PostService } from "@/services/api/PostService";
import { StoryService } from "@/services/api/StoryService";

const CreatePostModal = ({ 
  className, 
  isOpen, 
  onClose, 
  onPostCreated,
  currentUser,
  ...props 
}) => {
const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStoryMode, setIsStoryMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
if (isStoryMode) {
      if (images.length === 0) {
        toast.error("Please add an image for your story");
        return;
      }
    } else {
      if (!content.trim()) {
        toast.error("Please write something before posting");
        return;
      }
    }

try {
      setIsSubmitting(true);
      
      if (isStoryMode) {
        const newStory = {
          imageUrl: images[0],
          userId: currentUser?.Id || 1
        };
        
        await StoryService.create(newStory);
        toast.success("Story created successfully!");
      } else {
        const newPost = {
          content: content.trim(),
          images: images,
          hashtags: extractHashtags(content),
          userId: currentUser?.Id || 1
        };

        await PostService.create(newPost);
        toast.success("Post created successfully!");
      }
      
      setContent("");
      setImages([]);
      setIsStoryMode(false);
      onPostCreated?.();
      onClose();
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const extractHashtags = (text) => {
    const hashtagRegex = /#(\w+)/g;
    const hashtags = [];
    let match;
    
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[1]);
    }
    
    return hashtags;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

const handleClose = () => {
    setContent("");
    setImages([]);
    setIsStoryMode(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className={cn(
              "relative w-full max-w-lg bg-white rounded-xl shadow-xl",
              className
            )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            {...props}
          >
            {/* Header */}
<div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isStoryMode ? "Create Story" : "Create Post"}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsStoryMode(false)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      !isStoryMode 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsStoryMode(true)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      isStoryMode 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Story
                  </button>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Avatar 
                  src={currentUser?.avatar} 
                  alt={currentUser?.displayName} 
                  size="md"
                />
<div className="flex-1">
                  {!isStoryMode && (
                    <TextArea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What's happening?"
                      rows={4}
                      className="resize-none border-0 focus:ring-0 p-0 text-lg"
                    />
                  )}
                  {isStoryMode && (
                    <div className="text-gray-500 text-lg">
                      Add an image to create your story
                    </div>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <motion.button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ApperIcon name="X" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
<motion.label
                    htmlFor="image-upload"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ApperIcon name="Image" className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {isStoryMode ? "Add Image" : "Photo"}
                    </span>
                  </motion.label>
<input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple={!isStoryMode}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
{!isStoryMode && (
                    <motion.button
                      type="button"
                      className="flex items-center space-x-2 text-primary hover:text-primary/80"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ApperIcon name="Hash" className="h-5 w-5" />
                      <span className="text-sm font-medium">Hashtag</span>
                    </motion.button>
                  )}
                </div>

<div className="flex items-center space-x-3">
                  {!isStoryMode && (
                    <span className="text-sm text-gray-500">
                      {content.length}/280
                    </span>
                  )}
                  <Button
                    type="submit"
                    disabled={
                      isStoryMode 
                        ? images.length === 0 || isSubmitting
                        : !content.trim() || isSubmitting
                    }
                    className="px-6"
                  >
                    {isSubmitting 
                      ? (isStoryMode ? "Creating..." : "Posting...") 
                      : (isStoryMode ? "Create Story" : "Post")
                    }
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;