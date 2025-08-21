"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: { title: string; description: string; content?: React.ReactNode | any }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  // 外层滚动容器（整体一屏一页的滚动）
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 左侧每个 section 的 refs
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const setItemRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      itemRefs.current[i] = el;
    },
    []
  );

  useEffect(() => {
    itemRefs.current.length = content.length;
  }, [content.length]);

  // 根据“离容器可视中心最近”的段落设定 active
  const handleScroll = useCallback(() => {
    const root = containerRef.current;
    if (!root || itemRefs.current.length === 0) return;
    const rootRect = root.getBoundingClientRect();
    const rootMid = rootRect.top + rootRect.height / 2;

    let best = 0;
    let bestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const dist = Math.abs(mid - rootMid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveCard(best);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, content.length]);

  // 深色背景过渡（保留页面背景的暗色变化）
  const backgroundColors = ["rgb(0 0 0)", "rgb(15 15 15)", "rgb(23 23 23)"];

  const scrollToIndex = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  

  return (
    <motion.div
      animate={{ backgroundColor: backgroundColors[activeCard % backgroundColors.length] }}
      className="h-screen min-h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory flex justify-center relative gap-4 lg:gap-8 rounded-md p-4 lg:p-8 w-full max-w-7xl mx-auto outline-none"
      ref={containerRef}
      onScroll={handleScroll}
      tabIndex={0}
    >
      {/* 左侧：进度轨道 */}
      <aside className="hidden lg:flex w-8 shrink-0 mr-1">
        <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          {content.map((_, i) => {
            const active = i === activeCard;
            return (
              <button
                key={`dot-${i}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
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

      {/* 左侧：说明区（收窄） */}
      <div className="relative flex items-start px-1 lg:px-2 w-[150px] lg:w-[210px] shrink-0">
        <div className="w-full">
          {content.map((item, index) => (
            <section
              key={item.title + index}
              ref={setItemRef(index)}
              className="snap-start min-h-screen flex flex-col justify-center"
            >
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-sm lg:text-base font-bold text-yellow-400"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-[11px] lg:text-xs text-white/80 mt-2 lg:mt-3 leading-snug"
              >
                {item.description}
              </motion.p>
            </section>
          ))}
        </div>
      </div>

      {/* 右侧：demo 面板（去掉 gradient；保留毛玻璃与边框；让内层自己滚动且隐藏滚动条） */}
      <div
        className={cn(
          "hidden lg:block grow min-w-0 max-h-[100vh] w-full max-w-none rounded-xl bg-black/10 backdrop-blur-sm",
          "sticky top-[4vh] overflow-hidden border border-yellow-400/20 shadow-2xl",
          // 外层高度：占满视口但留出 4vh 顶部
          "h-[calc(100vh-8vh)]",
          contentClassName
        )}
      >
        {/* 可滚动内容：隐藏滚动条但允许滚动 */}
        <div
          className="h-full w-full overflow-auto no-scrollbar bg-black/30 backdrop-blur-sm p-6"
          style={{
            // 预留空间（如果有底部提示或阴影）
            paddingBottom: "max(48px, env(safe-area-inset-bottom))",
            // 稳定滚动条占位（即使隐藏也避免布局抖动）
            scrollbarGutter: "stable both-edges",
            // 非 WebKit 的隐藏方式
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          } as React.CSSProperties}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
