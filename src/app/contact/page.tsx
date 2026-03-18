"use client";
import React, { useState } from 'react';
import { sendMessage } from '@/api/api';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-primary/5 w-[120%] h-[120%] blur-3xl opacity-30"></div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white px-4 py-1.5 rounded-full border border-orange-50 drop-shadow-sm font-body">Connect With Us</span>
            <h1 className="text-5xl md:text-7xl font-bold font-headings text-gray-900 mt-2 tracking-tight">Let's Start a <br />Conversation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-start">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="bg-section-bg p-8 rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-xl hover:shadow-orange-50 hover:bg-white transition-all group">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white"><Phone size={24} /></div>
                  <h3 className="text-xl font-bold font-headings text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-500 font-medium text-sm">+91 96023 98321</p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-bold">Customer Support</p>
               </div>
               <div className="bg-section-bg p-8 rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-xl hover:shadow-orange-50 hover:bg-white transition-all group">
                  <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 transition-colors group-hover:bg-accent group-hover:text-white"><Mail size={24} /></div>
                  <h3 className="text-xl font-bold font-headings text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-500 font-medium text-sm">hello@tastybites.com</p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-bold">General Enquiries</p>
               </div>
            </div>

            <div className="bg-gray-900 p-10 rounded-[60px] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
               <div className="flex items-start space-x-6">
                  <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-lg backdrop-blur-md"><MapPin size={28} /></div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-bold font-headings">Visit Our Restaurant</h3>
                     <p className="text-gray-400 text-lg leading-relaxed font-body italic">123 Food Street, Delicious City, <br />GA 30303, United States</p>
                  </div>
               </div>
               <div className="mt-12 w-full h-80 bg-gray-800 rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all border border-white/5 shadow-inner flex items-center justify-center cursor-default">
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Restaurant Interior" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex items-center space-x-3 text-gray-900 drop-shadow-xl animate-bounce">
                     <MapPin size={20} className="text-primary" />
                     <span className="font-bold text-sm">Open in Maps</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-16 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 text-center relative h-full flex flex-col items-center justify-center"
              >
                <div className="h-24 w-24 bg-accent/10 flex items-center justify-center rounded-full mb-10">
                  <CheckCircle2 className="h-12 w-12 text-accent" />
                </div>
                <h2 className="text-4xl font-bold font-headings text-gray-900 mb-4 tracking-tight">Message Sent!</h2>
                <p className="text-gray-500 text-lg font-body px-8 font-medium leading-relaxed italic">"Thank you for reaching out. Our team will get back to you within 24 hours."</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-12 bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 md:p-14 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 relative"
              >
                <h2 className="text-3xl font-bold font-headings text-gray-900 mb-10 tracking-tight flex items-center space-x-3">
                   <span className="h-1 w-8 bg-primary rounded-full"></span>
                   <span>Write to Us</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="hello@example.com"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-3 bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-orange-600 hover:scale-[1.02] transform transition-all shadow-xl shadow-orange-200 disabled:opacity-70 mt-4"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-6 w-6" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

