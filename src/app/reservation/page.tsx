"use client";
import React, { useState } from 'react';
import { createReservation } from '@/api/api';
import { Calendar, Users, Clock, Phone, User, CheckCircle2, ChevronRight, Loader2, Mail, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    tablePreference: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createReservation({
        ...formData,
        tableNumber: formData.tablePreference || 'Unassigned'
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 1, tablePreference: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-40 bg-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full p-12 bg-white rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-br-full -z-10 animate-pulse"></div>
          <div className="h-24 w-24 bg-accent/10 flex items-center justify-center rounded-full mx-auto mb-10 shadow-lg shadow-accent/5">
            <CheckCircle2 className="h-12 w-12 text-accent" />
          </div>
          <h2 className="text-4xl font-bold font-headings text-gray-900 mb-4 tracking-tight">Booking Request Sent!</h2>
          <p className="text-gray-500 text-lg mb-10 font-body px-8 font-medium leading-relaxed italic">"We've received your request for table reservation. Our team will verify and confirm your table shortly. See you soon!"</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
          >
            New Reservation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-section-bg overflow-hidden relative pt-34">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 rounded-l-[200px] -z-10 hidden lg:block translate-y-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white px-4 py-1.5 rounded-full border border-orange-50 drop-shadow-sm font-body">Premium Dining</span>
            <h1 className="text-5xl md:text-7xl font-bold font-headings text-gray-900 leading-tight tracking-tight">Reserve Your <br />Table Today</h1>
            <p className="text-lg text-gray-400 font-body leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium italic border-l-4 border-primary pl-8 py-4">
              "Experience authentic flavors and curated dining. For group bookings of more than 10, please contact us directly."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
               <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-50 flex flex-col items-center sm:items-start group transition-all hover:-translate-y-2">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white"><Calendar size={24} /></div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Live Status</h4>
                  <p className="text-sm text-gray-500 font-medium">Get instant updates on your table confirmation.</p>
               </div>
               <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-50 flex flex-col items-center sm:items-start group transition-all hover:-translate-y-2">
                  <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 transition-colors group-hover:bg-accent group-hover:text-white"><Hash size={24} /></div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Pick Your Spot</h4>
                  <p className="text-sm text-gray-500 font-medium">Mention a specific table number if you have a favorite!</p>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white p-10 md:p-14 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 relative"
            >
              <h2 className="text-3xl font-bold font-headings text-gray-900 mb-10 tracking-tight flex items-center space-x-3">
                 <span className="h-1 w-8 bg-primary rounded-full"></span>
                 <span>Guest Details</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Full Name</label>
                    <User className="absolute left-6 bottom-4.5 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Email</label>
                    <Mail className="absolute left-6 bottom-4.5 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="relative group">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Phone Number</label>
                      <Phone className="absolute left-6 bottom-4.5 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98XXX XXX00"
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                   </div>
                   <div className="relative group">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Table Preference</label>
                      <Hash className="absolute left-6 bottom-4.5 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        type="text"
                        name="tablePreference"
                        placeholder="e.g. 05 (Optional)"
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
                        value={formData.tablePreference}
                        onChange={handleChange}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Date</label>
                    <Calendar className="absolute left-6 bottom-4.5 text-gray-300" size={20} />
                    <input type="date" name="date" required className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-xs font-bold" value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Time</label>
                    <Clock className="absolute left-6 bottom-4.5 text-gray-300" size={20} />
                    <input type="time" name="time" required className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-xs font-bold" value={formData.time} onChange={handleChange} />
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Guests</label>
                    <Users className="absolute left-6 bottom-4.5 text-gray-300" size={20} />
                    <input type="number" name="guests" min="1" required className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-xs font-bold" value={formData.guests} onChange={handleChange} />
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl border border-red-100 text-center">{error}</p>}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 bg-primary text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transform transition-all shadow-xl shadow-orange-200 disabled:opacity-70 mt-4 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      <span>Submit Seating Request</span>
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
