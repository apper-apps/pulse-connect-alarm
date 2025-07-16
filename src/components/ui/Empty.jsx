import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className, 
  title = "No posts yet", 
  description = "Be the first to share something amazing with the community!",
  actionText = "Create Post",
  onAction,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="MessageSquare" className="h-10 w-10 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>{actionText}</span>
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;