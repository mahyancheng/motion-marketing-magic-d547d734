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

import OrderProcessingSection from "../OrderProcessingSection";
import InventorySection from "../InventorySection";
import FulfillmentSection from "../FulfillmentSection";
import CustomerSection from "../CustomerSection";
import AnalyticsSection from "../AnalyticsSection";

// ================= 可调参数 =================
const WHEEL_TRIGGER_PX = 120;
const WHEEL_DECAY_MS = 140;
const STEP_COOLDOWN_MS = 300;
const TOUCH_TRIGGER_PX = 60;
const FAST_SNAP_PX = 80;
const WHEEL_GAIN = 1.15;
const TOUCH_GAIN = 1.1;

const DEMO_HEIGHT_VH = 0.75;
const DEMO_MIN_PX = 420;
const DEMO_MAX_PX = 860;
const DEMO_EXTRA_PX = 80;

const LAST_VISIBLE_HEADERS = 4;

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
  {
    id: "step-1",
    title: "Step 1: Effortless Order Processing",
    stepNumber: "01",
    component: <OrderProcessingSection />,
  },
  {
    id: "step-2",
    title: "Step 2: Customer Experience",
    stepNumber: "02",
    component: <CustomerSection />,
  },
  {
    id: "step-3",
    title: "Step 3: Automated Fulfillment",
    stepNumber: "03",
    component: <FulfillmentSection />,
  },
  {
    id: "step-4",
    title: "Step 4: Real-Time Inventory Management",
    stepNumber: "04",
    component: <InventorySection />,
  },
  {
    id: "step-5",
    title: "Step 5: Analytics & Insights",
    stepNumber: "05",
    component: <AnalyticsSection />,
  },
];

function useResponsiveDemoHeight() {
  const [h, setH] = useState(720);
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
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

function useStepOffsets() {
  const [topBasePx, setTopBasePx] = useState(16);
  const [perStepOffsetPx, setPerStepOffsetPx] = useState(56);

  useEffect(() => {
    const calc = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      let headerH = 56;
      if (w >= 1024) headerH = 64;
      else if (w >= 768) headerH = 60;

      const gap = w >= 1024 ? 14 : w >= 768 ? 12 : 10;

      const overlapRatio =
        w >= 1024 ? 0.9 : w >= 768 ? 0.48 : 0.4;

      const baseOffset = headerH + gap;
      const nextPerStep = Math.max(
        8,
        Math.round(baseOffset - overlapRatio * headerH)
      );

      setTopBasePx(16);
      setPerStepOffsetPx(nextPerStep);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return { topBasePx, perStepOffsetPx };
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function getScrollableAncestor(
  el: Element | null,
  boundary: HTMLElement | null
) {
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
  const atBottom =
    Math.ceil(node.scrollTop + node.clientHeight) >=
    node.scrollHeight - 1;
  return dirDown ? !atBottom : !atTop;
};

type SnapAPI = {
  snapByDir: (dir: 1 | -1) => void;
  snapToIdx: (i: number) => void;
  getCurrentIdx: () => number;
};

function useUnifiedStepSnap(
  containerRef: React.RefObject<HTMLDivElement>,
  bodyRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  totalSteps: number,
  lastStopOffsetPx: number,
  apiRef: React.MutableRefObject<SnapAPI | null>,
  onActiveChange?: (i: number) => void
) {
  const UNLOCK_HYSTERESIS_PX = 64;
  const RELOCK_GAP_MS = UNLOCK_HYSTERESIS_PX * 3;

  const unlockedToPageRef = React.useRef(false);
  const unlockTsRef = React.useRef(0);

  const animatingRef = useRef(false);
  const lastSnapAtRef = useRef(0);

  const wheelAccRef = useRef<{ val: number; dir: number; ts: number }>({
    val: 0,
    dir: 0,
    ts: 0,
  });

  const touchStartY = useRef<number | null>(null);

  const stepH = () =>
    containerRef.current?.clientHeight ?? window.innerHeight;

  const targetForIdx = (idx: number) => {
    const s = stepH();
    if (!s) return 0;
    if (idx < totalSteps - 1) return Math.round(idx * s);
    return Math.max(0, Math.round(idx * s - lastStopOffsetPx));
  };

  const getIdxFromScrollTop = (scrollTop: number) => {
    const s = stepH();
    if (!s) return 0;
    const lastTarget = Math.max(
      0,
      (totalSteps - 1) * s - lastStopOffsetPx
    );
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

    const done = () => {
      if (Math.abs(el.scrollTop - target) <= 1) {
        animatingRef.current = false;
        el.removeEventListener("scroll", done);
        onActiveChange?.(idx);
      }
    };
    el.addEventListener("scroll", done);

    setTimeout(() => {
      if (!el) return;
      animatingRef.current = false;
      el.removeEventListener("scroll", done);
      onActiveChange?.(getIdxFromScrollTop(el.scrollTop));
    }, 1200);
  };

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const align = () => {
      if (!el) return;
      const idx = getIdxFromScrollTop(el.scrollTop);
      el.scrollTo({
        top: targetForIdx(idx),
        behavior: "instant" as any,
      });
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

    const handoffToPage = (amount: number) => {
      try {
        el.blur();
      } catch {}
      window.scrollBy({ top: amount, behavior: "smooth" });
    };

    const getLastTarget = () => {
      const s = stepH();
      return Math.max(
        0,
        (totalSteps - 1) * s - lastStopOffsetPx
      );
    };

    const onWheel = (e: WheelEvent) => {
      const el = containerRef.current!;
      const now = e.timeStamp || performance.now();
      const page = stepH();
      const dyRaw = normalizeWheelDeltaY(e, page);
      const dirDown = dyRaw > 0;
      const dyPx = dyRaw * WHEEL_GAIN;

      const targetEl = (e.target as Element) ?? null;
      const scrollerUnderPointer = targetEl
        ? (getScrollableAncestor(
            targetEl,
            el
          ) as HTMLElement | null)
        : null;
      if (
        scrollerUnderPointer &&
        canScrollFurther(scrollerUnderPointer, dirDown)
      ) {
        swallow(e);
        scrollerUnderPointer.scrollBy({ top: dyPx });
        wheelAccRef.current = { val: 0, dir: 0, ts: now };
        return;
      }

      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];
      if (body && canScrollFurther(body, dirDown)) {
        swallow(e);
        body.scrollBy({ top: dyPx });
        wheelAccRef.current = { val: 0, dir: 0, ts: now };
        return;
      }

      if (
        animatingRef.current ||
        now - lastSnapAtRef.current < STEP_COOLDOWN_MS
      ) {
        return;
      }

      const acc = wheelAccRef.current;
      const dir = dirDown ? 1 : -1;
      if (now - acc.ts > WHEEL_DECAY_MS || acc.dir !== dir) {
        acc.val = 0;
        acc.dir = dir;
      }
      acc.val += Math.abs(dyPx);
      acc.ts = now;

      const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);

      const atVirtualBottom =
        el.scrollTop >= targetForIdx(totalSteps - 1) - 1;
      const atActualBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >=
        el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;

      if (Math.abs(dyPx) >= FAST_SNAP_PX && nextIdx !== curIdx) {
        swallow(e);
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
        return;
      }

      if (
        dirDown &&
        curIdx === totalSteps - 1 &&
        (atActualBottom || atVirtualBottom)
      ) {
        swallow(e);
        const amount = Math.max(
          80,
          Math.min(600, Math.abs(dyPx))
        );
        handoffToPage(amount);
        return;
      }

      if (acc.val >= WHEEL_TRIGGER_PX && nextIdx !== curIdx) {
        swallow(e);
        acc.val = 0;
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
        return;
      }

      if (
        (dirDown && atActualBottom) ||
        (!dirDown && atTop)
      ) {
        return;
      }
      swallow(e);
      el.scrollBy({ top: dyPx });
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const el = containerRef.current!;
      const startY = touchStartY.current;
      if (startY == null) return;

      // ✅ 手机版本：直接放行，不做 snapping，使用原生滚动
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return;
      }

      const now = e.timeStamp || performance.now();
      const currY = e.touches[0]?.clientY ?? startY;
      const dyRaw = startY - currY;
      const dirDown = dyRaw > 0;
      const dy = dyRaw * TOUCH_GAIN;

      if (unlockedToPageRef.current) {
        if (!dirDown) {
          const awayEnough =
            el.scrollTop <=
            getLastTarget() - UNLOCK_HYSTERESIS_PX * 2;
          const cooled =
            now - unlockTsRef.current > RELOCK_GAP_MS;
          if (awayEnough && cooled) {
            unlockedToPageRef.current = false;
          }
        }
        return;
      }

      const targetEl = (e.target as Element) ?? null;
      const scroller = targetEl
        ? (getScrollableAncestor(
            targetEl,
            el
          ) as HTMLElement | null)
        : null;
      if (scroller && canScrollFurther(scroller, dirDown)) {
        e.preventDefault();
        e.stopPropagation();
        scroller.scrollBy({ top: dy });
        return;
      }

      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];
      if (body && canScrollFurther(body, dirDown)) {
        e.preventDefault();
        e.stopPropagation();
        body.scrollBy({ top: dy });
        return;
      }

      const lastTarget = getLastTarget();
      const atActualBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >=
        el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;

      if (Math.abs(dy) >= TOUCH_TRIGGER_PX) {
        const dir = dirDown ? 1 : -1;
        const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);
        if (nextIdx !== curIdx) {
          e.preventDefault();
          e.stopPropagation();
          lastSnapAtRef.current = now;
          scrollToIdx(nextIdx);
          return;
        }
      }

      if (
        dirDown &&
        curIdx === totalSteps - 1 &&
        el.scrollTop >= lastTarget - UNLOCK_HYSTERESIS_PX
      ) {
        unlockedToPageRef.current = true;
        unlockTsRef.current = now;
        try {
          el.blur();
        } catch {}
        return;
      }

      if (
        (dirDown && atActualBottom) ||
        (!dirDown && atTop)
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      el.scrollBy({ top: dy });
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];
      if (![...keysDown, ...keysUp].includes(e.key)) return;

      const now = e.timeStamp || performance.now();
      const dirDown = keysDown.includes(e.key);

      const curIdx = getIdxFromScrollTop(el.scrollTop);
      const body = bodyRefs.current[curIdx];

      if (
        animatingRef.current ||
        now - lastSnapAtRef.current < STEP_COOLDOWN_MS
      ) {
        return;
      }

      if (body && canScrollFurther(body, dirDown)) {
        e.preventDefault();
        e.stopPropagation();
        body.scrollBy({
          top: dirDown
            ? body.clientHeight * 0.9
            : -body.clientHeight * 0.9,
        });
        return;
      }

      const dir = dirDown ? 1 : -1;
      const nextIdx = clamp(curIdx + dir, 0, totalSteps - 1);
      if (nextIdx !== curIdx) {
        e.preventDefault();
        e.stopPropagation();
        lastSnapAtRef.current = now;
        scrollToIdx(nextIdx);
      } else {
        const atActualBottom =
          Math.ceil(el.scrollTop + el.clientHeight) >=
          el.scrollHeight - 1;
        const atTop = el.scrollTop <= 0;
        if (
          (dirDown &&
            (curIdx === totalSteps - 1 || atActualBottom)) ||
          (!dirDown && atTop)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    el.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    el.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    el.addEventListener("touchend", onTouchEnd, {
      passive: true,
      capture: true,
    });
    el.addEventListener("keydown", onKeyDown, {
      passive: false,
      capture: true,
    });

    return () => {
      el.removeEventListener("wheel", onWheel as any, {
        capture: true,
      } as any);
      el.removeEventListener(
        "touchstart",
        onTouchStart as any,
        { capture: true } as any
      );
      el.removeEventListener(
        "touchmove",
        onTouchMove as any,
        { capture: true } as any
      );
      el.removeEventListener(
        "touchend",
        onTouchEnd as any,
        { capture: true } as any
      );
      el.removeEventListener(
        "keydown",
        onKeyDown as any,
        { capture: true } as any
      );
    };
  }, [
    containerRef,
    totalSteps,
    lastStopOffsetPx,
    bodyRefs,
    onActiveChange,
    apiRef,
  ]);
}

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
      const maxH = Math.max(160, pageHeight - headerH - 120);
      const body = document.getElementById(
        `step-body-${index}`
      ) as HTMLDivElement | null;
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
      <div
        ref={headerRef}
        className="px-4 border-b bg-yellow-300 flex items-center justify-between gap-4
                   h-20 md:h-[60px] lg:h-16"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          {step.title}
        </h3>
        <div
          className="text-xs md:text-sm font-bold text-brand-600 bg-white rounded-full
                        w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm"
        >
          {step.stepNumber}
        </div>
      </div>

      <div
        id={`step-body-${index}`}
        ref={(el) => registerBodyRef(index, el)}
        className="flex-1 p-3 md:p-4 overflow-y-auto overflow-x-hidden no-scrollbar overscroll-y-contain"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="w-full max-w-full min-w-0">
          {step.component}
        </div>
      </div>
    </CardSticky>
  );
}

const CTASection = () => {
  const [open, setOpen] = useState(false);

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

  const rawLastStop = Math.round(
    topBasePx + hudH + perStepOffsetPx * LAST_VISIBLE_HEADERS
  );

  const computedTopLast =
    topBasePx + (STEPS.length - 1) * perStepOffsetPx;

  const lastStopOffsetPx = clamp(
    Math.min(rawLastStop, computedTopLast - 200),
    0,
    Math.max(0, pageH - 24)
  );

  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const registerBodyRef = (idx: number, el: HTMLDivElement | null) => {
    bodyRefs.current[idx] = el ?? null;
  };

  const snapApiRef = useRef<SnapAPI | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useUnifiedStepSnap(
    demoScrollRef,
    bodyRefs,
    STEPS.length,
    lastStopOffsetPx,
    snapApiRef,
    (i) => setActiveIdx(i)
  );

  useEffect(() => {
    const el = demoScrollRef.current;
    if (!el) return;

    const computeActiveIdx = (st: number) => {
      const s = pageH || 1;
      const lastTarget = Math.max(
        0,
        (STEPS.length - 1) * s - lastStopOffsetPx
      );
      if (st >= lastTarget - 1) return STEPS.length - 1;
      return clamp(Math.round(st / s), 0, STEPS.length - 1);
    };

    const onScroll = () => setActiveIdx(computeActiveIdx(el.scrollTop));
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [pageH, lastStopOffsetPx]);

  const currentIdx =
    snapApiRef.current && demoScrollRef.current
      ? snapApiRef.current.getCurrentIdx()
      : activeIdx;

  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEPS.length - 1;

  const goNext = () =>
    snapApiRef.current?.snapToIdx(
      Math.min(STEPS.length - 1, currentIdx + 1)
    );
  const goPrev = () =>
    snapApiRef.current?.snapToIdx(
      Math.max(0, currentIdx - 1)
    );

  const activeTitle = STEPS[activeIdx]?.title ?? "";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <section className="py-16 lg:py-24 bg-gradient-to-r from-yellow-300 via-yellow-400 to-black text-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to build custom software?
            </h2>
            <p className="text-md md:text-lg mb-8">
              Talk to our team about your goals and get a tailored plan
              from a trusted software development company.
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

      <CollapsibleContent
        id="demo"
        forceMount
        className="mt-0 overflow-visible"
      >
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
                <div
                  ref={demoScrollRef}
                  tabIndex={0}
                  className="relative overflow-y-auto no-scrollbar rounded-xl mx-auto no-smooth
              w-[94vw] sm:w-[88vw] md:w-[84vw] lg:w-[78vw] xl:w-[72vw] max-w-[1100px]
              bg-black/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  style={{
                    height: `${pageH}px`,
                    overscrollBehaviorY: "auto",
                  }}
                >
                  {/* HUD */}
                  <div className="pointer-events-none sticky top-3 z-[10000] px-2">
                    <div
                      ref={hudShellRef}
                      className="pointer-events-auto flex items-center justify-between gap-3
                        rounded-full bg-black/60 backdrop-blur border border-white/15
                        px-1 md:px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-black text-xs md:text-xs font-bold">
                          {String(activeIdx + 1).padStart(2, "0")}
                        </span>
                        <div className="text-white/90 text-xs md:text-sm font-medium">
                          {activeTitle}
                        </div>
                        <div className="text-white/50 text-xs ml-2 mt-1">
                          ({activeIdx + 1} / {STEPS.length})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={goPrev}
                          disabled={isFirst}
                          className={`px-3 py-1.5 rounded-full text-sm md:text-sm font-medium border transition
                            ${
                              isFirst
                                ? "text-white/30 border-white/10 cursor-not-allowed"
                                : "text-white/90 border-white/20 hover:bg-white/10"
                            }`}
                        >
                          Prev
                        </button>
                        <button
                          onClick={goNext}
                          disabled={isLast}
                          className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition
                            ${
                              isLast
                                ? "bg-yellow-300/40 text-black/50 cursor-not-allowed"
                                : "bg-yellow-400 text-black hover:bg-yellow-300"
                            }`}
                        >
                          {isLast ? "Done" : "Next step"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <ContainerScroll
                    className="w-full"
                    style={{
                      minHeight: `${pageH * STEPS.length}px`,
                    }}
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
                    <div className="h-[5vh] md:h-[40vh] lg:h-[48vh]" />
                  </ContainerScroll>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CTASection;
