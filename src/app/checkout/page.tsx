"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { CheckCircle, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      setTimeout(() => router.push('/'), 5000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-section-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white max-w-md w-full p-12 rounded-[50px] shadow-2xl shadow-green-100 text-center border border-green-50 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform"></div>
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
             <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold font-headings text-gray-900 mb-4 tracking-tight">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8 font-medium leading-relaxed">Your exquisite meal is being prepared with love. We'll deliver it to your address shortly.</p>
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-2 rounded-full mb-4">
             <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Redirecting Home</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-section-bg flex items-center justify-center p-4 text-center">
         <div className="space-y-6">
            <div className="bg-orange-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto">
               <ShoppingBag size={48} className="text-primary/30" />
            </div>
            <h2 className="text-2xl font-bold font-headings text-gray-900">Your basket is empty</h2>
            <button onClick={() => router.push('/menu')} className="bg-primary text-white font-bold px-8 py-4 rounded-3xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 block mt-8 animate-bounce">
              Return to Menu
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-bg pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-10 md:p-12 rounded-[50px] shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-12 w-24 h-4 bg-primary/10 rounded-b-full"></div>
             
             <div className="flex items-center space-x-4 mb-10">
                <div className="h-14 w-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl"><ShieldCheck size={24} /></div>
                <h2 className="text-3xl font-bold font-headings text-gray-900 tracking-tight">Checkout <span className="text-primary italic">Details</span></h2>
             </div>

             <form onSubmit={handleSubmit} className="space-y-10">
               <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">Delivery Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input required className="bg-gray-50 px-8 py-5 rounded-[28px] outline-none font-bold border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all text-gray-700" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input required type="email" className="bg-gray-50 px-8 py-5 rounded-[28px] outline-none font-bold border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all text-gray-700" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <input required className="w-full bg-gray-50 px-8 py-5 rounded-[28px] outline-none font-bold border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all text-gray-700" placeholder="Delivery Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  <div className="grid grid-cols-2 gap-8">
                    <input required className="bg-gray-50 px-8 py-5 rounded-[28px] outline-none font-bold border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all text-gray-700" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    <input required className="bg-gray-50 px-8 py-5 rounded-[28px] outline-none font-bold border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all text-gray-700" placeholder="Post Code" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                  </div>
               </div>
               
               <div className="space-y-8 pt-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">Payment Option</h3>
                  <div className="p-6 border-2 border-primary bg-primary/5 rounded-[32px] flex items-center space-x-4 cursor-pointer">
                    <div className="h-6 w-6 rounded-full border-4 border-primary bg-white"></div>
                    <div>
                       <p className="font-bold text-gray-900 leading-none mb-1 text-lg">Cash on Delivery</p>
                       <p className="text-xs text-gray-500 font-medium">Pay securely at your doorstep</p>
                    </div>
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gray-900 text-white mt-10 py-6 rounded-[32px] font-bold text-xl flex items-center justify-center space-x-3 shadow-2xl hover:bg-primary transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CreditCard size={22} />
                  <span>{isProcessing ? 'Processing Order...' : `Place Order • ₹${totalPrice}`}</span>
               </button>
             </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-white p-10 md:p-12 rounded-[50px] shadow-xl shadow-orange-50/50 border border-orange-50 sticky top-32">
             <h3 className="text-2xl font-bold font-headings text-gray-900 mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
                Order Summary
                <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{cart.length} Items</span>
             </h3>
             
             <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                {cart.map(item => (
                   <div key={item._id} className="flex gap-4 group">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-2xl bg-gray-50 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                         <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                   </div>
                ))}
             </div>

             <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-medium">
                   <span>Subtotal</span>
                   <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                   <span>Delivery</span>
                   <span className="text-accent font-bold uppercase tracking-widest text-[10px] bg-accent/10 px-2 py-1 rounded border border-accent/20">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t border-gray-100 mt-4 leading-none">
                   <span>Total</span>
                   <span>₹{totalPrice}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
