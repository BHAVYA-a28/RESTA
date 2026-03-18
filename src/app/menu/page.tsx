"use client";
import React, { useState, useEffect } from 'react';
import { getMenu } from '@/api/api';
import { useCart } from '@/context/CartContext';
import { Loader2, Search, Utensils, Star, CheckCircle2, ChevronRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary?: 'Veg' | 'Non-Veg' | 'None';
  isPopular?: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDietary, setActiveDietary] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, updateQuantity, cart } = useCart();

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

  const allCategories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filterItems = (category: string) => {
    return menuItems.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesActiveCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesDietary = activeDietary === 'All' || item.dietary === activeDietary;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (category !== 'All') {
         return matchesCategory && matchesDietary && matchesSearch;
      }
      return matchesActiveCategory && matchesDietary && matchesSearch;
    });
  };

  const getItemQuantity = (id: string) => {
    const item = cart.find(i => i._id === id);
    return item ? item.quantity : 0;
  };

  const displayedCategories = activeCategory === 'All' 
    ? allCategories.filter(c => c !== 'All') 
    : [activeCategory];

  return (
    <div className="bg-white min-h-screen pb-40 pt-12 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Minimal Header */}
        <div className="px-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black font-headings text-gray-900 tracking-tight">
              Tasty<span className="text-primary italic">Bites</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 ml-0.5">Premium Indian Dining</p>
          </div>
          <div className="flex -space-x-3">
             <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><Utensils size={16} className="text-primary" /></div>
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

          {/* Scrolling Chips - Category Filter */}
          <div className="px-6 pt-4 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth items-center">
             <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
                <div className="h-8 w-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><Star size={14}/></div>
             </div>
            
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary border-transparent text-white shadow-xl shadow-orange-100'
                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Chips - Dietary */}
          <div className="px-6 pt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Veg', 'Non-Veg'].map((diet) => (
              <button
                key={diet}
                onClick={() => setActiveDietary(diet)}
                className={`px-4 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest whitespace-nowrap transition-all border flex items-center gap-2 ${
                  activeDietary === diet
                    ? 'bg-gray-900 border-transparent text-white'
                    : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'
                }`}
              >
                {diet === 'Veg' && <div className="h-2 w-2 bg-green-500 rounded-full" />}
                {diet === 'Non-Veg' && <div className="h-2 w-2 bg-red-500 rounded-full" />}
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
            {displayedCategories.map((category) => {
              const items = filterItems(category);
              if (items.length === 0) return null;

              return (
                <section key={category}>
                  <div className="mb-10 pl-1 border-b border-gray-50 pb-4">
                    <h2 className="text-2xl font-black font-headings text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                      {category}
                      <span className="text-[10px] text-gray-300 font-bold pt-1">({items.length} items)</span>
                    </h2>
                  </div>

                  <div className="space-y-16">
                    {items.map((item, index) => {
                      const itemQuantity = getItemQuantity(item._id);
                      const isBestseller = item.isPopular || (item.price < 500 && (item.name.includes('Dal') || item.name.includes('Paneer') || item.name.includes('Biryani')));
                      
                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={item._id}
                          className="group flex gap-8 md:gap-14 items-start justify-between relative pb-12 border-b border-gray-50 last:border-0"
                        >
                          {/* Item Details (Left) */}
                          <div className="flex-grow space-y-3">
                            <div className="flex items-center gap-3">
                              {item.dietary && (
                                <div className={`h-4 w-4 border ${item.dietary === 'Veg' ? 'border-green-600' : 'border-red-600'} flex items-center justify-center rounded-[3px] bg-white shrink-0`}>
                                  <div className={`h-2 w-2 ${item.dietary === 'Veg' ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
                                </div>
                              )}
                              {isBestseller && (
                                <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded text-[9px] font-black text-primary uppercase tracking-widest border border-orange-100">
                                  <Star size={10} fill="currentColor" /> Bestseller
                                </div>
                              )}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight leading-tight">{item.name}</h3>
                            <p className="text-gray-900 font-black text-lg">₹{item.price}</p>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-lg italic font-medium line-clamp-2 md:line-clamp-none">
                              "{item.description}"
                            </p>
                            <div className="pt-2">
                               <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-all flex items-center gap-1 group/more">
                                  Read more <ChevronRight size={12} className="group-hover/more:translate-x-1 transition-transform" />
                               </button>
                            </div>
                          </div>

                          {/* Image & Action (Right) */}
                          <div className="relative shrink-0 w-32 h-32 md:w-44 md:h-44">
                            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-100 group-hover:scale-105 transition-transform duration-500 ring-1 ring-gray-100 bg-gray-50">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Add Button */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] max-w-[120px]">
                              {itemQuantity > 0 ? (
                                <div className="bg-white border border-gray-100 shadow-xl rounded-xl flex items-center justify-between p-1 px-2 h-11 ring-4 ring-white">
                                  <button onClick={(e) => { e.stopPropagation(); updateQuantity(item._id, itemQuantity - 1); }} className="p-1 px-2 text-primary font-black hover:bg-orange-50 rounded-lg group/minus">
                                     <Minus size={16} strokeWidth={3} className="group-hover/minus:scale-110 transition-transform" />
                                  </button>
                                  <span className="font-black text-primary text-sm min-w-4 text-center">{itemQuantity}</span>
                                  <button onClick={(e) => { e.stopPropagation(); addToCart(item as any); }} className="p-1 px-2 text-primary font-black hover:bg-orange-50 rounded-lg group/plus">
                                     <Plus size={16} strokeWidth={3} className="group-hover/plus:scale-110 transition-transform" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => { e.stopPropagation(); addToCart(item as any); }}
                                  className="w-full bg-white text-primary border border-gray-100 shadow-xl py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-50 transition-all active:scale-95 ring-4 ring-white"
                                >
                                  Add +
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && allCategories.every(cat => filterItems(cat).length === 0) && (
          <div className="text-center py-32 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200 mx-6">
            <Utensils className="mx-auto h-12 w-12 text-gray-200 mb-4" strokeWidth={1} />
            <p className="text-gray-400 font-bold italic text-sm tracking-tight px-10">
              "Mmm... it seems our spice boxes are empty for this selection. Try another choice?"
            </p>
            <button
              onClick={() => { setActiveDietary('All'); setActiveCategory('All'); setSearchTerm('') }}
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
