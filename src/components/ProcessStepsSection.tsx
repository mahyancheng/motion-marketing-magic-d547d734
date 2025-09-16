// ProcessStepsSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardSticky } from "@/components/ui/cards-stack"; // ✅ 不再使用 ContainerScroll
import OrderProcessingSection from "./OrderProcessingSection";
import InventorySection from "./InventorySection";
import FulfillmentSection from "./FulfillmentSection";
import CustomerSection from "./CustomerSection";
import AnalyticsSection from "./AnalyticsSection";
import { useClampToViewport } from "@/hooks/useClampToViewport";

const PROCESS_STEPS = [
  { id: "step-1", title: "Step 1: Effortless Order Processing", stepNumber: "01", component: <OrderProcessingSection /> },
  { id: "step-2", title: "Step 2: Customer Experience",         stepNumber: "02", component: <CustomerSection /> },
  { id: "step-3", title: "Step 3: Automated Fulfillment",        stepNumber: "03", component: <FulfillmentSection /> },
  { id: "step-4", title: "Step 4: Real-Time Inventory Management", stepNumber: "04", component: <InventorySection /> },
  { id: "step-5", title: "Step 5: Analytics & Insights",         stepNumber: "05", component: <AnalyticsSection /> },
];

/** 断点偏移（与 header 高度保持一致） */
function useStepOffsets() {
  const [topBasePx, setTopBasePx] = useState(16);
  const [perStepOffsetPx, setPerStepOffsetPx] = useState(72);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      // 与下面 header 的高度：sm 56 / md 60 / lg 64 保持一致
      let headerH = 56;
      let gap = 10;
      if (w >= 1024) { headerH = 64; gap = 14; }
      else if (w >= 768) { headerH = 60; gap = 12; }
      else { headerH = 56; gap = 10; }

      setTopBasePx(16);
      setPerStepOffsetPx(headerH + gap);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return { topBasePx, perStepOffsetPx };
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** 只在指定 rootRef 区域内启用“一次滚一下一个 step”的行为 */
function useStepSnapOnlyHere(rootRef: React.RefObject<HTMLDivElement>, totalSteps: number, stepVh = 120) {
  const animatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const getMetrics = () => {
    const el = rootRef.current!;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const vh = window.innerHeight;
    const stepH = vh * (stepVh / 100);
    const height = el.offsetHeight || stepH * totalSteps;
    const bottom = top + height;
    return { top, bottom, stepH };
  };

  const scrollToIndex = (idx: number) => {
    const { top, stepH } = getMetrics();
    const targetTop = Math.round(top + idx * stepH);
    animatingRef.current = true;

    window.scrollTo({ top: targetTop, behavior: "smooth" });

    const handleDone = () => {
      if (Math.abs(window.scrollY - targetTop) <= 2) {
        animatingRef.current = false;
        window.removeEventListener("scroll", handleDone);
      }
    };
    window.addEventListener("scroll", handleDone);
    setTimeout(() => {
      animatingRef.current = false;
      window.removeEventListener("scroll", handleDone);
    }, 1200);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const { stepH, top, bottom } = getMetrics();

    // 鼠标滚轮
    const onWheel = (e: WheelEvent) => {
      if (animatingRef.current) { e.preventDefault(); return; }
      // 事件只在 demo 容器上监听；因此这时鼠标必定在该区域内
      const currentIdx = clamp(Math.round((window.scrollY - top) / stepH), 0, totalSteps - 1);
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = clamp(currentIdx + dir, 0, totalSteps - 1);
      if (nextIdx === currentIdx) return;
      e.preventDefault();
      scrollToIndex(nextIdx);
    };

    // 键盘（↑/↓/PgUp/PgDn/Space）
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== el) return; // 仅当该区域 focus 时响应
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];
      if (![...keysDown, ...keysUp].includes(e.key)) return;
      if (animatingRef.current) { e.preventDefault(); return; }

      const currentIdx = clamp(Math.round((window.scrollY - top) / stepH), 0, totalSteps - 1);
      const dir = keysDown.includes(e.key) ? 1 : -1;
      const nextIdx = clamp(currentIdx + dir, 0, totalSteps - 1);
      if (nextIdx === currentIdx) return;
      e.preventDefault();
      scrollToIndex(nextIdx);
    };

    // 触摸（轻扫）
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
      const dy = endY - touchStartY.current; // 上滑为负
      touchStartY.current = null;
      if (Math.abs(dy) < 40) return; // 阈值
      if (animatingRef.current) return;

      const currentIdx = clamp(Math.round((window.scrollY - top) / stepH), 0, totalSteps - 1);
      const dir = dy < 0 ? 1 : -1; // 上滑 => 下一步
      const nextIdx = clamp(currentIdx + dir, 0, totalSteps - 1);
      if (nextIdx === currentIdx) return;
      scrollToIndex(nextIdx);
    };

    // 仅绑定在 demo 根元素上 → 区域外不受影响
    el.addEventListener("wheel", onWheel as any, { passive: false });
    el.addEventListener("keydown", onKey as any, { passive: false });
    el.addEventListener("touchstart", onTouchStart as any, { passive: true });
    el.addEventListener("touchend", onTouchEnd as any, { passive: true });

    // 鼠标进入自动 focus，键盘才能作用于此区域
    const onMouseEnter = () => el.focus();
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      el.removeEventListener("wheel", onWheel as any);
      el.removeEventListener("keydown", onKey as any);
      el.removeEventListener("touchstart", onTouchStart as any);
      el.removeEventListener("touchend", onTouchEnd as any);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [rootRef, totalSteps, stepVh]);
}

/** 单个 Step 卡片（避免在 map 里直接用 hook） */
function StepCard({
  step,
  index,
  topBasePx,
  perStepOffsetPx,
}: {
  step: typeof PROCESS_STEPS[number];
  index: number;
  topBasePx: number;
  perStepOffsetPx: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useClampToViewport({ cardRef, bodyRef, bottomPad: 24 });

  return (
    <CardSticky
      key={step.id}
      index={index}
      topBasePx={topBasePx}
      perStepOffsetPx={perStepOffsetPx}
      baseZ={3000}
      zStep={20}
      className="
        rounded-lg border bg-white shadow-sm backdrop-blur-md
        mx-auto w-[94vw] sm:w-[90vw] md:w-[86vw] lg:w-[80vw] max-w-6xl
        h-auto
      "
      ref={cardRef as any}
    >
      {/* 头部（高度与 useStepOffsets 保持一致） */}
      <div className="px-4 border-b bg-brand-50 flex items-center justify-between gap-4 h-14 md:h-[60px] lg:h-16 bg-yellow-300">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          {step.title}
        </h3>
        <div className="text-xs md:text-sm font-bold text-brand-600 bg-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm">
          {step.stepNumber}
        </div>
      </div>

      {/* 主体（不单独滚动） */}
      <div ref={bodyRef} className={`flex-1 p-3 md:p-4 ${index < 2 ? "pb-28 md:pb-32" : ""}`}>
        {step.component}
      </div>
    </CardSticky>
  );
}

/** 只负责 Demo 的区域（steps × 120vh），区域外正常滚动 */
function StepSnapDemo({
  steps,
  topBasePx,
  perStepOffsetPx,
  stepVh = 120,
}: {
  steps: typeof PROCESS_STEPS;
  topBasePx: number;
  perStepOffsetPx: number;
  stepVh?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useStepSnapOnlyHere(rootRef, steps.length, stepVh);

  return (
    <div
      ref={rootRef}
      tabIndex={-1} // 允许 focus 接收键盘事件
      className="relative w-full pb-40 outline-none"
      style={{ minHeight: `${steps.length * stepVh}vh` }} // 每步 120vh
    >
      {steps.map((step, index) => (
        <StepCard
          key={step.id}
          step={step}
          index={index}
          topBasePx={topBasePx}
          perStepOffsetPx={perStepOffsetPx}
        />
      ))}
      {/* 尾部留白，避免最后一张紧贴到底部 */}
      <div className="h-[35vh] md:h-[40vh] lg:h-[48vh]" />
    </div>
  );
}

export default function ProcessStepsSection() {
  const { topBasePx, perStepOffsetPx } = useStepOffsets();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* ✅ 这里可以放普通内容：正常滚动 */}
      {/* <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Feature Overview</h2>
        <p className="text-gray-600">普通内容区域（不受 step-snap 影响）</p>
      </div> */}

      {/* ✅ 只有这个 Demo 区域：一“步”一滚 */}
      <StepSnapDemo
        steps={PROCESS_STEPS}
        topBasePx={topBasePx}
        perStepOffsetPx={perStepOffsetPx}
        stepVh={120}
      />

      {/* ✅ Demo 之后的普通内容：继续正常滚动 */}
      {/* <div className="mx-auto max-w-4xl px-4 py-16">
        <h3 className="text-xl font-semibold mb-2">More Info</h3>
        <p className="text-gray-600">更多说明…</p>
      </div> */}
    </section>
  );
}
