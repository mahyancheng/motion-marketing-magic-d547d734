import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navbar } from "./Index";
import { BarChart2, Target, TrendingUp, Users, Instagram, Facebook, Youtube, Megaphone } from "lucide-react";
import Footer from "./Footer";

const SocialMediaAds = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Platforms />
      <Process />
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
            Maximize ROI with <span className="text-yellow-400">Strategic Social Ads</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Our data-driven approach to paid social media advertising delivers targeted campaigns that convert your audience into customers.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Get a Free Ad Strategy
            </button>
            <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
              View Success Stories
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
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Social Media Marketing" 
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

// Platforms component
const Platforms = () => {
  const platforms = [
    {
      icon: <Facebook className="h-10 w-10" />,
      name: "Facebook & Instagram Ads",
      description: "Target users with precise demographic, interest, and behavioral targeting options."
    },
    {
      icon: <Youtube className="h-10 w-10" />,
      name: "RedNote (Xiaohongshu) & TikTok Ads",
      description: "Reach potential customers through China's leading lifestyle platform and short-form video content."
    },
    {
      icon: <Target className="h-10 w-10" />,
      name: "Retargeting Campaigns",
      description: "Re-engage users who have shown interest in your products or services."
    },
    {
      icon: <Megaphone className="h-10 w-10" />,
      name: "Awareness Campaigns",
      description: "Build brand awareness and reach new potential customers with broad targeting."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platforms & Campaign Types</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We create and manage high-performing campaigns across all major social platforms.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-yellow-400">{platform.icon}</div>
              <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
              <p className="text-gray-300">{platform.description}</p>
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
      title: "Audience Research",
      description: "We identify your ideal customers and analyze their online behaviors and preferences."
    },
    {
      title: "Campaign Strategy",
      description: "We develop a tailored strategy with optimal ad formats, placements, and bidding approaches."
    },
    {
      title: "Creative Development",
      description: "Our team creates compelling ad creative that resonates with your target audience."
    },
    {
      title: "A/B Testing",
      description: "We continuously test variations of your ads to optimize performance and reduce costs."
    },
    {
      title: "Performance Tracking",
      description: "We track key metrics and provide transparent reporting on campaign performance."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Ad Management Process</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A strategic approach to creating, testing, and optimizing social media ad campaigns.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-12 grid md:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl shadow-lg relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold absolute -top-5 left-1/2 transform -translate-x-1/2">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4 text-center">{step.title}</h3>
              <p className="text-gray-300 text-center">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaAds;
