"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { addMenuItem, deleteMenuItem, getMenu, getReservationsList, updateMenuItem } from '@/api/api';
import { Plus, Trash2, Calendar, ClipboardList, LogOut, LayoutDashboard, Coffee, Upload, Users, Clock, Sparkles, Star, ChevronRight, Loader2, Hash, ShoppingBag, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  dietary?: 'Veg' | 'Non-Veg' | 'None';
}

interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: string;
  status: string;
}

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

const Admin = () => {
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'menu' | 'reservations' | 'orders'>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    dietary: 'Veg',
  });

  const [orderFilter, setOrderFilter] = useState<'active' | 'history'>('active');
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [lastResCount, setLastResCount] = useState(0);
  const [hasNewAlert, setHasNewAlert] = useState(false);

  // Sound effect for new orders
  const playAlert = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) { console.error("Sound play failed", e); }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && token) {
      fetchData();
      // Setup real-time polling (every 10 seconds)
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [user, token]);

  const fetchData = async (isBackground = false) => {
    if (!isBackground && !loading) setLoading(true);
    try {
      const [{ data: menuData }, { data: resData }, { data: orderData }] = await Promise.all([
        getMenu(),
        getReservationsList(token!),
        axios.get('/api/orders')
      ]);

      setMenuItems(menuData);
      setReservations(resData);
      setOrders(orderData);

      // Check for New Arrivals to trigger sound/visual alert
      if (orderData.length > lastOrderCount && lastOrderCount !== 0) {
        playAlert();
        setHasNewAlert(true);
      }
      if (resData.length > lastResCount && lastResCount !== 0) {
        playAlert();
        setHasNewAlert(true);
      }
      
      setLastOrderCount(orderData.length);
      setLastResCount(resData.length);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
       await axios.patch('/api/orders', { orderId, status }); // Need to update API to handle orderId
       fetchData(true);
    } catch (e) {
       console.error(e);
       alert("Failed to update status");
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;
      await addMenuItem({ ...newItem, price: Number(newItem.price) }, token);
      setNewItem({ name: '', description: '', price: '', category: '', image: '', dietary: 'Veg' });
      fetchData();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      if (!token) return;
      await deleteMenuItem(id, token);
      fetchData();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    try {
      if (!token) return;
      await updateMenuItem(item._id, { isAvailable: !item.isAvailable }, token);
      fetchData();
    } catch (error) {
      console.error('Error toggling availability', error);
    }
  };

  const seedMenu = async () => {
    if (!window.confirm('Populate menu with premium items?')) return;
    setLoading(true);
    try {
      await axios.post('/api/seed-menu', {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) {
      alert('Seeding failed. Make sure the API exists.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Validating Admin Rights...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row pb-24 md:pb-0">
      {/* Sidebar Navigation (Desktop Only) */}
      <div className="hidden md:flex w-80 bg-white border-r border-gray-100 flex-shrink-0 flex-col justify-between py-10 px-8 shadow-sm z-50 sticky top-0 h-screen">
         <div>
            <div className="flex items-center space-x-4 mb-14">
               <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100"><LayoutDashboard size={24} className="text-white" /></div>
               <h1 className="text-2xl font-black font-headings text-gray-900 tracking-tighter leading-none">Tasty<span className="text-primary italic">Admin</span></h1>
            </div>

            <div className="space-y-4">
               <button
                 onClick={() => setActiveTab('menu')}
                 className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-2xl shadow-orange-200 scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
               >
                 <Coffee size={20} /> Menu Items
               </button>
               <button
                  onClick={() => { setActiveTab('orders'); setHasNewAlert(false); }}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-2xl shadow-orange-200 scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-4"><ShoppingBag size={20} /> Live Orders</div>
                  {hasNewAlert && activeTab !== 'orders' && <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'reservations' ? 'bg-primary text-white shadow-2xl shadow-orange-200 scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <Calendar size={20} /> Reservations
                </button>
            </div>
         </div>

         <div className="pt-8 border-t border-gray-100">
            <Link href="/" className="flex items-center gap-3 px-6 py-3 font-bold text-gray-400 hover:text-gray-900 transition-colors mb-4 text-xs uppercase tracking-widest text-[9px]">
               Return to Guest Site
            </Link>
            <button
               onClick={logout}
               className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-red-500 font-bold bg-red-50 hover:bg-red-500 hover:text-white transition-all group border border-red-100/50 shadow-sm"
            >
               <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
               Sign Out
            </button>
         </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-4 flex justify-between items-center">
         <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md"><LayoutDashboard size={20} /></div>
            <h1 className="text-xl font-black font-headings text-gray-900 tracking-tighter">Tasty<span className="text-primary">Admin</span></h1>
         </div>
         <button onClick={logout} className="h-10 w-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100"><LogOut size={18}/></button>
      </div>

      {/* Bottom Nav for Mobile */}
      <div className="md:hidden fixed bottom-6 inset-x-6 z-50">
         <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-[32px] p-2 flex items-center justify-around ring-8 ring-white/5">
            <button
               onClick={() => setActiveTab('menu')}
               className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-lg shadow-orange-100' : 'text-gray-400'}`}
            >
               <Coffee size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Menu</span>
            </button>
            <button
               onClick={() => setActiveTab('orders')}
               className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-orange-100' : 'text-gray-400'}`}
            >
               <ShoppingBag size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Orders</span>
            </button>
            <button
               onClick={() => setActiveTab('reservations')}
               className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all ${activeTab === 'reservations' ? 'bg-primary text-white shadow-lg shadow-orange-100' : 'text-gray-400'}`}
            >
               <Calendar size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Bookings</span>
            </button>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-14 overflow-y-auto w-full max-w-7xl mx-auto space-y-8 md:space-y-12 pb-32">
        <header className="flex justify-between items-center bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm border border-gray-100">
           <div>
              <p className="text-gray-400 font-black uppercase tracking-[0.25em] text-[8px] md:text-[10px] mb-1 md:mb-2">Authenticated Admin</p>
              <h2 className="text-2xl md:text-3xl font-bold font-headings text-gray-900 leading-none">{user.name}</h2>
           </div>
           <div className="bg-orange-50 h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center border border-orange-100">
              <Star className="text-primary" fill="currentColor" size={20} />
           </div>
        </header>

        {activeTab === 'menu' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Menu Management UI (Already implemented, kept to avoid deletion) */}
            <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-sm border border-gray-100 relative overflow-hidden group">
               {/* Form Content ... */}
               <div className="flex justify-between items-start mb-12">
                <div className="flex items-center space-x-4">
                   <div className="h-14 w-14 bg-green-50 text-green-600 rounded-[20px] border border-green-100 flex items-center justify-center"><Plus size={24}/></div>
                   <h3 className="text-3xl font-bold font-headings text-gray-900">Add New Item</h3>
                </div>
                <button onClick={seedMenu} className="flex items-center gap-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary transition-all shadow-lg active:scale-95">
                  <Sparkles size={14} /> Quick Seed
                </button>
              </div>
              <form onSubmit={handleAddItem} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Item Title</label>
                    <input required className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner" placeholder="e.g., Paneer Tikka" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Price (₹)</label>
                    <input required type="number" className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner" placeholder="299" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Category</label>
                    <input required className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner" placeholder="e.g., Main Course" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Image Source</label>
                      <div className="relative">
                         <Upload className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                         <input required className="w-full bg-gray-50 px-8 pl-14 py-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner" placeholder="https://..." value={newItem.image} onChange={(e) => setNewItem({...newItem, image: e.target.value})} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Dietary Choice</label>
                      <select className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner appearance-none" value={newItem.dietary} onChange={(e) => setNewItem({...newItem, dietary: e.target.value})}>
                         <option value="Veg">Pure Vegetarian</option>
                         <option value="Non-Veg">Non-Vegetarian</option>
                         <option value="None">Common / Other</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Item Description</label>
                   <textarea required rows={2} className="w-full bg-gray-50 px-8 py-5 rounded-3xl outline-none font-bold border-2 border-transparent focus:border-primary/20 text-gray-700 transition-all shadow-inner resize-none" placeholder="Describe the flavors..." value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} />
                </div>
                
                <div className="flex justify-end pt-4">
                   <button type="submit" className="bg-primary text-white font-black uppercase tracking-widest text-xs px-12 py-6 rounded-[24px] hover:bg-gray-900 hover:scale-[1.02] transition-all shadow-2xl shadow-orange-200 flex items-center gap-3">
                     Publish to Menu <ChevronRight size={16} />
                   </button>
                </div>
              </form>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
               {menuItems.map((item) => (
                  <div key={item._id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
                     <img src={item.image} className="h-20 w-20 rounded-2xl object-cover shrink-0" alt={item.name} />
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-3">
                           <p className="text-primary font-black text-sm">₹{item.price}</p>
                           <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${item.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                              {item.isAvailable ? 'Available' : 'Sold Out'}
                           </span>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => toggleAvailability(item)} 
                           className={`p-3 rounded-xl transition-all ${item.isAvailable ? 'bg-gray-50 text-gray-400 hover:bg-orange-50 hover:text-primary' : 'bg-primary text-white shadow-lg shadow-orange-100'}`}
                           title={item.isAvailable ? "Mark as Sold Out" : "Mark as Available"}
                        >
                           {item.isAvailable ? <Eye size={18}/> : <EyeOff size={18}/>}
                        </button>
                        <button onClick={() => handleDeleteItem(item._id)} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 bg-orange-50 text-primary rounded-[20px] border border-orange-100 flex items-center justify-center shadow-sm"><ShoppingBag size={26}/></div>
                  <h3 className="text-3xl font-bold font-headings text-gray-900">{orderFilter === 'active' ? 'Live Kitchen Orders' : 'Order History'}</h3>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                    <button 
                        onClick={() => setOrderFilter('active')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderFilter === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                    >
                        Active
                    </button>
                    <button 
                        onClick={() => setOrderFilter('history')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderFilter === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                    >
                        History
                    </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {orders
                  .filter(o => orderFilter === 'active' 
                    ? !['completed', 'cancelled'].includes(o.status) 
                    : ['completed', 'cancelled'].includes(o.status)
                  )
                  .map((order) => (
                   <div key={order._id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                         <div className="flex items-center gap-3 text-primary font-black">
                            <span className="bg-primary text-white h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"><Hash size={20}/></span>
                            <span className="text-2xl font-headings uppercase tracking-tighter">Table {order.tableNumber}</span>
                            {order.status === 'bill_requested' && (
                                <span className="ml-2 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded animate-pulse">BILL REQUESTED</span>
                             )}
                         </div>
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      
                      <div className="p-8 flex-grow space-y-4">
                         {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-[#fafafa] p-4 rounded-2xl border border-gray-50">
                               <div className="flex items-center gap-3">
                                  <span className="h-8 w-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xs font-black">{item.quantity}x</span>
                                  <span className="font-bold text-gray-700">{item.name}</span>
                               </div>
                               <span className="text-xs font-black text-gray-400">₹{item.price * item.quantity}</span>
                            </div>
                         ))}
                      </div>

                      <div className="px-8 py-6 bg-white border-t border-gray-50 flex justify-between items-center mt-auto">
                         <div>
                            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Order Total</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tighter">₹{order.totalAmount}</p>
                         </div>
                          <div className="flex gap-2">
                             {order.status !== 'completed' && (
                                <button onClick={() => updateOrderStatus(order._id, 'completed')} className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 hover:bg-green-600 hover:text-white transition-all underline decoration-green-200">Complete</button>
                             )}
                             <button onClick={() => updateOrderStatus(order._id, 'cancelled')} className="bg-red-50 text-red-500 p-2 rounded-xl border border-red-100 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                          </div>
                      </div>
                   </div>
                ))}
                
                {orders.filter(o => orderFilter === 'active' ? !['completed', 'cancelled'].includes(o.status) : ['completed', 'cancelled'].includes(o.status)).length === 0 && !loading && (
                   <div className="col-span-full py-24 text-center bg-white border border-dashed border-gray-100 rounded-[50px] space-y-6">
                      <ShoppingBag className="h-16 w-16 text-gray-100 mx-auto" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Waiting for incoming orders...</p>
                   </div>
                )}
             </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center space-x-4 mb-8">
               <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-[20px] border border-blue-100 flex items-center justify-center shadow-sm"><Users size={26}/></div>
               <h3 className="text-3xl font-bold font-headings text-gray-900">Table Bookings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reservations.map((res) => (
                <div key={res._id} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                  <div className={`absolute top-0 right-0 h-4 w-40 rounded-bl-full opacity-20 group-hover:scale-110 transition-transform ${res.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl tracking-tight">{res.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gray-900 text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1"><Hash size={10}/> Table {res.tableNumber || 'Auto'}</span>
                        <span className="text-[10px] text-primary font-bold">{res.phone || 'No Phone'}</span>
                      </div>
                    </div>
                    <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${res.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                       {res.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600 bg-gray-50 p-4 rounded-2xl relative">
                      <Calendar size={18} className="text-primary" /> 
                      <div className="flex flex-col">
                         <span className="text-[8px] uppercase tracking-widest text-gray-400">Date</span>
                         <span>{res.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600 bg-gray-50 p-4 rounded-2xl">
                      <Clock size={18} className="text-primary" /> 
                      <div className="flex flex-col">
                         <span className="text-[8px] uppercase tracking-widest text-gray-400">Time Arrival</span>
                         <span>{res.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600 bg-gray-50 p-4 rounded-2xl">
                      <Users size={18} className="text-primary" /> 
                      <div className="flex flex-col">
                         <span className="text-[8px] uppercase tracking-widest text-gray-400">Guest Count</span>
                         <span>Party of {res.guests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {reservations.length === 0 && !loading && (
                <div className="col-span-full py-24 text-center bg-white border border-dashed border-gray-200 rounded-[50px] space-y-6">
                  <Calendar className="h-16 w-16 text-gray-100 mx-auto" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active reservations.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
