import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";

const StoryItem = ({ 
  className, 
  story, 
  onClick,
  isViewed = false,
  ...props 
}) => {
  const handleClick = () => {
    onClick?.(story.Id);
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0",
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <div className={cn(
        "p-0.5 rounded-full",
        isViewed ? "story-ring-viewed" : "story-ring"
      )}>
        <Avatar 
          src={story.user?.avatar} 
          alt={story.user?.displayName} 
          size="md"
          className="ring-2 ring-white"
        />
      </div>
      <span className="text-xs text-gray-600 truncate max-w-[60px]">
        {story.user?.displayName}
      </span>
    </motion.div>
  );
};

export default StoryItem;