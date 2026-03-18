import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-section-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[60px] shadow-2xl shadow-orange-100 border border-orange-50 text-center"
      >
        <div className="h-20 w-20 bg-primary/10 flex items-center justify-center rounded-3xl mx-auto mb-8">
           <Lock className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-headings text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-gray-400 font-medium mb-10 text-sm italic">"Restricted area for authorized personnel only"</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group text-left">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Username</label>
            <User className="absolute left-6 bottom-4.5 text-gray-300 group-hover:text-primary transition-colors" size={20} />
            <input
              type="text"
              required
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="relative group text-left">
             <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4 mb-2">Password</label>
            <Lock className="absolute left-6 bottom-4.5 text-gray-300 group-hover:text-primary transition-colors" size={20} />
            <input
              type="password"
              required
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium text-gray-600 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 text-sm font-bold animate-shake">
                <AlertCircle size={18} />
                <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-3 bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-orange-600 shadow-xl shadow-orange-100 hover:scale-[1.02] transition-all"
          >
            <span>Log In</span>
            <LogIn size={20} />
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-gray-50">
           <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Forgot access? Contact system architect.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
