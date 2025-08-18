"use client";
import React, { useRef, useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// 懒加载 Demo，并提供预加载函数（hover/focus 时预取 chunk）
const DemoShowcase = lazy(() => import("./DemoShowcase"));
const preloadDemoShowcase = () => import("./DemoShowcase");

const CTASection = () => {
  const [open, setOpen] = useState(false);
  const hasPrefetched = useRef(false);

  // 展开后，平滑滚动到下方 #demo
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => {
        document.getElementById("demo")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

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

              {/* Try Our Demo：触发折叠，并在 hover/focus 预加载 Demo */}
              <CollapsibleTrigger
                className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                onMouseEnter={() => {
                  if (!hasPrefetched.current) {
                    preloadDemoShowcase();
                    hasPrefetched.current = true;
                  }
                }}
                onFocus={() => {
                  if (!hasPrefetched.current) {
                    preloadDemoShowcase();
                    hasPrefetched.current = true;
                  }
                }}
                aria-controls="demo"
              >
                {open ? "Hide Demo" : "Try Our Demo"}
              </CollapsibleTrigger>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 下方 Demo（展开时显示，带过渡 + Suspense fallback） */}
      <CollapsibleContent
        id="demo"
        forceMount
        className={`
          mt-8
          overflow-hidden
          transition-all duration-500 ease-in-out
          data-[state=closed]:max-h-0
          data-[state=open]:max-h-[2000px]
          data-[state=closed]:opacity-0
          data-[state=open]:opacity-100
          data-[state=open]:translate-y-0
          data-[state=closed]:-translate-y-1
        `}
      >
        <section className="py-10 sm:py-14 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Suspense
                fallback={
                  <div className="flex h-40 items-center justify-center">
                    <div className="animate-pulse text-sm text-white/70">Loading demo…</div>
                  </div>
                }
              >
                <DemoShowcase />
              </Suspense>
            </div>
          </div>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CTASection;
