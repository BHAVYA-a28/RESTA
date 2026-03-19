"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { cart, setIsCartOpen } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Orders', path: '/orders' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminLink = user ? { name: 'Admin', path: '/admin' } : { name: 'Login', path: '/login' };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center ext-white shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform"><span className="text-white font-black font-headings text-xl">T</span></div>
              <span className="text-2xl font-black font-headings text-gray-900 tracking-tighter">Tasty<span className="text-primary italic">Bites</span></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="flex space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`font-bold transition-colors text-sm uppercase tracking-widest ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center space-x-6 border-l border-gray-200 pl-6 relative">
                 <Link href={adminLink.path} className="text-gray-500 hover:text-primary transition-colors flex flex-col items-center">
                   <User size={20} />
                   <span className="text-[10px] font-bold mt-1 tracking-widest uppercase">{adminLink.name}</span>
                 </Link>
                 
                 <button onClick={() => setIsCartOpen(true)} className="text-gray-900 hover:text-primary transition-colors relative group">
                   <ShoppingBag size={24} />
                   {totalItems > 0 && (
                     <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-accent text-white font-black text-[10px] rounded-full shadow-md group-hover:scale-110 transition-transform">
                       {totalItems}
                     </span>
                   )}
                 </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-6">
              <button onClick={() => setIsCartOpen(true)} className="text-gray-900 relative">
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-accent text-white font-black text-[10px] rounded-full shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900 hover:text-primary transition-colors">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white pt-32 pb-10 px-6 flex flex-col md:hidden animate-in fade-in slide-in-from-right-full duration-500">
           {/* Close Button Inside Overlay */}
           <button 
             onClick={() => setMobileMenuOpen(false)}
             className="absolute top-8 right-8 h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 shadow-sm border border-gray-100"
           >
             <X size={24} />
           </button>

           <div className="flex flex-col space-y-10 w-full mb-auto mt-12">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-5xl font-black font-headings tracking-tight transition-all active:scale-95 ${pathname === link.path ? 'text-primary' : 'text-gray-900'}`}
                >
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
           </div>
           
           <div className="w-full pt-10 border-t border-gray-100 mt-auto">
              <Link 
                href={adminLink.path} 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-white px-10 py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-orange-200 flex items-center justify-center space-x-3 w-full active:scale-95 transition-all"
              >
                <User size={20} />
                <span>Enter Admin Panel</span>
              </Link>
              <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-8">TastyBites Signature Experience</p>
           </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
