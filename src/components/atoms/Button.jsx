import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-surface border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    accent: "bg-gradient-to-r from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90 shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-success/90 hover:to-green-600/90 shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-medium",
    xl: "px-8 py-4 text-lg font-semibold"
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;