"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ProcessStepsSection from "../ProcessStepsSection";

// —— 如果你已经有这类 hook，就保留你自己的 —— //
// 简单版：让 demo 高度在 480~1000px 之间自适应
function useResponsiveDemoHeight() {
  const [h, setH] = useState(720);
  useEffect(() => {
    const update = () => {
      const base = Math.min(Math.max(window.innerHeight * 0.90, 480), 1000);
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

// 允许内层滚到底/顶时，将多余滚动量传给外层页面（链式滚动）
function useScrollChain(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        // 让页面继续滚
        // 不要阻止默认，交给浏览器把滚动传给外层
        // 如果外层是自定义容器，也可以改成 window.scrollBy({ top: e.deltaY })
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref]);
}

const CTASection = () => {
  const [open, setOpen] = useState(false);

  // 展开后滚动到锚点
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => {
        document.getElementById("demo-anchor")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  const demoHeightPx = useResponsiveDemoHeight();

  // 用 ref 开启链式滚动
  const demoScrollRef = useRef<HTMLDivElement>(null);
  useScrollChain(demoScrollRef);

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
                {/* ⬇️ demo 宽一些 + 居中 + 链式滚动 */}
                <div
                  // ref={demoScrollRef}
                  // data-demo-scroll
                  className="
                    relative overflow-y-auto no-scrollbar rounded-xl
                    mx-auto
                    /* ⚠️ 加宽一些 */
                    w-[98vw] sm:w-[94vw] md:w-[90vw] lg:w-[86vw] xl:w-[84vw]
                    max-w-[1400px]
                    bg-black/40 ring-1 ring-white/10
                    overscroll-auto    /* 允许链式滚动到页面 */
                  "
                  style={{ height: `${demoHeightPx + 200}px` }}   // ← 外层高度控制
                >
                  <ProcessStepsSection />
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
