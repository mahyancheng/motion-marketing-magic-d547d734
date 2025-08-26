"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ProcessStepsSection from "../ProcessStepsSection"; // sticky 步骤区

/** 
 * 计算真实视口高度（避免移动端 100vh 问题），
 * 并根据断点返回合适的“占比”高度。
 */
function useResponsiveDemoHeight() {
  const [vhUnit, setVhUnit] = useState<number>(window?.innerHeight ? window.innerHeight * 0.01 : 7.2); // 每 1vh 的像素
  const [percent, setPercent] = useState<number>(0.9); // 占视口高度的比例：默认 90%

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight * 0.01;
      setVhUnit(vh);

      // 简单断点：可按需微调
      const w = window.innerWidth;
      if (w < 480) setPercent(0.78);         // 手机
      else if (w < 768) setPercent(0.82);    // 小平板
      else if (w < 1024) setPercent(0.86);   // 平板/小屏笔电
      else setPercent(0.9);                  // 桌面
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // 返回像素高度，必要时加上上限/下限
  const heightPx = useMemo(() => {
    const h = vhUnit * 200 * percent;      // calc(var(--app-vh) * 100) * percent
    const clamped = Math.max(420, Math.min(h, 1120)); // 420px~980px 之间
    return clamped;
  }, [vhUnit, percent]);

  return heightPx;
}

const CTASection = () => {
  const [open, setOpen] = useState(false);
  const hasPrefetched = useRef(false);

  // 展开后，平滑滚动到 #demo-anchor
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

  // 计算自适应高度（像素）
  const demoHeightPx = useResponsiveDemoHeight();

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
              Talk to our team about your goals and get a tailored plan from a
              trusted software development company.
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

      {/* Demo Section（自适应高度的内滚容器） */}
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
                {/* ✅ 自适应高度 + 内滚 */}
                <div
                  data-demo-scroll
                  className="relative overflow-y-auto overscroll-contain no-scrollbar rounded-lg"
                  style={{ height: `${demoHeightPx + 60}px` }} // 比之前多 60px 余量
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
