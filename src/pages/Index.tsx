import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer"; // adjust path if needed
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import DynamicActionBar, { type ActionItem } from "@/components/ui/dynamic-action";
import { Search, Megaphone, CodeXml, ArrowUpRight, Phone, Mail, CheckCircle, X, Menu } from "lucide-react";
import DemoOne from "@/components/ui/testimonials-3d";
import Logo from "@/image/Logo.png";
import Push_Pull from "@/image/Push-Pull-MarketingFrame.png";
import Push_ADS from "@/image/Push-ADS.png"; // unused but keep if later used
import Org_Traffic from "@/image/Org-Traffic.png"; // unused but keep if later used
import Workconnect from "@/image/workconnect.png";
import Tectone from "@/image/tectone.jpg";
import AGKaizen from "@/image/agkaizen.jpg";
import Puregen from "@/image/puregen.png";

export const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Framework />
      <Vision />
      <TotalDigitalSolutions />
      <WebsiteDesign />
      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

// 在你的 Navbar 组件上方或单独文件中
const SideMenu = ({ isMenuOpen, toggleMenu, actions }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 辅助函数：检查路径是否是当前激活的链接
  // 检查链接的 'to' 是否与当前路径完全匹配
  const isActive = (to) => {
    // 处理根路径 '/'
    if (to === "/" && currentPath === "/") {
      return true;
    }
    // 对于其他路径，精确匹配
    return currentPath === to;
  };
  return (
    <>
      {/* Overlay - 点击覆盖层关闭菜单 */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleMenu}
      ></div>

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 pt-6 flex justify-between items-center border-b border-gray-800">
          <span className="text-white font-bold text-lg">Navigation</span>
          <button onClick={toggleMenu} className="text-white hover:text-yellow-400 p-1">
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2 text-white">
          {/* 1. Home 链接高亮逻辑 */}
          <Link
            to="/"
            onClick={toggleMenu}
            // 动态类名：如果 isActive("/"), 则 text-yellow-400, 否则 text-white
            className={`py-2 border-b border-gray-900 transition-colors ${isActive("/") ? "text-yellow-400 font-bold" : "hover:text-yellow-400 text-white"
              }`}
          >
            Home
          </Link>

          {/* 2. Services 分组下的链接高亮逻辑 */}
          <div className="pt-2">
            <h4 className="font-bold text-gary-900 mb-2">Services</h4>

            <div className="flex flex-col space-y-2 pl-3">
              {actions.map((action) => (
                <Link
                  key={action.id}
                  to={action.to}
                  onClick={toggleMenu}
                  // 动态类名：如果 isActive(action.to), 则 text-yellow-400, 否则 text-white/gray-300
                  className={`py-1 text-sm transition-colors ${isActive(action.to)
                    ? "text-yellow-400 font-medium"
                    : "hover:text-yellow-400 text-gray-300" // 使用 text-gray-300 让它更明显地是子项
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {action.icon && <action.icon className="size-4" />}
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. 其他页面链接高亮逻辑 */}
          <Link
            to="/blog"
            onClick={toggleMenu}
            className={`py-2 border-t border-b border-gray-900 transition-colors ${isActive("/blog") ? "text-yellow-400 font-bold" : "hover:text-yellow-400 text-white"
              }`}
          >
            Blog
          </Link>
          <Link
            to="/corporate-profile"
            onClick={toggleMenu}
            className={`py-2 border-b border-gray-900 transition-colors ${isActive("/corporate-profile") ? "text-yellow-400 font-bold" : "hover:text-yellow-400 text-white"
              }`}
          >
            Company Profile
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className={`py-2 border-b border-gray-900 transition-colors ${isActive("/contact") ? "text-yellow-400 font-bold" : "hover:text-yellow-400 text-white"
              }`}
          >
            Contact Us
          </Link>

          <div className="mt-auto pt-4 border-t border-gray-800">
            <Link to="/contact" onClick={toggleMenu}>
              <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

// Navbar component
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions: ActionItem[] = [
    {
      id: "sem",
      to: "/sem",
      label: "SEM",
      icon: Search,
      content: (
        <div className="flex flex-col items-center">
          <Link to="/sem" className="w-full">
            <div className="mx-auto w-[95%] rounded-2xl py-3 px-3 transition duration-300 hover:bg-white/10">
              <div className="flex items-center gap-1">
                <Megaphone className="size-6 text-yellow-400" />
                <span className="font-bold text-white">Social Media Paid Ads</span>
              </div>
              <div className="mt-1 text-sm text-yellow-400">
                Data-driven SEM that boosts visibility and leads through SEO, GEO, and Google Ads across traditional and
                AI search platforms.
              </div>
            </div>
          </Link>
        </div>
      ),
      dimensions: { width: 500, height: 100 },
    },
    {
      id: "ads",
      to: "/social-media-ads",
      label: "Social Media Marketing",
      icon: Megaphone,
      content: (
        <div className="flex flex-col items-center">
          <Link to="/social-media-ads" className="w-full">
            <div className="mx-auto w-[95%] rounded-2xl py-3 px-3 transition duration-300 hover:bg-white/10">
              <div className="flex items-center gap-1">
                <Megaphone className="size-6 text-yellow-400" />
                <span className="font-bold text-white">Social Media Paid Ads</span>
              </div>
              <div className="mt-1 text-sm text-yellow-400">
                Data-driven social media ads that turn audiences into customers — using Facebook, Instagram, TikTok, and
                more to drive leads, sales, and in-store traffic.
              </div>
            </div>
          </Link>
        </div>
      ),
      dimensions: { width: 500, height: 100 },
    },
    {
      id: "software",
      to: "/customer-software-demo",
      label: "Custom Software",
      icon: CodeXml,
      content: (
        <div className="flex flex-col items-center">
          <Link to="/customer-software-demo" className="w-full">
            <div className="mx-auto w-[95%] rounded-2xl py-3 px-3 transition duration-300 hover:bg-white/10">
              <div className="flex items-center gap-1">
                <CodeXml className="size-6 text-yellow-400" />
                <span className="font-bold text-white">Custom Software Solution</span>
              </div>
              <div className="mt-1 text-sm text-yellow-400">
                Custom software development for Malaysian businesses — we design, build, and maintain tailored systems
                (CRM, ERP, automation, IoT, healthcare) to streamline operations and drive growth.
              </div>
            </div>
          </Link>
        </div>
      ),
      dimensions: { width: 500, height: 100 },
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 py-2" : "py-4"
        }`}
    >
      <div className="relative container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo - 左侧对齐 */}
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="LeadZap Marketing" className="h-8 md:h-10" />
          </Link>
        </div>

        {/* Desktop Nav - 居中 */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-yellow-400">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black z-50">
                  <div className="p-4">
                    <DynamicActionBar actions={actions} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/blog" className="hover:text-yellow-400 transition-colors">
            Blog
          </Link>
          <Link to="/corporate-profile" className="hover:text-yellow-400 transition-colors">
            Company Profile
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Desktop Get Started - 右侧对齐 */}
        <div className="hidden md:flex ml-auto">
          <Link to="/contact" onClick={toggleMenu}>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile: Menu Button - 右边 */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-yellow-400 p-2 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <SideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} actions={actions} />
    </nav>
  );
};

// Hero component
const Hero = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center">
        <motion.div
          className="lg:w-3/5 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Supercharge Your <span className="text-yellow-400">Digital Marketing</span> Strategy
          </h1>
          <h2 className="text-xl md:text-3xl font-bold mb-6">The Full Service Digital Marketing Agency You Need</h2>
          <p className="text-md md:text-xl text-gray-300 mb-6">
            We help businesses grow through data-driven marketing strategies that deliver measurable results. We handle
            everything about digital marketing and supercharge your company's growth.
          </p>
          <p className="text-md md:text-xl text-gray-300 mb-6">
            LeadZap Marketing (LeadZap Sdn Bhd) is a Total marketing solution provider and software development company
            based in Malaysia. We plan, build, launch, and optimize everything under one roof—helping businesses
            accelerate growth through four core service pillars (include but not limited to):
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                Get a Free Consultation
              </button>
            </Link>
            <Link to="/customer-software-demo">
              <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
                View Our Work
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-3/4 lg:w-2/5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={Logo} alt="LeadZap Marketing Logo" className="w-full max-w-lg mx-auto" />
        </motion.div>
      </div>
    </div>
  );
};

// Framework component
const Framework = () => {
  return (
    <div id="framework" className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Marketing Framework</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Our proprietary Push-Pull marketing framework creates a connected ecosystem where push data feeds into pull
            marketing (e.g., retargeting), while pull data is used to improve push campaigns.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img src={Push_Pull} alt="Push-Pull Marketing Framework" className="max-w-4xl w-full mx-auto" />
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:gap-6">
          <motion.div
            className="bg-black p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors flex flex-col h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3 md:mb-4 text-yellow-400">
              PUSH Strategy
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 md:mb-4">
              Our push marketing strategy actively promotes your brand through strategic paid advertising campaigns.
              Data from push campaigns feeds into pull marketing for retargeting and remarketing.
            </p>
            <ul className="mt-auto space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Facebook, Instagram & TikTok advertising</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Influencer marketing campaigns</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Retargeting with pull data insights</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-black p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 hover:border-yellow-400 transition-colors flex flex-col h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3 md:mb-4 text-yellow-400">
              PULL Strategy
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 md:mb-4">
              Our pull strategy naturally attracts users through search engines and organic discovery. Pull data is used
              to improve push campaigns and create highly targeted audiences.
            </p>
            <ul className="mt-auto space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>SEO audit Malaysia & local optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Content marketing & authority building</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Data feeds into push advertising</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Vision component
const Vision = () => {
  return (
    <div className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed">
            To be Malaysia's most trusted turnkey growth partner, compounding client value by fusing creativity and
            innovation. We believe breakthroughs come from innovative ideas that are tested rigorously, scaled
            responsibly, and measured transparently.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Total Digital Solutions component
const TotalDigitalSolutions = () => {
  const solutions = [
    {
      title: "SEO Audit Malaysia",
      description: "Comprehensive local SEO Malaysia services, free SEO analysis Malaysia, and SEO Kuala Lumpur optimization",
    },
    {
      title: "Facebook Marketing Malaysia",
      description: "Facebook marketing service Malaysia, Facebook ads agency Malaysia, and Facebook marketing agency Malaysia",
    },
    {
      title: "Google Ads Agency Malaysia",
      description: "Pay per click Malaysia campaigns, SEM agency Malaysia services, and strategic PPC management",
    },
    {
      title: "Social Media Marketing Agency Malaysia",
      description: "Full service digital marketing across Facebook, Instagram, TikTok with ROI-focused strategies",
    },
    {
      title: "Custom Software Solutions",
      description: "Healthcare software, ERP systems, customer help desk platforms, and business automation tools",
    },
    {
      title: "Influencer Marketing",
      description: "Creator partnerships, content amplification, whitelisting/Spark Ads, and performance tracking",
    },
  ];

  return (
    <div className="py-10 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Total Digital Marketing Solutions</h2>
          <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
            We provide everything needed for a complete digital marketing ecosystem. All services included under one roof
            for maximum synergy and results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 text-yellow-400">{solution.title}</h3>
              <p className="text-gray-300 text-sm md:text-md">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Website Design component
const WebsiteDesign = () => {
  const websites = [
    {
      name: "WorkConnect",
      description: "Professional networking and career development platform",
      url: "https://workconnect.com.my",
      image: Workconnect,
    },
    {
      name: "Tectone Steel",
      description: "Industrial steel solutions and construction services",
      url: "https://tectonesteel.com",
      image: Tectone,
    },
    {
      name: "AG Kaizen",
      description: "Business consulting and process improvement solutions",
      url: "https://agkaizen.com",
      image: AGKaizen,
    },
    {
      name: "Puregen",
      description: "Advanced water purification and treatment systems",
      url: "https://www.puregen.com.my",
      image: Puregen,
    },
  ];

  return (
    <div className="py-10 lg:py-24 ">
      <div className="container mx-auto px-4 md:px-3 ">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Design & Development</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Featured client websites showcasing our custom software development and web design capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((website, index) => (
            <div key={index} className="group rounded-2xl p-2 -m-2">
              <motion.a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-transparent transition-colors duration-200 bg-gray-900 shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400/40 group-hover:border-yellow-400"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={website.image} alt={website.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    {website.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {website.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Visit Website
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services component - Bento Grid Design
const Services = () => {
  return (
    <div id="services" className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital marketing solutions to supercharge your business growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* SEM */}
          <motion.div
            className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors group h-full min-h-[240px] md:min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl">🎯</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-yellow-400">
                Search Engine Marketing (SEM)
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                Get a free SEO analysis — strategies that not only rank, but also grow revenue. Includes SEO & GEO
                optimization.
              </p>
            </div>
            <Link to="/sem" className="mt-auto">
              <button className="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors w-full text-sm md:text-base">
                FREE SEO AUDIT
              </button>
            </Link>
          </motion.div>

          {/* Social Media Marketing */}
          <motion.div
            className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors group h-full min-h-[240px] md:min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl">📱</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-yellow-400">
                Social Media Marketing
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                TikTok, Facebook, Instagram management & ads with electrifying content.
              </p>
            </div>
            <Link to="/social-media-ads" className="mt-auto">
              <button className="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors w-full text-sm md:text-base">
                Get Consultation
              </button>
            </Link>
          </motion.div>

          {/* Custom Software */}
          <motion.div
            className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors group h-full min-h-[240px] md:min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl">💻</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-yellow-400">
                Custom Software
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                Lightning-fast ERP & IoT solutions.
              </p>
            </div>
            <Link to="/customer-software-demo" className="mt-auto">
              <button className="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors w-full text-sm md:text-base">
                Get Consultation
              </button>
            </Link>
          </motion.div>

          {/* Full Service Digital Marketing */}
          <motion.div
            className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors group h-full min-h-[240px] md:min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl">⚡</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-yellow-400">
                Full Service Digital Marketing
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                From social to web — our Push & Pull Power System to supercharge growth.
              </p>
            </div>
            <Link to="/contact" className="mt-auto">
              <button className="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors w-full text-sm md:text-base">
                Get Free Consultation
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Testimonials component
const Testimonials = () => {
  return (
    <div id="testimonials" className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our AI-powered solutions.
          </p>
        </motion.div>

        <div className="flex justify-center mt-10">
          <div
            className="
                        w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl
                        px-2 sm:px-0
                        transform
                        scale-90 sm:scale-95 md:scale-100
                        origin-top
                      "
          >
            <DemoOne />
          </div>
        </div>

      </div>
    </div>
  );
};

// ✅ Contact component – 自带状态 + Pabbly 集成
const ContactForm = () => {
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
    <div className="py-6 lg:py-24 bg-gray-900" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xs md:text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to take your digital marketing to the next level? Contact us for a free consultation.
          </p>
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
  );
};

export default Index;
