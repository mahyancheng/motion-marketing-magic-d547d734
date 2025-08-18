import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import OrderProcessingDemo from "@/components/OrderProcessingSection";
import InventoryDemo from "@/components/InventorySection";
import FulfillmentDemo from "@/components/FulfillmentSection";
import CustomerDemo from "@/components/CustomerSection";
import AnalyticsDemo from "@/components/AnalyticsSection";

const DemoShowcase = () => {
  const content = [
    {
      title: "Order Processing",
      description:
        "Streamline your order workflow with automated processing, real-time status updates, and intelligent routing. Handle multiple orders simultaneously while maintaining accuracy and speed.",
      content: <OrderProcessingDemo />,
    },
    {
      title: "Inventory Management",
      description:
        "Keep track of your stock levels in real-time. Get automated alerts for low inventory, manage multiple warehouses, and optimize your supply chain with intelligent forecasting.",
      content: <InventoryDemo />,
    },
    {
      title: "Fulfillment & Shipping",
      description:
        "Automate your fulfillment process with integrated shipping solutions. Generate labels, track packages, and provide customers with real-time delivery updates.",
      content: <FulfillmentDemo />,
    },
    {
      title: "Customer Management",
      description:
        "Build stronger relationships with comprehensive customer profiles, communication history, and personalized service tools. Track customer satisfaction and lifetime value.",
      content: <CustomerDemo />,
    },
    {
      title: "Analytics & Insights",
      description:
        "Make data-driven decisions with comprehensive analytics. Track key performance indicators, generate custom reports, and gain insights into your business operations.",
      content: <AnalyticsDemo />,
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
            An Interactive Order Management Demo
          </p>
          <p className="text-white-600 max-w-3xl mx-auto">
            Discover how our tailored software solutions can revolutionize your operations.
            This Order Management System is just one example of what we can build for your unique business needs.
            All data in this demo is for illustrative purposes and will reset when you refresh the page.
          </p>
        </div>
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default DemoShowcase;
