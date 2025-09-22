import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { BarChart2, Target, TrendingUp, Users, Instagram, Facebook, Youtube, Megaphone } from "lucide-react";
import Footer from "./Footer";
import BlogSection from "@/components/BlogSection";

const SocialMediaAds = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Platforms />
      <CampaignTypes />
      <Process />
      <BlogSection 
        tags={['social media marketing', 'social media ads', 'facebook ads', 'instagram marketing', 'tiktok advertising', 'paid social']}
        title="Social Media Marketing Insights"
        subtitle="Discover proven strategies for social media advertising and organic growth"
      />
      <CallToAction />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Social Media Ads That Generates Revenue
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Our data-driven social media advertising strikes like a thunderbolt—launching hyper-targeted campaigns on Facebook, Instagram, and TikTok that turn scrolling audiences into paying customers. Get ready for conversions that crackle with energy and results that roar like thunder.
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
      icon: <Facebook className="h-12 w-12" />,
      name: "Facebook & Instagram",
      description: "Meta's powerful advertising ecosystem with advanced demographic and interest targeting capabilities.",
      features: ["Precise audience targeting", "Visual storytelling", "Shopping integration", "Messenger automation"]
    },
    {
      icon: <Youtube className="h-12 w-12" />,
      name: "TikTok Advertising",
      description: "Reach younger demographics through engaging short-form video content and trending challenges.",
      features: ["Viral content potential", "Creative video formats", "Hashtag challenges", "Influencer collaborations"]
    },
    {
      icon: <Instagram className="h-12 w-12" />,
      name: "RedNote (Xiaohongshu)",
      description: "China's leading lifestyle platform for authentic product discovery and recommendations.",
      features: ["Lifestyle targeting", "Product discovery", "KOL partnerships", "Community engagement"]
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Platforms</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Facebook marketing service Malaysia across all major social platforms. Our Facebook marketing agency Malaysia expertise covers every major platform.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="bg-black p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 text-yellow-400 flex justify-center">{platform.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center">{platform.name}</h3>
              <p className="text-gray-300 mb-6 text-center">{platform.description}</p>
              <ul className="space-y-2">
                {platform.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Campaign Types component
const CampaignTypes = () => {
  const campaigns = [
    {
      icon: <Megaphone className="h-10 w-10" />,
      name: "Brand Awareness",
      description: "Build brand awareness and reach new potential customers with continuos refined targeting."
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      name: "Lead Generation",
      description: "Generate high quality leads for your sales team to convert them into revenue numbers"
    },
    {
      icon: <Users className="h-10 w-10" />,
      name: "Foot Traffic",
      description: "Want people to visit your physical store? We design online campaigns that lead people to your store"
    },
    {
      icon: <Target className="h-10 w-10" />,
      name: "Online Sales",
      description: "Want to see gren in your ecommerce revenue? We have implemented retargeting strategies to bring interested customers back to your site"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Campaign Types</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We create campaigns based on your business goals -
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-yellow-400 flex justify-center">{campaign.icon}</div>
              <h3 className="text-xl font-bold mb-3">{campaign.name}</h3>
              <p className="text-gray-300">{campaign.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your FREE Social Media Ads Consultation!</h2>
            <p className="text-lg text-gray-300 mb-6">
              Discover how our social media advertising can supercharge your business growth. Get a comprehensive strategy session delivered to your inbox.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Complete social media audit
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Campaign strategy recommendations
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                Competitor analysis report
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-3">✓</span>
                ROI improvement opportunities
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
            <h3 className="text-2xl font-bold mb-6 text-center">Get Free Consultation</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company-name"
                  required
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label htmlFor="business-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  id="business-email"
                  required
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="monthly-budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Ad Budget
                </label>
                <input
                  type="text"
                  id="monthly-budget"
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="RM5,000"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black px-6 py-4 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg"
              >
                Get Free Consultation
              </button>
              <p className="text-sm text-gray-400 text-center">
                No spam. Strategy session delivered within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAds;
