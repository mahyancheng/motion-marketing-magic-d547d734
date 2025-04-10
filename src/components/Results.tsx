
import { ArrowRight, Zap, Users } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const ResultCaseStudy = ({ 
  company, 
  stats, 
  bottomMetrics 
}: { 
  company: string;
  stats: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  bottomMetrics: React.ReactNode;
}) => {
  return (
    <div className="mb-24">
      <ScrollReveal>
        <div className="card-highlight max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-leadzap-yellow rounded-full p-2">
              <Zap size={24} className="text-black" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold">{company}</h4>
          </div>
          
          <div className="bg-zinc-800 rounded-xl p-4 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-2">
                  <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  {stat.sublabel && (
                    <p className="text-gray-500 text-xs">{stat.sublabel}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="animate-fade-in-up" delay={300}>
        {bottomMetrics}
      </ScrollReveal>
    </div>
  );
};

const Results = () => {
  return (
    <section id="results" className="bg-black section-padding">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-leadzap-yellow heading-lg mb-2">OUR</h2>
            <h3 className="text-white heading-xl mb-8">PAST RESULTS</h3>
          </div>
        </ScrollReveal>
        
        <ResultCaseStudy 
          company="PureGen Water"
          stats={[
            { label: "Facebook leads", value: "755" },
            { label: "Facebook leads", value: "310,778" },
            { label: "Per On-Facebook Lead", value: "RM6.50" },
            { label: "Per On-Facebook Lead", value: "RM4,906.77" },
            { label: "Facebook leads", value: "330" },
            { label: "Facebook leads", value: "162,898" },
            { label: "Per On-Facebook Lead", value: "RM10.89" },
            { label: "Per On-Facebook Lead", value: "RM3,593.04" },
            { label: "Website Leads", value: "338", sublabel: "[2]" },
            { label: "Website Leads", value: "260,982" },
            { label: "Per Lead", value: "RM10.52", sublabel: "[2]" },
            { label: "Per Lead", value: "RM3,555.40" }
          ]}
          bottomMetrics={
            <div className="mt-6">
              <p className="text-gray-400 mb-3">Low cost leads = low quality customers?</p>
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                <div className="text-center">
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold flex items-center gap-2 mb-2">
                    <div className="mr-2">
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#333" strokeWidth="10" />
                        <path 
                          d="M50 5 A 45 45 0 0 1 95 50" 
                          fill="transparent" 
                          stroke="#FFD600" 
                          strokeWidth="10"
                        />
                      </svg>
                    </div>
                    &gt; 30%
                  </h4>
                  <p className="text-center">Paying<br/>Customers</p>
                </div>
                
                <div className="text-center">
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold mb-2">
                    RM 200,000
                  </h4>
                  <p className="text-center">generated</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <h3 className="text-2xl md:text-3xl font-bold flex items-center">
                  Let's talk numbers <Zap className="ml-2 text-leadzap-yellow" size={24} />
                </h3>
              </div>
            </div>
          }
        />
        
        <ResultCaseStudy 
          company="Renex Steel"
          stats={[
            { label: "Facebook leads", value: "577" },
            { label: "Facebook leads", value: "63,806" },
            { label: "Facebook leads", value: "190,438" },
            { label: "Per On-Facebook Lead", value: "RM13.37" },
            { label: "Facebook leads", value: "2,407" },
            { label: "Facebook leads", value: "203,858" },
            { label: "Facebook leads", value: "852,603" },
            { label: "Per On-Facebook Lead", value: "RM25,194.38" },
            { label: "Website Leads", value: "1,091", sublabel: "[2]" },
            { label: "Website Leads", value: "303,769" },
            { label: "Per Lead", value: "RM26.62", sublabel: "[2]" },
            { label: "Per Lead", value: "RM29,046.63" }
          ]}
          bottomMetrics={
            <div className="mt-8">
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                <div className="text-center">
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold mb-2">Over</h4>
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold mb-2">3000+</h4>
                  <p className="text-center">leads generated</p>
                </div>
                
                <div className="text-center">
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold mb-2">More than</h4>
                  <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold flex items-center gap-2 mb-2">
                    7 figures <Zap className="text-leadzap-yellow" size={24} />
                  </h4>
                  <p className="text-center">generated</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center mt-12">
                <Users className="text-leadzap-yellow mb-4" size={36} />
                <p className="text-xl mb-2">Engagement grew over</p>
                <h4 className="text-leadzap-yellow text-4xl md:text-5xl font-bold">250%</h4>
              </div>
            </div>
          }
        />
        
        <ScrollReveal animation="animate-fade-in-up">
          <div className="mt-8 text-center">
            <a href="#services" className="btn-primary inline-flex items-center gap-2">
              View Our Services <ArrowRight size={18} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Results;
