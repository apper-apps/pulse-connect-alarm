import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ 
  className, 
  src, 
  alt, 
  size = "md",
  isOnline = false,
  ...props 
}, ref) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div className="relative inline-block">
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover ring-2 ring-white shadow-sm",
          sizes[size],
          className
        )}
        {...props}
      />
      {isOnline && (
        <div className="absolute bottom-0 right-0">
          <div className="w-3 h-3 bg-success rounded-full border-2 border-white animate-pulse-glow"></div>
        </div>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;