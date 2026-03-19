"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getMenu } from '@/api/api';
import { useCart } from '@/context/CartContext';
import { Loader2, Search, Utensils, Star, ChevronRight, Plus, Minus, List, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  dietary?: 'Veg' | 'Non-Veg' | 'None';
  isPopular?: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDietary, setActiveDietary] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBrowseMenu, setShowBrowseMenu] = useState(false);
  const { addToCart, updateQuantity, cart } = useCart();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

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
  const popularItems = menuItems.filter(item => item.isPopular).slice(0, 10);

  const filterItems = (category: string) => {
    return menuItems.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesActiveCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesDietary = activeDietary === 'All' || item.dietary === activeDietary;
      
      const isSearchBestseller = searchTerm.toLowerCase() === 'bestseller' || searchTerm.toLowerCase() === 'top rated';
      const matchesSearch = isSearchBestseller 
        ? (item.isPopular || (item.price < 500 && (item.name.includes('Dal') || item.name.includes('Paneer'))))
        : item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
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

  const scrollToCategory = (category: string) => {
    setActiveCategory('All'); // Show all to allow scrolling
    setTimeout(() => {
      const element = categoryRefs.current[category];
      if (element) {
        const yOffset = -180; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
    setShowBrowseMenu(false);
  };

  const displayedCategories = activeCategory === 'All' 
    ? allCategories.filter(c => c !== 'All') 
    : [activeCategory];

  return (
    <div className="bg-white min-h-screen pb-40 pt-12 mt-12 relative">
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
            
            {/* Search Suggestions (Mobile Enhancement) */}
            {!searchTerm && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar font-bold text-[9px] uppercase tracking-widest text-gray-400">
                {['Paneer', 'Biryani', 'Chicken', 'Dal', 'Dessert'].map(sug => (
                  <button 
                    key={sug} 
                    onClick={() => setSearchTerm(sug)}
                    className="whitespace-nowrap px-3 py-1 bg-gray-50 rounded-lg hover:text-primary transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Filters - NEW */}
          <div className="px-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth items-center">
             <button 
               onClick={() => { setActiveDietary('Veg'); setActiveCategory('All'); }}
               className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeDietary === 'Veg' ? 'bg-green-500 border-transparent text-white' : 'bg-white border-gray-100 text-gray-400'}`}
             >
                <div className={`h-2 w-2 rounded-full ${activeDietary === 'Veg' ? 'bg-white' : 'bg-green-500'}`} />
                Pure Veg
             </button>
             <button 
               onClick={() => { setSearchTerm('Bestseller'); }}
               className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${searchTerm === 'Bestseller' ? 'bg-orange-500 border-transparent text-white' : 'bg-white border-gray-100 text-gray-400'}`}
             >
                <Sparkles size={10} className={searchTerm === 'Bestseller' ? 'text-white' : 'text-orange-500'} fill="currentColor" />
                Top Rated
             </button>
             <button 
               onClick={() => { setActiveCategory('Beverages'); }}
               className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeCategory === 'Beverages' ? 'bg-blue-500 border-transparent text-white' : 'bg-white border-gray-100 text-gray-400'}`}
             >
                Drinks
             </button>
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
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="animate-spin text-primary h-10 w-10 mb-4" strokeWidth={3} />
            <p className="text-gray-300 font-bold uppercase tracking-widest text-[8px]">Curating Royal Platters...</p>
          </div>
        ) : (
          <div className="py-6">
            {/* Highly Recommended Carousel (Mobile Optimization) */}
            {activeCategory === 'All' && !searchTerm && (
              <div className="mb-12">
                <div className="px-6 flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-lg font-black font-headings text-gray-900 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles size={18} className="text-primary fill-primary" /> Popular Now
                    </h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Chef's Top Selections</p>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 scroll-smooth">
                   {popularItems.map((item) => (
                     <div key={item._id} className="min-w-[140px] md:min-w-[180px] group flex flex-col gap-3">
                        <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-100 relative">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                           <button 
                             onClick={() => addToCart(item as any)}
                             className="absolute bottom-2 right-2 h-8 w-8 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg border border-white active:scale-90 transition-all"
                           >
                             <Plus size={16} strokeWidth={3} />
                           </button>
                        </div>
                        <div className="px-1">
                           <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                           <p className="text-[10px] text-primary font-black">₹{item.price}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            <div className="px-6 space-y-12">
              {displayedCategories.map((category) => {
                const items = filterItems(category);
                if (items.length === 0) return null;

                return (
                  <section key={category} ref={el => { categoryRefs.current[category] = el; }}>
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
                             className={`group flex gap-8 md:gap-14 items-start justify-between relative pb-12 border-b border-gray-50 last:border-0 ${!item.isAvailable && 'opacity-60 grayscale-[0.5]'}`}
                          >
                             {!item.isAvailable && (
                                <div className="absolute top-0 right-0 z-10 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-bl-3xl shadow-lg">Sold Out</div>
                             )}
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
                                    <Sparkles size={10} fill="currentColor" /> Bestseller
                                  </div>
                                )}
                              </div>
                               <h3 className={`text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight leading-tight ${!item.isAvailable && 'line-through decoration-red-500/40'}`}>{item.name}</h3>
                               <p className="text-gray-900 font-black text-lg">₹{item.price}</p>
                              <p className="text-gray-400 text-sm leading-relaxed max-w-lg italic font-medium line-clamp-2 md:line-clamp-none">
                                "{item.description}"
                              </p>
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
                                     onClick={(e) => { e.stopPropagation(); if(item.isAvailable) addToCart(item as any); }}
                                     disabled={!item.isAvailable}
                                     className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 ring-4 ring-white shadow-xl ${
                                       item.isAvailable 
                                         ? 'bg-white text-primary border border-gray-100 hover:bg-orange-50' 
                                         : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed shadow-none ring-gray-50'
                                     }`}
                                   >
                                     {item.isAvailable ? 'Add +' : 'Sold Out'}
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

      {/* Floating Browse Menu Button (Mobile Optimization) */}
      {!loading && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] md:bottom-12">
           <button 
             onClick={() => setShowBrowseMenu(true)}
             className="bg-gray-900 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/40 flex items-center gap-3 active:scale-90 transition-all border border-white/10"
           >
             <List size={18} className="text-primary" />
             Browse Menu
           </button>
        </div>
      )}

      {/* Browse Menu Overlay */}
      <AnimatePresence>
        {showBrowseMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBrowseMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-[40px] z-[120] p-10 max-h-[70vh] overflow-y-auto"
            >
               <h3 className="text-xl font-black font-headings text-gray-900 uppercase tracking-tighter mb-8 border-b border-gray-50 pb-4">Menu Categories</h3>
               <div className="grid grid-cols-1 gap-4">
                  {allCategories.filter(c => c !== 'All').map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => scrollToCategory(cat)}
                      className="flex justify-between items-center group py-2"
                    >
                       <span className="text-gray-600 font-bold uppercase tracking-widest text-sm group-hover:text-primary transition-colors">{cat}</span>
                       <span className="text-gray-300 font-black text-xs">{menuItems.filter(i => i.category === cat).length}</span>
                    </button>
                  ))}
               </div>
               <button 
                 onClick={() => setShowBrowseMenu(false)}
                 className="w-full mt-10 py-4 bg-gray-50 rounded-2xl text-gray-400 font-black uppercase tracking-widest text-[10px]"
               >
                 Close
               </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
