import React from "react";
import { cn } from "@/utils/cn";

const TextArea = React.forwardRef(({ 
  className, 
  placeholder,
  error,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "flex min-h-[60px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        error && "border-error focus:border-error focus:ring-error/20",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;