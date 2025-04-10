
import { Zap } from 'lucide-react';
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
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <ScrollReveal animation="animate-fade-in-left" delay={600}>
            <div className="card-highlight flex flex-col items-center">
              <h3 className="text-center text-2xl font-bold mb-6">
                <Zap className="inline mr-2 text-leadzap-yellow" size={20} />
                Supercharged awareness
              </h3>
              <div className="bg-white rounded-xl p-6 mb-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <img src="/lovable-uploads/bfba2267-1f0e-4c2d-a115-e6d5d4d1c52c.png" alt="Facebook" className="h-12 w-12 object-contain" />
                  <img src="/lovable-uploads/301a86a8-69bc-49a8-aad0-6e20068902b1.png" alt="Instagram" className="h-12 w-12 object-contain" />
                  <img src="/lovable-uploads/09cd7f9e-a62f-432d-b11f-f8207fbcc8f5.png" alt="TikTok" className="h-12 w-12 object-contain" />
                </div>
              </div>
              <h4 className="text-leadzap-yellow text-2xl font-bold mt-4">PUSH</h4>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="animate-fade-in-right" delay={900}>
            <div className="card-highlight flex flex-col items-center">
              <div className="bg-white rounded-xl p-6 mb-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <img src="/lovable-uploads/db97692b-fcd1-422a-9f6e-c355764c8579.png" alt="Google" className="h-12 w-12 object-contain" />
                  <img src="/lovable-uploads/7ce14640-2e41-48e6-8e31-3470d5ea0c1b.png" alt="Bing" className="h-12 w-12 object-contain" />
                  <img src="/lovable-uploads/3b8190b9-3b47-405a-bcec-77baaf1683a7.png" alt="XiaoHongShu" className="h-12 w-12 object-contain" />
                </div>
              </div>
              <h4 className="text-leadzap-yellow text-2xl font-bold mt-4">PULL</h4>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal animation="animate-fade-in" delay={1200}>
          <div className="flex justify-center mt-12">
            <p className="text-xl">Data collection</p>
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
