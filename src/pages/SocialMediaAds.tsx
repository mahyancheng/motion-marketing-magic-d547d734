import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Index";
import { BarChart2, Target, TrendingUp, Users, Instagram, Facebook, Youtube, Megaphone, CheckCircle } from "lucide-react";
import Footer from "./Footer";
import BlogSection from "@/components/BlogSection";
import { Link } from "react-router-dom";

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
            <span className="text-yellow-400">Social Media Marketing Malaysia</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Social Media Marketing Agency Malaysia | Facebook Marketing Malaysia
          </h2>
          <p className="text-md md:text-xl text-gray-300 mb-8">
            Leading social media agency marketing in Malaysia. Our social media marketing agency delivers Facebook marketing Malaysia campaigns that convert audiences into customers.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              <Link to="/contact">

                Get a Free Ad Strategy
              </Link>

            </button>
            <Link to="/blog">
              <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
                View Success Stories
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
    <div className="py-10 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Marketing Platforms</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Social media marketing packages Malaysia covering Facebook, Instagram, TikTok and more. As a social media marketing agency Malaysia leader, we maximize your ROI.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mt-6 md:mt-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="
        bg-black 
        p-2 sm:p-3 md:p-5 
        rounded-xl 
        shadow-lg hover:shadow-xl 
        border border-gray-800 hover:border-yellow-400 
        transition-shadow transition-colors
        flex flex-col h-full
      "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="mb-2 md:mb-4 text-yellow-400 flex justify-center text-2xl md:text-3xl">
                {platform.icon}
              </div>

              {/* 标题 */}
              <h3 className="text-[9px] sm:text-xs md:text-lg font-bold mb-1 md:mb-3 text-center leading-snug">
                {platform.name}
              </h3>

              {/* 描述 */}
              <p className="text-[9px] text sm:text-xs md:text-sm text-gray-300 mb-2 md:mb-4 text-center">
                {platform.description}
              </p>

              {/* 功能列表 */}
              <ul className="space-y-1 md:space-y-2 mt-auto">
                {platform.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[9px] sm:text-xs md:text-sm text-gray-300"
                  >
                    <span className="text-yellow-400 mr-1 md:mr-2 text-xs md:text-sm">
                      ✓
                    </span>
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
    <div className="py-12">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-yellow-400 flex justify-center">{campaign.icon}</div>
              <h3 className="text-xl md:text-xl font-bold mb-3">{campaign.name}</h3>
              <p className="text-sm md:text-md text-gray-300">{campaign.description}</p>
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
    <div className="py-10 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Ad Management Process</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
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
              className="bg-gray-900/50 p-6 rounded-xl shadow-lg relative border border-gray-800 hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold absolute -top-5 left-1/2 transform -translate-x-1/2">
                {index + 1}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 mt-4 text-center">{step.title}</h3>
              <p className="text-sm md:text-md text-gray-300 text-center">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Call to Action component
const CallToAction = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY0MDYzMzA0MzA1MjZmNTUzNTUxMzQi_pc",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      setSubmitted(true);
      // 清空表单
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending to Pabbly:", error);
    }

    // 3 秒后关闭成功提示
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const serviceOptions = [
    { value: "", label: "Select a Service" },
    { value: "seo", label: "SEO" },
    { value: "social", label: "Social Media Ads" },
    { value: "order", label: "Order Management System" },
    { value: "other", label: "Other" },
  ];

  const [isServicePopoutOpen, setIsServicePopoutOpen] = useState(false);

  return (
    <div className="p-12 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your FREE Social Media Ads Consultation!</h2>
            <p className="text-md md:text-md text-gray-300 mb-6">
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
          <div className="py-6 lg:py-0 bg-gray-900" id="contact">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
              </motion.div>

              <motion.div
                className="max-w-2xl mx-auto bg-black rounded-xl p-4 md:p-6 lg:p-8 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {submitted ? (
                  <motion.div
                    className="bg-green-800/30 border border-green-600 rounded-lg p-5 md:p-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-500 mx-auto mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:ring-yellow-400 focus:border-yellow-400"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:ring-yellow-400 focus:border-yellow-400"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:ring-yellow-400 focus:border-yellow-400"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                      >
                        Service Interested In
                      </label>

                      {/* 手机版：popout 选择器 */}
                      <div className="md:hidden">
                        <button
                          type="button"
                          onClick={() => setIsServicePopoutOpen(true)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white flex items-center justify-between focus:ring-yellow-400 focus:border-yellow-400"
                        >
                          <span>
                            {
                              serviceOptions.find((opt) => opt.value === formData.service)?.label ||
                              "Select a Service"
                            }
                          </span>
                          <span className="text-gray-400 text-xs">Tap to choose</span>
                        </button>

                        {isServicePopoutOpen && (
                          <div className="fixed inset-0 z-50 flex items-end justify-center">
                            {/* 背景遮罩 */}
                            <div
                              className="absolute inset-0 bg-black/50"
                              onClick={() => setIsServicePopoutOpen(false)}
                            />

                            {/* Bottom Sheet */}
                            <div className="relative w-full max-w-md bg-gray-900 rounded-t-2xl p-4 pb-6 border-t border-gray-700">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-semibold text-gray-100">
                                  Select a Service
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => setIsServicePopoutOpen(false)}
                                  className="text-gray-400 text-xs"
                                >
                                  Close
                                </button>
                              </div>

                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {serviceOptions.map((opt) => (
                                  <button
                                    key={opt.value || "none"}
                                    type="button"
                                    onClick={() => {
                                      setFormData((prev) => ({ ...prev, service: opt.value }));
                                      setIsServicePopoutOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm border ${formData.service === opt.value
                                      ? "bg-yellow-400 text-black border-yellow-400"
                                      : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                                      }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 桌面版：保留原本的 select */}
                      <div className="hidden md:block">
                        <select
                          id="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-sm md:text-base text-white focus:ring-yellow-400 focus:border-yellow-400"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt.value || "none"} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>


                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs md:text-sm font-medium text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:ring-yellow-400 focus:border-yellow-400"
                        placeholder="Tell us about your project or inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-black px-4 py-2 md:py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors text-sm md:text-base"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAds;
