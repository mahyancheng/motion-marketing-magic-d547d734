
import { Zap, ArrowRight } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const Framework = () => {
  return (
    <section id="framework" className="bg-black section-padding">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-leadzap-yellow heading-lg mb-2">OUR</h2>
            <h3 className="text-white heading-xl mb-8">MARKETING<br/>FRAMEWORK</h3>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="animate-fade-in" delay={300}>
          <div className="card-highlight mb-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-leadzap-yellow rounded-full p-2">
                <Zap size={24} className="text-black" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Push & Pull Marketing</h4>
                <p className="text-gray-300">We want you to be seen, & be found</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* New Framework Image */}
        <ScrollReveal animation="animate-fade-in" delay={600}>
          <div className="mt-10 mb-16">
            <img 
              src="/lovable-uploads/5e061f29-996a-4a9f-b5da-ab7970f507d5.png" 
              alt="Push & Pull Marketing Framework" 
              className="max-w-full mx-auto"
            />
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="animate-fade-in" delay={1200}>
          <div className="flex justify-center mt-12">
            <p className="text-xl text-white">Data collection</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="animate-fade-in-up" delay={1500}>
          <div className="mt-16 text-center">
            <a href="#results" className="btn-primary inline-flex items-center gap-2">
              See Our Results <ArrowRight size={18} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Framework;
