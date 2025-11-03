import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import logo from '../logo.jpeg';
import sream from '../sream.jpg';
import scons from '../scons.jpg';
import sint from '../sint.jpg';
import mrBright from '../mr-bright.png';
import { ThemeToggle } from '../components/ThemeToggle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import BookingModal from '../components/BookingModal';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Services: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        
        @keyframes draw-line {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        
        .animate-draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s ease-out forwards;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
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

        /* Swiper Cards Custom Styles */
        .mySwiper {
          width: 100%;
          height: 500px;
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide-active {
          transform: scale(1);
        }

        .swiper-slide-next {
          transform: scale(0.9);
        }

        .swiper-slide-prev {
          transform: scale(0.9);
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
                <a
                  href="/services"
                  onClick={e => {e.preventDefault(); navigate('/services');}}
                  className="relative text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wide hover:text-red-700 dark:hover:text-red-300 transition-colors group"
                >
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400 transform scale-x-100 transition-transform"></span>
                </a>
                <a href="/properties" onClick={e => {e.preventDefault(); navigate('/properties');}} className="relative text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide hover:text-red-600 dark:hover:text-red-400 transition-colors group">
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
                    className="flex items-center px-4 py-4 text-lg font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Truck className="w-5 h-5 mr-4" />
                    Services
                  </a>
                  <a
                    href="/properties"
                    onClick={e => {e.preventDefault(); toggleMenu(); navigate('/properties');}}
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
                    onClick={() => {
                      toggleMenu();
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
      <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-20 h-[60vh] md:min-h-screen geo-grid">
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
        
        <div className="text-center text-gray-900 dark:text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up">
            Our Services
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-red-600 dark:text-red-400 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Comprehensive Solutions Under One Roof
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            From real estate management to international negotiations, we deliver value through expertise and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-all transform hover:scale-105 animate-bounce-in">
              Get Started
            </button>
            <button className="border-2 border-gray-600 dark:border-gray-400 text-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-400 hover:text-white dark:hover:text-gray-900 px-8 py-4 rounded-lg text-base font-medium transition-all animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Service Overview Cards */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Service Overview
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Discover our comprehensive range of professional services designed to meet all your property and business needs.
            </p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real Estate Management Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={sream} 
                  alt="Real Estate Management" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  Real Estate Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                  Professional property management and sales services for luxury residential and commercial properties, ensuring optimal returns and tenant satisfaction.
                </p>
                <button 
                  onClick={() => setSelectedService('real-estate')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* General Construction Works Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={scons} 
                  alt="General Construction Works" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  General Construction Works
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                  Complete construction services from foundation to finish, delivering quality craftsmanship and innovative building solutions for residential and commercial projects.
                </p>
                <button 
                  onClick={() => setSelectedService('construction')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* International Negotiations Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={sint} 
                  alt="International Negotiations" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  International Negotiations
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                  Expert international business negotiations and partnerships, facilitating cross-border deals and strategic alliances for global business expansion.
                </p>
                <button 
                  onClick={() => setSelectedService('negotiations')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Swiper Layout */}
          <div className="md:hidden relative">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSwiper={setSwiperInstance}
            >
              {/* Real Estate Management Card */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={sream} 
                      alt="Real Estate Management" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                      Real Estate Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                      Professional property management and sales services for luxury residential and commercial properties, ensuring optimal returns and tenant satisfaction.
                    </p>
                    <button 
                      onClick={() => setSelectedService('real-estate')}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* General Construction Works Card */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={scons} 
                      alt="General Construction Works" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                      General Construction Works
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                      Complete construction services from foundation to finish, delivering quality craftsmanship and innovative building solutions for residential and commercial projects.
                    </p>
                    <button 
                      onClick={() => setSelectedService('construction')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* International Negotiations Card */}
              <SwiperSlide>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={sint} 
                      alt="International Negotiations" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                      International Negotiations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                      Expert international business negotiations and partnerships, facilitating cross-border deals and strategic alliances for global business expansion.
                    </p>
                    <button 
                      onClick={() => setSelectedService('negotiations')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl font-hurricane text-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl font-hurricane text-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Value Proposition Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Why Choose Brytwin Homes?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
                With over a decade of excellence in real estate, construction, and international business, we stand apart through our unwavering commitment to quality, integrity, and innovative solutions that exceed expectations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      Proven Track Record
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Successfully completed over 500 projects across residential, commercial, and international markets with a 98% client satisfaction rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      Global Network & Expertise
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Extensive international partnerships and deep market knowledge across Africa, Europe, and beyond, ensuring seamless cross-border transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      End-to-End Solutions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      From initial consultation to project completion, we provide comprehensive services under one roof, eliminating the need for multiple contractors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Visual */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 transition-colors duration-300">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2 font-hurricane">
                      15+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 font-hurricane">
                      500+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
                      Projects Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-hurricane">
                      98%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
                      Client Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 font-hurricane">
                      25+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide transition-colors duration-300">
                      International Partners
                    </div>
                  </div>
                </div>

                {/* Key Strengths List */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 transition-colors duration-300">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    Our Competitive Advantages
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      <span className="text-sm">Strong international network & partnerships</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                      <span className="text-sm">Integrated one-stop solutions</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-sm">Proven track record of success</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span className="text-sm">Commitment to quality & innovation</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                      <span className="text-sm">Local expertise with global standards</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8 text-center">
                  <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-base font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Start Your Project Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 geo-grid overflow-hidden">
        {/* SVG Architectural Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-20 dark:opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line text-gray-600 dark:text-gray-400" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-200 text-gray-600 dark:text-gray-400" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-400 text-gray-600 dark:text-gray-400" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-600 text-gray-600 dark:text-gray-400" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" className="animate-draw-line delay-800 text-red-500 dark:text-red-400" />
        </svg>

        {/* Rotating Architectural Element */}
        <div className="absolute right-[10%] top-1/4 w-32 h-32 md:w-48 md:h-48 opacity-10 dark:opacity-20 animate-rotate-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-600 dark:text-red-400" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600 dark:text-emerald-400" />
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
            <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
            <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600 dark:text-gray-400" />
          </svg>
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up">
            Ready to Build Your Vision with Us?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Let's discuss your project and turn your dreams into reality. Our team is ready to bring expertise, innovation, and dedication to your next venture.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 rounded-xl text-xl font-bold uppercase tracking-wide shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 animate-bounce-in"
            >
              Contact Us
            </button>
            <button className="border-2 border-gray-600 dark:border-gray-400 text-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-400 hover:text-white dark:hover:text-gray-900 px-12 py-5 rounded-xl text-xl font-bold uppercase tracking-wide transition-all animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedService === 'real-estate' && '🏘 Real Estate Management'}
                  {selectedService === 'construction' && '🏗 General Construction Works'}
                  {selectedService === 'negotiations' && '🌍 International Negotiations'}
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {selectedService === 'real-estate' && (
                  <div>
                    <img src={sream} alt="Real Estate Management" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Our comprehensive real estate management services ensure your properties are professionally maintained and optimally valued. We handle everything from tenant screening and lease management to property maintenance and financial reporting.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Property Management</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Tenant screening and leasing</li>
                          <li>• Rent collection and accounting</li>
                          <li>• Property maintenance coordination</li>
                          <li>• Legal compliance management</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sales & Acquisitions</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Market analysis and valuation</li>
                          <li>• Property marketing and sales</li>
                          <li>• Investment property acquisition</li>
                          <li>• Portfolio management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedService === 'construction' && (
                  <div>
                    <img src={scons} alt="General Construction Works" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      From concept to completion, our construction expertise delivers high-quality buildings that stand the test of time. We specialize in both residential and commercial projects, employing modern techniques and materials.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Residential Construction</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Custom home building</li>
                          <li>• Renovation and remodeling</li>
                          <li>• Architectural design services</li>
                          <li>• Project management</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Commercial Construction</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Office buildings</li>
                          <li>• Retail spaces</li>
                          <li>• Industrial facilities</li>
                          <li>• Infrastructure development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedService === 'negotiations' && (
                  <div>
                    <img src={sint} alt="International Negotiations" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Our international negotiation expertise facilitates successful cross-border business deals and partnerships. We leverage our global network and negotiation skills to secure favorable terms for our clients.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Business Negotiations</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Contract negotiations</li>
                          <li>• Partnership agreements</li>
                          <li>• Joint venture facilitation</li>
                          <li>• Dispute resolution</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">International Services</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Cross-border transactions</li>
                          <li>• International market entry</li>
                          <li>• Cultural business consulting</li>
                          <li>• Global partnership development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="text-center mb-8">
                {/* Mr. Bright's Picture - Small Circle Style */}
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 dark:border-red-400 shadow-lg">
                    <img
                      src={mrBright}
                      alt="Mr. Bright - CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    CEO
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Mr. Bright
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  CEO & Founder, Brytwin Homes & Construction Limited
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone Number */}
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">(+233) 55 805 6649</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">info@brytwinhomes.com</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">📱</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Follow Us</p>
                    <div className="flex space-x-3">
                      <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" />
                      <Twitter className="w-8 h-8 text-blue-400 hover:text-blue-500 cursor-pointer transition-colors" />
                      <Instagram className="w-8 h-8 text-pink-600 hover:text-pink-700 cursor-pointer transition-colors" />
                      <Linkedin className="w-8 h-8 text-blue-700 hover:text-blue-800 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Ready to start your project? We're here to help bring your vision to life.
                </p>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
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
                  <span className="text-gray-400 dark:text-gray-500">(+1 (904) 767-3657)</span>
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

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default Services;
