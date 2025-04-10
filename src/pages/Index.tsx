
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Framework from '../components/Framework';
import Results from '../components/Results';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = "LeadZap Marketing | We Generate Leads";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Framework />
      <Results />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
