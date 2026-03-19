"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, ShoppingBag, Phone, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'Orders', path: '/orders', icon: Star },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-[100]">
      {/* Floating Cart Indicator */}
      <AnimatePresence>
        {totalItems > 0 && pathname === '/menu' && (
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -16, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#303030] text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl border border-white/5 active:scale-95 transition-all mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight uppercase tracking-widest">{totalItems} Items Added</p>
                <p className="text-[10px] text-gray-400 font-medium">View Basket to Confirm</p>
              </div>
            </div>
            <p className="text-sm font-black flex items-center gap-1 uppercase tracking-widest">
              PROCEED <ShoppingBag size={14} className="mb-0.5" />
            </p>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Nav Bar */}
      <div className="bg-white/80 backdrop-blur-2xl rounded-[30px] border border-gray-100 shadow-2xl flex items-center justify-around p-3 px-6 shadow-gray-200/50">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`flex flex-col items-center gap-1 relative ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-primary/5' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-0 scale-50'} transition-all`}>{link.name}</span>
              {isActive && (
                <motion.div layoutId="activeTabIcon" className="absolute -bottom-1 h-1 w-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
        <button
          onClick={() => setIsCartOpen(true)}
          className={`flex flex-col items-center gap-1 relative ${totalItems > 0 ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`p-2 rounded-2xl relative transition-all ${totalItems > 0 ? 'bg-primary/5 animate-pulse' : ''}`}>
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${totalItems > 0 ? 'opacity-100' : 'opacity-0 scale-50'}`}>Basket</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
