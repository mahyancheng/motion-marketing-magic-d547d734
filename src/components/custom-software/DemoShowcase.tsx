import DemoHeader from "@/components/DemoHeader";
import OrderProcessingSection from "@/components/OrderProcessingSection";
import InventorySection from "@/components/InventorySection";
import FulfillmentSection from "@/components/FulfillmentSection";
import CustomerSection from "@/components/CustomerSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import CustomizationSection from "@/components/CustomizationSection";

const DemoShowcase = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <DemoHeader />
        <OrderProcessingSection />
        <InventorySection />
        <FulfillmentSection />
        <CustomerSection />
        <AnalyticsSection />
        <CustomizationSection />
      </div>
    </div>
  );
};

export default DemoShowcase;
