import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-80 h-[450px] rounded-[32px] shadow-2xl border border-gray-100 mb-6 flex flex-col overflow-hidden"
          >
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Chat with us</h3>
                <p className="text-xs opacity-80 font-medium">We usually reply within minutes</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow p-6 flex flex-col justify-end space-y-4 bg-gray-50/50">
               <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm font-medium text-gray-600 border border-gray-100 max-w-[80%]">
                  Hello! How can we help you today?
               </div>
            </div>

            <div className="p-4 bg-white border-t">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-5 rounded-full shadow-2xl shadow-orange-200 hover:scale-110 active:scale-95 transition-all relative group"
      >
        <MessageCircle size={32} />
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
           </span>
        )}
      </button>
    </div>
  );
};

export default LiveChat;
