// ProcessStepsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import OrderProcessingSection from "./OrderProcessingSection";
import InventorySection from "./InventorySection";
import FulfillmentSection from "./FulfillmentSection";
import CustomerSection from "./CustomerSection";
import AnalyticsSection from "./AnalyticsSection";
import { useClampToViewport } from "@/hooks/useClampToViewport";

const PROCESS_STEPS = [
  { id: "step-1", title: "Step 1: Effortless Order Processing", stepNumber: "01", component: <OrderProcessingSection /> },
  { id: "step-2", title: "Step 2: Customer Experience", stepNumber: "02", component: <CustomerSection /> },
  { id: "step-3", title: "Step 3: Automated Fulfillment", stepNumber: "03", component: <FulfillmentSection /> },
  { id: "step-4", title: "Step 4: Real-Time Inventory Management", stepNumber: "04", component: <InventorySection /> },
  { id: "step-5", title: "Step 5: Analytics & Insights", stepNumber: "05", component: <AnalyticsSection /> },
];

// 简单断点 hook
function useStepOffsets() {
  const [topBasePx, setTopBasePx] = useState(16);       // Step1 距离容器顶部
  const [perStepOffsetPx, setPerStepOffsetPx] = useState(72); // 每步追加偏移（标题高+间距）

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      let headerH = 56;
      let gap = 10;

      if (w >= 1024) {        // lg+
        headerH = 64;
        gap = 10;
      } else if (w >= 768) {  // md
        headerH = 60;
        gap = 12;
      }

      setTopBasePx(16);
      setPerStepOffsetPx(headerH + gap);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return { topBasePx, perStepOffsetPx };
}

export default function ProcessStepsSection() {
  const { topBasePx, perStepOffsetPx } = useStepOffsets();

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* 这个容器提供足够滚动高度 */}
        <ContainerScroll className="w-full min-h-[40vh] pb-20">
          {PROCESS_STEPS.map((step, index) => {
            const bodyRef = useRef<HTMLDivElement>(null);
            const cardRef = useRef<HTMLDivElement>(null);

            useClampToViewport({ cardRef, bodyRef, bottomPad: 24 });

            return (
              <CardSticky
                key={step.id}
                ref={cardRef}
                index={index}
                topBasePx={topBasePx}
                perStepOffsetPx={perStepOffsetPx}
                baseZ={3000}
                zStep={20}
                className="
        rounded-lg border bg-white shadow-sm backdrop-blur-md overflow-hidden
        mx-auto w-[94vw] sm:w-[90vw] md:w-[86vw] lg:w-[80vw] max-w-6xl
        h-auto min-h-[56vh]                  /* 外壳自适应 + 下限 */
      "
              >
                {/* 头部固定高，避免高度抖动 */}
                <div className="px-4 border-b bg-brand-50 flex items-center justify-between gap-4 h-14 md:h-[60px] lg:h-16 bg-yellow-300">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{step.title}</h3>
                  <div className="text-xs md:text-sm font-bold text-brand-600 bg-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm">
                    {step.stepNumber}
                  </div>
                </div>

                {/* ✅ 内容区交给内部滚动，maxHeight 由 hook 实测设置 */}
                <div ref={bodyRef} className={`flex-1 overflow-auto p-3 md:p-4 ${index < 2 ? "pb-28 md:pb-32" : ""}`}>
                  {step.component}
                </div>
              </CardSticky>
            );
          })}

        </ContainerScroll>
      </div>
    </section>
  );
}
