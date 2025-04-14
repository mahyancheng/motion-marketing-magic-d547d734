
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src="/lovable-uploads/cdaaf38a-f7c3-452d-b62b-d48316225e45.png" alt="LeadZap Marketing" className="h-8 md:h-10" />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/seo" className="hover:text-yellow-400 transition-colors">SEO Services</Link>
          <Link to="/social-media-ads" className="hover:text-yellow-400 transition-colors">Social Media Ads</Link>
          <Link to="/order-management" className="hover:text-yellow-400 transition-colors">Order Management</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link>
        </div>
        <Link to="/contact">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};
