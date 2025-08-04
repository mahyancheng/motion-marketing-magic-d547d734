
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';

const Header = () => {
  const { activeSection } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  
  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: number) => {
    const section = document.getElementById(`section-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-brand-700">
          OrderFlow Demo
        </Link>
        
        {scrolled && (
          <nav className="hidden md:flex space-x-1">
            {[1, 2, 3, 4, 5, 6].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-2 py-1 rounded-md text-sm ${
                  activeSection === section 
                    ? 'bg-brand-100 text-brand-800 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
