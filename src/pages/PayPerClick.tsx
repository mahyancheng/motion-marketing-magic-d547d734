import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Target, TrendingUp, BarChart2, Zap } from "lucide-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const PayPerClick = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
};

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
            Pay Per Click <span className="text-yellow-400">(Google Ads)</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Want to pay your way up to the first page of Google? Our team crafts lightning-precise campaigns that strike with maximum impact and drive costs down. Get immediate visibility and results with our expert Google Ads management.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg">
              FREE AUDIT
            </button>
            <Link to="/contact">
              <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
                Get Free Consultation
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
            alt="Google Ads Management"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-yellow-400" />,
      title: "Precision Targeting",
      description: "Target the exact keywords and demographics that matter most to your business for maximum ROI."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Lightning-Fast Results",
      description: "See immediate traffic and conversions as soon as your campaigns go live."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-yellow-400" />,
      title: "Cost Optimization",
      description: "Advanced bid management and optimization strategies to minimize costs and maximize profits."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-yellow-400" />,
      title: "Performance Tracking",
      description: "Detailed reporting and analytics to track every click, conversion, and dollar spent."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Google Ads Management Features</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Professional Google Ads management that delivers results while keeping costs down.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Campaign Strategy",
      description: "We analyze your business goals and create a tailored Google Ads strategy."
    },
    {
      number: "02", 
      title: "Keyword Research",
      description: "Identify high-converting keywords with the best cost-per-click ratios."
    },
    {
      number: "03",
      title: "Ad Creation",
      description: "Craft compelling ad copy and landing pages optimized for conversions."
    },
    {
      number: "04",
      title: "Campaign Launch",
      description: "Launch campaigns with precise targeting and bid optimization."
    },
    {
      number: "05",
      title: "Monitoring & Optimization",
      description: "Continuously monitor and optimize campaigns for maximum ROI."
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Google Ads Process</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 text-2xl font-bold mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CTA = () => {
  return (
    <div className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Generating Leads Today?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your Google Ads campaign up and running with our expert management and start seeing results immediately.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg">
            FREE AUDIT - Start Today
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PayPerClick;