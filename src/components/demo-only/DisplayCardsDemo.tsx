"use client";

import { cn } from "@/lib/utils";
import { Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useExpandable } from "@/hooks/use-expandable"; // 未使用可移除
import OrderProcessingDemo from "@/components/OrderProcessingSection";
import InventoryDemo from "@/components/InventorySection";
import FullfillmentDemo from "@/components/FulfillmentSection";
import CustomizationDemo from "@/components/CustomerSection";
import AnalyticsDemo from "@/components/AnalyticsSection";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  iconClassName?: string;
  titleClassName?: string;
  id?: number;
  onCardClick?: (id: number) => void;
  isExpanded?: boolean;
  onClose?: () => void;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  id = 0,
  onCardClick,
  isExpanded = false,
  onClose,
}: DisplayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (!isExpanded) {
      onCardClick?.(id!);
    }
  };

  // 维持你原本的 variant（注意：使用 fixed 会从视口定位，
  // 如果想从卡片原位放大，建议后续换 layoutId 方案）
  const cardVariants = {
    normal: {
      scale: 1,
      x: 180,
      y: -40,
      width: "22rem",
      height: "10rem",
      skewY: "6deg",
      skewX: "4deg",


      position: "relative" as const,
    },
    expanded: {
      scale: 1,
      width: "700px",
      height: "540px",
      skewY: "0deg",
      position: "fixed" as const,
      left: "0%",
      top: "50%",
      x: "0%",
      y: "-52%",
    }
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={cardRef}
        variants={cardVariants}
        animate={isExpanded ? "expanded" : "normal"}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6 }}
        onClick={handleCardClick}
        // 用内联 zIndex 控层级：展开时顶层；未展开按 id 递减
        style={{ zIndex: isExpanded ? 1000 : 100 - (id ?? 0) }}
        className={cn(
          "flex select-none flex-col justify-between rounded-xl border-2 bg-muted/70 px-4 py-3 duration-700 cursor-pointer",
          !isExpanded && "after:absolute after:-right-1 after:top-[-20%] after:h-[110%] after:w-[20rem]  after:from-background hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 hover:scale-105",
          isExpanded && "bg-muted/90 px-8 py-6 hover:border-white/20 overflow-hidden",
          className
        )}
      >
        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="absolute right-4 top-4 rounded-full bg-red-500/20 p-2 hover:bg-red-500/30 transition-colors z-10"
          >
            <X className="size-4 text-red-400" />
          </button>
        )}

        <div className={isExpanded ? "flex items-center gap-4" : ""}>
          <span className={cn("relative inline-block rounded-full bg-blue-800", isExpanded ? "p-3" : "p-1")}>
            {icon}
          </span>
          <div>
            <p className={cn("font-medium", isExpanded ? "text-3xl" : "text-lg", titleClassName)}>{title}</p>
          </div>
        </div>

        {isExpanded ? (
          <div className="mt-4 flex-1 overflow-hidden">
            <div className="text-center mb-3">
              <p className="text-md text-muted-foreground">{description}</p>
            </div>
            <div className="relative">
              <div className="max-h-[58vh] overflow-y-auto pr-3 [-webkit-overflow-scrolling:touch]">
                {id === 0 && <OrderProcessingDemo />}
                {id === 1 && <InventoryDemo />}
                {id === 2 && <FullfillmentDemo />}
                {id === 3 && <CustomizationDemo />}
                {id === 4 && <AnalyticsDemo />}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground truncate max-w-[18rem]">
            {description}
          </p>
        )}
      </motion.div>
    </>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

function DisplayCards({ cards }: DisplayCardsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isUserExpanded, setIsUserExpanded] = useState(false);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isUserExpanded) return;

      const maxIndex = (cards?.length || defaultCards.length) - 1;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setExpandedCard(prev => prev === null ? 0 : Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setExpandedCard(prev => prev === null ? 0 : Math.min(maxIndex, (prev || 0) + 1));
      } else if (e.key === 'Escape') {
        setIsUserExpanded(false);
        setExpandedCard(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards, isUserExpanded]);

  // 你传入的卡组或默认
  const displayCards = cards || defaultCards;

  // ✅ 修正这里：展开被点击的那一张，而不是总是 0
  const handleCardClick = (_id: number) => {
    setExpandedCard(_id);
    setIsUserExpanded(true);
  };

  const handleClose = () => {
    setExpandedCard(null);
    setIsUserExpanded(false);
  };

  const handlePrevious = () => {
    const maxIndex = (cards?.length || defaultCards.length) - 1;
    setExpandedCard(prev => prev === null ? 0 : Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = (cards?.length || defaultCards.length) - 1;
    setExpandedCard(prev => prev === null ? 0 : Math.min(maxIndex, (prev || 0) + 1));
  };

  // —— 这里是“阶梯式分层”的包装渲染 —— //
  return (
    <div className="relative w-full max-w-3xl min-h-[360px] py-10 mx-auto">
      {/* 阶梯层叠：用外层 motion.div 给每张卡未展开时的位移/旋转/缩放/透明度 */}
      {displayCards.map((cardProps, index) => {
        const GAP_X = 80;   // 右移
        const GAP_Y = -20;  // 上移（负数=向上）
        const ROT = -1.5; // 每层旋转
        const SCALE = 0.02; // 每层缩放衰减
        const OPAC = 0.18; // 每层透明度衰减
        const BLUR = -0.5;  // 每层模糊衰减(px)

        const depth = index;
        const isThisExpanded = expandedCard === index;
        const anyExpanded = expandedCard !== null;

        // 计算未展开状态下的基础变换
        const baseX = depth * GAP_X;
        const baseY = depth * GAP_Y;
        const baseScale = 1 - depth * SCALE;
        const baseRotate = depth * ROT;

        return (
          <motion.div
            key={index}
            initial={false}
            animate={
              isThisExpanded
                ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
                : {
                  x: baseX,
                  y: baseY,
                  rotate: baseRotate,
                  scale: baseScale,
                  opacity: Math.max(1 - depth * OPAC, 0.25),
                  filter: `blur(${depth * BLUR}px)`,
                }
            }
            // ✨ 悬浮上抬（仅未展开时生效）
            whileHover={
              !isThisExpanded && !anyExpanded
                ? {
                  y: baseY - 30,             // 上抬 10px
                  scale: baseScale + 0.02,    // 轻微放大
                  rotate: baseRotate + 0.3,   // 微调旋转，增加“浮起”感觉
                }
                : undefined
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
              // 让 hover 动画更灵敏
              layout: { duration: 0.2 },
            }}
            style={{
              transformOrigin: "left center",
              zIndex: isThisExpanded ? 1000 : 30 - depth,
            }}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 will-change-transform",
              anyExpanded && !isThisExpanded && "pointer-events-none"
            )}
          >
            <DisplayCard
              {...cardProps}
              id={index}
              onCardClick={handleCardClick}
              isExpanded={isThisExpanded}
              onClose={handleClose}
            />
          </motion.div>
        );
      })}


      {/* 导航控件（固定在视口） */}
      {expandedCard !== null && isUserExpanded && (
        <>
          {expandedCard > 0 && (
            <button
              onClick={handlePrevious}
              className="fixed left-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 backdrop-blur-sm p-3 hover:bg-black/70 transition-colors border border-white/20"
              aria-label="Previous card"
            >
              <ChevronLeft className="size-6 text-white" />
            </button>
          )}

          {expandedCard < displayCards.length - 1 && (
            <button
              onClick={handleNext}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 backdrop-blur-sm p-3 hover:bg-black/70 transition-colors border border-white/20"
              aria-label="Next card"
            >
              <ChevronRight className="size-6 text-white" />
            </button>
          )}

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            {displayCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setExpandedCard(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  expandedCard === index ? "bg-yellow-400" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 你原本的默认卡片数据
const defaultCards: DisplayCardProps[] = [
  {
    id: 0,
    icon: <Sparkles className="size-4 text-yellow-300" />,
    title: "Step 1: Effortless Order Processing",
    description: "See how easily orders can be captured and validated from the salesperson's perspective and how they instantly appear for your admin team. No more manual entry errors or delays!",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className: "translate-x-24 translate-y-20 hover:translate-y-10",
  },
  {
    id: 1,
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Step 2: Always Know Your Stock with Real-Time Inventory",
    description: "Accurate inventory is crucial. Watch how stock levels update automatically as orders are processed, preventing overselling and ensuring sales teams have the latest information.",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className: "translate-x-12 translate-y-10 hover:-translate-y-1",
  },
  {
    id: 2,
    icon: <Sparkles className="size-4 text-green-300" />,
    title: "Step 3: Automate Your Fulfillment Process",
    description: "Reduce manual work in your warehouse. See how the system can guide your team through picking, packing, and shipping.",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className: "translate-x-0 translate-y-0 hover:-translate-y-2",
  },
  {
    id: 3,
    icon: <Sparkles className="size-4 text-green-300" />,
    title: "Step 4: Know Your Customers Better",
    description: "A single view of your customer's history and preferences helps you provide better service and build lasting relationships.",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className: "-translate-x-12 translate-y-8 hover:-translate-y-1",
  },
  {
    id: 4,
    icon: <Sparkles className="size-4 text-green-300" />,
    title: "Step 5: Make Data-Driven Decisions with Analytics",
    description: "Turn your operational data into actionable insights. Our system provides comprehensive reports to help you track performance and identify growth opportunities.",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className: "-translate-x-20 translate-y-16 hover:-translate-y-0",
  },
];

export default function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}
