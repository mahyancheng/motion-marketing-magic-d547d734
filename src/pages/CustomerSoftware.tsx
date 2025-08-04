
import { OrderProvider } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import DemoHeader from '@/components/DemoHeader';
import OrderProcessingSection from '@/components/OrderProcessingSection';
import InventorySection from '@/components/InventorySection';
import FulfillmentSection from '@/components/FulfillmentSection';
import CustomerSection from '@/components/CustomerSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import CustomizationSection from '@/components/CustomizationSection';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Package, ShoppingCart, ClipboardList, BarChart2, Clock, Settings, CheckCircle, User } from "lucide-react";
import Footer from "../pages/Footer";

const CustomerSoftware = () => {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />
        <main>
          <DemoHeader />
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <OrderProcessingSection />
              <InventorySection />
              <FulfillmentSection />
              <CustomerSection />
              <AnalyticsSection />
              <CustomizationSection />
            </div>
          </div>
          <Footer />
        </main>

      </div>
    </OrderProvider>
  );
};





export default CustomerSoftware;
