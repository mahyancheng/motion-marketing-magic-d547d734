"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardStickyProps
  extends Omit<React.ComponentProps<typeof motion.div>, "ref"> {
  /** 第几个卡（从 0 开始） */
  index: number;
  /** 统一 stickTop（优先级最高，支持"12vh"或数值像素） */
  stickTop?: string | number;

  /** 若未提供 stickTop：用这两个来计算每张卡的 top(px) = topBasePx + index * perStepOffsetPx */
  topBasePx?: number;        // 例如 16
  perStepOffsetPx?: number;  // 例如 标题高度 + 间距（56+12 等）

  /** 叠放层级：z = baseZ + index * zStep */
  baseZ?: number;            // 默认 200
  zStep?: number;            // 默认 10
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...style }}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      stickTop,
      topBasePx = 0,
      perStepOffsetPx = 0,
      baseZ = 200,
      zStep = 10,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // 计算 top（优先 stickTop，其次 topBasePx + index * perStepOffsetPx）
    const computedTop =
      typeof stickTop !== "undefined"
        ? stickTop
        : topBasePx + index * perStepOffsetPx;

    const computedZ = baseZ + index * zStep;

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          position: "sticky",
          top: computedTop,
          zIndex: computedZ,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

export { ContainerScroll, CardSticky };
