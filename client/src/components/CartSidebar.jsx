import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 md:p-8 flex items-center justify-between border-b bg-orange-50/50">
              <div className="flex items-center space-x-3">
                 <ShoppingBag className="text-primary" />
                 <h2 className="text-xl md:text-2xl font-bold font-headings text-gray-900">Your Basket</h2>
                 <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{cart.length}</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl hover:bg-gray-100 transition-colors shadow-sm"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="p-8 md:p-10 bg-gray-50 rounded-[30px] md:rounded-[40px] border-2 border-dashed border-gray-100">
                     <ShoppingBag size={48} className="text-gray-200 mx-auto md:w-16 md:h-16" strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg md:text-xl font-bold text-gray-900">Your basket is empty</p>
                    <p className="text-gray-400 font-medium text-xs md:text-sm max-w-[240px]">Looks like you haven't added any of our delicious flavors yet!</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Start exploring our menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item._id}
                    className="flex gap-4 p-4 bg-white border border-gray-50 rounded-[24px] md:rounded-[32px] hover:shadow-lg hover:shadow-gray-100 transition-all group"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-gray-900 leading-tight text-sm md:text-base pr-4 line-clamp-1">{item.name}</h3>
                           <button
                             onClick={() => removeFromCart(item._id)}
                             className="text-gray-300 hover:text-red-500 transition-colors"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                        <p className="text-primary font-bold text-xs md:text-sm mt-1">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-50 rounded-lg md:rounded-xl px-1.5 md:px-2 py-0.5 md:py-1">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-500"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 md:w-8 text-center text-xs font-bold text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-500"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-[10px] items-center font-bold text-gray-400 uppercase tracking-widest hidden md:block">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 md:p-8 border-t space-y-4 md:space-y-6 bg-gray-50/50">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-500 font-medium text-xs md:text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 text-lg md:text-xl font-bold">
                    <span>Total Amount</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:gap-4">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg hover:bg-orange-600 shadow-xl shadow-orange-100 active:scale-95 transition-all"
                  >
                    Reserve Table & Order
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-gray-400 text-[10px] md:text-xs font-bold hover:text-red-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 size={12} />
                    <span>Clear All Items</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
