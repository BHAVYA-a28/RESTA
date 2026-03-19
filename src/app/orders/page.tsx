"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Clock, CheckCircle2, Hash, ArrowLeft, Loader2, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  tableNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const UserOrders = () => {
  const { tableNumber } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!tableNumber) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`/api/orders?table=${tableNumber}`);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
    // Poll for status updates
    const interval = setInterval(fetchMyOrders, 10000);
    return () => clearInterval(interval);
  }, [tableNumber]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-primary h-10 w-10 mb-4" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Retrieving your orders...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-40 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        
        <header className="flex items-center justify-between">
            <Link href="/menu" className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 text-gray-400 hover:text-primary transition-all">
                <ArrowLeft size={20} />
            </Link>
            <div className="text-center">
                <h1 className="text-2xl font-black font-headings text-gray-900 tracking-tight uppercase">My Orders</h1>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Table {tableNumber || 'N/A'}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                <ShoppingBag size={20} />
            </div>
        </header>

        {!tableNumber ? (
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 text-center space-y-6">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200"><Hash size={32} /></div>
                <h2 className="text-xl font-bold text-gray-900">Identifying your table...</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto italic font-medium">"Please scan the QR code on your table or enter your table number in the menu to see your orders."</p>
                <Link href="/menu" className="inline-block bg-primary text-white px-10 py-4 rounded-3xl font-bold text-xs uppercase tracking-widest">Go to Menu</Link>
            </div>
        ) : orders.length === 0 ? (
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 text-center space-y-6">
                <div className="h-20 w-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-primary"><Utensils size={32} /></div>
                <h2 className="text-xl font-bold text-gray-900">No active orders yet</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto italic font-medium">"Our spices are ready! Place your first order from the menu to see its progress here."</p>
                <Link href="/menu" className="inline-block bg-primary text-white px-10 py-4 rounded-3xl font-bold text-xs uppercase tracking-widest">Browse Menu</Link>
            </div>
        ) : (
            <div className="space-y-6">
                {orders.map((order) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={order._id} 
                        className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
                    >
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
                            <div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
                                    order.status.includes('pending') ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                    order.status.includes('preparing') ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                    order.status.includes('served') ? 'bg-green-50 text-green-600 border border-green-100' :
                                    order.status.includes('bill') ? 'bg-red-50 text-red-600 border border-red-100' :
                                    'bg-gray-100 text-gray-400'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="p-8 space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="h-8 w-8 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400">{item.quantity}x</span>
                                        <span className="font-bold text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-300">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
                            <div>
                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Order Total</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">₹{order.totalAmount}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary animate-pulse" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
                
                <p className="text-center text-gray-300 text-[10px] font-bold uppercase tracking-[0.3em] pt-4">Updates in real-time</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
