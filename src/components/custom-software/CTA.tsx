// CTASection.tsx
"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CardSticky, ContainerScroll } from "@/components/ui/cards-stack";

// —— Step 内容组件（按你的真实路径）——
import OrderProcessingSection from "../OrderProcessingSection";
import InventorySection from "../InventorySection";
import FulfillmentSection from "../FulfillmentSection";
import CustomerSection from "../CustomerSection";
import AnalyticsSection from "../AnalyticsSection";


// ================= 可调参数（交互灵敏度 / 行为配置） =================
const WHEEL_TRIGGER_PX = 120;    // 更灵敏
const WHEEL_DECAY_MS = 140;      // 累积衰减更快
const STEP_COOLDOWN_MS = 300;    // 翻页冷却更短
const TOUCH_TRIGGER_PX = 60;     // 触控更灵敏
const FAST_SNAP_PX = 80;         // 单次大滚动直接翻页
const WHEEL_GAIN = 1.15;         // Demo 内滚动增益
const TOUCH_GAIN = 1.10;

// ====== 尺寸参数（demo 容器更小） ======
const DEMO_HEIGHT_VH = 0.75;
const DEMO_MIN_PX = 420;
const DEMO_MAX_PX = 860;
const DEMO_EXTRA_PX = 80;

// 最后一屏希望保留可见的叠起标题数量
const LAST_VISIBLE_HEADERS = 2;

// 不同 deltaMode 统一为像素
function normalizeWheelDeltaY(e: WheelEvent, pageH: number) {
  if (e.deltaMode === 1) return e.deltaY * 16;
  if (e.deltaMode === 2) return e.deltaY * pageH;
  return e.deltaY;
}

type StepDef = {
  id: string;
  title: string;
  stepNumber: string;
  component: ReactNode;
};

const STEPS: StepDef[] = [
  { id: "step-1", title: "Step 1: Effortless Order Processing", stepNumber: "01", component: <OrderProcessingSection /> },
  { id: "step-2", title: "Step 2: Customer Experience", stepNumber: "02", component: <CustomerSection /> },
  { id: "step-3", title: "Step 3: Automated Fulfillment", stepNumber: "03", component: <FulfillmentSection /> },
  { id: "step-4", title: "Step 4: Real-Time Inventory Management", stepNumber: "04", component: <InventorySection /> },
  { id: "step-5", title: "Step 5: Analytics & Insights", stepNumber: "05", component: <AnalyticsSection /> },
];

/** Demo 高度响应式（使用更小的高度配置） */
function useResponsiveDemoHeight() {
  const [h, setH] = useState(720);
  useEffect(() => {
    const update = () => {
      const base = Math.min(
        Math.max(window.innerHeight * DEMO_HEIGHT_VH, DEMO_MIN_PX),
        DEMO_MAX_PX
      );
      setH(base);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return h;
}

/** 计算 sticky 叠放偏移（带重叠比例，控制“叠起来”的视觉） */
function useStepOffsets() {
  const [topBasePx, setTopBasePx] = useState(16);
  const [perStepOffsetPx, setPerStepOffsetPx] = useState(56);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      let headerH = 56;
      if (w >= 1024) headerH = 64;
      else if (w >= 768) headerH = 60;

      const gap = w >= 1024 ? 14 : w >= 768 ? 12 : 10;

      const overlapRatio =
        w >= 1024 ? 0.9
          : w >= 768 ? 0.48
            : 0.40;

      const baseOffset = headerH + gap;
      const nextPerStep = Math.max(8, Math.round(baseOffset - overlapRatio * headerH));

      setTopBasePx(16);
      setPerStepOffsetPx(nextPerStep);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return { topBasePx, perStepOffsetPx };
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// 工具：自下而上找到可滚的祖先（且有剩余可滚动）
function getScrollableAncestor(el: Element | null, boundary: HTMLElement | null) {
  let cur: Element | null = el;
  while (cur && cur !== boundary) {
    const style = window.getComputedStyle(cur as Element);
    const oy = style.overflowY;
    const node = cur as HTMLElement;
    const isScroll = oy === "auto" || oy === "scroll";
    if (isScroll && node.scrollHeight > node.clientHeight + 1) return node;
    cur = cur.parentElement;
  }
  return null;
}
const canScrollFurther = (node: HTMLElement, dirDown: boolean) => {
  const atTop = node.scrollTop <= 0;
  const atBottom = Math.ceil(node.scrollTop + node.clientHeight) >= node.scrollHeight - 1;
  return dirDown ? !atBottom : !atTop;
};

type SnapAPI = {
  snapByDir: (dir: 1 | -1) => void;
  snapToIdx: (i: number) => void;     // 👈 绝对跳转
  getCurrentIdx: () => number;
};

/** 统一滚动（挂在容器元素）：一步一页 + 内部 body 优先 + 边界吞掉（Step5 卡住）
 *  暴露 snap API & onActiveChange（滚动结束时再通知）
 */
function useUnifiedStepSnap(
  containerRef: React.RefObject<HTMLDivElement>,
  bodyRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  totalSteps: number,
  lastStopOffsetPx: number,
  apiRef: React.MutableRefObject<SnapAPI | null>,
  onActiveChange?: (i: number) => void
) {

  const UNLOCK_HYSTERESIS_PX = 64;   // 靠近底部这么多像素内触发“解锁到页面”
  const RELOCK_GAP_MS = UNLOCK_HYSTERESIS_PX * 3;         // 解锁后至少这么久才允许回锁

  // 放在 useUnifiedStepSnap 内部（和其它 ref 一起）
  const unlockedToPageRef = React.useRef(false);
  const unlockTsRef = React.useRef(0);

  // 小工具：计算“最后目标位”
  const getLastTarget = () => {
    const s = stepH();
    return Math.max(0, (totalSteps - 1) * s - lastStopOffsetPx);
  };
  // 👇 把滚动“接管”给页面
  const handoffToPage = (amount: number) => {
    try { containerRef.current?.blur(); } catch { }
    window.scrollBy({ top: amount, behavior: "smooth" });
  };

  const animatingRef = useRef(false);
  const lastSnapAtRef = useRef(0);

  const wheelAccRef = useRef<{ val: number; dir: number; ts: number }>({
    val: 0, dir: 0, ts: 0,
  });

  const touchStartY = useRef<number | null>(null);

  const stepH = () => containerRef.current?.clientHeight ?? window.innerHeight;

  const targetForIdx = (idx: number) => {
    const s = stepH();
    if (!s) return 0;
    if (idx < totalSteps - 1) return Math.round(idx * s);
    return Math.max(0, Math.round(idx * s - lastStopOffsetPx)); // 最后一页提前停靠
  };

  const getIdxFromScrollTop = (scrollTop: number) => {
    const s = stepH();
    if (!s) return 0;
    const lastTarget = Math.max(0, (totalSteps - 1) * s - lastStopOffsetPx);
    if (scrollTop >= lastTarget - 1) return totalSteps - 1;
    return clamp(Math.round(scrollTop / s), 0, totalSteps - 1);
  };

  const swallow = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof (e as any).stopImmediatePropagation === "function") {
      (e as any).stopImmediatePropagation();
    }
  };

  const scrollToIdx = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const target = targetForIdx(idx);
    animatingRef.current = true;

    el.scrollTo({ top: target, behavior: "smooth" });

    // ⬇️ 只有滚动真正完成（靠近目标）时，才通知 active 改变
    const done = () => {
      if (Math.abs(el.scrollTop - target) <= 1) {
        animatingRef.current = false;
        el.removeEventListener("scroll", done);
        onActiveChange?.(idx);
      }
    };
    el.addEventListener("scroll", done);

    // 超时兜底（极端情况下仍要结束动画并校正 active）
    setTimeout(() => {
      if (!el) return;
      animatingRef.current = false;
      el.removeEventListener("scroll", done);
      onActiveChange?.(getIdxFromScrollTop(el.scrollTop));
    }, 1200);
  };

  // 暴露 API（含绝对跳转）
  useEffect(() => {
    apiRef.current = {
      snapByDir: (dir) => {
        const el = containerRef.current;
        if (!el) return;
        const cur = getIdxFromScrollTop(el.scrollTop);
        const next = clamp(cur + dir, 0, totalSteps - 1);
        if (next !== cur) {
          lastSnapAtRef.current = performance.now();
          scrollToIdx(next);
        }
      },
      snapToIdx: (i) => {
        const el = containerRef.current;
        if (!el) return;
        const next = clamp(i, 0, totalSteps - 1);
        lastSnapAtRef.current = performance.now();
        scrollToIdx(next);
      },
      getCurrentIdx: () => {
        const el = containerRef.current;
        if (!el) return 0;
        return getIdxFromScrollTop(el.scrollTop);
      },
    };
  }, [totalSteps, lastStopOffsetPx]);

  // 尺寸变化对齐最近页
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const align = () => {
      const idx = getIdxFromScrollTop(el.scrollTop);
      el.scrollTo({ top: targetForIdx(idx), behavior: "instant" as any });
      onActiveChange?.(idx);
    };
    align();
    const ro = new ResizeObserver(align);
    ro.observe(el);
    window.addEventListener("resize", align);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", align);
    };
  }, [totalSteps, lastStopOffsetPx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // WHEEL
    // ===== onWheel =====
    const onWheel = (e: WheelEvent) => {
      const el = containerRef.current!;
      const now = e.timeStamp || performance.now();
      const page = stepH();
      const dyRaw = normalizeWheelDeltaY(e, page);
      const dirDown = dyRaw > 0;

      // 让 Demo 内滚动更“跟手”
      const dyPx = dyRaw * WHEEL_GAIN;

      // 1) 如果指针下存在一个还能滚的子滚动容器，优先滚它
      const targetEl = (e.target as Element) ?? null;
      const scrollerUnderPointer = targetEl ? (getScrollableAncestor(targetEl, el) as HTMLElement | null) : null;
      if (scrollerUnderPointer && canScrollFurther(scrollerUnderPointer, dirDown)) {
        swallow(e);
        scrollerUnderPointer.scrollBy({ top: dyPx });
        wheelAccRef.current = { val: 0, dir: 0, ts: now };
        return;
      }

      // 2) 当前 step 的 body 还能滚，优先滚 body
      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];
      if (body && canScrollFurther(body, dirDown)) {
        swallow(e);
        body.scrollBy({ top: dyPx });
        wheelAccRef.current = { val: 0, dir: 0, ts: now };
        return;
      }

      // 3) 冷却或动画期间：放行（避免困住）
      if (animatingRef.current || now - lastSnapAtRef.current < STEP_COOLDOWN_MS) {
        return;
      }

      // 4) 累积判断是否翻页
      const acc = wheelAccRef.current;
      const dir = dirDown ? 1 : -1;
      if (now - acc.ts > WHEEL_DECAY_MS || acc.dir !== dir) {
        acc.val = 0;
        acc.dir = dir;
      }
      acc.val += Math.abs(dyPx);
      acc.ts = now;

      const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);

      // 边界/底部判定
      const atVirtualBottom = el.scrollTop >= targetForIdx(totalSteps - 1) - 1;
      const atActualBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;

      // 5) 快速通道：一次较大滚动直接翻页
      if (Math.abs(dyPx) >= FAST_SNAP_PX && nextIdx !== curIdx) {
        swallow(e);
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
        return;
      }

      // 6) Step 5 结尾：继续向下 → 把滚动交给页面
      if (dirDown && curIdx === totalSteps - 1 && (atActualBottom || atVirtualBottom)) {
        swallow(e);
        const amount = Math.max(80, Math.min(600, Math.abs(dyPx))); // handoff 平滑距离
        handoffToPage(amount);
        return;
      }

      // 7) 达到阈值则吸附翻页
      if (acc.val >= WHEEL_TRIGGER_PX && nextIdx !== curIdx) {
        swallow(e);
        acc.val = 0;
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
        return;
      }

      // 8) 不是翻页、不是内部滚，但也不在边界 → 主动滚容器（更跟手）
      if ((dirDown && atActualBottom) || (!dirDown && atTop)) {
        // 边界：让页面接管
        return;
      }
      swallow(e);
      el.scrollBy({ top: dyPx });
    };



    // TOUCH
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    // ===== onTouchMove =====
    const onTouchMove = (e: TouchEvent) => {
      const el = containerRef.current!;
      const startY = touchStartY.current;
      if (startY == null) return;

      const now = e.timeStamp || performance.now();
      const currY = e.touches[0]?.clientY ?? startY;
      const dyRaw = startY - currY;     // 向下为正
      const dirDown = dyRaw > 0;
      const dy = dyRaw * TOUCH_GAIN;

      // ---- 解锁到页面时：完全放行。用户上拉离底足够远再回锁 ----
      if (unlockedToPageRef.current) {
        if (!dirDown) {
          const awayEnough = el.scrollTop <= getLastTarget() - UNLOCK_HYSTERESIS_PX * 2;
          const cooled = now - unlockTsRef.current > RELOCK_GAP_MS;
          if (awayEnough && cooled) {
            unlockedToPageRef.current = false;
          }
        }
        return;
      }

      // 1) 指针下的可滚元素优先
      const targetEl = (e.target as Element) ?? null;
      const scroller = targetEl ? (getScrollableAncestor(targetEl, el) as HTMLElement | null) : null;
      if (scroller && canScrollFurther(scroller, dirDown)) {
        e.preventDefault(); e.stopPropagation();
        scroller.scrollBy({ top: dy });
        return;
      }

      // 2) 当前 step body 优先
      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];
      if (body && canScrollFurther(body, dirDown)) {
        e.preventDefault(); e.stopPropagation();
        body.scrollBy({ top: dy });
        return;
      }

      const lastTarget = getLastTarget();
      const atActualBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;

      // 3) 单次较大滑动：翻页
      if (Math.abs(dy) >= TOUCH_TRIGGER_PX) {
        const dir = dirDown ? 1 : -1;
        const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);
        if (nextIdx !== curIdx) {
          e.preventDefault(); e.stopPropagation();
          lastSnapAtRef.current = now;
          scrollToIdx(nextIdx);
          return;
        }
      }

      // 4) Step5 近底：开启解锁模式（不再拦截，让页面自然滚）
      if (dirDown && curIdx === totalSteps - 1 && el.scrollTop >= lastTarget - UNLOCK_HYSTERESIS_PX) {
        unlockedToPageRef.current = true;
        unlockTsRef.current = now;
        try { el.blur(); } catch { }
        return;
      }

      // 5) 容器顶/底：直接放行；否则滚一点容器，保持跟手
      if ((dirDown && atActualBottom) || (!dirDown && atTop)) {
        return; // 放行
      }
      e.preventDefault(); e.stopPropagation();
      el.scrollBy({ top: dy });
    };


    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    // KEYBOARD（容器聚焦才触发）
    const onKeyDown = (e: KeyboardEvent) => {
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];
      if (![...keysDown, ...keysUp].includes(e.key)) return;

      const now = e.timeStamp || performance.now();
      const dirDown = keysDown.includes(e.key);

      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];

      if (animatingRef.current || now - lastSnapAtRef.current < STEP_COOLDOWN_MS) {
        return; // 放行
      }

      if (body && canScrollFurther(body, dirDown)) {
        e.preventDefault(); e.stopPropagation();
        body.scrollBy({ top: dirDown ? body.clientHeight * 0.9 : -body.clientHeight * 0.9 });
        return;
      }

      const dir = dirDown ? 1 : -1;
      const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);
      if (nextIdx !== curIdx) {
        e.preventDefault(); e.stopPropagation();
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
      } else {
        // ⬇️ 最后一屏向下，或顶端向上 → 放行，让页面接管
        const atActualBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;
        const atTop = el.scrollTop <= 0;
        if ((dirDown && (curIdx === totalSteps - 1 || atActualBottom)) || (!dirDown && atTop)) {
          return; // 放行
        }
        // 否则保持吸附
        e.preventDefault(); e.stopPropagation();
      }
    };


    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    el.addEventListener("keydown", onKeyDown, { passive: false, capture: true });

    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true } as any);
      el.removeEventListener("touchstart", onTouchStart, { capture: true } as any);
      el.removeEventListener("touchmove", onTouchMove, { capture: true } as any);
      el.removeEventListener("touchend", onTouchEnd, { capture: true } as any);
      el.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    };
  }, [containerRef, totalSteps, lastStopOffsetPx, bodyRefs, onActiveChange, apiRef]);
}

/** 单个 Step 卡片 */
function StepCard({
  step,
  index,
  pageHeight,
  topBasePx,
  perStepOffsetPx,
  registerBodyRef,
}: {
  step: StepDef;
  index: number;
  pageHeight: number;
  topBasePx: number;
  perStepOffsetPx: number;
  registerBodyRef: (idx: number, el: HTMLDivElement | null) => void;
}) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const headerH = headerRef.current?.offsetHeight ?? 56;
      const maxH = Math.max(160, pageHeight - headerH - 16);
      const body = document.getElementById(`step-body-${index}`) as HTMLDivElement | null;
      if (body) {
        body.style.maxHeight = `${maxH}px`;
        body.style.overflowY = "auto";
        body.style.overscrollBehaviorY = "contain";
        (body.style as any).webkitOverflowScrolling = "touch";
      }
    };
    const ro = new ResizeObserver(apply);
    if (headerRef.current) ro.observe(headerRef.current);
    apply();
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [pageHeight, index]);

  return (
    <CardSticky
      index={index}
      topBasePx={topBasePx}
      perStepOffsetPx={perStepOffsetPx}
      baseZ={3000}
      zStep={20}
      style={{ height: `${pageHeight}px` }}
      className="
        rounded-lg border bg-white shadow-sm backdrop-blur-md border-gray-200
        mx-auto w-[98%] sm:w-[94%] md:w-[90%] lg:w-[86%] max-w-[1100px]
      "
    >
      {/* Header（黄头） */}
      <div
        ref={headerRef}
        className="px-4 border-b bg-brand-50 flex items-center justify-between gap-4
                   h-14 md:h-[60px] lg:h-16 bg-yellow-300"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          {step.title}
        </h3>
        <div className="text-xs md:text-sm font-bold text-brand-600 bg-white rounded-full
                        w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm">
          {step.stepNumber}
        </div>
      </div>

      {/* Body */}
      <div
        id={`step-body-${index}`}
        ref={(el) => registerBodyRef(index, el)}
        className="flex-1 p-3 md:p-4 overflow-y-auto overflow-x-hidden no-scrollbar overscroll-y-contain"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="w-full max-w-full min-w-0">{step.component}</div>
      </div>
    </CardSticky>
  );
}



const CTASection = () => {
  const [open, setOpen] = useState(false);

  // 展开后：滚到 Demo 锚点 + 聚焦容器
  const demoScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => {
        document.getElementById("demo-anchor")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setTimeout(() => demoScrollRef.current?.focus(), 300);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  const demoHeightPx = useResponsiveDemoHeight();
  const { topBasePx, perStepOffsetPx } = useStepOffsets();

  const pageH = demoHeightPx + DEMO_EXTRA_PX;

  // —— HUD 尺寸测量，用于精确计算最后一页的提前停靠 —— //
  const hudShellRef = useRef<HTMLDivElement>(null);
  const [hudH, setHudH] = useState(48);
  useEffect(() => {
    const el = hudShellRef.current;
    if (!el) return;
    const measure = () => setHudH(el.offsetHeight || 48);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 精确的“Step 5 提前停靠”：HUD 高度 + 顶部基准 + 若干个叠起标题的间距
  // 精确的“Step 5 提前停靠”：HUD 高度 + 顶部基准 + 若干个叠起标题的间距
  const rawLastStop = Math.round(topBasePx + hudH + perStepOffsetPx * LAST_VISIBLE_HEADERS);

  // 计算“最后一张卡”的 sticky top（必须保证最终停靠时它已经到达这个位置，才能叠起来）
  const computedTopLast = topBasePx + (STEPS.length - 1) * perStepOffsetPx;

  // ✅ 把最后停靠量限制在“不会比最后一张卡的 sticky top 更大”
  //    这样 Step 5 就能像前几张一样叠起
  const lastStopOffsetPx = clamp(
    Math.min(rawLastStop, computedTopLast - 200),   // -4 留一点像素余量，避免边界抖动
    0,
    Math.max(0, pageH - 24)
  );


  // 收集每个 Step 的 bodyRef
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const registerBodyRef = (idx: number, el: HTMLDivElement | null) => {
    bodyRefs.current[idx] = el ?? null;
  };

  // 暴露给 HUD 的 snap API & Active step
  const snapApiRef = useRef<SnapAPI | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useUnifiedStepSnap(
    demoScrollRef,
    bodyRefs,
    STEPS.length,
    lastStopOffsetPx,
    snapApiRef,
    (i) => setActiveIdx(i) // 👈 滚动完成时更新
  );

  // 容器自然滚动时，也更新 HUD（稳健计算）
  useEffect(() => {
    const el = demoScrollRef.current;
    if (!el) return;

    const computeActiveIdx = (st: number) => {
      const s = pageH || 1;
      const lastTarget = Math.max(0, (STEPS.length - 1) * s - lastStopOffsetPx);
      if (st >= lastTarget - 1) return STEPS.length - 1;
      return clamp(Math.round(st / s), 0, STEPS.length - 1);
    };

    const onScroll = () => setActiveIdx(computeActiveIdx(el.scrollTop));
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [pageH, lastStopOffsetPx]);

  // ✅ 使用 getCurrentIdx()（若可用），否则回退 activeIdx
  const currentIdx =
    (snapApiRef.current && demoScrollRef.current)
      ? snapApiRef.current.getCurrentIdx()
      : activeIdx;

  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEPS.length - 1;

  // ✅ 点击基于 currentIdx 的“绝对跳转”，确保一定滚动
  const goNext = () =>
    snapApiRef.current?.snapToIdx(Math.min(STEPS.length - 1, currentIdx + 1));
  const goPrev = () =>
    snapApiRef.current?.snapToIdx(Math.max(0, currentIdx - 1));

  const activeTitle = STEPS[activeIdx]?.title ?? "";



  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* 顶部 CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-yellow-300 via-yellow-400 to-black text-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to build custom software?
            </h2>
            <p className="text-lg mb-8">
              Talk to our team about your goals and get a tailored plan from a trusted software development company.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Schedule a Consultation
              </Link>

              <CollapsibleTrigger
                className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                aria-controls="demo"
              >
                {open ? "Hide Demo" : "Try Our Demo"}
              </CollapsibleTrigger>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <CollapsibleContent id="demo" forceMount className="mt-0 overflow-visible">
        <div id="demo-anchor" className="h-0" />

        <AnimatePresence mode="wait">
          {open && (
            <motion.section
              key="demo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-8 sm:py-10 md:py-12 bg-black"
            >
              <div className="container mx-auto px-4 md:px-6">
                {/* Demo 容器 */}
                <div
                  ref={demoScrollRef}
                  tabIndex={0}
                  className="relative overflow-y-auto no-scrollbar rounded-xl mx-auto no-smooth
              w-[94vw] sm:w-[88vw] md:w-[84vw] lg:w-[78vw] xl:w-[72vw] max-w-[1100px]
              bg-black/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  style={{
                    height: `${pageH}px`,
                    overscrollBehaviorY: "auto",    // ✅ 允许滚动串联到页面
                  }}
                >

                  {/* === HUD：固定导航条（不随内容滚动） === */}
                  <div className="pointer-events-none sticky top-3 z-[10000] px-3">
                    <div
                      ref={hudShellRef}
                      className="
                        pointer-events-auto flex items-center justify-between gap-3
                        rounded-full bg-black/60 backdrop-blur border border-white/15
                        px-3 py-2
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold">
                          {String(activeIdx + 1).padStart(2, "0")}
                        </span>
                        <div className="text-white/90 text-sm font-medium">
                          {activeTitle}
                        </div>
                        <div className="text-white/50 text-xs ml-2">
                          ({activeIdx + 1} / {STEPS.length})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={goPrev}
                          disabled={isFirst}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition
                            ${isFirst
                              ? "text-white/30 border-white/10 cursor-not-allowed"
                              : "text-white/90 border-white/20 hover:bg-white/10"}
                          `}
                        >
                          Prev
                        </button>
                        <button
                          onClick={goNext}
                          disabled={isLast}
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition
                            ${isLast
                              ? "bg-yellow-300/40 text-black/50 cursor-not-allowed"
                              : "bg-yellow-400 text-black hover:bg-yellow-300"}
                          `}
                        >
                          {isLast ? "Done" : "Next step"}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* === /HUD === */}

                  <ContainerScroll
                    className="w-full"
                    style={{ minHeight: `${pageH * STEPS.length}px` }}
                  >
                    {STEPS.map((step, index) => (
                      <StepCard
                        key={step.id}
                        step={step}
                        index={index}
                        pageHeight={pageH}
                        topBasePx={topBasePx}
                        perStepOffsetPx={perStepOffsetPx}
                        registerBodyRef={registerBodyRef}
                      />
                    ))}
                    <div className="h-[35vh] md:h-[40vh] lg:h-[48vh]" />
                  </ContainerScroll>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible >
  );


};



export default CTASection;
