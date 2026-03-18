import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Info Area */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold font-headings text-white">Tasty<span className="text-primary">Bites</span></h3>
          <p className="text-sm leading-relaxed">
            Experience the finest flavors and warm hospitality in the heart of the city. We serve authentic dishes crafted with love and fresh ingredients.
          </p>
        </div>

        {/* Links Area */}
        <div>
          <h4 className="text-lg font-bold font-headings text-white mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
            <li><Link to="/reservation" className="hover:text-primary transition-colors">Book a Table</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/admin" className="hover:text-primary/70 transition-colors text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-4 inline-block">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Contact Area */}
        <div>
          <h4 className="text-lg font-bold font-headings text-white mb-6 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-3"><MapPin size={18} className="text-primary" /> <span>123 Food Street, Delicious City</span></li>
            <li className="flex items-center space-x-3"><Phone size={18} className="text-primary" /> <span>+1 (555) 123-4567</span></li>
            <li className="flex items-center space-x-3"><Mail size={18} className="text-primary" /> <span>hello@tastybites.com</span></li>
          </ul>
        </div>

        {/* Hours Area */}
        <div>
          <h4 className="text-lg font-bold font-headings text-white mb-6 uppercase tracking-wider">Opening Hours</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between"><span>Mon - Fri:</span> <span>10:00 AM - 10:00 PM</span></li>
            <li className="flex justify-between"><span>Sat - Sun:</span> <span>09:00 AM - 11:00 PM</span></li>
          </ul>
          <div className="flex space-x-4 mt-8">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-all text-white"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-all text-white"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-all text-white"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
