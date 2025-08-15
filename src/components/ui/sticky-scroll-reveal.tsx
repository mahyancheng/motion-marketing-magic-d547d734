"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgb(0 0 0)", // black
    "rgb(15 15 15)", // very dark gray
    "rgb(23 23 23)", // neutral-900
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(234 179 8), rgb(249 115 22))", // yellow-500 to orange-500
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
    "linear-gradient(to bottom right, rgb(234 179 8), rgb(251 191 36))", // yellow-500 to yellow-400
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[40rem] overflow-y-auto flex justify-center relative space-x-4 lg:space-x-10 rounded-md p-4 lg:p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-2 lg:px-4">
        <div className="max-w-lg lg:max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-xl lg:text-2xl font-bold text-yellow-400"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-sm lg:text-base text-white/80 max-w-sm mt-6 lg:mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-[32rem] w-full max-w-2xl rounded-md bg-black/20 backdrop-blur-sm sticky top-10 overflow-hidden border border-yellow-400/20",
          contentClassName
        )}
      >
        <div className="h-full w-full overflow-auto bg-black/40 backdrop-blur-sm">
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};