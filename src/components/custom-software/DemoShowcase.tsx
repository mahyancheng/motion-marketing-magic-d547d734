import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { ShoppingCart, Package, Truck, Users, BarChart3 } from "lucide-react";

const DemoShowcase = () => {
  const content = [
    {
      title: "Order Processing",
      description:
        "Streamline your order workflow with automated processing, real-time status updates, and intelligent routing. Handle multiple orders simultaneously while maintaining accuracy and speed.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,rgb(6_182_212),rgb(16_185_129))] flex flex-col items-center justify-center text-white p-6">
          <ShoppingCart className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Order Processing</h3>
          <p className="text-center text-sm">Real-time order management</p>
        </div>
      ),
    },
    {
      title: "Inventory Management",
      description:
        "Keep track of your stock levels in real-time. Get automated alerts for low inventory, manage multiple warehouses, and optimize your supply chain with intelligent forecasting.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,rgb(236_72_153),rgb(99_102_241))] flex flex-col items-center justify-center text-white p-6">
          <Package className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Inventory Control</h3>
          <p className="text-center text-sm">Smart stock management</p>
        </div>
      ),
    },
    {
      title: "Fulfillment & Shipping",
      description:
        "Automate your fulfillment process with integrated shipping solutions. Generate labels, track packages, and provide customers with real-time delivery updates.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,rgb(249_115_22),rgb(234_179_8))] flex flex-col items-center justify-center text-white p-6">
          <Truck className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fulfillment</h3>
          <p className="text-center text-sm">Automated shipping & tracking</p>
        </div>
      ),
    },
    {
      title: "Customer Management",
      description:
        "Build stronger relationships with comprehensive customer profiles, communication history, and personalized service tools. Track customer satisfaction and lifetime value.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,rgb(168_85_247),rgb(139_92_246))] flex flex-col items-center justify-center text-white p-6">
          <Users className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Customer Hub</h3>
          <p className="text-center text-sm">360° customer view</p>
        </div>
      ),
    },
    {
      title: "Analytics & Insights",
      description:
        "Make data-driven decisions with comprehensive analytics. Track key performance indicators, generate custom reports, and gain insights into your business operations.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,rgb(34_197_94),rgb(59_130_246))] flex flex-col items-center justify-center text-white p-6">
          <BarChart3 className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Analytics</h3>
          <p className="text-center text-sm">Business intelligence</p>
        </div>
      ),
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
