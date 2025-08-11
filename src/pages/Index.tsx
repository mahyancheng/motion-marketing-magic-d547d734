import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from './Footer'; // adjust path if needed
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";

export const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Framework />
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src="/lovable-uploads/cdaaf38a-f7c3-452d-b62b-d48316225e45.png" alt="LeadZap Marketing" className="h-8 md:h-10" />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-yellow-400">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black">
                  <div className="grid gap-1 p-2 w-56 text-white">
                    <Link to="/seo" className="block px-3 py-2 rounded hover:bg-white/10">SEO</Link>
                    <Link to="/social-media-ads" className="block px-3 py-2 rounded hover:bg-white/10">Social Media Paid Ads</Link>
                    <Link to="/customer-software-demo" className="block px-3 py-2 rounded hover:bg-white/10">Custom Software solution</Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
          className="lg:w-1/2 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Supercharge Your <span className="text-yellow-400">Digital Marketing</span> Strategy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            We help businesses grow through data-driven marketing strategies that deliver measurable results.
          </p>
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
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src="/lovable-uploads/cdaaf38a-f7c3-452d-b62b-d48316225e45.png" 
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
            Our proprietary Push-Pull marketing framework delivers results by creating a seamless customer journey.
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
            src="/lovable-uploads/3a2eb97b-644e-417a-88db-c0bf8d2e32a8.png" 
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
              Our push marketing strategy actively promotes your brand to your target audience through strategic paid advertising campaigns on social platforms.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Strategic ad placement across platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Targeted audience segmentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Optimized ad spend for maximum ROI</span>
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
              Our pull strategy focuses on creating valuable content that naturally attracts users through search engines and organic discovery.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>SEO-optimized content strategy</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Technical website optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>Authority building through quality content</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Services component
const Services = () => {
  const services = [
    {
      title: "Push Advertising",
      description: "Strategic paid advertising across social media platforms to reach your target audience directly.",
      image: "/lovable-uploads/0187c1c5-f772-4140-8e30-6a1c4a91a51e.png"
    },
    {
      title: "Organic Traffic",
      description: "SEO-optimized content and technical optimization to drive sustainable organic traffic growth.",
      image: "/lovable-uploads/587b4a19-4c03-47a5-ac99-74983c6e259a.png"
    }
  ];

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
            Comprehensive digital marketing solutions tailored to your business goals.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={service.image} alt={service.title} className="w-full h-auto" />
              </motion.div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
                <button className="mt-6 bg-transparent hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400 px-4 py-2 rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      content: "LeadZap transformed our digital strategy. Their Push-Pull approach helped us increase our qualified leads by 230% in just three months. We couldn't be happier with the results!",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Michael Chen",
      position: "Marketing Director, GrowFast",
      content: "Working with LeadZap has been a game-changer for our business. Their data-driven approach to marketing delivers real results that we can measure and scale.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emma Rodriguez",
      position: "Founder, BrightIdea Solutions",
      content: "After struggling with inconsistent lead generation, LeadZap's framework completely revolutionized how we approach our marketing. Our conversion rates are up 45% and still climbing!",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

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
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 md:p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  <p className="text-yellow-400">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">{testimonial.content}</p>
              <div className="mt-4 flex">
                <span className="text-yellow-400">★★★★★</span>
              </div>
            </motion.div>
          ))}
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
