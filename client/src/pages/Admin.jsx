import { useState, useEffect } from 'react';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem, getReservationsList } from '../api/api';
import { Plus, Edit, Trash2, Calendar, Layout, Loader2, Save, X, Utensils, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    dietary: 'Veg',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [menuRes, resRes] = await Promise.all([getMenu(), getReservationsList()]);
      setMenuItems(menuRes.data);
      setReservations(resRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addMenuItem(formData);
      setIsAdding(false);
      setFormData({ name: '', category: 'Main Course', dietary: 'Veg', description: '', price: '', image: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateMenuItem(editingItem._id, formData);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      dietary: item.dietary || 'Veg',
      price: item.price,
      image: item.image || '',
    });
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Responsive Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-100">
           <div className="flex flex-col gap-2">
              <span className="text-primary font-bold tracking-widest uppercase text-[9px] md:text-[10px] bg-orange-50 px-3 py-1 rounded-full border border-orange-100 w-fit">Admin Controller</span>
              <h1 className="text-2xl md:text-3xl font-bold font-headings text-gray-900 flex items-center gap-3">
                 <Layout className="text-primary" size={24} />
                 <span>Control Center</span>
              </h1>
              <p className="text-gray-400 font-medium text-xs md:text-sm flex items-center gap-2">
                 <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 <span>Active Session: {user?.username}</span>
              </p>
           </div>
           
           <button onClick={logout} className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all text-sm w-full md:w-auto justify-center">
              <LogOut size={16} />
              <span>Logout</span>
           </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-gray-100 mb-10 w-full md:w-fit mx-auto md:mx-0 shadow-sm">
              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all text-xs flex-1 md:flex-none ${
                  activeTab === 'menu' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Layout size={14} />
                <span>Menu Logic</span>
              </button>
              <button
                onClick={() => setActiveTab('reservations')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all text-xs flex-1 md:flex-none ${
                  activeTab === 'reservations' ? 'bg-accent text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Calendar size={14} />
                <span>Bookings</span>
              </button>
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="animate-spin text-primary h-10 w-10 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Fetching Database...</p>
           </div>
        ) : ( activeTab === 'menu' ? (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                   <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-4">Signature Catalog</h2>
                   <button
                     onClick={() => {setIsAdding(!isAdding); setEditingItem(null)}}
                     className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
                        isAdding ? 'bg-white border text-red-500' : 'bg-primary text-white hover:bg-orange-600'
                     }`}
                   >
                     {isAdding ? <X size={18} /> : <Plus size={18} />}
                     <span>{isAdding ? 'Close Editor' : 'Create Dish'}</span>
                   </button>
                </div>

                <AnimatePresence>
                   {(isAdding || editingItem) && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-orange-100 shadow-xl overflow-hidden mb-10"
                     >
                       <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                          <Utensils className="text-primary" size={20} />
                          <span>{editingItem ? 'Edit Dish' : 'New Dish Configuration'}</span>
                       </h3>
                       <form onSubmit={editingItem ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Dish Name</label>
                           <input type="text" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none font-semibold text-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Section</label>
                           <select className="w-full px-4 py-3 bg-gray-50 border rounded-xl font-medium text-sm text-gray-600" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                             <option value="Starters">Starters</option>
                             <option value="Main Course">Main Course</option>
                             <option value="Drinks">Drinks</option>
                           </select>
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Dietary Type</label>
                           <select className="w-full px-4 py-3 bg-gray-50 border rounded-xl font-medium text-sm text-gray-600" value={formData.dietary} onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}>
                             <option value="Veg">Veg (Green)</option>
                             <option value="Non-Veg">Non-Veg (Red)</option>
                             <option value="None">None</option>
                           </select>
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Price (₹)</label>
                           <input type="number" required className="w-full px-4 py-3 bg-gray-50 border rounded-xl font-semibold text-sm" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                         </div>
                         <div className="md:col-span-2 space-y-1.5">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Description</label>
                           <textarea required className="w-full px-4 py-3 bg-gray-50 border rounded-xl h-14 resize-none text-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                         </div>
                         <div className="md:col-span-full pt-4">
                           <button type="submit" className="w-full sm:w-auto bg-primary text-white px-10 py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg">
                             <Save size={18} />
                             <span>{editingItem ? 'Save Changes' : 'Confirm Dish'}</span>
                           </button>
                         </div>
                       </form>
                     </motion.div>
                   )}
                </AnimatePresence>

                {/* Table for Desktop, Cards for Mobile */}
                <div className="bg-white rounded-[24px] md:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                           <thead className="bg-gray-50 border-b">
                              <tr>
                                 <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Item</th>
                                 <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Dietary</th>
                                 <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                 <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Settings</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y">
                              {menuItems.map((item) => (
                                 <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                       <div className="flex items-center space-x-4">
                                          <div className="h-12 w-12 rounded-[14px] overflow-hidden border">
                                             <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                          </div>
                                          <div>
                                             <p className="font-bold text-gray-900 text-sm group-hover:text-primary">{item.name}</p>
                                             <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider">{item.category}</span>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-center">
                                            {item.dietary !== 'None' && (
                                                <div className={`h-6 w-6 rounded-md border ${item.dietary === 'Veg' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'} flex items-center justify-center`}>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${item.dietary === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-gray-900 text-base">₹{item.price}</td>
                                    <td className="px-8 py-5 text-right">
                                       <div className="flex items-center justify-end space-x-2">
                                          <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                          <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                    </div>
                    {/* Mobile Card List */}
                    <div className="md:hidden divide-y">
                       {menuItems.map((item) => (
                          <div key={item._id} className="p-4 flex items-center gap-4">
                             <img src={item.image} className="h-14 w-14 rounded-lg object-cover" />
                             <div className="flex-grow">
                                <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                <p className="text-[10px] text-gray-400 uppercase font-bold">₹{item.price} • {item.category}</p>
                             </div>
                             <div className="flex gap-2">
                                <button onClick={() => startEdit(item)} className="p-2 bg-gray-50 text-blue-500 rounded-lg"><Edit size={14} /></button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 bg-gray-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                             </div>
                          </div>
                       ))}
                    </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold text-gray-900">Live Reservations ({reservations.length})</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map((res) => (
                       <div key={res._id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:border-green-100 transition-all">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h4 className="font-bold text-gray-900">{res.name}</h4>
                                <p className="text-xs text-gray-400 font-bold">{res.phone}</p>
                             </div>
                             <div className="bg-accent/10 text-accent text-[10px] font-black px-2 py-1 rounded-lg uppercase">{res.guests} Pax</div>
                          </div>
                          <div className="space-y-2 border-t pt-4">
                             <p className="text-xs flex justify-between"><span className="text-gray-400">Date/Time</span> <span className="font-bold text-gray-800">{new Date(res.date).toLocaleDateString()} {res.time}</span></p>
                             <p className="text-xs flex justify-between"><span className="text-gray-400">Total Order</span> <span className="font-bold text-primary">₹{res.totalAmount || 0}</span></p>
                          </div>
                          {res.items?.length > 0 && (
                             <div className="mt-4 flex flex-wrap gap-1">
                                {res.items.map((it, i) => <span key={i} className="text-[9px] bg-gray-50 px-1.5 py-0.5 rounded border text-gray-500 font-medium">{it.quantity}x {it.name}</span>)}
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Admin;
