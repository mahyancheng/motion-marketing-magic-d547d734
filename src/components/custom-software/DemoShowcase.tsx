import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import DisplayCardsDemo from "@/components/demo-only/DisplayCardsDemo";

const DemoShowcase = () => {
  const content = [
    {
      title: "Interactive Component Demo",
      description:
        "Experience our expandable card system that transforms simple displays into immersive content experiences. Click any card to see it expand with detailed information and smooth animations.",
      content: <DisplayCardsDemo />,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 mt-10">
            Experience the Power of <span className="text-yellow-400">Customization</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            An Interactive Component Demo
          </p>
          <p className="text-white-600 max-w-3xl mx-auto">
            Discover how our tailored software solutions can revolutionize your operations.
            This interactive card system demonstrates the kind of engaging user experiences we build for your unique business needs.
          </p>
        </div>
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default DemoShowcase;