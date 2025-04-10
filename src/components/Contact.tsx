
import { useState } from 'react';
import { Mail, Phone, Zap } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ScrollReveal from './ui/ScrollReveal';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="bg-black section-padding">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-leadzap-yellow heading-lg mb-2">READY TO</h2>
            <h3 className="text-white heading-xl mb-4">BLOW UP?</h3>
            <p className="flex items-center gap-2 text-xl">
              Find this guy here <Zap className="text-leadzap-yellow" size={24} />
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal animation="animate-fade-in-left">
            <div className="card-highlight h-full flex flex-col">
              <h4 className="text-3xl font-bold mb-2">MAH YAN CHENG</h4>
              <p className="text-gray-300 mb-8">Head of Business Development</p>
              
              <div className="flex items-center gap-3 mb-4">
                <Phone size={20} className="text-leadzap-yellow" />
                <p>+6011-1133 5119</p>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <Mail size={20} className="text-leadzap-yellow" />
                <p>yc.mah@leadzap.com.my</p>
              </div>
              
              <div className="mt-auto pt-8">
                <p className="text-gray-400">Our website:</p>
                <a 
                  href="https://leadzap.com.my" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-leadzap-yellow hover:underline"
                >
                  leadzap.com.my
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="animate-fade-in-right">
            <div className="card-highlight">
              <h4 className="text-2xl font-bold mb-6">Send us a message</h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-300">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-800 rounded-lg focus:ring-2 focus:ring-leadzap-yellow focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-300">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-800 rounded-lg focus:ring-2 focus:ring-leadzap-yellow focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-1 text-gray-300">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-800 rounded-lg focus:ring-2 focus:ring-leadzap-yellow focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-1 text-gray-300">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-800 rounded-lg focus:ring-2 focus:ring-leadzap-yellow focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-800 rounded-lg focus:ring-2 focus:ring-leadzap-yellow focus:outline-none"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
