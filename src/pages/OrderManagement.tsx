import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Package, ShoppingCart, ClipboardList, BarChart2, Clock, Settings, CheckCircle, User } from "lucide-react";
import Footer from "./Footer";

const OrderManagement = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Integration />
      <Pricing />
      <Footer />
    </div>
  );
};

// Hero component
const Hero = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Streamline Your <span className="text-yellow-400">Order Fulfillment</span> Process
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Our comprehensive order management system helps e-commerce businesses automate workflows, reduce errors, and deliver exceptional customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Request a Demo
            </button>
            <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
              View Features
            </button>
          </div>
        </motion.div>
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Order Management System Dashboard" 
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

// Features component
const Features = () => {
  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-yellow-400" />,
      title: "Order Processing",
      description: "Streamline order capture, validation, and processing across multiple sales channels."
    },
    {
      icon: <Package className="h-8 w-8 text-yellow-400" />,
      title: "Inventory Management",
      description: "Real-time inventory tracking across all warehouses and sales channels."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-yellow-400" />,
      title: "Fulfillment Automation",
      description: "Automate picking, packing, and shipping processes with intelligent workflows."
    },
    {
      icon: <User className="h-8 w-8 text-yellow-400" />,
      title: "Customer Management",
      description: "Centralized customer data with order history, preferences, and communication tools."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-yellow-400" />,
      title: "Analytics & Reporting",
      description: "Comprehensive reporting on sales, inventory, fulfillment, and customer insights."
    },
    {
      icon: <Settings className="h-8 w-8 text-yellow-400" />,
      title: "Customizable Workflows",
      description: "Tailor the system to your specific business processes and requirements."
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our comprehensive order management system is designed to streamline your entire order fulfillment process.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Integration component
const Integration = () => {
  const integrations = [
    "Shopify", "WooCommerce", "Magento", "Amazon", "eBay",
    "QuickBooks", "Xero", "ShipStation", "FedEx", "UPS",
    "USPS", "DHL", "PayPal", "Stripe", "Square"
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integrations</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our system integrates with your favorite e-commerce platforms, payment processors, shipping carriers, and accounting software.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <span className="text-center font-medium">{integration}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Pricing component
const Pricing = () => {
  const plans = [
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for high-volume businesses with complex needs.",
      features: [
        "Unlimited orders",
        "Unlimited users",
        "Dedicated account manager",
        "Custom reporting",
        "Custom integrations",
        "White-label options",
        "On-premise deployment"
      ]
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Solution</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive solution tailored to your business needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-1 gap-8 mt-12 max-w-2xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-black p-8 rounded-xl shadow-lg border border-gray-800 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-2">{plan.price}<span className="text-sm text-gray-400 font-normal"> /month</span></div>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                Contact Sales
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
