
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DemoHeader = () => {
  const scrollToFirstSection = () => {
    const section = document.getElementById('section-1');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 mt-10">
          Experience the Power of <span className="text-yellow-400">Customization</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          An Interactive Order Management Demo
        </p>
        <p className="text-white-600 mb-12 max-w-3xl">
          Discover how our tailored software solutions can revolutionize your operations.
          This Order Management System is just one example of what we can build for your unique business needs.
          All data in this demo is for illustrative purposes and will reset when you refresh the page.
        </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoHeader;
