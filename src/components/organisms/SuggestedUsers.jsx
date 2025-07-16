import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import UserCard from "@/components/molecules/UserCard";
import ApperIcon from "@/components/ApperIcon";

const SuggestedUsers = ({ 
  className, 
  users = [],
  onFollowToggle,
  followingUsers = [],
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
      transition={{ delay: 0.3 }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Suggested for you</h3>
        <ApperIcon name="UserPlus" className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {users.map((user, index) => (
          <motion.div
            key={user.Id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <UserCard
              user={user}
              onFollowToggle={onFollowToggle}
              isFollowing={followingUsers.includes(user.Id)}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="w-full mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        whileHover={{ scale: 1.02 }}
      >
        See all suggestions
      </motion.button>
    </motion.div>
  );
};

export default SuggestedUsers;