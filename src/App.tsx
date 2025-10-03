import { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Shield,
  Award,
  Users,
  CheckCircle,
  Home,
  Building,
  Truck,
  Globe,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import logo from './logo.jpeg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    {
      icon: <Home className="w-12 h-12 text-white" />,
      title: "Estate Management & Sales",
      description: "Professional property management and sales services for luxury residential and commercial properties.",
      color: "bg-emerald-600",
      image: "estate-management.jpg"
    },
    {
      icon: <Building className="w-12 h-12 text-white" />,
      title: "General Construction",
      description: "Complete construction services from foundation to finish, delivering quality craftsmanship.",
      color: "bg-red-600",
      image: "construction.jpg"
    },
    {
      icon: <Truck className="w-12 h-12 text-white" />,
      title: "Goods & Services Supply",
      description: "Comprehensive supply chain solutions for construction materials and specialized services.",
      color: "bg-emerald-600",
      image: "supply-chain.jpg"
    },
    {
      icon: <Globe className="w-12 h-12 text-white" />,
      title: "International Negotiation",
      description: "Expert negotiation services for international property deals and construction contracts.",
      color: "bg-red-600",
      image: "negotiation.jpg"
    }
  ];

  const properties = [
    {
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Luxury Villa Estate",
      price: "$2,500,000",
      location: "Prime Location",
      beds: 5,
      baths: 4,
      area: "4,200 sq ft"
    },
    {
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Modern Family Home",
      price: "$1,850,000",
      location: "Residential Area",
      beds: 4,
      baths: 3,
      area: "3,500 sq ft"
    },
    {
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Executive Townhouse",
      price: "$1,200,000",
      location: "City Center",
      beds: 3,
      baths: 2.5,
      area: "2,800 sq ft"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Investor",
      content: "Brytwin Homes delivered exceptional service throughout our property acquisition. Their international negotiation expertise saved us significant costs.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      content: "The construction quality exceeded our expectations. Professional team, on-time delivery, and outstanding attention to detail.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Business Owner",
      content: "Their estate management services have been invaluable for our commercial properties. Highly recommend their expertise.",
      rating: 5
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Trust",
      description: "Proven track record with transparent processes"
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Quality",
      description: "Premium craftsmanship in every project"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Professionalism",
      description: "Dedicated team of industry experts"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: "Experience",
      description: "Years of successful project delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Add custom animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hurricane&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500&display=swap');
        
        /* Add animations for About section */
        @keyframes float-diagonal {
          0% {
            transform: translateX(-100%) translateY(100%);
          }
          100% {
            transform: translateX(100%) translateY(-100%);
          }
        }
        
        .diagonal-float {
          animation: float-diagonal 15s linear infinite;
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
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100">
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
                <h1 
                  className="text-3xl font-normal text-gray-900 leading-none"
                  style={{ fontFamily: 'Hurricane, cursive' }}
                >
                  Brytwin Homes
                </h1>
                <p className="text-xs text-gray-600 font-medium tracking-wide uppercase">
                  & Construction Limited
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <a href="#home" className="relative text-red-600 font-semibold text-sm uppercase tracking-wide hover:text-red-700 transition-colors group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-100 transition-transform"></span>
                </a>
                <a href="#about" className="relative text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-red-600 transition-colors group">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#services" className="relative text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-red-600 transition-colors group">
                  Services
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#properties" className="relative text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-red-600 transition-colors group">
                  Properties
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#gallery" className="relative text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-red-600 transition-colors group">
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#contact" className="relative text-gray-700 font-semibold text-sm uppercase tracking-wide hover:text-red-600 transition-colors group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                
                {/* CTA Button */}
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all"
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
        }`} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={toggleMenu}
            style={{ width: '100vw', height: '100vh' }}
          />
          
          {/* Modal Content */}
          <div className={`relative w-full h-full bg-white transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`} style={{ width: '100vw', height: '100vh', maxHeight: '100vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="Brytwin Homes Logo" 
                  className="h-10 w-10 object-contain"
                />
                
                <div className="flex flex-col">
                  <h1 
                    className="text-2xl font-normal text-gray-900 leading-none"
                    style={{ fontFamily: 'Hurricane, cursive' }}
                  >
                    Brytwin Homes
                  </h1>
                  <p className="text-xs text-gray-600 font-medium tracking-wide uppercase">
                    & Construction Limited
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleMenu}
                className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col h-full overflow-y-auto" style={{ height: 'calc(100vh - 92px)' }}>
              <div className="flex-1 px-6 py-8">
                <nav className="space-y-2">
                  <a 
                    href="#home" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-red-600 bg-red-50 rounded-xl transition-all hover:bg-red-100"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Home
                  </a>
                  <a 
                    href="#about" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-xl transition-all hover:bg-gray-50 hover:text-red-600"
                  >
                    <Users className="w-5 h-5 mr-4" />
                    About Us
                  </a>
                  <a 
                    href="#services" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-xl transition-all hover:bg-gray-50 hover:text-red-600"
                  >
                    <Building className="w-5 h-5 mr-4" />
                    Services
                  </a>
                  <a 
                    href="#properties" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-xl transition-all hover:bg-gray-50 hover:text-red-600"
                  >
                    <Home className="w-5 h-5 mr-4" />
                    Properties
                  </a>
                  <a 
                    href="#gallery" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-xl transition-all hover:bg-gray-50 hover:text-red-600"
                  >
                    <Globe className="w-5 h-5 mr-4" />
                    Gallery
                  </a>
                  <a 
                    href="#contact" 
                    onClick={toggleMenu}
                    className="flex items-center px-4 py-4 text-lg font-semibold text-gray-700 rounded-xl transition-all hover:bg-gray-50 hover:text-red-600"
                  >
                    <Phone className="w-5 h-5 mr-4" />
                    Contact
                  </a>
                </nav>

                {/* CTA Section */}
                <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-emerald-50 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-600 text-sm mb-4">Book a consultation and let's discuss your project.</p>
                  <button 
                    onClick={toggleMenu}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl text-base font-bold uppercase tracking-wide shadow-lg transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Contact Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-3 text-red-600" />
                      <span className="text-sm">(+233) 55 805 6649</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3 text-red-600" />
                      <span className="text-sm">info@brytwinhomes.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3 text-red-600" />
                      <span className="text-sm">Accra, Ghana</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-gray-200 bg-gray-50 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                    <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500">© 2024 Brytwin Homes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/8487390/pexels-photo-8487390.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          height: '70vh',
          minHeight: '70vh'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4 pt-20 animate-fade-in-up">
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
      </section>

      {/* About Snippet */}
      <section id="about" className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Animated diagonal blocks */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="diagonal-float absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="diagonal-float absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" style={{ animationDelay: '3s', left: '30%' }}></div>
          <div className="diagonal-float absolute w-96 h-96 bg-white/10 rounded-full blur-3xl" style={{ animationDelay: '6s', left: '60%' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              About <span className="font-normal" style={{ fontFamily: 'Hurricane, cursive' }}>Brytwin Homes & Construction Ltd</span>
            </h3>
            <p 
              className="text-xl text-gray-700 max-w-3xl mx-auto" 
              style={{ 
                fontFamily: "'IBM Plex Serif', serif",
                lineHeight: '1.8',
                letterSpacing: '0.01em',
                fontWeight: '400'
              }}
            >
              Born with a hustling mindset but determined scope, Mr. Bright 'Last-Name' turned passion into purpose. Launching and Managing a construction company grounded in hard work, vision, and integrity. Without the industry standard university degree, he relied on hands-on experience and determination to master construction, international management, and estate management. Today, he and his team delivers projects with the same drive that started this journey: Quality, Trust, and Results that last.
            </p>
            <button className="mt-6 text-red-600 font-medium hover:text-red-700 transition-colors flex items-center justify-center mx-auto">
              Read More <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Our Services */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your property and construction needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`/services/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className={`${service.color} w-16 h-16 rounded-xl flex justify-center items-center mb-4 shadow-lg transform -translate-y-10`}>
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{service.title}</h4>
                  <p className="text-white/80 transition-all duration-500 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100 overflow-hidden">
                    {service.description}
                  </p>
                  <button className="mt-4 text-white flex items-center text-sm font-medium">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-full blur-xl"></div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of luxury homes and investment properties
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.price}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h4>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.area}</span>
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your success is our priority. Here's what sets us apart
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear what our satisfied clients have to say about our services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-white mb-8">
            Book a consultation today and let's discuss how we can help you achieve your property goals
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105">
            Book a Consultation Today!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 text-white p-2 rounded-lg mr-3">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Brytwin Homes</h4>
                  <p className="text-sm text-gray-400">& Construction Limited</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner in luxury real estate, construction, and property management services. 
                Excellence in every project, professionalism in every interaction.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors">Properties</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-400">(+233) 55 805 6649</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-400">info@brytwinhomes.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-600 mr-3 mt-1" />
                  <span className="text-gray-400">Accra, Ghana</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <h5 className="font-bold mb-3">Newsletter</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:border-red-600"
                  />
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Brytwin Homes & Construction Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;