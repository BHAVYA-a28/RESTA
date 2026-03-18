"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, User, LogIn, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/api/auth/login', { email: identifier, password });
      login(data, data.token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-section-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 md:p-14 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 text-center relative overflow-hidden"
      >
        {/* Aesthetic Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
        
        <div className="h-20 w-20 bg-primary/10 flex items-center justify-center rounded-3xl mx-auto mb-10 shadow-inner group">
           <ShieldCheck className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform" />
        </div>
        
        <h2 className="text-4xl font-black font-headings text-gray-900 mb-2 tracking-tighter">Admin <span className="text-primary italic">Portal</span></h2>
        <p className="text-gray-400 font-bold mb-12 text-xs uppercase tracking-widest italic opacity-70">"Secure access for restaurant management"</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group text-left">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4 mb-3">Username / Email</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="text"
                required
                className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-bold text-gray-600 shadow-inner placeholder:text-gray-300 text-sm"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin"
              />
            </div>
          </div>

          <div className="relative group text-left">
             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4 mb-3">Secret Password</label>
             <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-bold text-gray-600 shadow-inner placeholder:text-gray-300 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 text-red-600 bg-red-50 p-5 rounded-2xl border border-red-100 text-[10px] font-black uppercase tracking-widest"
            >
                <AlertCircle size={18} className="shrink-0" />
                <span className="leading-tight">{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-primary text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 shadow-2xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <>
                <span>Enter Admin Panel</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-2">
           <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Unauthorized access is monitored</p>
           <div className="h-1 w-12 bg-gray-50 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

