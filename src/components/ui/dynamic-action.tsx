"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { ReactNode } from "react";

interface ActionItem {
  id: string;
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content: ReactNode;
  dimensions: { width: number; height: number };
}

interface DynamicActionProps {
  actions: ActionItem[];
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

export function DynamicAction({
  actions,
  className,
  triggerClassName,
  menuClassName,
}: DynamicActionProps) {
  const [hoveredAction, setHoveredAction] = React.useState<ActionItem | null>(null);

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="relative"
              onMouseEnter={() => setHoveredAction(action)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <Link
                to={action.to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors",
                  triggerClassName
                )}
              >
                <Icon className="size-4" />
                <span>{action.label}</span>
              </Link>

              {hoveredAction?.id === action.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50",
                    menuClassName
                  )}
                  style={{
                    width: action.dimensions.width,
                    minHeight: action.dimensions.height,
                  }}
                >
                  {action.content}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}