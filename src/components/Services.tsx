
import { ArrowRight, Zap, DollarSign } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const Services = () => {
  return (
    <section id="services" className="bg-black section-padding">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-leadzap-yellow heading-lg mb-2">OUR</h2>
            <h3 className="text-white heading-xl mb-4">SERVICES</h3>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <DollarSign size={20} className="text-green-500" />
              <p className="italic text-gray-400">Time for our sales-y pitch</p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid gap-12">
          {/* Push Ads */}
          <ScrollReveal animation="animate-fade-in-up" delay={300}>
            <div className="card-highlight">
              <img 
                src="/lovable-uploads/df697b63-e9af-4d6b-a92d-7a5d70c84dd9.png" 
                alt="Push Ads Services" 
                className="max-w-full mx-auto"
              />
            </div>
          </ScrollReveal>
          
          {/* Organic Traffic */}
          <ScrollReveal animation="animate-fade-in-up" delay={600}>
            <div className="card-highlight">
              <img 
                src="/lovable-uploads/5bd1ef16-936d-40e1-8928-79c1c172e553.png" 
                alt="Organic Traffic Services" 
                className="max-w-full mx-auto"
              />
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal animation="animate-fade-in-up" delay={900}>
          <div className="card-highlight mt-12">
            <h3 className="text-leadzap-yellow text-3xl md:text-4xl font-bold mb-6">OTHER SERVICES</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors text-center">
                <h4 className="font-bold mb-2">Web Design</h4>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors text-center">
                <h4 className="font-bold mb-2">Mobile Apps Development</h4>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors text-center">
                <h4 className="font-bold mb-2">Web Based Systems</h4>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="animate-fade-in-up" delay={1200}>
          <div className="mt-16 text-center">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Contact Us <ArrowRight size={18} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
