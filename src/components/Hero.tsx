
import { ArrowRight, Zap } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-black pt-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-8 py-16 md:py-20">
          <ScrollReveal animation="animate-fade-in">
            <img 
              src="/lovable-uploads/d44b1b33-4444-456e-a2d5-dd14ad85c5be.png" 
              alt="LeadZap Marketing" 
              className="max-w-xs md:max-w-sm mb-6"
            />
          </ScrollReveal>
          
          <ScrollReveal animation="animate-fade-in-up" delay={600}>
            <p className="text-xl md:text-2xl mb-8 flex items-center justify-center gap-2">
              We generate leads <Zap size={24} className="text-leadzap-yellow animate-lightning-flash" />
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="animate-fade-in-up" delay={900}>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#framework" className="btn-primary">
                Learn Our Framework
              </a>
              <a href="#contact" className="btn-outline">
                Contact Us
              </a>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="animate-fade-in" delay={1200}>
            <a 
              href="#framework" 
              className="flex items-center mt-16 text-white hover:text-leadzap-yellow transition-all animate-bounce-subtle"
            >
              <div className="flex flex-col items-center">
                <span className="mb-2">Next Page</span>
                <ArrowRight size={24} />
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
