import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StatsCard = ({ 
  className, 
  stats,
  ...props 
}) => {
  const statItems = [
    {
      label: "Posts",
      value: stats?.posts || 0,
      icon: "FileText",
      color: "text-primary"
    },
    {
      label: "Followers",
      value: stats?.followers || 0,
      icon: "Users",
      color: "text-secondary"
    },
    {
      label: "Following",
      value: stats?.following || 0,
      icon: "UserPlus",
      color: "text-accent"
    },
    {
      label: "Likes",
      value: stats?.likes || 0,
      icon: "Heart",
      color: "text-red-500"
    }
  ];

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
        <ApperIcon name="TrendingUp" className="h-5 w-5 text-success" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <ApperIcon name={item.icon} className={cn("h-5 w-5", item.color)} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;