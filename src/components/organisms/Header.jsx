import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import NotificationDropdown from "@/components/molecules/NotificationDropdown";

const Header = ({ 
  className, 
  onCreatePost,
  onSearch,
  currentUser,
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleCreatePost = () => {
    onCreatePost?.();
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display gradient-text">
                Pulse Connect
              </span>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar
              placeholder="Search posts, users, and topics..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreatePost}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span className="hidden sm:inline">Create Post</span>
</Button>
            
            <NotificationDropdown />
            <Avatar 
              src={currentUser?.avatar} 
              alt={currentUser?.displayName} 
              size="md"
              className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;