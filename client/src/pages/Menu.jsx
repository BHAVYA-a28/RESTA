import { useState, useEffect, useRef } from 'react';
import { getMenu } from '../api/api';
import { Loader2, Search, ShoppingBag, Plus, Utensils, Star, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDietary, setActiveDietary] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart, cart } = useCart();
    const categoriesScrollRef = useRef(null);

    const categories = ['Starters', 'Main Course', 'Drinks'];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await getMenu();
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const filterItems = (category) => {
        return menuItems.filter((item) => {
            const matchesCategory = item.category === category;
            const matchesDietary = activeDietary === 'All' || item.dietary === activeDietary;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesDietary && matchesSearch;
        });
    };

    const getItemQuantity = (id) => {
        const item = cart.find(i => i._id === id);
        return item ? item.quantity : 0;
    };

    return (
        <div className="bg-white min-h-screen pb-40 pt-12">
            <div className="max-w-4xl mx-auto">
                {/* Minimal Header */}
                <div className="px-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black font-headings text-gray-900 tracking-tight">Tasty<span className="text-primary italic">Bites</span></h1>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 ml-0.5">Premium Indian Dining</p>
                    </div>
                    <div className="flex -space-x-3">
                         {[1, 2, 3].map(i => <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400`}>🥘</div>)}
                    </div>
                </div>

                {/* Sticky Header with Search and Chips (Swiggy Style) */}
                <div className="sticky top-16 z-[60] bg-white/95 backdrop-blur-xl border-b border-gray-50 pb-4 shadow-sm">
                    {/* Search Bar */}
                    <div className="px-6 pt-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search our signature dishes..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-gray-100 transition-all font-semibold text-gray-600 text-xs shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Scrolling Chips */}
                    <div className="px-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                        {['All', 'Veg', 'Non-Veg'].map((diet) => (
                             <button
                                key={diet}
                                onClick={() => setActiveDietary(diet)}
                                className={`px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border flex items-center gap-2 ${
                                    activeDietary === diet 
                                    ? 'bg-[#303030] border-transparent text-white shadow-xl shadow-gray-200' 
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                }`}
                            >
                                {diet === 'Veg' && <div className="h-3 w-3 border border-green-600 flex items-center justify-center rounded-[2px] bg-white"><div className="h-1.5 w-1.5 bg-green-600 rounded-full" /></div>}
                                {diet === 'Non-Veg' && <div className="h-3 w-3 border border-red-600 flex items-center justify-center rounded-[2px] bg-white"><div className="h-1.5 w-1.5 bg-red-600 rounded-full" /></div>}
                                {diet}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="animate-spin text-primary h-10 w-10 mb-4" strokeWidth={3} />
                        <p className="text-gray-300 font-bold uppercase tracking-widest text-[8px]">Curating Royal Platters...</p>
                    </div>
                ) : (
                    <div className="px-6 py-6 space-y-12">
                        {categories.map((category) => {
                            const items = filterItems(category);
                            if (items.length === 0) return null;

                            return (
                                <section key={category}>
                                    <div className="mb-8 pl-1">
                                        <h2 className="text-xl font-black font-headings text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                                            {category}
                                            <span className="text-[10px] text-gray-300 font-bold pt-1">({items.length} items)</span>
                                        </h2>
                                    </div>

                                    <div className="space-y-10">
                                        {items.map((item) => (
                                            <motion.div
                                                layout
                                                key={item._id}
                                                className="group flex gap-6 items-start justify-between relative"
                                            >
                                                {/* Text Section (Left) */}
                                                <div className="flex-grow space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        {item.dietary !== 'None' && (
                                                            <div className={`h-4 w-4 border border-${item.dietary === 'Veg' ? 'green' : 'red'}-600 flex items-center justify-center rounded-[3px] bg-white`}>
                                                                <div className={`h-2 w-2 bg-${item.dietary === 'Veg' ? 'green' : 'red'}-600 rounded-full`} />
                                                            </div>
                                                        )}
                                                        {item.price < 500 && (
                                                            <span className="bg-orange-50 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border border-orange-100 flex items-center gap-1">
                                                                <Star size={8} fill="currentColor" /> Bestseller
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                                                    <p className="text-sm font-bold text-gray-800 tracking-tight">₹{item.price}</p>
                                                    <p className="text-xs text-gray-400 font-medium leading-relaxed italic line-clamp-2 md:line-clamp-none max-w-sm">
                                                        "{item.description}"
                                                    </p>
                                                </div>

                                                {/* Image & Add Button (Right) */}
                                                <div className="relative shrink-0 pt-2">
                                                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white border group-hover:scale-105 transition-transform duration-500">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    
                                                    {/* ADD Button (Floating on bottom of image) */}
                                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%]">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                            className="w-full bg-white text-primary border border-gray-100 shadow-xl shadow-gray-200/50 py-2 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 group/btn"
                                                        >
                                                            {getItemQuantity(item._id) > 0 ? (
                                                                <span className="flex items-center justify-center gap-1.5">
                                                                    <CheckCircle2 size={12} strokeWidth={3} /> {getItemQuantity(item._id)}
                                                                </span>
                                                            ) : 'Add +'}
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {/* Full width divider line */}
                                                <div className="absolute -bottom-5 left-0 w-full h-[1px] bg-gray-50 scale-x-105" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!loading && categories.every(cat => filterItems(cat).length === 0) && (
                    <div className="text-center py-32 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200 mx-6">
                        <Utensils className="mx-auto h-12 w-12 text-gray-200 mb-4" strokeWidth={1} />
                        <p className="text-gray-400 font-bold italic text-sm tracking-tight px-10">
                            "Mmm... it seems our spice boxes are empty for this selection. Try another choice?"
                        </p>
                        <button 
                            onClick={() => {setActiveDietary('All'); setSearchTerm('')}} 
                            className="mt-8 px-10 py-3.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
                        >
                            Reset Choices
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
