
import { ArrowRight, Zap, DollarSign } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const ServiceCard = ({ 
  title, 
  platforms, 
  services 
}: { 
  title: string; 
  platforms: JSX.Element;
  services: {
    title: string;
    items: string[];
  }[];
}) => {
  return (
    <ScrollReveal animation="animate-fade-in-up">
      <div className="card-highlight mb-10">
        <h3 className="text-leadzap-yellow text-3xl md:text-4xl font-bold mb-6">{title}</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-4 underline">Platform</h4>
          {platforms}
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-center underline">All inclusive</h4>
          {services.map((service, index) => (
            <div key={index} className="mb-4">
              <h5 className="font-bold text-xl mb-2">{service.title}</h5>
              <ul className="text-gray-300">
                {service.items.map((item, idx) => (
                  <li key={idx} className="mb-1 ml-4">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

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
        
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceCard 
            title="PUSH ADS"
            platforms={
              <div className="flex justify-center gap-4">
                <img src="/lovable-uploads/bfba2267-1f0e-4c2d-a115-e6d5d4d1c52c.png" alt="Facebook" className="h-12 w-12 object-contain" />
                <img src="/lovable-uploads/301a86a8-69bc-49a8-aad0-6e20068902b1.png" alt="Instagram" className="h-12 w-12 object-contain" />
                <img src="/lovable-uploads/09cd7f9e-a62f-432d-b11f-f8207fbcc8f5.png" alt="TikTok" className="h-12 w-12 object-contain" />
              </div>
            }
            services={[
              {
                title: "Video Production",
                items: ["Pre Production", "Post Production"]
              },
              {
                title: "Ad settings",
                items: ["Ads monitoring", "Tactical ad settings"]
              },
              {
                title: "Lead management",
                items: ["Automated leads to your email"]
              }
            ]}
          />
          
          <ServiceCard 
            title="ORGANIC TRAFFIC"
            platforms={
              <div className="flex justify-center gap-4">
                <img src="/lovable-uploads/db97692b-fcd1-422a-9f6e-c355764c8579.png" alt="Google" className="h-12 w-12 object-contain" />
                <img src="/lovable-uploads/3b8190b9-3b47-405a-bcec-77baaf1683a7.png" alt="XiaoHongShu" className="h-12 w-12 object-contain" />
              </div>
            }
            services={[
              {
                title: "SEO",
                items: [
                  "Technical Analysis",
                  "Content Creation",
                  "On-Site Optimization",
                  "Link Building"
                ]
              },
              {
                title: "小红书",
                items: ["Content Creation"]
              }
            ]}
          />
        </div>
        
        <ScrollReveal animation="animate-fade-in-up" delay={300}>
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
        
        <ScrollReveal animation="animate-fade-in-up" delay={600}>
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
