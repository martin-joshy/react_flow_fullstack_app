import React from "react";
import { Handle, Position } from "reactflow";
import { cn } from "../lib/utils";

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  selected = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
}) => {
  const renderHandles = (handles, type) => {
    return handles.map((handle, index) => {
      const position = type === "input" ? Position.Left : Position.Right;
      const yPosition =
        handles.length === 1 ? 50 : (100 / (handles.length + 1)) * (index + 1);

      return (
        <Handle
          key={`${type}-${handle.id}`}
          type={type === "input" ? "target" : "source"}
          position={position}
          id={`${id}-${handle.id}`}
          className={cn(
            "w-3 h-3 border-2 !bg-purple-400 rounded-full ring-1 ring-purple-300",
            handle.className
          )}
          style={{ top: `${yPosition}%` }}
        />
      );
    });
  };

  return (
    <div
      className={cn(
        `w-[230px] rounded-lg border bg-white shadow-sm text-gray-800 ${
          selected
            ? "border-purple-600 shadow-lg ring-1 ring-purple-500"
            : "border-purple-200"
        }`,
        className
      )}
    >
      {inputs.length > 0 && renderHandles(inputs, "input")}

      <div
        className={cn(
          "flex items-center justify-between border-b border-purple-100 font-medium text-purple-600 px-3 py-2",
          headerClassName
        )}
      >
        {title}
      </div>

      <div className={cn("flex flex-col gap-2 px-3 py-2", contentClassName)}>
        {children}
      </div>

      {outputs.length > 0 && renderHandles(outputs, "output")}
    </div>
  );
};
