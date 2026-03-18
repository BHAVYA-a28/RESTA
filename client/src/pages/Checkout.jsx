import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, MapPin, User, Phone, CheckCircle2, ArrowLeft, Calendar, Clock, Utensils } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createReservation } from '../api/api';

const Checkout = () => {
    const { cart, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isOrdered, setIsOrdered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: 2,
        tablePreference: 'Window Side'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const reservationData = {
            ...formData,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: subtotal
        };

        try {
            await createReservation(reservationData);
            setIsOrdered(true);
            setTimeout(() => {
                clearCart();
                navigate('/');
            }, 4000);
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !isOrdered) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50/50">
                <div className="p-10 md:p-12 bg-white rounded-[40px] md:rounded-[50px] shadow-2xl shadow-orange-50 border border-orange-100 text-center max-w-md w-full">
                    <div className="h-20 w-20 md:h-24 md:w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-primary shadow-inner">
                        <ShoppingBag className="h-10 w-10 md:h-12 md:w-12" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-headings text-gray-900 mb-4">Your basket is empty</h2>
                    <p className="text-gray-400 font-medium mb-10 text-xs md:text-sm px-6 italic line-clamp-2 md:line-clamp-none">"To place a table order, first select some authentic Indian delicacies from our menu."</p>
                    <Link to="/menu" className="inline-block bg-primary text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold shadow-lg shadow-orange-100 hover:scale-105 active:scale-100 transition-all text-sm md:text-base">
                        Browse Full Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence>
                    {isOrdered ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto bg-white p-10 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -z-10"></div>
                            <div className="h-20 w-20 md:h-24 md:w-24 bg-green-100 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 md:mb-10 text-green-600 scale-110 md:scale-125 border border-green-200">
                                <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-headings text-gray-900 mb-4 tracking-tight">Table Confirmed!</h2>
                            <p className="text-gray-500 font-medium text-base md:text-lg mb-8 italic">"Table No. {Math.floor(Math.random() * 15) + 1} is yours. Get ready for a royal Indian feast!"</p>
                            
                            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-10">
                                <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</p>
                                    <p className="text-lg md:text-xl font-bold text-primary">{formData.time}</p>
                                </div>
                                <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Items</p>
                                    <p className="text-lg md:text-xl font-bold text-primary">{cart.length}</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                            {/* Left: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6 md:space-y-10"
                            >
                                <div className="px-2 md:px-0">
                                    <Link to="/menu" className="inline-flex items-center space-x-2 text-primary font-bold hover:gap-3 transition-all mb-6 md:mb-8 bg-white px-5 py-2 rounded-full border border-orange-50 text-xs md:text-sm">
                                        <ArrowLeft size={14} />
                                        <span>Back to menu</span>
                                    </Link>
                                    <h1 className="text-3xl md:text-5xl font-bold font-headings text-gray-900 tracking-tight leading-tight">Dine-in <span className="text-primary italic">Reservation</span></h1>
                                </div>

                                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[50px] shadow-2xl shadow-gray-200/50 border border-gray-50 space-y-8 md:space-y-10 relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-[100px] -z-10"></div>
                                     
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                         <div className="space-y-2 md:space-y-3">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                                <User size={10} className="text-primary" /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-sm md:text-base"
                                                placeholder="Bhavya Jain"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                         </div>

                                         <div className="space-y-2 md:space-y-3">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                                <Phone size={10} className="text-primary" /> Contact No.
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-sm md:text-base"
                                                placeholder="96023 98321"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                         </div>
                                     </div>

                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                         <div className="space-y-3">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                                <Calendar size={10} className="text-primary" /> Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-xs md:text-sm"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                         </div>
                                         <div className="space-y-3">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                                <Clock size={10} className="text-primary" /> Time
                                            </label>
                                            <input
                                                type="time"
                                                required
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-xs md:text-sm"
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            />
                                         </div>
                                         <div className="space-y-3">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                                <Users size={10} className="text-primary" /> Guests
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-xs md:text-sm"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            />
                                         </div>
                                     </div>

                                     <div className="space-y-3">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-4 flex items-center gap-2">
                                            <MapPin size={10} className="text-primary" /> Table Preference
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                            {['Window Side', 'Quiet Corner', 'Main Hall', 'Private Booth'].map((pref) => (
                                                <button
                                                    key={pref}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, tablePreference: pref})}
                                                    className={`py-3 md:py-4 px-2 rounded-xl md:rounded-2xl font-bold border-2 transition-all text-[11px] md:text-[12px] uppercase tracking-tighter ${
                                                        formData.tablePreference === pref 
                                                        ? 'bg-primary/5 border-primary text-primary' 
                                                        : 'border-gray-50 bg-gray-50 text-gray-400'
                                                    }`}
                                                >
                                                    {pref}
                                                </button>
                                            ))}
                                        </div>
                                     </div>

                                     <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-white py-5 md:py-6 rounded-[24px] md:rounded-[30px] font-bold text-base md:text-xl hover:bg-orange-600 shadow-2xl shadow-orange-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                                     >
                                        {loading ? <Clock className="animate-spin" /> : <CheckCircle2 size={24} />}
                                        <span>Confirm Order (₹{subtotal.toFixed(0)})</span>
                                     </button>
                                </form>
                            </motion.div>

                            {/* Right: Summary - Collapsed on Mobile by Default? Or just stacked */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-2xl shadow-gray-200/50 border border-gray-50 h-fit lg:sticky lg:top-24 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 h-2 w-full bg-primary/20"></div>
                                     <h2 className="text-xl md:text-2xl font-bold font-headings text-gray-900 mb-8 md:mb-10 pb-4 border-b border-gray-50 flex items-center gap-3">
                                        <Utensils className="text-primary" /> <span>Order Summary</span>
                                     </h2>
                                     <div className="space-y-6 max-h-[350px] md:max-h-[450px] overflow-y-auto pr-2 scrollbar-hide">
                                         {cart.map((item) => (
                                             <div key={item._id} className="flex items-center gap-4 md:gap-6 group">
                                                 <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm flex-shrink-0 border border-gray-50">
                                                     <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                 </div>
                                                 <div className="flex-grow min-w-0">
                                                     <h4 className="font-bold text-gray-900 leading-tight text-sm md:text-base truncate">{item.name}</h4>
                                                     <div className="flex items-center gap-2 mt-1">
                                                         <span className="bg-orange-50 text-primary text-[10px] font-black px-2 py-0.5 rounded-md border border-orange-100">x{item.quantity}</span>
                                                         <span className="text-gray-400 text-[10px] lowercase italic tracking-widest hidden md:inline">in thali</span>
                                                     </div>
                                                 </div>
                                                 <p className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">₹{item.price * item.quantity}</p>
                                             </div>
                                         ))}
                                     </div>

                                     <div className="mt-10 pt-6 md:pt-8 border-t border-gray-50 space-y-4">
                                         <div className="flex justify-between items-center bg-gray-50 p-4 md:p-6 rounded-[24px] md:rounded-3xl border border-gray-100">
                                             <span className="text-gray-900 font-bold uppercase text-[10px] md:text-xs">Total Bill</span>
                                             <span className="text-2xl md:text-3xl font-black text-primary drop-shadow-sm">₹{subtotal.toFixed(0)}</span>
                                         </div>
                                     </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Checkout;
