"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Utensils, Trash2, ArrowRight, Loader2, CheckCircle2, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, tableNumber, setTableNumber, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      alert("Please enter your Table Number before ordering.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axios.post('/api/orders', {
        items: cart,
        totalAmount: totalPrice,
        tableNumber: tableNumber
      });
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        setIsCartOpen(false);
      }, 3000);
    } catch (error) {
       console.error("Order failed:", error);
       alert("Order could not be placed. Please call a server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white z-[201] shadow-2xl flex flex-col"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-green-50/30">
                 <div className="h-24 w-24 bg-green-100/50 rounded-full flex items-center justify-center mb-8"><CheckCircle2 size={48} className="text-green-600" /></div>
                 <h2 className="text-3xl font-black font-headings text-gray-900 mb-4">Order Received!</h2>
                 <p className="text-gray-500 font-medium italic mb-2">"Chef is preparing your delicacies for Table {tableNumber}."</p>
                 <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">A server will be with you shortly.</p>
              </div>
            ) : (
              <>
                <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
                  <div>
                      <h2 className="text-2xl font-bold font-headings text-gray-900 tracking-tight">Your Table Order</h2>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Dine-in Experience</p>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 active:scale-90 transition-all">
                      <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Table Selection - CRITICAL for Dine-in */}
                <div className="bg-orange-50/50 p-6 border-b border-orange-100">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary border border-orange-100"><Hash size={20}/></div>
                      <div className="flex-grow">
                         <label className="block text-[10px] font-black text-primary/50 uppercase tracking-widest mb-1">Your Table Number</label>
                         <input 
                           type="text" 
                           placeholder="Enter table (e.g., 04)" 
                           className="bg-transparent text-xl font-black text-gray-900 focus:outline-none placeholder:text-gray-200 w-full"
                           value={tableNumber}
                           onChange={(e) => setTableNumber(e.target.value)}
                         />
                      </div>
                   </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="bg-gray-50 p-10 rounded-[40px] mb-4"><Utensils size={48} className="text-gray-200" /></div>
                      <h3 className="text-xl font-bold text-gray-900">Your platter is empty</h3>
                      <p className="text-gray-400 text-xs uppercase font-black tracking-widest">Add some delicacies to start.</p>
                      <button onClick={() => setIsCartOpen(false)} className="mt-8 bg-primary text-white px-10 py-4 rounded-3xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all">Browse Menu</button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div layout key={item._id} className="flex gap-4 p-4 bg-gray-50/50 rounded-3xl border border-gray-100 group">
                        <div className="h-20 w-20 bg-white rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                             <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                          <div className="flex items-center justify-between">
                             <p className="text-primary font-black text-sm">₹{item.price * item.quantity}</p>
                             <div className="flex items-center bg-white rounded-xl border border-gray-100 px-1 py-0.5 shadow-sm">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:bg-gray-50 rounded-lg"><Minus size={12}/></button>
                                <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:bg-gray-50 rounded-lg"><Plus size={12}/></button>
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 md:p-8 bg-white border-t border-gray-50 space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Billed To Table {tableNumber || '--'}</p>
                        <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{totalPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Inclusive of Service Tax</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting || !tableNumber}
                      className="w-full bg-primary text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center space-x-3 shadow-2xl shadow-orange-200 relative group overflow-hidden disabled:opacity-50 disabled:grayscale"
                    >
                      <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      {isSubmitting ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        <>
                          <span>Place Official Order</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-gray-300 text-center font-bold uppercase tracking-[0.2em]">Chef is notified immediately upon order placement.</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
