"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 overflow-hidden relative font-body">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-900/20 group-hover:rotate-6 transition-transform">
                <span className="text-2xl font-black font-headings">T</span>
              </div>
              <span className="text-3xl font-black font-headings tracking-tighter">Tasty<span className="text-primary italic">Bites</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Elevating the culinary landscape with authentic spices and modern gastronomy. Join us for an unforgettable dining experience.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/5 hover:border-primary/50">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-headings text-gray-100 uppercase tracking-widest text-[10px]">Cuisine Exploration</h4>
            <ul className="space-y-4">
              {['Home', 'Our Menu', 'Reservations', 'Private Dining', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-primary transition-colors text-sm font-bold flex items-center group">
                    <span className="h-1.5 w-0 bg-primary rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-headings text-gray-100 uppercase tracking-widest text-[10px]">Contact Concierge</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5"><MapPin size={18} /></div>
                <p className="text-gray-400 text-sm font-medium leading-loose">123 Food Street, Delicious City, <br/>GA 30303, United States</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5"><Phone size={18} /></div>
                <p className="text-gray-400 text-sm font-bold tracking-tight">+91 96023 98321</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5"><Mail size={18} /></div>
                <p className="text-gray-400 text-sm font-bold tracking-tight">hello@tastybites.com</p>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-headings text-gray-100 uppercase tracking-widest text-[10px]">Dining Hours</h4>
            <div className="bg-white/5 p-6 rounded-[30px] border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Mon - Fri</span>
                <span className="text-white font-black">11:00 AM - 11:00 PM</span>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Sat - Sun</span>
                <span className="text-white font-black">10:00 AM - 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            <span>Crafted with</span>
            <Heart size={12} className="text-primary fill-primary animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
