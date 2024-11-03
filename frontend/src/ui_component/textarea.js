import React from "react";
import { cn } from "../lib/utils";

const Textarea = React.forwardRef(
  ({ className, minHeight = "60px", maxHeight = "200px", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full rounded-md border border-input bg-transparent px-3 py-2",
          "text-sm shadow-sm placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none overflow-y-auto",
          className
        )}
        style={{
          minHeight,
          maxHeight,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
