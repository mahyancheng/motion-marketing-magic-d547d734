import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from 'react';

const DemoHeader = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = useMemo(
    () => [
      { id: 'section-1', label: 'Step 1: Order Processing' },
      { id: 'section-2', label: 'Step 2: Inventory' },
      { id: 'section-3', label: 'Step 3: Fulfillment' },
      { id: 'section-4', label: 'Step 4: Customer' },
      { id: 'section-5', label: 'Step 5: Analytics' },
    ],
    []
  );

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFirstSection = () => scrollTo('section-1');

  // 监听各 step section，自动高亮
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]) {
          const idx = steps.findIndex((s) => s.id === visible[0].target.id);
          if (idx !== -1) setActiveStep(idx + 1);
        }
      },
      {
        threshold: [0.25, 0.6],
        rootMargin: '-64px 0px -40% 0px', // 适配顶部导航（可按需要调整）
      }
    );

    steps.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [steps]);

  return (
    <div className="pt-24 lg:pt-5">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 mt-10">
            Experience the Power of <span className="text-yellow-400">Customization</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            An Interactive Order Management Demo
          </p>
          <p className="text-white-600 mb-8 md:mb-10 max-w-3xl">
            Discover how our tailored software solutions can revolutionize your operations.
            This Order Management System is just one example of what we can build for your unique business needs.
            All data in this demo is for illustrative purposes and will reset when you refresh the page.
          </p>

          {/* ======= Add here: Steps Nav ======= */}
          <div className="mx-auto mb-8 w-full max-w-4xl">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              {steps.map((s, i) => {
                const stepNo = i + 1;
                const isActive = activeStep === stepNo;
                return (
                  <Button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={
                      isActive
                        ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  >
                    {s.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* 跳到第一段的引导按钮（可选） */}
          <Button
            type="button"
            onClick={scrollToFirstSection}
            variant="ghost"
            className="mx-auto flex items-center gap-2 text-white hover:bg-white/10"
          >
            Start Demo <ChevronDown className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoHeader;
