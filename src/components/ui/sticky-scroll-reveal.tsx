"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: { title: string; description: string; content?: React.ReactNode }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // 仅用于背景色过渡
  const backgroundColors = ["rgb(0 0 0)", "rgb(15 15 15)", "rgb(23 23 23)"];

  // 面板定位 & 打开时禁止 body 滚动
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (expanded) {
      const { style } = document.body;
      const prev = style.overflow;
      style.overflow = "hidden";
      return () => {
        style.overflow = prev;
      };
    }
  }, [expanded]);

  // 居中弹出动画
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.98, y: 10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // 进度点切换（不再依赖滚动/section refs）
  const go = useCallback(
    (i: number) => {
      if (i < 0 || i >= content.length) return;
      setActiveCard(i);
    },
    [content.length]
  );

  return (
    <>
      {/* 居中弹出的大卡片（内容=当前 step 的 demo） */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
            />
            <motion.div
              className={cn(
                "fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[min(92vw,1100px)] h-[min(88vh,820px)] rounded-2xl border border-white/10",
                "bg-neutral-900/90 shadow-2xl overflow-hidden"
              )}
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label={content[activeCard]?.title ?? "Demo"}
            >
              {/* 步骤选择（弹窗里也能切换） */}
              <div className="absolute left-3 top-3 z-10 flex gap-2 overflow-auto no-scrollbar pr-3">
                {content.map((c, i) => (
                  <button
                    key={c.title + i}
                    onClick={(e) => {
                      e.stopPropagation();
                      go(i);
                    }}
                    className={cn(
                      "rounded-full px-3 py-1 text-[12px] transition",
                      i === activeCard
                        ? "bg-yellow-400 text-black"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    )}
                  >
                    {c.title ?? `Step ${i + 1}`}
                  </button>
                ))}
              </div>

              <div
                className="h-full w-full overflow-auto no-scrollbar p-6"
                style={{ scrollbarGutter: "stable both-edges", msOverflowStyle: "none", scrollbarWidth: "none" } as React.CSSProperties}
              >
                {content[activeCard]?.content ?? null}
              </div>

              <button
                onClick={() => setExpanded(false)}
                className="absolute right-3 top-3 rounded-full bg-white/10 hover:bg-white/20 transition p-2"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/80">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 主区域 */}
      <motion.div
        animate={{ backgroundColor: backgroundColors[activeCard % backgroundColors.length] }}
        className="h-screen min-h-screen overflow-y-auto scroll-smooth flex justify-center relative gap-4 lg:gap-8 rounded-md p-4 lg:p-8 w-full max-w-7xl mx-auto outline-none"
      >
        {/* 左：进度点（直接切 step） */}
        <aside className="hidden lg:flex w-8 shrink-0 mr-1">
          <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            {content.map((_, i) => {
              const active = i === activeCard;
              return (
                <button
                  key={`dot-${i}`}
                  onClick={() => go(i)}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "relative h-3.5 w-3.5 rounded-full transition",
                    active ? "bg-yellow-400 ring-2 ring-yellow-400/50" : "bg-white/20 hover:bg-white/40"
                  )}
                />
              );
            })}
          </div>
        </aside>

        {/* 右：demo 面板（卡片样式 + 顶部步骤选择 + 点击可放大） */}
        <div
          ref={panelRef}
          className={cn(
            "hidden lg:block grow min-w-0 max-h-[100vh] w-full max-w-none rounded-xl",
            "sticky top-[4vh] overflow-hidden h-[calc(100vh-8vh)]",
            contentClassName
          )}
        >
          <div
            className={cn(
              "group h-full w-full cursor-pointer rounded-2xl border border-white/10",
              "bg-black/30 hover:bg-black/25 backdrop-blur-sm shadow-2xl transition-colors relative"
            )}
            role="button"
            aria-label="Expand demo"
            title="Click to expand"
          >
            {/* 步骤选择（卡片内顶部左侧） */}
            <div
              className="absolute left-3 top-3 z-10 flex gap-2 overflow-auto no-scrollbar pr-3"
              onClick={(e) => e.stopPropagation()}
            >
              {content.map((c, i) => (
                <button
                  key={c.title + i}
                  onClick={() => go(i)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[12px] transition",
                    i === activeCard
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  )}
                >
                  {c.title ?? `Step ${i + 1}`}
                </button>
              ))}
            </div>

            {/* demo 内容（可滚动、隐藏滚动条） */}
            <div
              className="h-full w-full overflow-auto no-scrollbar p-6"
              style={{ scrollbarGutter: "stable both-edges", msOverflowStyle: "none", scrollbarWidth: "none" } as React.CSSProperties}
            >
              {content[activeCard]?.content ?? null}
            </div>

            {/* 右下角小提示 */}
          </div>
        </div>
      </motion.div>
    </>
  );
};
