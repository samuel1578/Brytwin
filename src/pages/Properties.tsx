import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Building,
  Truck,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Bed,
  Bath
} from 'lucide-react';
import { CurrencyCode, useCurrency } from '../contexts/CurrencyContext';
import logo from '../logo.jpeg';
import { ThemeToggle } from '../components/ThemeToggle';
import BookingModal from '../components/BookingModal';

interface Property {
  ID: string;
  Title: string;
  Location: string;
  Price: string;
  Currency: string;
  Bedrooms: string;
  Bathrooms: string;
  Description: string;
  'Exterior Images': string;
  'Bedroom Images': string;
  'Bathroom Images': string;
  'Livingroom Images': string;
  Status: string;
}

const CURRENCY_OPTIONS: Array<{ code: CurrencyCode; label: string; symbol: string }> = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'GHS', label: 'Ghana Cedi', symbol: '₵' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'EUR', label: 'Euro', symbol: '€' }
];

const Properties: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { currency, setCurrency, formatPrice, isLoading, error } = useCurrency();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper function to check if URL is a video
  const isVideoUrl = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           (url.includes('drive.google.com') && url.includes('/file/d/'));
  };

  // Helper function to get video thumbnail from Google Drive
  const getVideoThumbnail = (url: string): string | null => {
    try {
      if (url.includes('drive.google.com')) {
        let fileId = '';
        
        if (url.includes('uc?id=')) {
          fileId = url.split('uc?id=')[1].split('&')[0];
        } else if (url.includes('/file/d/')) {
          fileId = url.split('/file/d/')[1].split('/')[0];
        } else if (url.includes('open?id=')) {
          fileId = url.split('open?id=')[1].split('&')[0];
        }

        // Return Google Drive video thumbnail URL
        if (fileId) {
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting video thumbnail:', error);
      return null;
    }
  };

  // Helper function to convert Google Drive URLs to direct image/video URLs
  const convertGoogleDriveUrl = (url: string): string => {
    try {
      // Check if it's a Google Drive URL
      if (url.includes('drive.google.com')) {
        // Extract file ID from various Google Drive URL formats
        let fileId = '';
        
        // Format: https://drive.google.com/uc?id=FILE_ID
        if (url.includes('uc?id=')) {
          fileId = url.split('uc?id=')[1].split('&')[0];
        }
        // Format: https://drive.google.com/file/d/FILE_ID/view
        else if (url.includes('/file/d/')) {
          fileId = url.split('/file/d/')[1].split('/')[0];
        }
        // Format: https://drive.google.com/open?id=FILE_ID
        else if (url.includes('open?id=')) {
          fileId = url.split('open?id=')[1].split('&')[0];
        }

        // For videos, use embed format
        if (fileId && isVideoUrl(url)) {
          return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        // For images, convert to direct thumbnail URL that works in img tags
        else if (fileId) {
          return `https://lh3.googleusercontent.com/d/${fileId}=w2000-h2000`;
        }
      }
      return url;
    } catch (error) {
      console.error('Error converting Google Drive URL:', error);
      return url;
    }
  };

  useEffect(() => {
    fetch('https://opensheet.elk.sh/1UK0qYeCVkeoAc7WhQz2kDi9PUd1L2VKt9MGXN6wZQRM/Properties')
      .then(res => res.json())
      .then((data: Property[]) => setProperties(data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative transition-colors duration-300">
      {/* Add custom animations */}
      <style>{`
        /* Ensure consistent scrollbar behavior */
        html {
          overflow-y: scroll;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Adjust scroll padding to account for fixed navbar */
        html {
          scroll-padding-top: 80px;
        }

        /* Prevent layout shift from scrollbar */
        body {
          overflow-y: scroll;
        }

        /* Ensure consistent scrollbar width across browsers */
        * {
          scrollbar-width: thin;
        }

        /* Custom scrollbar styling for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Prevent horizontal overflow */
        body, html {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }

        /* Glass effect */
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        /* Existing animations */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; filter: blur(8px); }
          50% { opacity: 1; filter: blur(12px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md shadow-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300 bg-white/95 dark:bg-gray-900/95`}>
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
                <a href="/" onClick={e => {e.preventDefault(); navigate('/');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/about" onClick={e => {e.preventDefault(); navigate('/about');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/services" onClick={e => {e.preventDefault(); navigate('/services');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="/properties"
                  onClick={e => {e.preventDefault(); navigate('/properties');}}
                  className="relative text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wide hover:text-red-700 dark:hover:text-red-300 transition-colors group"
                >
                  Properties
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-100 transition-transform"></span>
                </a>
                <a href="/#gallery" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/#contact" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>

                {/* CTA Button */}
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Book Now
                </button>

                {/* Theme Toggle */}
                <ThemeToggle variant="desktop" onToggle={() => setIsMenuOpen(false)} />
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
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/');
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Home
                  </a>
                  <a
                    href="/about"
                    onClick={e => {e.preventDefault(); toggleMenu(); navigate('/about');}}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Building className="w-5 h-5 mr-4" />
                    About Us
                  </a>
                  <a
                    href="/services"
                    onClick={e => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/services');
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Truck className="w-5 h-5 mr-4" />
                    Services
                  </a>
                  <a
                    href="/properties"
                    onClick={e => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/properties');
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all hover:bg-red-100 dark:hover:bg-red-900/30"
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
                  <ThemeToggle variant="mobile" onToggle={() => setIsMenuOpen(false)} />
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-emerald-50 dark:from-red-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Book a consultation and let's discuss your project.</p>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookingModalOpen(true);
                    }}
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

      {/* Placeholder Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-20 h-[50vh]">
        <div className="text-center text-gray-900 dark:text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up">
            Our Properties
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover our premium selection of luxury homes and investment properties
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-all transform hover:scale-105 animate-bounce-in">
              View Properties
            </button>
            <button className="border-2 border-gray-600 dark:border-gray-400 text-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-400 hover:text-white dark:hover:text-gray-900 px-8 py-4 rounded-lg text-base font-medium transition-all animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              Contact Agent
            </button>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in-up">
            Available Properties
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-10">
            <label
              htmlFor="currency-select"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide"
            >
              Display Currency
            </label>
            <div className="flex flex-col items-start gap-2">
              <select
                id="currency-select"
                value={currency}
                onChange={event => setCurrency(event.target.value as CurrencyCode)}
                disabled={isLoading}
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {CURRENCY_OPTIONS.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.symbol} {option.code} · {option.label}
                  </option>
                ))}
              </select>
              {error && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => {
              // Get exterior images/videos for placeholder
              const exteriorImageString = property['Exterior Images']?.toString() || '';
              const exteriorUrls = exteriorImageString
                .split(',')
                .map((url: string) => url.replace(/\n/g, '').trim())
                .filter((url: string) => url && url.length > 0);
              
              // Separate videos and images
              const videoUrls = exteriorUrls.filter((url: string) => isVideoUrl(url));
              const imageUrls = exteriorUrls.filter((url: string) => !isVideoUrl(url));
              
              // Determine placeholder: use video thumbnail if video exists, otherwise use image
              let placeholderImage = null;
              
              if (videoUrls.length > 0) {
                // Use video thumbnail
                const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
                placeholderImage = getVideoThumbnail(randomVideo);
                console.log('Video detected:', randomVideo, 'Thumbnail:', placeholderImage);
              } else if (imageUrls.length > 0) {
                // Use regular image
                const convertedImages = imageUrls.map((url: string) => convertGoogleDriveUrl(url));
                placeholderImage = convertedImages[Math.floor(Math.random() * convertedImages.length)];
              }

              const numericPrice = (() => {
                const cleaned = parseFloat(property.Price.replace(/[^0-9.]/g, ''));
                return Number.isFinite(cleaned) ? cleaned : 0;
              })();

              return (
                <div
                  key={property.ID}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Placeholder Image */}
                  {placeholderImage ? (
                    <div className="w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={placeholderImage}
                        alt={property.Title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error('Failed to load placeholder:', placeholderImage);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show a fallback background
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {property.Title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
                      {property.Location}
                    </p>
                    <p className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
                      {formatPrice(numericPrice)}
                    </p>

                    {/* Bedrooms and Bathrooms */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Bed className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Bedrooms: <span className="font-bold text-gray-900 dark:text-white">{property.Bedrooms}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Bathrooms: <span className="font-bold text-gray-900 dark:text-white">{property.Bathrooms}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {property.Description}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setCurrentImageIndex(0);
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 transition-colors font-semibold"
                    >
                      View All Photos
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Acquisition Guide Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">How to Acquire a Property</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
            <li>Browse Listings: Explore our available properties and select the ones matching your needs.</li>
            <li>Contact the Broker: Click "View All Photos" on your chosen property, then reach out to our broker to schedule a viewing.</li>
            <li>Site Visit & Inspection: Attend the property visit, inspect conditions, and verify compliance with building regulations.</li>
            <li>Submit an Offer: Make a formal offer based on current market valuations and negotiate terms.</li>
            <li>Due Diligence: Perform legal review, secure financing, and conduct property valuation.</li>
            <li>Finalize Agreement: Sign the sales contract, settle taxes and fees, and complete the transfer of ownership.</li>
            <li>Move In: Receive the keys and start enjoying your new home or investment.</li>
          </ol>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic">
            Note: Transactions are subject to market conditions, regulatory approvals, and applicable fees. Please consult licensed professionals for complete guidance.
          </p>
        </div>
      </section>

      {/* Image Slideshow Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
            >
              &times;
            </button>

            {(() => {
              const parseImages = (imageString: string) => {
                return imageString
                  .split(',')
                  .map((url: string) => url.replace(/\n/g, '').trim())
                  .filter((url: string) => url && url.length > 0);
              };

              const allMedia = [
                ...parseImages(selectedProperty['Exterior Images'] || ''),
                ...parseImages(selectedProperty['Bedroom Images'] || ''),
                ...parseImages(selectedProperty['Bathroom Images'] || ''),
                ...parseImages(selectedProperty['Livingroom Images'] || '')
              ];

              if (allMedia.length === 0) return null;

              const currentUrl = allMedia[currentImageIndex];
              const convertedUrl = convertGoogleDriveUrl(currentUrl);
              const isVideo = isVideoUrl(currentUrl);

              return (
                <div className="relative">
                  {isVideo ? (
                    <iframe
                      src={convertedUrl}
                      className="w-full h-auto max-h-[80vh] rounded-lg"
                      style={{ aspectRatio: '16/9', minHeight: '400px' }}
                      allow="autoplay"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={convertedUrl}
                      alt={`Property media ${currentImageIndex + 1}`}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                      onError={(e) => {
                        console.error('Failed to load image:', convertedUrl);
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHA+PGZpbGw9IiM2QjczODAiPkltYWdlIG5vdCBhdmFpbGFibGU8L2ZpbGw+PC9wPgo8L3N2Zz4K';
                      }}
                    />
                  )}
                  {allMedia.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + allMedia.length) % allMedia.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center z-10"
                      >
                        &#8249;
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % allMedia.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center z-10"
                      >
                        &#8250;
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full z-10">
                    {currentImageIndex + 1} / {allMedia.length} {isVideo && '(Video)'}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 dark:bg-gray-950 text-white py-16 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src={logo}
                  alt="Brytwin Homes Logo"
                  className="w-12 h-12 rounded-lg mr-3 object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold">
                    <span className="font-hurricane">Brytwin Homes</span>
                  </h4>
                  <p className="text-sm text-gray-400">& Construction Limited</p>
                </div>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md transition-colors duration-300">
                Your trusted partner in luxury real estate, construction, and property management services.
                Excellence in every project, professionalism in every interaction.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/" onClick={e => {e.preventDefault(); navigate('/');}} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" onClick={e => {e.preventDefault(); navigate('/about');}} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" onClick={e => {e.preventDefault(); navigate('/services');}} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Services</a></li>
                <li><a href="/properties" onClick={e => {e.preventDefault(); navigate('/properties');}} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Properties</a></li>
                <li><a href="/#gallery" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-gray-400 dark:text-gray-500">(+1) 904 767-3657</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-gray-400 dark:text-gray-500">(+233) 55 805 6649</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-gray-400 dark:text-gray-500">info@brytwinhomes.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 mt-1" />
                  <span className="text-gray-400 dark:text-gray-500">Accra, Ghana</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <h5 className="font-bold mb-3">Newsletter</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 dark:bg-gray-950 text-white rounded-l-lg border border-gray-700 dark:border-gray-600 focus:outline-none focus:border-red-600 dark:focus:border-red-400 transition-colors duration-300"
                  />
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom Text */}
          <div className="border-t border-gray-800 dark:border-gray-600 pt-8 text-center">
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">
              © 2024 Brytwin Homes & Construction Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default Properties;