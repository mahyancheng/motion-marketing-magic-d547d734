
import { Zap, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={24} className="text-leadzap-yellow" />
            <h3 className="text-2xl font-bold">LEADZAP MARKETING</h3>
          </div>
          
          <p className="text-gray-400 text-center max-w-md">
            We help businesses grow with data-driven digital marketing strategies that generate measurable results.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-leadzap-yellow transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-leadzap-yellow transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-leadzap-yellow transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-leadzap-yellow transition-colors">
            <Twitter size={24} />
          </a>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} LeadZap Marketing. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-leadzap-yellow">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-leadzap-yellow">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
