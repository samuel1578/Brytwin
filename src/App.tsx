import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
const AboutUs = lazy(() => import('./components/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Properties = lazy(() => import('./pages/Properties'));
const Gallery = lazy(() => import('./pages/Gallery'));
const ContactUs = lazy(() => import('./pages/Contact-Us'));
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  Home,
  Building,
  Truck,
  Globe,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,

  Bed,
  Bath
} from 'lucide-react';
import logo from './logo.jpeg';
import hero2Img from './hero2.jpg';
import estateImg from './estate.jpg';
import constructionImg from './construction.jpg';
import goodsImg from './goods.jpg';
import { ThemeToggle } from './components/ThemeToggle';
import ContactChooser from './components/ContactChooser';
import Seo from './components/Seo';
import { CONTACTS } from './config/contacts';
import { useInView, useStaggeredInView } from './hooks/useInView';
import BookingModal from './components/BookingModal';
import { BookingModalProvider, BookingModalContext } from './contexts/BookingModalContext';

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

function MainApp() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [currentService, setCurrentService] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mobileHeroImage, setMobileHeroImage] = useState(1); // 1 for default, 2 for hero2
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  // featured property modal state removed from MainApp (moved to /properties page)




  const navigate = useNavigate();
  const { openBookingModal } = useContext(BookingModalContext);

  // Contact chooser modal state
  const [contactChooser, setContactChooser] = useState<{
    open: boolean;
    label: string;
    telHref: string;
    waHref: string;
  } | null>(null);

  const openContactChooser = (label: string, telHref: string, waHref: string) => {
    setContactChooser({ open: true, label, telHref, waHref });
  };

  const closeContactChooser = () => setContactChooser(null);


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

  const services = [
    {
      icon: <Home className="w-12 h-12 text-white" />,
      title: "Estate Management & Sales",
      description: "Professional property management and sales services for luxury residential and commercial properties.",
      color: "bg-emerald-600",
      image: estateImg
    },
    {
      icon: <Building className="w-12 h-12 text-white" />,
      title: "General Construction",
      description: "Complete construction services from foundation to finish, delivering quality craftsmanship.",
      color: "bg-red-600",
      image: constructionImg
    },
    {
      icon: <Truck className="w-12 h-12 text-white" />,
      title: "Goods & Services Supply",
      description: "Comprehensive supply chain solutions for construction materials and specialized services.",
      color: "bg-emerald-600",
      image: goodsImg
    }
  ];

  // Animation hooks
  const aboutTitleRef = useInView<HTMLHeadingElement>({ threshold: 0.3 });
  const aboutDescRef = useInView<HTMLParagraphElement>({ threshold: 0.2 });
  const aboutButtonRef = useInView<HTMLButtonElement>({ threshold: 0.5 });

  const contactSectionRef = useStaggeredInView<HTMLDivElement>(4, 100);
  const testimonialsRef = useInView<HTMLHeadingElement>({ threshold: 0.3 });

  // Navigation scroll state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigate to next service
  const nextService = () => {
    setCurrentService(prev => (prev + 1) % services.length);
  };

  // Navigate to previous service
  const prevService = () => {
    setCurrentService(prev => prev === 0 ? services.length - 1 : prev - 1);
  };

  // Get card position class for coverflow effect
  const getCardClass = (index: number) => {
    const diff = (index - currentService + services.length) % services.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right-1';
    if (diff === 2) return 'right-2';
    if (diff === services.length - 1) return 'left-1';
    if (diff === services.length - 2) return 'left-2';
    return 'hidden';
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 100;
    const isRightSwipe = distance < -100;

    if (isLeftSwipe) nextService();
    if (isRightSwipe) prevService();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevService();
      if (e.key === 'ArrowRight') nextService();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hero slideshow effect for desktop only
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setHeroSlide(prev => prev === 1 ? 2 : 1);
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Navigation scroll state and mobile hero switch
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navigation background change
      if (currentScrollY > 100 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 100 && isScrolled) {
        setIsScrolled(false);
      }

      // Mobile hero switching (only apply on mobile devices)
      if (window.innerWidth >= 768) return;

      const heroSection = document.getElementById('home');

      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;
      const heroBottom = heroSection.offsetTop + heroHeight;

      // Check if user has scrolled past the hero section
      if (currentScrollY > heroBottom && !hasScrolledPastHero) {
        setHasScrolledPastHero(true);
      }

      // If user is back in hero area and has previously scrolled past it
      if (currentScrollY <= heroBottom && hasScrolledPastHero) {
        const isScrollingUp = currentScrollY < lastScrollY;
        const isScrollingDown = currentScrollY > lastScrollY;

        // Switch hero image based on scroll direction
        if (isScrollingUp && mobileHeroImage !== 2) {
          setMobileHeroImage(2);
        } else if (isScrollingDown && mobileHeroImage !== 1) {
          setMobileHeroImage(1);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasScrolledPastHero, mobileHeroImage, isScrolled]);

  const testimonials = [
    {
      name: "Samuel Dzokoto",
      role: "Property Investor",
      content: "Brytwin Homes delivered exceptional service throughout our property acquisition. Their international negotiation expertise saved us significant costs.",
      rating: 5
    },
    {
      name: "Mr. and Mrs. Kumevor",
      role: "Homeowners",
      content: "The construction quality exceeded our expectations. Professional team, on-time delivery, and outstanding attention to detail.",
      rating: 5
    },
    {
      name: "Mr George Okine",
      role: "Business Owner",
      content: "Their estate management services have been invaluable for our commercial properties. Highly recommend their expertise.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative transition-colors duration-300">
      <Seo title="Home" description="Brytwin Homes - construction, property management and international negotiations" image="/og/home.jpg" />

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
        
        /* Coverflow Swiper Styles */
        .services-coverflow {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 650px;
          perspective: 1500px;
          overflow: visible;
          margin: 0 auto;
          max-width: 1600px;
          padding: 0 100px;
        }
        
        .coverflow-container {
          position: relative;
          display: flex;
          align-items: center;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: 100%;
          height: 100%;
        }
        
        .service-card {
          position: absolute;
          width: 450px;
          height: 580px;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        
        .service-card.center {
          transform: translateX(-50%) translateZ(0) rotateY(0deg) scale(1.15);
          z-index: 10;
          opacity: 1;
          left: 50%;
        }
        
        .service-card.left-1 {
          transform: translateX(-140%) translateZ(-250px) rotateY(30deg) scale(0.9);
          z-index: 8;
          opacity: 0.9;
          left: 50%;
        }
        
        .service-card.left-2 {
          transform: translateX(-240%) translateZ(-450px) rotateY(40deg) scale(0.75);
          z-index: 6;
          opacity: 0.6;
          left: 50%;
        }
        
        .service-card.right-1 {
          transform: translateX(40%) translateZ(-250px) rotateY(-30deg) scale(0.9);
          z-index: 8;
          opacity: 0.9;
          left: 50%;
        }
        
        .service-card.right-2 {
          transform: translateX(140%) translateZ(-450px) rotateY(-40deg) scale(0.75);
          z-index: 6;
          opacity: 0.6;
          left: 50%;
        }
        
        .service-card.hidden {
          transform: translateX(-350%) translateZ(-650px) rotateY(55deg) scale(0.5);
          z-index: 1;
          opacity: 0;
          left: 50%;
        }
        
        @media (max-width: 768px) {
          .services-coverflow {
            height: 550px;
            perspective: 1000px;
            padding: 0 20px;
          }
          
          .service-card {
            width: 320px;
            height: 480px;
          }
          
          .service-card.center {
            transform: translateX(-50%) translateZ(0) rotateY(0deg) scale(1.05);
          }
          
          .service-card.left-1 {
            transform: translateX(-110%) translateZ(-180px) rotateY(25deg) scale(0.85);
          }
          
          .service-card.right-1 {
            transform: translateX(10%) translateZ(-180px) rotateY(-25deg) scale(0.85);
          }
          
          .service-card.left-2,
          .service-card.right-2 {
            opacity: 0;
            pointer-events: none;
          }
        }
        
        @media (max-width: 480px) {
          .services-coverflow {
            height: 500px;
            padding: 0 10px;
          }
          
          .service-card {
            width: 280px;
            height: 430px;
          }
          
          .service-card.center {
            transform: translateX(-50%) translateZ(0) rotateY(0deg) scale(1);
          }
          
          .service-card.left-1 {
            transform: translateX(-95%) translateZ(-150px) rotateY(20deg) scale(0.8);
          }
          
          .service-card.right-1 {
            transform: translateX(-5%) translateZ(-150px) rotateY(-20deg) scale(0.8);
          }
        }
        
        .swiper-nav-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        
        .swiper-nav-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .swiper-nav-button:hover {
          background: #f9f9f9;
          transform: scale(1.05);
        }
        
        .dark .swiper-nav-button {
          background: #374151;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .dark .swiper-nav-button:hover {
          background: #4B5563;
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
        
        .geo-grid {
          background-image: 
            linear-gradient(to right, rgba(226, 232, 240, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .dark .geo-grid {
          background-image: 
            linear-gradient(to right, rgba(226, 232, 240, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.05) 1px, transparent 1px);
        }
      `}</style>

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
                <a href="/about" onClick={e => { e.preventDefault(); navigate && navigate('/about'); }} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="/services"
                  onClick={e => { e.preventDefault(); navigate('/services'); }}
                  className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/properties" onClick={e => { e.preventDefault(); navigate('/properties'); }} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Properties
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="/gallery"
                  onClick={e => {
                    e.preventDefault();
                    navigate('/gallery');
                  }}
                  className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="/contact"
                  onClick={e => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>

                {/* CTA Button */}
                <button
                  onClick={() => openBookingModal()}
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
        <div className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible pointer-events-none'
          }`} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${isMenuOpen ? 'opacity-50' : 'opacity-0'
              }`}
            onClick={toggleMenu}
            style={{ width: '100vw', height: '100vh' }}
          />

          {/* Modal Content */}
          <div className={`relative w-full h-full bg-white dark:bg-gray-900 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                    onClick={e => { e.preventDefault(); toggleMenu(); navigate && navigate('/about'); }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Users className="w-5 h-5 mr-4" />
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
                    <Building className="w-5 h-5 mr-4" />
                    Services
                  </a>
                  <a
                    href="/properties"
                    onClick={e => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/properties');
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Properties
                  </a>
                  <a
                    href="/gallery"
                    onClick={e => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/gallery');
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Globe className="w-5 h-5 mr-4" />
                    Gallery
                  </a>
                  <a
                    href="/contact"
                    onClick={e => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/contact');
                    }}
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
                      toggleMenu();
                      openBookingModal();
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Brytwin Homes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Consultation Modal */}



      {/* Hero Section */}
      <section
        id="home"
        className={`relative flex items-center justify-center bg-cover bg-center pt-20 hero-bg ${heroSlide === 2 ? 'slide-2' : ''} ${mobileHeroImage === 2 ? 'mobile-hero-2' : ''}`}
        style={{
          height: 'calc(70vh + 80px)',
          minHeight: 'calc(70vh + 80px)',
          '--mobile-hero-2': `url(${hero2Img})`
        } as React.CSSProperties & { '--mobile-hero-2': string }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Building Excellence,<br />
            <span className="text-emerald-400">Negotiating Globally, Managing Estates</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Your trusted partner for General Construction Works, International Negotiations, and Estate Management & Sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-all transform hover:scale-105 animate-bounce-in">
              Book Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-base font-medium transition-all animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              View Properties
            </button>
          </div>
        </div>

        {/* Slideshow Indicators - Only visible on desktop */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex space-x-3">
          <button
            className={`w-3 h-3 rounded-full transition-all duration-300 ${heroSlide === 1 ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
            onClick={() => setHeroSlide(1)}
            aria-label="Show slide 1"
          />
          <button
            className={`w-3 h-3 rounded-full transition-all duration-300 ${heroSlide === 2 ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
            onClick={() => setHeroSlide(2)}
            aria-label="Show slide 2"
          />
        </div>
      </section>

      {/* About Snippet */}
      <section id="about" className="pt-16 pb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 relative scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h3
              ref={aboutTitleRef.ref}
              className={`text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 slide-up ${aboutTitleRef.inView ? 'in-view' : ''}`}
            >
              About <span className="font-normal font-hurricane">Brytwin Homes & Construction Ltd</span>
            </h3>
            <p
              ref={aboutDescRef.ref}
              className={`text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-ibm-plex transition-colors duration-300 fade-in ${aboutDescRef.inView ? 'in-view' : ''}`}
              style={{
                lineHeight: '1.8',
                letterSpacing: '0.01em',
                fontWeight: '400'
              }}
            >
              Born with a hustling mindset but determined scope, Mr. Bright 'Last-Name' turned passion into purpose. Launching and Managing a construction company grounded in hard work, vision, and integrity. Without the industry standard university degree, he relied on hands-on experience and determination to master construction, international management, and estate management. Today, he and his team delivers projects with the same drive that started this journey: Quality, Trust, and Results that last.
            </p>
            <button
              ref={aboutButtonRef.ref}
              className={`mt-6 text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center justify-center mx-auto scale-in pulse-on-hover ${aboutButtonRef.inView ? 'in-view' : ''}`}
            >
              Read More <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Background decoration - same as Services section */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-full blur-xl"></div>
      </section>

      {/* Our Services */}
      <section id="services" className="relative pt-10 pb-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 scroll-mt-20 transition-colors duration-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9833eeee75f4917569_pattern-light.svg')] dark:bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9833eeee4b73917568_pattern-dark.svg')] bg-repeat w-full h-full"></div>
        </div>

        {/* Geometric Grid */}
        <div className="absolute inset-0 geo-grid"></div>

        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Our Services
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Comprehensive solutions for all your property and construction needs
            </p>
          </div>

          {/* Services Coverflow */}
          <div
            className="services-coverflow"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="coverflow-container">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`service-card ${getCardClass(index)}`}
                  onClick={() => setCurrentService(index)}
                >
                  <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${service.image})`
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
                      <div className="flex-1">
                        <div className={`${service.color} w-12 h-12 md:w-16 md:h-16 rounded-xl flex justify-center items-center mb-4 md:mb-6 shadow-lg`}>
                          {service.icon}
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{service.title}</h4>
                        <p className="text-white/90 text-base md:text-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-6">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center w-fit">
                          Learn More <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="swiper-nav-buttons flex items-center gap-6">
            <button
              onClick={prevService}
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              <span className="font-hurricane text-3xl text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Previous</span>
            </button>
            <button
              onClick={nextService}
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Next service"
            >
              <span className="font-hurricane text-3xl text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Next</span>
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-full blur-xl"></div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Featured Properties</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Discover our premium selection of luxury homes and investment properties
            </p>
          </div>
          <div className="flex justify-center">
            {properties.length > 0 && (() => {
              const property = properties[0]; // Get the first property
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

              return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in-up max-w-md">
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
                      {property.Currency} {property.Price}
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
                        navigate('/properties');
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 transition-colors font-semibold"
                    >
                      View All Photos
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Properties
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3
              ref={testimonialsRef.ref}
              className={`text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 slide-up ${testimonialsRef.inView ? 'in-view' : ''}`}
            >
              Client Testimonials
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Hear what our satisfied clients have to say about our services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg dark:shadow-gray-900/50 transition-colors duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic transition-colors duration-300">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">{testimonial.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-emerald-600 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-white mb-8">
            Book a consultation today and let's discuss how we can help you achieve your property goals
          </p>
          <button
            onClick={() => openBookingModal()}
            className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Book a Consultation Today!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 dark:bg-gray-950 text-white py-16 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={contactSectionRef.ref}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          >
            {/* Company Info */}
            <div className={`col-span-1 md:col-span-2 stagger-item ${contactSectionRef.visibleItems[0] ? 'visible' : ''}`}>
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
                <li><a href="#home" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Services</a></li>
                <li><a href="/properties" onClick={e => { e.preventDefault(); navigate('/properties'); }} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Properties</a></li>
                <li>
                  <a
                    href="/gallery"
                    onClick={e => {
                      e.preventDefault();
                      navigate('/gallery');
                    }}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <button
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors underline decoration-transparent hover:decoration-emerald-400"
                    onClick={(e) => {
                      e.preventDefault();
                      openContactChooser(CONTACTS.US.label, CONTACTS.US.telHref, CONTACTS.US.waHref);
                    }}
                  >
                    (+1 (904) 767-3657)
                  </button>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <button
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors underline decoration-transparent hover:decoration-emerald-400"
                    onClick={(e) => {
                      e.preventDefault();
                      openContactChooser(CONTACTS.GHANA.label, CONTACTS.GHANA.telHref, CONTACTS.GHANA.waHref);
                    }}
                  >
                    (+233) 55 805 6649
                  </button>
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
              © 2025 Brytwin Homes & Construction Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ContactChooser
        isOpen={!!contactChooser}
        label={contactChooser?.label}
        telHref={contactChooser?.telHref}
        waHref={contactChooser?.waHref}
        onClose={closeContactChooser}
      />

    </div>
  );
}

function App() {
  const [isGlobalBookingOpen, setIsGlobalBookingOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const openBookingModal = () => setIsGlobalBookingOpen(true);
  const closeBookingModal = () => setIsGlobalBookingOpen(false);
  const showGlobalToast = (message: string, type: 'success' | 'error' = 'success') => {
    setGlobalToast({ message, type });
    window.setTimeout(() => setGlobalToast(null), 4000);
  };

  return (
    <BookingModalProvider value={{ openBookingModal }}>
      <Router>
        <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          {/* Render global booking modal so it's available across pages */}
          <BookingModal isOpen={isGlobalBookingOpen} onClose={closeBookingModal} onSuccess={(msg) => showGlobalToast(msg || "Thanks — we'll respond within one working day.", 'success')} />
          {globalToast && (
            <div className="fixed right-4 top-24 z-[9999] w-auto max-w-xs rounded-xl px-4 py-3 text-sm font-medium shadow-xl transition">
              <div className={`rounded-lg px-4 py-2 ${globalToast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {globalToast.message}
              </div>
            </div>
          )}
        </Suspense>
      </Router>
    </BookingModalProvider>
  );
}

export default App;