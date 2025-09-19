import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { Search, Target, TrendingUp, BarChart2 } from "lucide-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const SEM = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Search Engine <span className="text-yellow-400">Marketing (SEM)</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Dominate search results with our comprehensive SEM strategies combining SEO and Pay-Per-Click advertising for maximum visibility and conversions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "SEO & GEO (Generative Engine Optimization)",
      description: "Comprehensive SEO strategies optimized for both traditional and AI-powered search engines.",
      icon: <Search className="h-12 w-12 text-yellow-400" />,
      link: "/seo"
    },
    {
      title: "Pay Per Click (Google Ads)",
      description: "Strategic Google Ads campaigns that deliver immediate results and maximum ROI.",
      icon: <Target className="h-12 w-12 text-yellow-400" />,
      link: "/pay-per-click"
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our SEM Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive search engine marketing solutions that combine organic and paid strategies for maximum impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black p-8 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <Link to={service.link}>
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                  Learn More
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    "Complete search visibility coverage",
    "Immediate and long-term results",
    "Data-driven optimization",
    "Maximum ROI across all channels"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our SEM Services?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300">{benefit}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Dominate Search Results?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive SEM strategy that combines the best of SEO and PPC for maximum impact.
          </p>
          <Link to="/contact">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg">
              Get Free SEM Consultation
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SEM;