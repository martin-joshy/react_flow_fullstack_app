import React from "react";
import { cn } from "../lib/utils";

const Select = React.forwardRef((props, ref) => {
  const { className, options, ...otherProps } = props;

  return (
    <select
      className={cn(
        "w-full rounded-md border border-input bg-background px-3 py-2",
        "text-sm shadow-sm",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

export default Select;
