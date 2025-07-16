import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

const UserCard = ({ 
  className, 
  user, 
  isFollowing = false, 
  onFollowToggle,
  showFollowButton = true,
  ...props 
}) => {
  const handleFollowClick = () => {
    onFollowToggle?.(user.Id);
  };

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100",
        className
      )}
      whileHover={{ y: -2 }}
      {...props}
    >
      <div className="flex items-center space-x-3">
        <Avatar 
          src={user.avatar} 
          alt={user.displayName} 
          size="md"
          isOnline={user.isOnline}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {user.displayName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            @{user.username}
          </p>
          {user.bio && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
        {showFollowButton && (
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            size="sm"
            onClick={handleFollowClick}
            className="shrink-0"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;