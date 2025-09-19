import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from './Footer'; // adjust path if needed
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import DynamicActionBar, { type ActionItem } from "@/components/ui/dynamic-action";
import { Search, Megaphone, CodeXml } from "lucide-react";
import DemoOne from "@/components/ui/testimonials-3d";
import Logo from "@/image/Logo.png"
import Push_Pull from "@/image/Push-Pull-MarketingFrame.png"
import Push_ADS from "@/image/Push-ADS.png"
import Org_Traffic from "@/image/Org-Traffic.png"



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
      <Contact />
      <Footer />
    </div>
  );
};

// Navbar component
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions: ActionItem[] = [
    {
      id: "seo",
      to: "/seo",
      label: "SEO",
      icon: Search,
      content: (
        <div className="flex flex-col items-center">
          <div className="w-full">
            <div className="mx-auto w-[95%] rounded-2xl py-3 px-3 transition duration-300 hover:bg-white/10">
              <div className="flex items-center gap-1">
                <Search className="size-6 text-yellow-400" />
                {/* Label is the actual link */}
                <Link to="/seo" className="font-bold text-white hover:underline">
                  Search Engine Optimization
                </Link>
              </div>
              <div className="mt-1 text-sm text-yellow-400">Information</div>
            </div>
          </div>
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
              <div className="mt-1 text-sm text-yellow-400">Information</div>
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
              <div className="mt-1 text-sm text-yellow-400">Information</div>
            </div>
          </Link>
        </div>
      ),
      dimensions: { width: 500, height: 100 },
    },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="LeadZap Marketing" className="h-8 md:h-10" />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-yellow-400">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black z-50">
                  <div className="p-4">
                    <DynamicActionBar actions={actions} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link to="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link>
        </div>
        <Link to="/contact">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
            Get Started
          </button>
        </Link>
      </div>
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Supercharge Your <span className="text-yellow-400">Digital Marketing</span> Strategy
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            The Full Service Digital Marketing Agency You Need
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            We help businesses grow through data-driven marketing strategies that deliver measurable results. We handle everything about digital marketing and supercharge your company's growth.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            LeadZap Marketing (LeadZap Sdn Bhd) is a Total marketing solution provider and software development company based in Malaysia. We plan, build, launch, and optimize everything under one roof—helping businesses accelerate growth through four core service pillars (include but not limited to):
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 font-bold">🎯</span>
              <div>
                <h3 className="font-semibold text-yellow-400">Search Engine Optimization (SEO)</h3>
                <p className="text-gray-400 text-sm">Comprehensive strategies to boost organic visibility, local and international market expertise, data-driven approach for sustainable growth</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 font-bold">📱</span>
              <div>
                <h3 className="font-semibold text-yellow-400">Social Media Marketing</h3>
                <p className="text-gray-400 text-sm">Strategic paid campaigns across major platforms, ROI-focused ad management and optimization, Push–Pull methodologies for maximum impact</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 font-bold">🤝</span>
              <div>
                <h3 className="font-semibold text-yellow-400">Influencer Marketing (New)</h3>
                <p className="text-gray-400 text-sm">Creator discovery, vetting, and brand matching, campaign strategy, briefs, and contract management, content amplification (whitelisting/Spark Ads)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 font-bold">💻</span>
              <div>
                <h3 className="font-semibold text-yellow-400">Custom Software Development</h3>
                <p className="text-gray-400 text-sm">Tailored business automation systems, scalable solutions for operational efficiency, CRM, ERP, and third-party integrations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Get a Free Consultation
            </button>
            <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-colors">
              View Our Work
            </button>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-2/5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={Logo}
            alt="LeadZap Marketing Logo"
            className="w-full max-w-lg mx-auto"
          />
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
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our proprietary Push-Pull marketing framework creates a connected ecosystem where push data feeds into pull marketing (e.g., retargeting), while pull data is used to improve push campaigns.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src={Push_Pull}
            alt="Push-Pull Marketing Framework"
            className="max-w-4xl w-full mx-auto"
          />
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">PUSH Strategy</h3>
            <p className="text-gray-300 mb-4">
              Our push marketing strategy actively promotes your brand through strategic paid advertising campaigns. Data from push campaigns feeds into pull marketing for retargeting and remarketing.
            </p>
            <ul className="space-y-2 text-gray-300">
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
            className="bg-black p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">PULL Strategy</h3>
            <p className="text-gray-300 mb-4">
              Our pull strategy naturally attracts users through search engines and organic discovery. Pull data is used to improve push campaigns and create highly targeted audiences.
            </p>
            <ul className="space-y-2 text-gray-300">
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
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            To be Malaysia's most trusted turnkey growth partner, compounding client value by fusing creativity and innovation. We believe breakthroughs come from innovative ideas that are tested rigorously, scaled responsibly, and measured transparently.
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
      description: "Comprehensive local SEO Malaysia services, free SEO analysis Malaysia, and SEO Kuala Lumpur optimization"
    },
    {
      title: "Facebook Marketing Malaysia",
      description: "Facebook marketing service Malaysia, Facebook ads agency Malaysia, and Facebook marketing agency Malaysia"
    },
    {
      title: "Google Ads Agency Malaysia",
      description: "Pay per click Malaysia campaigns, SEM agency Malaysia services, and strategic PPC management"
    },
    {
      title: "Social Media Marketing Agency Malaysia",
      description: "Full service digital marketing across Facebook, Instagram, TikTok with ROI-focused strategies"
    },
    {
      title: "Custom Software Solutions",
      description: "Healthcare software, ERP systems, customer help desk platforms, and business automation tools"
    },
    {
      title: "Influencer Marketing",
      description: "Creator partnerships, content amplification, whitelisting/Spark Ads, and performance tracking"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Total Digital Marketing Solutions</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We provide everything needed for a complete digital marketing ecosystem. All services included under one roof for maximum synergy and results.
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
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{solution.title}</h3>
              <p className="text-gray-300">{solution.description}</p>
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
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      name: "Tectone Steel",
      description: "Industrial steel solutions and construction services",
      url: "https://tectonesteel.com",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop"
    },
    {
      name: "AG Kaizen",
      description: "Business consulting and process improvement solutions",
      url: "https://agkaizen.com",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop"
    },
    {
      name: "Puregen",  
      description: "Advanced water purification and treatment systems",
      url: "https://www.puregen.com.my",
      image: "https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=400&h=250&fit=crop"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Design & Development</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Featured client websites showcasing our custom software development and web design capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((website, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={website.image} 
                alt={website.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{website.name}</h3>
                <p className="text-gray-300 mb-4">{website.description}</p>
                <a 
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services component
const Services = () => {
  return (
    <div id="services" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Electrify Your Digital Growth
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* SEM Section */}
          <motion.div
            className="bg-gray-900 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">SEM (Search Engine Marketing)</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">SEO (Search Engine Optimization)</h4>
                <p className="text-gray-300">
                  Get a free SEO analysis - our team delivers electrifying strategies that doesn't just rank, but also increase your revenue numbers
                </p>
                <Link to="/seo">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                    FREE SEO AUDIT
                  </button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Pay Per Click (Google Ads)</h4>
                <p className="text-gray-300">
                  Want to pay your way up to the first page of Google? Our team crafts lightning-precise campaigns that strike with maximum impact and drive costs down
                </p>
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                  FREE AUDIT
                </button>
              </div>
            </div>
          </motion.div>

          {/* Social Media Marketing Section */}
          <motion.div
            className="bg-gray-900 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">Social Media Marketing</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Facebook Marketing</h4>
                <p className="text-gray-300">
                  Need a full-scale team to unleash a storm of results? Partner with us and join our clients who've supercharged their growth to seven-figure heights with lightning-charged Facebook ad campaigns.
                </p>
                <Link to="/contact">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                    Get Free Consultation
                  </button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Social Media Management</h4>
                <p className="text-gray-300">
                  TikTok, Facebook, Instagram—hand it all to us. We'll spark the lightning and ride the thunder, handling everything from content planning to creation so your brand stays electrifying across every platform.
                </p>
                <Link to="/contact">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                    Get Free Consultation
                  </button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Social Media Ads</h4>
                <p className="text-gray-300">
                  Get a crack of power for every buck and watch us electrify your social media ads—awareness, leads, or sales. Whatever you need, we only bring results.
                </p>
                <Link to="/social-media-ads">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
                    Get Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Full Service Digital Marketing - Highlighted */}
          <motion.div
            className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">Full Service Digital Marketing</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Hand us the reins—from social media to your website—and we'll unleash our proprietary Push & Pull Power System, igniting a surge to supercharge your business growth.
            </p>
            <Link to="/contact">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors text-lg">
                Get Free Consultation
              </button>
            </Link>
          </motion.div>

          {/* Custom Software Section */}
          <motion.div
            className="bg-gray-900 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">Custom Software</h3>
            <p className="text-gray-300 mb-6">
              Streamline every process with our lightning-fast custom software solutions, from automated ERP systems to cutting-edge IoT integrations. We'll help you harness the storm of automation so you run your business—not the other way around.
            </p>
            <Link to="/customer-software-demo">
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
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
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our AI-powered solutions.
          </p>
        </motion.div>

        <div className="flex justify-center mt-12">
          <DemoOne />
        </div>
      </div>
    </div>
  );
};

// Contact component
const Contact = () => {
  return (
    <div id="contact" className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to take your digital marketing to the next level? Contact us for a free consultation.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-black rounded-xl p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-gray-800 border-gray-700 rounded-md px-4 py-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black px-4 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>

  );

};


export default Index;
