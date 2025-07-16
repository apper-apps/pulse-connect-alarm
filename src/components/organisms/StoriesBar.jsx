import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import StoryItem from "@/components/molecules/StoryItem";
import StoryModal from "@/components/organisms/StoryModal";
import ApperIcon from "@/components/ApperIcon";

const StoriesBar = ({ 
  className, 
  stories = [],
  onStoryClick,
  currentUser,
  showStoryModal,
  selectedStoryId,
  onStoryModalClose,
  onStoryViewed,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm border border-gray-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Stories</h3>
        <ApperIcon name="Play" className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
        {stories.map((story, index) => (
          <motion.div
            key={story.Id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <StoryItem
              story={story}
              onClick={onStoryClick}
isViewed={story.viewers?.includes(currentUser?.Id?.toString())}
            />
          </motion.div>
))}
      </div>
      
      <StoryModal
        isOpen={showStoryModal}
        onClose={onStoryModalClose}
        storyId={selectedStoryId}
        stories={stories}
        currentUser={currentUser}
        onStoryViewed={onStoryViewed}
      />
    </motion.div>
  );
};

export default StoriesBar;