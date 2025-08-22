import React from "react";
import { OrderProvider } from "@/contexts/OrderContext";
import ProcessStepsSection from "@/components/ProcessStepsSection";

const DemoShowcase = () => {
  return (
    <OrderProvider>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 mt-10">
              Experience the Power of <span className="text-yellow-400">Customization</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-4">
              Interactive Order Management Demo
            </p>
            <p className="text-white-600 max-w-3xl mx-auto">
              Discover how our tailored software solutions can revolutionize your operations.
              This interactive demo shows a complete order management system with real-time updates across all departments.
            </p>
          </div>        
          <ProcessStepsSection />
        </div>
      </div>
    </OrderProvider>
  );
};

export default DemoShowcase;