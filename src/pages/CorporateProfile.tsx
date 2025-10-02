import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Megaphone, CodeXml, BarChart2, Globe, Users, CheckCircle, ArrowRight, Camera, PenTool, Monitor, TrendingUp, Target, Zap, Award, Eye, Clock, MousePointer } from 'lucide-react';
import { Navbar } from './Index';
import Footer from './Footer';
import Logo from "@/image/Logo.png";
import MarketingProcessDiagram from "@/image/marketing-process-hd.png";
import AnalyticsResults from "@/image/analytics-results.jpg";
import MultiplatformAnimation from "@/image/multiplatform-animation.gif";
import PushPullFramework from "@/image/Push-Pull-MarketingFrame.png";
import DoohRoadshowDemo from "@/image/dooh-roadshow-demo.mp4";

const CorporateProfile = () => {
  // SEO setup
  useEffect(() => {
    document.title = 'Corporate Profile - Leadzap Marketing Sdn Bhd Malaysia';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Leadzap Marketing Sdn Bhd corporate profile - Leading digital marketing agency and software development company in Malaysia offering SEM, social media marketing, and custom software solutions.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <CompanyHeader />
        <CompanyOverview />
        <CoreServices />
        <ComprehensiveServices />
        <MarketingProcess />
        <MarketingFramework />
        <PerformanceResults />
        <WhyChooseUs />
        <OutOfHomePortfolio />
        <ContactInformation />
      </main>
      <Footer />
    </div>
  );
};

// Company Header
const CompanyHeader = () => {
  return (
    <header className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <img src={Logo} alt="Leadzap Marketing Sdn Bhd" className="h-16 md:h-20 mx-auto mb-6" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-yellow-400">Leadzap</span> Marketing Sdn Bhd
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Malaysia's Premier Digital Marketing Agency & Software Development Company
          </p>
          <div className="inline-flex items-center bg-yellow-400/10 border border-yellow-400/30 rounded-full px-6 py-3">
            <Globe className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-medium">Established in Malaysia • Serving Global Markets</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

// Company Overview
const CompanyOverview = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Leadzap Marketing Sdn Bhd</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Leadzap Marketing Sdn Bhd is Malaysia's premier one-stop digital marketing solution provider, specializing in comprehensive, data-driven marketing strategies and custom software solutions that accelerate business growth across all digital channels.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              As a total solution provider, we plan, build, launch, and optimize everything under one roof—from SEO and social media marketing to graphic design, web development, and business automation software.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              With proven results of generating over 461K sessions and 75% growth for clients, we transform businesses through innovative strategies and cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/30 p-8 rounded-2xl border border-gray-800 hover:border-yellow-400 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Company Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>One-stop solution provider with 461K+ sessions generated</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>Full-service capabilities: SEO, Social Media, Design, Development</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>Proprietary Push-Pull marketing framework</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>75% average growth rate for client campaigns</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>Malaysia-based with proven international success</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>Custom software development and business automation</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-yellow-400 mb-3">Our Mission</h4>
            <p className="text-gray-300">
              To be the one-stop digital marketing solution provider that accelerates business growth through innovative strategies, creative excellence, and measurable results.
            </p>
          </motion.div>

          <motion.div
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >

            <h4 className="font-semibold text-yellow-400 mb-3">Our Vision</h4>
            <p className="text-gray-300">
              To be Malaysia's most trusted turnkey growth partner, leading the digital transformation of businesses through creativity, innovation, and proven methodologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Core Services
const CoreServices = () => {
  const services = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Search Engine Marketing (SEM)",
      description: "Advanced SEO & GEO optimization targeting both traditional search engines and AI-powered generative search platforms.",
      features: ["SEO Audit Malaysia", "GEO for AI Search", "Technical SEO", "Content Marketing", "Keyword Research", "SERP Optimization"]
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Social Media Marketing",
      description: "Multi-platform social media strategies with proven ROI across Facebook, Instagram, TikTok, and LinkedIn.",
      features: ["Facebook Ads Malaysia", "Instagram Marketing", "TikTok Advertising", "LinkedIn B2B", "Influencer Partnerships", "Community Management"]
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Paid Advertising (PPC)",
      description: "Data-driven pay-per-click campaigns with precision targeting and continuous optimization for maximum ROI.",
      features: ["Google Ads Malaysia", "Facebook Ads", "Display Advertising", "Retargeting Campaigns", "Bid Management", "Conversion Tracking"]
    },
    {
      icon: <CodeXml className="h-8 w-8" />,
      title: "Custom Software Development",
      description: "Tailored software solutions including CRM systems, business automation, and digital transformation tools.",
      features: ["Business Automation", "CRM Integration", "Custom Applications", "API Development", "System Integration", "Digital Solutions"]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital marketing and software development solutions designed to accelerate your business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <ArrowRight className="h-3 w-3 text-yellow-400 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Comprehensive Services
const ComprehensiveServices = () => {
  const additionalServices = [
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Graphic Design",
      description: "Creative visual solutions for branding and marketing materials"
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Web Design & Development",
      description: "Responsive, conversion-optimized websites and applications"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Photo & Video Production",
      description: "Professional content creation for marketing campaigns"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Content Production & Management",
      description: "Strategic content creation and distribution across platforms"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Digital Solutions</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Beyond our core services, we offer a comprehensive suite of creative and technical solutions to support your entire digital ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-yellow-400">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-black rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">Multi-Device & Creative Excellence</h3>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <p className="text-lg text-gray-300 mb-4">
                  Our comprehensive approach ensures seamless user experiences across all devices while delivering creative excellence through:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Multi-device optimization for mobile, tablet, and desktop
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Professional graphic design and visual branding
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    High-quality photo and video production
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Strategic content creation and management
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src={MultiplatformAnimation}
                  alt="Multi-platform digital marketing animation showcasing responsive design across devices"
                  className="max-w-full h-auto rounded-lg shadow-lg bg-white p-4"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Marketing Process
const MarketingProcess = () => {
  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Strategic Marketing Process</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Our systematic approach ensures every campaign is data-driven, results-focused, and continuously optimized for maximum impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={MarketingProcessDiagram}
              alt="Leadzap Marketing Sdn Bhd Process Flow Diagram"
              className="w-full h-auto rounded-lg border border-yellow-400/20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                  <h3 className="text-xl font-bold text-yellow-400">Multi-Channel Approach</h3>
                </div>
                <p className="text-gray-300">Integrate SEO, Paid Ads, and Social Media for comprehensive market coverage.</p>
              </div>

              <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                  <h3 className="text-xl font-bold text-yellow-400">Data Collection & Analysis</h3>
                </div>
                <p className="text-gray-300">Gather comprehensive data from all channels to optimize performance and identify opportunities.</p>
              </div>

              <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                  <h3 className="text-xl font-bold text-yellow-400">Traffic & Lead Generation</h3>
                </div>
                <p className="text-gray-300">Convert optimized campaigns into qualified traffic and high-quality leads through CRM integration.</p>
              </div>

              <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                  <h3 className="text-xl font-bold text-yellow-400">Continuous Optimization</h3>
                </div>
                <p className="text-gray-300">Maintain feedback loop to client, ensuring ongoing improvement and measurable results.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Marketing Framework
const MarketingFramework = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Proprietary Push-Pull Framework</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Our innovative marketing framework creates a connected ecosystem where push data feeds into pull marketing for retargeting, while pull data improves push campaigns—maximizing ROI across all channels.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={PushPullFramework}
            alt="Push-Pull Marketing Framework showing social media platforms for push strategy and search engines for pull strategy"
            className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl h-auto rounded-lg bg-black p-6"
          />

        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
                <Megaphone className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400">PUSH Strategy</h3>
            </div>
            <p className="text-gray-300 mb-4 text-center">
              Active brand promotion through strategic paid advertising campaigns that feed data into pull marketing.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>Facebook, Instagram & TikTok advertising</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>Influencer marketing campaigns</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>Retargeting with pull data insights</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
                <Search className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400">PULL Strategy</h3>
            </div>
            <p className="text-gray-300 mb-4 text-center">
              Natural audience attraction through search engines and organic discovery that enhances push campaigns.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>SEO audit Malaysia & GEO for AI search</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>Content marketing & authority building</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">•</span>
                <span>Data feeds into push advertising</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Performance Results
const PerformanceResults = () => {
  const metrics = [
    { icon: <Eye className="h-8 w-8" />, number: "461K", label: "Total Sessions", growth: "+75%" },
    { icon: <Users className="h-8 w-8" />, number: "333K", label: "Total Users", growth: "+63%" },
    { icon: <TrendingUp className="h-8 w-8" />, number: "1.07M", label: "Page Views", growth: "+89%" },
    { icon: <MousePointer className="h-8 w-8" />, number: "2.96M", label: "Events Tracked", growth: "+73%" },
    { icon: <Clock className="h-8 w-8" />, number: "373d 5h", label: "User Engagement", growth: "+60%" },
    { icon: <Target className="h-8 w-8" />, number: "367K", label: "Organic Sessions", growth: "Leading Source" }
  ];

  return (
    <section className="py-6 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Performance Results</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Real results from our digital marketing campaigns - showcasing the power of our integrated approach and data-driven strategies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={AnalyticsResults}
              alt="Google Analytics Results showing 461K sessions with 75% growth"
              className="w-full h-auto rounded-lg border border-yellow-400/20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/50 p-8 rounded-xl border border-yellow-400/30">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Single Client Case Study</h3>
              <p className="text-sm text-gray-400 mb-6 italic">
                *Results shown are from one individual client campaign, demonstrating the effectiveness of our integrated approach.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Growth Achievement</span>
                  <span className="text-yellow-400 font-bold">+75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Organic Traffic Share</span>
                  <span className="text-yellow-400 font-bold">79.6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Campaign Duration</span>
                  <span className="text-yellow-400 font-bold">6+ Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Engagement</span>
                  <span className="text-yellow-400 font-bold">373+ Days</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                <p className="text-sm text-yellow-300">
                  <strong>Client Industry:</strong> Legal Services - Red Kite Solicitors
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center hover:border-yellow-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 mb-3 flex justify-center">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.number}</div>
              <div className="text-sm text-gray-300 mb-2">{metric.label}</div>
              <div className="text-xs text-green-400 font-medium">{metric.growth}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us
const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Total Solution Provider",
      description: "Everything under one roof—from strategy to execution, marketing to software development."
    },
    {
      title: "Data-Driven Approach",
      description: "All strategies backed by rigorous testing, transparent measurement, and continuous optimization."
    },
    {
      title: "Malaysia Expertise",
      description: "Deep understanding of Malaysian market dynamics with local SEO and cultural insights."
    },
    {
      title: "Custom Technology",
      description: "Proprietary software solutions tailored to your specific business workflows and requirements."
    },
    {
      title: "Proven Framework",
      description: "Our Push-Pull methodology creates synergies between paid and organic marketing channels."
    },
    {
      title: "Scalable Solutions",
      description: "From startups to enterprises—solutions that grow with your business needs."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Leadzap Marketing Sdn Bhd</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We believe breakthroughs come from innovative ideas that are tested rigorously, scaled responsibly, and measured transparently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Out of Home Portfolio
const OutOfHomePortfolio = () => {
  const portfolioItems = [
    {
      title: "OOH (Out-of-Home) Advertising",
      description: "Strategic outdoor advertising campaigns that capture attention and drive brand awareness across Malaysia's key locations.",
      features: ["Billboard Campaigns", "Transit Advertising", "Street Furniture", "Digital Displays"]
    },
    {
      title: "DOOH (Digital Out-of-Home)",
      description: "Dynamic digital advertising solutions that deliver targeted, real-time content to engage audiences in high-traffic areas.",
      features: ["LED Screens", "Interactive Displays", "Real-time Content", "Data-Driven Targeting"]
    },
    {
      title: "Road Shows & Booth Exhibitions",
      description: "Complete event marketing solutions from concept to execution, creating memorable brand experiences that drive engagement.",
      features: ["Event Planning", "Booth Design", "Interactive Experiences", "Lead Generation"]
    }
  ];

  return (
    <section className="py-16 lg:py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Out-of-Home & Event Marketing</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive offline marketing solutions that create powerful brand presence and memorable customer experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{item.title}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">DOOH Road Show & Booth Experience</h3>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <p className="text-lg text-gray-300 mb-4">
                  Experience our cutting-edge Digital Out-of-Home advertising solutions that bring brands to life through:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Interactive digital displays and touch screens
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Dynamic content that adapts to audience engagement
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Professional booth setups for events and roadshows
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Real-time analytics and audience insights
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div
                  className="inline-block rounded-3xl overflow-hidden shadow-lg"
                  style={{ width: 390, height: 312, lineHeight: 0 }}
                >
                  <video
                    className="block"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: 'scale(1.0)',
                      transformOrigin: 'center',
                      objectFit: 'cover'
                    }}
                  >
                    <source src={DoohRoadshowDemo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Information
const ContactInformation = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to accelerate your business growth? Let's discuss how our integrated marketing and technology solutions can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-black p-8 rounded-xl border border-gray-800 text-center hover:border-yellow-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Globe className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Location</h3>
            <p className="text-gray-300">Malaysia</p>
            <p className="text-sm text-gray-400">Serving Global Markets</p>
          </motion.div>

          <motion.div
            className="bg-black p-8 rounded-xl border border-gray-800 text-center hover:border-yellow-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Email</h3>
            <p className="text-gray-300">info@leadzap.com</p>
            <p className="text-sm text-gray-400">Business Inquiries</p>
          </motion.div>

          <motion.div
            className="bg-black p-8 rounded-xl border border-gray-800 text-center hover:border-yellow-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CheckCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Free Consultation</h3>
            <p className="text-gray-300">Available Now</p>
            <p className="text-sm text-gray-400">Strategy & Planning</p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="/contact"
            className="inline-flex items-center bg-yellow-400 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-300 transition-colors text-lg"
          >
            Start Your Growth Journey
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CorporateProfile;