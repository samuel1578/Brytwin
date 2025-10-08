import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Users,
  Home,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import constructionImg from '../construction.jpg';
import estateImg from '../estate.jpg';
import logo from '../logo.jpeg';
import { ThemeToggle } from '../components/ThemeToggle';
import { useStaggeredInView } from '../hooks/useInView';
import { useSwipeable } from 'react-swipeable';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import deliveryImg from '../delivery.jpg';
import investmentImg from '../investment.jpg';

import founderBright from '../mr-bright.png';
import founderWinifred from '../ms-win.jpeg';
const patternLight = "https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9833eeee75f4917569_pattern-light.svg";
const patternDark = "https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9833eeee4b73917568_pattern-dark.svg";

const AboutUs: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [swiper, setSwiper] = useState<any>(null);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Animation states
  const [, setAnimate] = useState(false);
  
  // Start animations after component mount
  useEffect(() => {
    setAnimate(true);
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  // Animation hooks (copied from main app for consistency)
  const contactSectionRef = useStaggeredInView<HTMLDivElement>(4, 100);
  
  // Mouse movement tracking for interactive elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Function to scroll down to the next section
  const scrollToNextSection = () => {
    const contentSection = document.getElementById('about-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const storyParagraphs = [
    {
      text: "Every great venture begins with a shared vision. Ours started with two individuals who believed in combining practical expertise with strategic foresight to build something remarkable.",
      isIntro: true
    },
    {
      text: "Bright, based in Ghana, brings years of hands-on experience in construction and project execution. His deep understanding of local industry dynamics, attention to detail, and leadership on the ground form the heartbeat of our operations. From managing complex sites to ensuring quality craftsmanship, Bright is the force that turns ideas into tangible results.",
      isIntro: false
    },
    {
      text: "Behind the scenes, Winifred plays a pivotal role as the silent partner. Through her financial backing, strategic guidance, and involvement in key decision-making, she provides the stability and vision needed for sustainable growth. Her support has been instrumental in laying a solid foundation and steering the company toward bigger opportunities.",
      isIntro: false
    },
    {
      text: "Together, Bright and Winifred have built more than just a company — they've built a partnership that merges technical execution, strategic investment, and a shared commitment to excellence. What began as a collaboration between two visionaries has grown into a dynamic enterprise that manages real estate, executes construction projects, and engages in international negotiations, all with integrity at its core.",
      isIntro: false
    }
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentParagraph(prev => Math.min(prev + 1, storyParagraphs.length - 1)),
    onSwipedRight: () => setCurrentParagraph(prev => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-white dark:bg-gray-900 relative transition-colors duration-300">
      {/* Add custom animations */}
      <style>{`
        /* import Tangerine font */
        @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        /* Pulse animation for scroll indicator */
        @keyframes pulse {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(10px) scale(1.1); opacity: 0.8; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-pulse-down {
          animation: pulse 2s ease-in-out infinite;
        }
        
        /* Tangerine font utility */
        .tangerine {
          font-family: 'Tangerine', cursive;
        }

        /* Fade in animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Fade in up animation */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Scale animation for buttons */
        .btn-scale:hover {
          transform: scale(1.05);
        }
        .btn-scale:active {
          transform: scale(0.98);
        }
        
        /* Animation classes */
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .fade-in-up-delay-200 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
        
        .fade-in-up-delay-400 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.4s;
        }
        
        .fade-in-up-delay-600 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.6s;
        }
        
        .fade-in-delay-1200 {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 1.2s;
        }
        
        /* New animations for the hero */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; filter: blur(8px); }
          50% { opacity: 1; filter: blur(12px); }
        }
        
        @keyframes draw-line {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slide-up-fade-in {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animate-draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s ease-out forwards;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .animate-slide-up-fade-in {
          animation: slide-up-fade-in 0.8s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        
        /* Responsive geometric grid */
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
        
        /* Glassmorphism effects */
        .glassmorphism {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glassmorphism {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        /* Story paragraph animations */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .story-paragraph {
          font-family: 'Newsreader', serif;
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .story-paragraph.exit {
          animation: slideOutLeft 0.6s ease-out forwards;
        }
        
        .story-indicator {
          transition: all 0.3s ease;
        }
        
        .story-indicator.active {
          width: 2rem;
          background-color: #DC2626;
        }

        /* Swiper styles */
        .swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
          height: 50vh;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 85vw !important;
          max-width: 800px !important;
          height: 50vh !important;
          display: flex;
          align-items: center;
        }

        .swiper-slide > div {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
        }
      `}</style>

      {/* Add meta viewport tag programmatically */}
      <div dangerouslySetInnerHTML={{
        __html: `
          <meta 
            name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        `
      }} />

      {/* Navigation (adapted from main app, with About Us as active) */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md shadow-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300 bg-white/95 dark:bg-gray-900/95`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-4">
              <img 
                src={logo} 
                alt="Brytwin Homes Logo" 
                className="h-12 w-12 object-contain"
              />
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
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    window.scrollTo(0, 0);
                  }} 
                  className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/about" className="relative text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wide hover:text-red-700 dark:hover:text-red-300 transition-colors group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-100 transition-transform"></span>
                </a>
                <a href="/#services" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/#properties" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Properties
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/#gallery" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="/#contact" onClick={e => {e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>

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

        {/* Mobile Navigation (full implementation copied from App.tsx) */}
        <div className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={toggleMenu}
          />
          
          {/* Modal Content - Updated with solid background */}
          <div className={`fixed inset-0 w-full h-full bg-white dark:bg-gray-900 transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Header - Updated with solid background */}
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

            {/* Navigation Menu - Added solid background to container */}
            <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-gray-900" style={{ height: 'calc(100vh - 92px)' }}>
              <div className="flex-1 px-6 py-8">
                <nav className="space-y-2">
                  <a 
                    href="/" 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu();
                      navigate('/');
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Home
                  </a>
                  <a 
                    href="/about" 
                    onClick={e => {e.preventDefault(); toggleMenu(); navigate('/about');}}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Users className="w-5 h-5 mr-4" />
                    About Us
                  </a>
                  <a 
                    href="#services" 
                    onClick={toggleMenu}
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
                  <ThemeToggle variant="mobile" onToggle={() => setIsMenuOpen(false)} />
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

                  {/* Newsletter Signup */}
                  <div className="mt-8">
                    <h5 className="font-bold mb-3">Newsletter</h5>
                    <div className="flex">
                      <input 
                        type="email" 
                        placeholder="Your email"
                        className="flex-1 px-3 py-2 bg-gray-800 dark:bg-gray-950 text-white rounded-l-lg border border-gray-700 dark:border-gray-600 focus:outline-none focus:border-red-600 dark:focus:border-red-400 transition-colors duration-300"
                      />
                      <button 
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors"
                      >
                        Subscribe
                      </button>
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

      {/* New Architectural Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <img 
            src={patternLight} 
            alt="Pattern" 
            className="w-full h-full object-cover block dark:hidden"
          />
          <img 
            src={patternDark} 
            alt="Pattern" 
            className="w-full h-full object-cover hidden dark:block"
          />
        </div>
        
        {/* Geometric Grid */}
        <div className="absolute inset-0 geo-grid"></div>
        
        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse-glow"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-pulse-glow"
          style={{
            transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        ></div>
        
        {/* SVG Architectural Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-20 dark:opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line text-gray-600 dark:text-gray-400" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-200 text-gray-600 dark:text-gray-400" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-400 text-gray-600 dark:text-gray-400" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-600 text-gray-600 dark:text-gray-400" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-800 text-red-500 dark:text-red-400" />
        </svg>
        
        {/* Rotating Architectural Element */}
        <div className="absolute right-[5%] top-1/4 w-40 h-40 md:w-64 md:h-64 opacity-10 dark:opacity-20 animate-rotate-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-600 dark:text-red-400" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600 dark:text-emerald-400" />
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
            <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
            <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
          </svg>
        </div>
        
        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center pt-16 md:pt-0">
          <div className="text-center max-w-4xl">
            {/* Pre-heading - changed to H1 with Tangerine font and larger size */}
            <h1
              className="tangerine text-4xl md:text-5xl inline-block mb-6 py-2 px-4 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium opacity-0 animate-slide-up-fade-in"
            >
              About Our Company
            </h1>
            
            {/* Main Heading - UPDATED */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 opacity-0 animate-slide-up-fade-in delay-200 tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">Strategic Builders.</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300">Global Negotiators. Trusted Managers.</span>
            </h1>
            
            {/* Subheading - UPDATED */}
            <p 
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 opacity-0 animate-slide-up-fade-in delay-300 max-w-3xl mx-auto"
            >
              We integrate real estate management, construction craftsmanship, and international business strategy to create lasting value across industries and continents.
            </p>
            
            {/* Founders Section - Glassmorphic Cards */}
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 opacity-0 animate-slide-up-fade-in delay-300">
              <span className="font-hurricane text-6xl md:text-7xl text-red-600 dark:text-red-400">Our Founders</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mb-10 opacity-0 animate-slide-up-fade-in delay-400">
              {/* Mr. Bright */}
              <div 
                className="glassmorphism rounded-2xl p-6 flex flex-col items-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg)`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div className="relative w-64 h-80 mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 blur-2xl opacity-50"></div>
                  <img 
                    src={founderBright} 
                    alt="Mr. Bright" 
                    className="w-full h-full object-cover rounded-2xl relative z-10 border-2 border-white dark:border-gray-800 shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Mr. Bright Nana Nyarko Akrofi</h3>
                  <p className="text-base text-red-600 dark:text-red-400 font-medium mb-3">Founder & CEO</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "Building tomorrow's landmarks with today's vision."
                  </p>
                </div>
              </div>
              
              {/* Mrs. Winifred */}
              <div 
                className="glassmorphism rounded-2xl p-6 flex flex-col items-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg)`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div className="relative w-64 h-80 mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 blur-2xl opacity-50"></div>
                  <img 
                    src={founderWinifred} 
                    alt="Mrs. Winifred" 
                    className="w-full h-full object-cover rounded-2xl relative z-10 border-2 border-white dark:border-gray-800 shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dr. Winifred Danso Agyemang</h3>
                  <p className="text-base text-emerald-600 dark:text-emerald-400 font-medium mb-3">Co-Founder & COO</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "Excellence in every detail, integrity in every project."
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 opacity-0 animate-slide-up-fade-in delay-500">
              
              <button 
                className="relative overflow-hidden group px-8 py-4 border-2 border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 hover:text-white dark:hover:text-white rounded-lg font-bold transition-all duration-300"
              >
                <span className="relative z-10">Our Services</span>
                <span className="absolute inset-0 w-full h-full bg-emerald-500 dark:bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0 animate-slide-up-fade-in delay-700"
            onClick={scrollToNextSection}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center animate-pulse-glow">
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated About Content Section */}
      <section id="about-content" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="tangerine text-7xl md:text-8xl font-bold text-gray-900 dark:text-white mb-12">
              Our Story
            </h1>
          </div>
          
          {/* Desktop and Mobile Layout Container */}
          <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8 lg:gap-16">
            {/* Content Area */}
            <div className="lg:w-2/3" {...handlers}>
              {/* Story Content */}
              <div className="relative min-h-[300px] mb-4 lg:mb-0">
                <div 
                  key={currentParagraph}
                  className={`story-paragraph ${
                    storyParagraphs[currentParagraph].isIntro 
                      ? 'text-xl md:text-2xl font-medium' 
                      : 'text-lg md:text-xl'
                  } leading-relaxed tracking-wide text-gray-700 dark:text-gray-300`}
                >
                  {storyParagraphs[currentParagraph].text}
                </div>
              </div>

              {/* Mobile-only Progress Indicators */}
              <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
                {storyParagraphs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentParagraph(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentParagraph
                        ? 'story-indicator active bg-red-600 dark:bg-red-500'
                        : 'story-indicator w-4 bg-gray-300 dark:bg-gray-700'
                    }`}
                    aria-label={`Go to paragraph ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Navigation Pills */}
            <div className="hidden lg:flex lg:w-1/3 flex-col justify-start items-start space-y-4 pt-4">
              {storyParagraphs.map((_paragraph, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentParagraph(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    index === currentParagraph
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="block font-medium">
                    {index === 0 ? 'Vision' : 
                     index === 1 ? 'Leadership' :
                     index === 2 ? 'Partnership' :
                     'Growth'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Hint - Mobile only */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 lg:hidden">
            Swipe to navigate through the story
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 relative">
                <span className="absolute -top-8 text-7xl font-tangerine text-red-600/20 dark:text-red-500/20">Vision</span>
                Our Vision
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-newsreader">
                  "We create value beyond real estate. We shape the future of how you work, live and play. Through exceptional service, hospitality, amenities, and technology, we offer an advanced atmosphere of well-being."
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 relative">
                <span className="absolute -top-8 text-7xl font-tangerine text-emerald-600/20 dark:text-emerald-500/20">Mission</span>
                Our Mission
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-newsreader">
                  To revolutionize the real estate and construction landscape by delivering unparalleled quality, fostering innovation, and building lasting relationships. We are committed to:
                </p>
                <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300 font-newsreader">
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-emerald-500 rounded-full"></span>
                    Executing construction projects with precision and excellence
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-emerald-500 rounded-full"></span>
                    Building strategic international partnerships
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-emerald-500 rounded-full"></span>
                    Managing estates with professionalism and dedication
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-emerald-500 rounded-full"></span>
                    Creating sustainable value for our stakeholders
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us Section */}
      <section className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 relative">
              <span className="absolute -top-8 text-7xl font-tangerine text-red-600/20 dark:text-red-500/20 w-full text-center">Excellence</span>
              Why Clients Choose Us
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>

          {/* Swiper Container */}
          <div className="max-w-[95vw] mx-auto">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
              cardsEffect={{
                perSlideOffset: 8,
                perSlideRotate: 2,
                rotate: true,
                slideShadows: true,
              }}
            >
              {/* Hands-On Expertise */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 overflow-hidden h-full relative">
                  <img src={constructionImg} alt="Construction Expertise" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-colors">
                      Hands-On Expertise
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Led by an active contractor who brings on-site experience to every decision.
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Smart Investment & Strategy */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 overflow-hidden h-full relative">
                  <img src={estateImg} alt="Real Estate Investment" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-colors">
                      Smart Investment & Strategy
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      Strong financial backing ensures smooth project execution and growth.
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* On-Time Delivery */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 overflow-hidden h-full relative">
                  <img src={deliveryImg} alt="On-Time Delivery" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-colors">
                      On-Time Delivery
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      We prioritize deadlines without compromising quality.
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Smart Investment */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 overflow-hidden h-full relative">
                  <img src={investmentImg} alt="Smart Investment" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-colors">
                      Smart Investment
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      We ensure your investments are secure and yield maximum returns.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <button 
                onClick={() => swiper?.slidePrev()}
                className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                <span className="font-hurricane text-3xl text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Previous</span>
              </button>
              <button 
                onClick={() => swiper?.slideNext()}
                className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Next slide"
              >
                <span className="font-hurricane text-3xl text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Next</span>
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="pt-3 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" data-aos="fade-up">
                Building More Than Structures —<br />
                <span className="text-red-600 dark:text-red-400">We Build Trust.</span>
              </h2>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-newsreader" data-aos="fade-up" data-aos-delay="100">
                At Brytwin Homes, every project is a promise — to our clients, our team, and our community. We commit to transparency, sustainability, and quality craftsmanship in everything we build.
              </p>
              
              <button 
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:-translate-y-1 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Let's Build Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer id="contact" className="bg-gray-900 dark:bg-gray-950 text-white py-16 scroll-mt-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <li><a href="#properties" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Properties</a></li>
                <li><a href="#gallery" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-gray-400 dark:text-gray-500">(+233) 55 805 6649</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <span className="text-gray-400 dark:text-gray-500">info@brytwinhomes.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
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
                  <button 
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 dark:border-gray-600 pt-8 text-center">
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">
              © 2024 Brytwin Homes & Construction Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
