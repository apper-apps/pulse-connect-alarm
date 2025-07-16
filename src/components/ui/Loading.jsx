import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, ...props }) => {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Stories skeleton */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded shimmer"></div>
          <div className="h-5 w-5 bg-gray-200 rounded shimmer"></div>
        </div>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
              <div className="h-3 w-12 bg-gray-200 rounded shimmer"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Post skeletons */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-200 rounded shimmer mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded shimmer"></div>
          </div>

          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200 rounded-lg shimmer mb-4"></div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
              <div className="w-8 h-4 bg-gray-200 rounded shimmer"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
              <div className="w-8 h-4 bg-gray-200 rounded shimmer"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
              <div className="w-8 h-4 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;