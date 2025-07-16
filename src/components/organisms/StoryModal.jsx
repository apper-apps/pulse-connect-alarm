import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { StoryService } from "@/services/api/StoryService";

const StoryModal = ({ 
  isOpen, 
  onClose, 
  storyId, 
  stories = [],
  currentUser,
  onStoryViewed
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStory, setCurrentStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  const STORY_DURATION = 5000; // 5 seconds

  // Find initial story index
  useEffect(() => {
    if (isOpen && storyId && stories.length > 0) {
      const index = stories.findIndex(story => story.Id === storyId);
      if (index !== -1) {
        setCurrentStoryIndex(index);
      }
    }
  }, [isOpen, storyId, stories]);

  // Load current story
  useEffect(() => {
    if (isOpen && stories.length > 0 && currentStoryIndex >= 0) {
      const story = stories[currentStoryIndex];
      if (story) {
        setCurrentStory(story);
        setProgress(0);
        markStoryAsViewed(story.Id);
      }
    }
  }, [isOpen, currentStoryIndex, stories]);

  // Auto-advance timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (STORY_DURATION / 100));
        if (newProgress >= 100) {
          handleNext();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentStory, currentStoryIndex]);

  const markStoryAsViewed = async (storyId) => {
    try {
      await StoryService.markAsViewed(storyId, currentUser?.Id || "1");
      onStoryViewed?.(storyId);
    } catch (error) {
      console.error("Error marking story as viewed:", error);
    }
  };

  const handleNext = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      onClose();
    }
  }, [currentStoryIndex, stories.length, onClose]);

  const handlePrevious = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  }, [currentStoryIndex]);

  const handleClose = () => {
    setProgress(0);
    setCurrentStoryIndex(0);
    setCurrentStory(null);
    onClose();
  };

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        handleNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handlePrevious();
        break;
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
      case ' ':
        e.preventDefault();
        setIsPaused(prev => !prev);
        break;
    }
  }, [isOpen, handleNext, handlePrevious]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center story-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="relative w-full max-w-sm h-full max-h-[90vh] bg-black rounded-2xl overflow-hidden story-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white bg-opacity-30 rounded-full overflow-hidden"
              >
                <div
                  className={cn(
                    "h-full bg-white transition-all duration-100 ease-linear story-progress",
                    index < currentStoryIndex ? "w-full" : 
                    index === currentStoryIndex ? "" : "w-0"
                  )}
                  style={{
                    width: index === currentStoryIndex ? `${progress}%` : 
                           index < currentStoryIndex ? "100%" : "0%"
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                src={currentStory.user?.avatar}
                alt={currentStory.user?.displayName}
                size="sm"
                className="ring-2 ring-white"
              />
              <div>
                <p className="text-white font-medium text-sm">
                  {currentStory.user?.displayName}
                </p>
                <p className="text-white text-opacity-70 text-xs">
                  {new Date(currentStory.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          {/* Story content */}
          <div className="relative w-full h-full">
            <img
              src={currentStory.imageUrl}
              alt={`Story by ${currentStory.user?.displayName}`}
              className="w-full h-full object-cover"
              onLoad={() => setLoading(false)}
              onError={() => {
                toast.error("Failed to load story");
                handleNext();
              }}
            />
            
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Navigation areas */}
          <div className="absolute inset-0 flex">
            <button
              className="flex-1 transparent-button"
              onClick={handlePrevious}
              disabled={currentStoryIndex === 0}
            />
            <button
              className="flex-1 transparent-button"
              onClick={handleNext}
            />
          </div>

          {/* Play/Pause button */}
          <button
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            onClick={() => setIsPaused(!isPaused)}
          >
            <ApperIcon name={isPaused ? "Play" : "Pause"} size={16} />
          </button>

          {/* Story counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {currentStoryIndex + 1} / {stories.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryModal;