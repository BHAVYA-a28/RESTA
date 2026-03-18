import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  const isMenuPage = location.pathname === '/menu';

  return (
    <nav className={`bg-white/80 backdrop-blur-xl fixed w-full z-50 transition-all border-b border-gray-100 ${isMenuPage ? 'h-16' : 'h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-xl md:text-2xl font-black font-headings text-gray-900 tracking-tighter italic">Tasty<span className="text-primary not-italic">Bites</span></span>
          </Link>

          {/* Desktop Nav - Only visible on MD+ */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 py-1 transition-all text-sm font-black uppercase tracking-widest ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                   <motion.span layoutId="activeUnderline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></motion.span>
                )}
              </Link>
            ))}
            
            <button
               onClick={() => setIsCartOpen(true)}
               className="relative p-2.5 text-gray-400 hover:text-primary transition-all group"
            >
               <ShoppingBag size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
               {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">{totalItems}</span>
               )}
            </button>

            <Link
              to="/reservation"
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-orange-100 active:scale-95"
            >
              Book Table
            </Link>
          </div>

          {/* Mobile Right Icons (Minimal) */}
          <div className="flex md:hidden items-center space-x-2">
             <button
               onClick={() => setIsCartOpen(true)}
               className="relative p-2.5 text-gray-800 bg-gray-50 rounded-2xl active:scale-90 transition-all"
            >
               <ShoppingBag size={20} strokeWidth={2.5} />
               {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border-2 border-white">{totalItems}</span>
               )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
