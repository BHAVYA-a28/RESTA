import { ArrowRight, Utensils, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden py-12 md:py-0">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 rounded-l-[100px] -z-10 hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-8"
        >
          <div>
            <span className="bg-primary/10 text-primary font-bold px-6 py-2 rounded-full uppercase tracking-widest text-[10px] inline-block mb-6 shadow-sm border border-orange-100/50">Award-Winning Gastronomy</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headings leading-[1.1] tracking-tighter text-gray-900">
              Spice of <br />
              <span className="text-primary italic relative">
                India
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            <p className="mt-10 text-xl text-gray-400 font-body leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium italic border-l-4 border-primary/20 pl-6">
              Experience the perfect harmony of seasonal ingredients and culinary innovation in a cozy, elegant atmosphere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link to="/menu" className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-[24px] font-bold text-lg hover:bg-orange-600 hover:scale-105 transition-all shadow-2xl shadow-orange-200 flex items-center justify-center space-x-3 group">
              <span>Explore Menu</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/reservation" className="w-full sm:w-auto bg-white border border-gray-100 text-gray-900 px-12 py-5 rounded-[24px] font-bold text-lg hover:bg-gray-50 transition-all shadow-sm">
              Secure a Table
            </Link>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-10 pt-10 mt-12 border-t border-gray-50">
             <div className="flex items-center space-x-4 group cursor-default">
               <div className="p-4 bg-orange-50 rounded-[20px] text-primary shadow-sm group-hover:rotate-12 transition-transform"><Star size={24} fill="currentColor" /></div>
               <div className="text-left"><p className="font-bold text-gray-900 leading-none text-xl">4.9 / 5</p><p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Client Rating</p></div>
             </div>
             <div className="flex items-center space-x-4 group cursor-default">
               <div className="p-4 bg-green-50 rounded-[20px] text-accent shadow-sm group-hover:rotate-12 transition-transform"><Utensils size={24} /></div>
               <div className="text-left"><p className="font-bold text-gray-900 leading-none text-xl">Fresh Only</p><p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Farm-To-Table</p></div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 relative"
        >
           <div className="relative z-10 p-6 glass-morphism rounded-[60px] shadow-2xl overflow-hidden group">
             <motion.img
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.6 }}
               src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
               alt="Gourmet Platter"
               className="rounded-[40px] w-full max-h-[700px] object-cover transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
           </div>
           
           {/* Floating Badge */}
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ repeat: Infinity, duration: 4 }}
             className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-md p-8 rounded-[32px] shadow-2xl z-20 border border-white/50 hidden md:block"
           >
              <div className="flex items-center space-x-3 mb-3">
                 <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Now Serving</p>
              </div>
              <p className="font-bold text-gray-900 text-lg">Dinner Service <br /><span className="text-primary font-headings font-bold">18:00 - 22:00</span></p>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
