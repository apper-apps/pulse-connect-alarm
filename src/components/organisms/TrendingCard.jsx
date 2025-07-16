import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import TrendingItem from "@/components/molecules/TrendingItem";
import ApperIcon from "@/components/ApperIcon";

const TrendingCard = ({ 
  className, 
  trends = [],
  onTrendClick,
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
      transition={{ delay: 0.2 }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Trending</h3>
        <ApperIcon name="Hash" className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.hashtag}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <TrendingItem
              trend={trend}
              onClick={onTrendClick}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="w-full mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        whileHover={{ scale: 1.02 }}
      >
        Show more trends
      </motion.button>
    </motion.div>
  );
};

export default TrendingCard;