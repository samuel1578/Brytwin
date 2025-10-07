import { useStaggeredInView } from '../hooks/useInView';
import { 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import logo from '../logo.jpeg';

const Footer = () => {
  const contactSectionRef = useStaggeredInView<HTMLDivElement>(4, 100);

  return (
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
  );
};

export default Footer;
