
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { BarChart2, Search, ArrowUpRight, Globe, TrendingUp, LineChart } from "lucide-react";
import Footer from "./Footer";

const SEO = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CallToAction />
      <Footer />
    </div>
  );
};

// Hero component for SEO page
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
            Get Your <span className="text-yellow-400">FREE SEO Audit</span> Malaysia
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Professional SEO audit Malaysia services. Our local SEO Malaysia experts provide comprehensive free SEO analysis Malaysia to boost your Kuala Lumpur SEO rankings and organic visibility.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg">
              Get Your FREE SEO Audit
            </button>
            <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
              View SEO Case Studies
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
            alt="SEO Data Analytics" 
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
      icon: <Search className="h-8 w-8 text-yellow-400" />,
      title: "Keyword Research",
      description: "Discover high-intent, valuable keywords that your target audience is actively searching for."
    },
    {
      icon: <Globe className="h-8 w-8 text-yellow-400" />,
      title: "Technical SEO",
      description: "Optimize your website's structure, speed, and mobile-friendliness to improve search performance."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-yellow-400" />,
      title: "Analytics & Reporting",
      description: "Track your SEO progress with comprehensive analytics and transparent reporting."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-yellow-400" />,
      title: "Rank Tracking",
      description: "Monitor your rankings for targeted keywords and outperform your competitors."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our SEO Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive search engine optimization solutions designed to increase visibility and drive organic traffic.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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

// Process component
const Process = () => {
  const steps = [
    {
      number: "01",
      title: "SEO Audit & Analysis",
      description: "We conduct a comprehensive analysis of your current SEO performance, identifying opportunities and gaps."
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Based on our findings, we create a customized SEO strategy tailored to your business goals."
    },
    {
      number: "03",
      title: "Implementation",
      description: "Our team executes the strategy, implementing on-page, off-page, and technical SEO optimizations."
    },
    {
      number: "04",
      title: "Monitoring & Refinement",
      description: "We continuously monitor your SEO performance and refine our approach to maximize results."
    }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our SEO Process</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A methodical approach to improving your search engine visibility and organic traffic.
          </p>
        </motion.div>
        
        <div className="mt-12 relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Process steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:gap-8`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`md:w-1/2 mb-8 md:mb-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="block text-5xl font-bold text-yellow-400 mb-2">{step.number}</span>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                <div className="md:w-1/2 flex justify-center relative">
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Call to Action component
const CallToAction = () => {
  return (
    <div className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your FREE SEO Audit Today!</h2>
            <p className="text-lg text-gray-300 mb-6">
              Discover how our SEO audit Malaysia service can improve your search rankings. Get a comprehensive free SEO analysis Malaysia report delivered to your inbox.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Complete technical SEO analysis
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Local SEO Malaysia opportunities
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Competitor analysis report
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Actionable improvement recommendations
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            className="bg-black p-8 rounded-xl border border-gray-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Request Your Free SEO Audit</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="website-url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL *
                </label>
                <input
                  type="url"
                  id="website-url"
                  required
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label htmlFor="company-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Email *
                </label>
                <input
                  type="email"
                  id="company-email"
                  required
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Your Company Name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black px-6 py-4 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg"
              >
                Get My FREE SEO Audit Report
              </button>
              <p className="text-sm text-gray-400 text-center">
                No spam. Detailed audit report delivered within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SEO;
