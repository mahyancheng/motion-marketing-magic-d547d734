import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"
import OrderProcessingSection from './OrderProcessingSection';
import InventorySection from './InventorySection';
import FulfillmentSection from './FulfillmentSection';
import CustomerSection from './CustomerSection';
import AnalyticsSection from './AnalyticsSection';

const PROCESS_STEPS = [
  {
    id: "step-1",
    title: "Step 1: Effortless Order Processing",
    stepNumber: "01",
    component: <OrderProcessingSection />
  },
  {
    id: "step-2", 
    title: "Step 2: Customer Experience",
    stepNumber: "02",
    component: <CustomerSection />
  },
  {
    id: "step-3",
    title: "Step 3: Automated Fulfillment", 
    stepNumber: "03",
    component: <FulfillmentSection />
  },
  {
    id: "step-4",
    title: "Step 4: Real-Time Inventory Management",
    stepNumber: "04",
    component: <InventorySection />
  },
  {
    id: "step-5",
    title: "Step 5: Analytics & Insights",
    stepNumber: "05",
    component: <AnalyticsSection />
  },
]

const ProcessStepsSection = () => {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="w-full">
        <ContainerScroll className="w-full min-h-[500vh] pb-20">
          {PROCESS_STEPS.map((step, index) => (
            <CardSticky
              key={step.id}
              index={index + 2}
              className="rounded-lg border bg-white shadow-sm backdrop-blur-md overflow-hidden mx-auto w-[80vw] max-w-6xl h-[60vh] max-h-[800px]"
              incrementY={20}
            >
              <div className="bg-brand-50 px-4 py-3 border-b flex-shrink-0">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <div className="text-sm font-bold text-brand-600 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    {step.stepNumber}
                  </div>
                </div>
              </div>
              <div className={`flex-1 overflow-auto p-4 ${index < 2 ? 'pb-32' : ''}`}>
                {step.component}
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
};

export default ProcessStepsSection;