import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Home,
  Users,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import logo from '../logo.jpeg';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Navigation scroll state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navigation background change
      if (currentScrollY > 100 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 100 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md shadow-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${isScrolled ? 'nav-scroll-bg' : 'bg-white/95 dark:bg-gray-900/95'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-4">
              {/* Logo Image */}
              <div className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt="Brytwin Homes Logo" 
                  className="h-12 w-12 object-contain"
                />
              </div>
              
              {/* Company Name */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-normal text-gray-900 dark:text-white leading-none font-hurricane transition-colors duration-300">
                  Brytwin Homes
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wide uppercase transition-colors duration-300">
                  & Construction Limited
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <a href="#home" className="relative text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wide hover:text-red-700 dark:hover:text-red-300 transition-colors group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-100 transition-transform"></span>
                </a>
                <a href="/about" onClick={e => {e.preventDefault(); navigate && navigate('/about');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/services" onClick={e => {e.preventDefault(); navigate && navigate('/services');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#properties" className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Properties
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#gallery" className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#contact" className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                
                {/* CTA Button */}
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>

                {/* Theme Toggle */}
                <ThemeToggle variant="desktop" />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Modal */}
        <div className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={toggleMenu}
            style={{ width: '100vw', height: '100vh' }}
          />
          
          {/* Modal Content */}
          <div className={`relative w-full h-full bg-white dark:bg-gray-900 transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`} style={{ width: '100vw', height: '100vh', maxHeight: '100vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="Brytwin Homes Logo" 
                  className="h-10 w-10 object-contain"
                />
                
                <div className="flex flex-col">
                  <h1 className="text-2xl font-normal text-gray-900 dark:text-white leading-none font-hurricane transition-colors duration-300">
                    Brytwin Homes
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wide uppercase transition-colors duration-300">
                    & Construction Limited
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleMenu}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col h-full overflow-y-auto" style={{ height: 'calc(100vh - 92px)' }}>
              <div className="flex-1 px-6 py-8">
                <nav className="space-y-2">
                  <a 
                    href="#home" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Home
                  </a>
                  <a 
                    href="/about" 
                    onClick={e => {e.preventDefault(); toggleMenu(); navigate && navigate('/about');}}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Users className="w-5 h-5 mr-4" />
                    About Us
                  </a>
                  <a 
                    href="/services" 
                    onClick={e => {e.preventDefault(); toggleMenu(); navigate && navigate('/services');}}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Building className="w-5 h-5 mr-4" />
                    Services
                  </a>
                  <a 
                    href="#properties" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Properties
                  </a>
                  <a 
                    href="#gallery" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Globe className="w-5 h-5 mr-4" />
                    Gallery
                  </a>
                  <a 
                    href="#contact" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Phone className="w-5 h-5 mr-4" />
                    Contact
                  </a>
                </nav>

                {/* Theme Toggle */}
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">Appearance</h4>
                  <ThemeToggle variant="mobile" />
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-emerald-50 dark:from-red-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Book a consultation and let's discuss your project.</p>
                  <button 
                    onClick={toggleMenu}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl text-base font-bold uppercase tracking-wide shadow-lg transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Contact Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                      <span className="text-sm">(+233) 55 805 6649</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                      <span className="text-sm">info@brytwinhomes.com</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                      <span className="text-sm">Accra, Ghana</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors" />
                    <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Brytwin Homes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
