import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const TrendingItem = ({ 
  className, 
  trend, 
  onClick,
  ...props 
}) => {
  const handleClick = () => {
    onClick?.(trend.hashtag);
  };

  const getTrendIcon = () => {
    switch (trend.trend) {
      case "up":
        return <ApperIcon name="TrendingUp" className="h-4 w-4 text-success" />;
      case "down":
        return <ApperIcon name="TrendingDown" className="h-4 w-4 text-error" />;
      default:
        return <ApperIcon name="Minus" className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend.trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-error";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors",
        className
      )}
      onClick={handleClick}
      whileHover={{ x: 2 }}
      {...props}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            #{trend.hashtag}
          </span>
          {getTrendIcon()}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">
            {trend.postCount.toLocaleString()} posts
          </span>
          {trend.percentChange !== 0 && (
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {trend.percentChange > 0 ? "+" : ""}{trend.percentChange}%
            </span>
          )}
        </div>
      </div>
      <Badge variant="secondary" size="sm">
        Trending
      </Badge>
    </motion.div>
  );
};

export default TrendingItem;