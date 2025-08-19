"use client";

import { cn } from "@/lib/utils";
import { Sparkles, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExpandable } from "@/hooks/use-expandable";

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
  const { isExpanded: expandableExpanded, toggleExpand } = useExpandable(false);

  const handleCardClick = () => {
    onCardClick?.(id);
    toggleExpand();
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
      zIndex: 1,
    },
    expanded: {
      scale: 1,
      x: "50vw",
      y: "50vh",
      width: "600px",
      height: "500px",
      skewY: "0deg",
      position: "fixed" as const,
      zIndex: 50,
      translateX: "-50%",
      translateY: "-50%",
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
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6 
        }}
        onClick={handleCardClick}
        className={cn(
          "flex select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 cursor-pointer",
          !isExpanded && "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 hover:scale-105",
          isExpanded && "bg-muted/90 px-8 py-6 hover:border-white/20",
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
            <p className={cn("text-muted-foreground", isExpanded ? "text-lg" : "")}>{date}</p>
          </div>
        </div>
        
        {isExpanded ? (
          <>
            <div className="flex-1 flex items-center">
              <p className="text-2xl text-center w-full">{description}</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">This is expanded content for the {title.toLowerCase()} card. Here you can add more detailed information, additional features, or any other content that should be displayed when the card is expanded.</p>
              <div className="flex gap-2">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="whitespace-nowrap text-lg">{description}</p>
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
  
  const defaultCards: DisplayCardProps[] = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  const handleCardClick = (id: number) => {
    setExpandedCard(id);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

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
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Featured",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Popular",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "New",
    description: "Latest updates and features",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
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