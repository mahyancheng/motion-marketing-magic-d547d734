"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: { title: string; description: string; content?: React.ReactNode | any }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  // 滚动容器（外层就是滚动主体）
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 每一页（左侧 section）的 refs，用 HTMLElement 兼容 section/div
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  // 稳定的 ref setter，避免 TS & 回调重建问题
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

  // 键盘快捷键：↑/↓ 切换上一/下一页
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(Math.min(activeCard + 1, content.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(Math.max(activeCard - 1, 0));
      }
    };
    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [activeCard, content.length]);

  const scrollToIndex = (i: number) => {
    const el = itemRefs.current[i];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 深色背景（保留）
  const backgroundColors = ["rgb(0 0 0)", "rgb(15 15 15)", "rgb(23 23 23)"];
  // 右侧面板渐变（保留原配色）
  // 保留原本 1、2；增强第 3 个对比
  const linearGradients = [
    "linear-gradient(135deg, rgb(234 179 8) 0%, rgb(249 115 22) 100%)", // 黄500 → 橙500
    "linear-gradient(135deg, rgb(249 115 22) 0%, rgb(234 179 8) 100%)", // 橙500 → 黄500
    // 新：黄→琥珀→橙，三段更有层次
    "linear-gradient(135deg, rgb(250 204 21) 0%, rgb(217 119 6) 55%, rgb(249 115 22) 100%)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  // demo 内容切换动画
  const demoVariants = {
    initial: { opacity: 0, y: 16, scale: 0.995 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -12, scale: 0.995, transition: { duration: 0.25, ease: "easeIn" } },
  };

  return (

    <motion.div

      animate={{ backgroundColor: backgroundColors[activeCard % backgroundColors.length] }}
      // 一屏一页 + 平滑滚动
      className="h-screen min-h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory flex justify-center relative gap-4 lg:gap-8 rounded-md p-4 lg:p-8 w-full max-w-7xl mx-auto outline-none"
      ref={containerRef}
      onScroll={handleScroll}
      tabIndex={0} // 让容器可聚焦，键盘事件才会生效

    >
      {/* 左侧：进度轨道（可点击） */}
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
                  active
                    ? "bg-yellow-400 ring-2 ring-yellow-400/50"
                    : "bg-white/20 hover:bg-white/40"
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

      {/* 右侧：demo 面板（80vh，高度居中 sticky） */}
      {/* 右侧：demo 面板（更高：88vh，垂直居中 sticky 到 7vh） */}
      <div
        style={{ background: backgroundGradient, height: "calc(100vh - 8vh)" }}
        className={cn(
          "hidden lg:block grow min-w-0 max-h-[100vh] w-full max-w-none rounded-xl bg-black/10 backdrop-blur-sm",
          "sticky top-[4vh] overflow-hidden border border-yellow-400/20 shadow-2xl",
          contentClassName
        )}
      >
        {/* 内层滚动：留白避免被底部提示遮挡；稳定滚动条宽度 */}
        <div
          className="h-full w-full bg-black/30 backdrop-blur-sm p-6"
          style={{
            paddingBottom: "max(72px, env(safe-area-inset-bottom))",
            scrollbarGutter: "stable both-edges",
          }}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>


      {/* 底部滚动提示（可删） */}

    </motion.div>
  );
};
