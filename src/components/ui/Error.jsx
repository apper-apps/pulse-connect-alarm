import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  message = "Something went wrong", 
  onRetry,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}. We're working to fix this. Please try again.
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      )}
    </motion.div>
  );
};

export default Error;