import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const ActiveUsers = ({ 
  className, 
  activeUsers = [],
  onUserClick,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Now</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">{activeUsers.length}</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activeUsers.map((user, index) => (
          <motion.div
            key={user.Id}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onUserClick?.(user.Id)}
            whileHover={{ x: 2 }}
          >
            <Avatar 
              src={user.avatar} 
              alt={user.displayName} 
              size="sm"
              isOnline={user.isOnline}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.displayName}
              </p>
<p className="text-xs text-gray-500 truncate">
                {user.isOnline ? "Active now" : formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}
              </p>
            </div>
            <ApperIcon 
              name="MessageCircle" 
              className="h-4 w-4 text-gray-400 hover:text-primary cursor-pointer transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                console.log("Chat with user:", user.Id, user.displayName);
                // TODO: Replace with actual chat functionality
                // onChatClick?.(user.Id);
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveUsers;