"use client";

import { cn } from "@/lib/utils";
import { Sparkles, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderProcessingDemo from "@/components/demo-only/OrderProcessingDemo";
import InventoryDemo from "@/components/InventorySection";
import FullfillmentDemo from "@/components/FulfillmentSection";
import CustomizationDemo from "@/components/CustomerSection";
import AnalyticsDemo from "@/components/AnalyticsSection";


interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
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
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  id = 0,
  onCardClick,
  isExpanded = false,
  onClose,
}: DisplayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const cardVariants = {
    normal: {
      scale: 1,
      x: 0,
      y: 0,
      width: "22rem",
      height: "9rem",
      skewY: "-8deg",
      position: "relative" as const,
    },
    expanded: {
      scale: 1,
      width: "700px",
      height: "540px",
      skewY: "0deg",
      position: "fixed" as const,
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
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
        // 👇 用内联 zIndex 控层级：id 越小层级越高（0 最高）
        style={{ zIndex: isExpanded ? 1000 : 100 - (id ?? 0) }}
        className={cn(
          "flex select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 cursor-pointer",
          !isExpanded && "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 hover:scale-105",
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
          <span className={cn("relative inline-block rounded-full", isExpanded ? "p-3 bg-primary/20" : "p-1 bg-primary/10")}>
            {icon}
          </span>
          <div>
            <p className={cn("font-medium text-foreground", isExpanded ? "text-3xl" : "text-lg", titleClassName)}>{title}</p>
            <p className={cn("text-muted-foreground", isExpanded ? "text-lg" : "text-sm")}>{date}</p>
          </div>
        </div>

        {isExpanded ? (
          <>
            <div className="flex-1 flex items-center">
              <p className="text-lg text-center w-full text-muted-foreground mb-4">{description}</p>
            </div>
            <div className="space-y-4">
              <div className="max-h-[58vh] overflow-y-auto pr-3 [-webkit-overflow-scrolling:touch]">
                {id === 0 && <OrderProcessingDemo />}
                {id === 1 && <InventoryDemo />}
                {id === 2 && <FullfillmentDemo />}
                {id === 3 && <CustomizationDemo />}
                {id === 4 && <AnalyticsDemo />}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground truncate max-w-[18rem]">{description}</p>
          </>
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

  const handleCardClick = (id: number) => {
    setExpandedCard(id);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  // Use the custom software cards by default
  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard 
          key={index} 
          {...cardProps} 
          id={index}
          onCardClick={handleCardClick}
          isExpanded={expandedCard === index}
          onClose={handleClose}
        />
      ))}
    </div>
  );
}

const defaultCards: DisplayCardProps[] = [
  {
    id: 0,
    icon: <Sparkles className="size-4 text-yellow-300" />,
    title: "Step 1: Effortless Order Processing",
    description: "See how easily orders can be captured and validated from the salesperson's perspective and how they instantly appear for your admin team. No more manual entry errors or delays!",
    date: "Step 1",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    id: 1,
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Step 2: Always Know Your Stock with Real-Time Inventory",
    description: "Accurate inventory is crucial. Watch how stock levels update automatically as orders are processed, preventing overselling and ensuring sales teams have the latest information.",
    date: "Step 2",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] translate-x-8 translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    id: 2,
    icon: <Sparkles className="size-4 text-green-300" />,
    title: "Step 3: Automate Your Fulfillment Process",
    description: "Reduce manual work in your warehouse. See how the system can guide your team through picking, packing, and shipping.",
    date: "Step 3",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] translate-x-16 translate-y-16 hover:translate-y-6",
  },
  {
    id: 3,
    icon: <Sparkles className="size-4 text-purple-300" />,
    title: "Step 4: Know Your Customers Better",
    description: "A single view of your customer's history and preferences helps you provide better service and build lasting relationships.",
    date: "Step 4",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-24 hover:translate-y-14",
  },
  {
    id: 4,
    icon: <Sparkles className="size-4 text-pink-300" />,
    title: "Step 5: Make Data-Driven Decisions with Analytics",
    description: "Turn your data into actionable insights with comprehensive analytics and reporting tools.",
    date: "Step 5",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] translate-x-32 translate-y-32 hover:translate-y-22",
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