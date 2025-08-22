
import { OrderProvider } from '@/contexts/OrderContext';
import ProcessStepsSection from '@/components/ProcessStepsSection';

const Index = () => {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-gray-50">
        <main>
          <ProcessStepsSection />
        </main>
      </div>
    </OrderProvider>
  );
};

export default Index;
