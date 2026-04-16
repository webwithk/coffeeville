import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Image, Star, Calendar, LogOut, Menu, X, Plus, Trash2, Edit2, Save, 
  Loader2, Check, AlertCircle, Eye, EyeOff, LayoutDashboard, Users, TrendingUp
} from 'lucide-react';
import supabase from '../lib/supabase';

type Tab = 'dashboard' | 'menu' | 'gallery' | 'reviews' | 'bookings';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_signature: boolean;
}

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

interface Review {
  id: number;
  customer_name: string;
  review_text: string;
  rating: number;
  visit_date: string;
}

interface Booking {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating_preference: string;
  special_requests: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  
  // Data states
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || '');
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || '');
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [menuRes, galleryRes, reviewsRes, bookingsRes] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/gallery'),
        fetch('/api/reviews'),
        fetch('/api/bookings')
      ]);
      
      const [menuData, galleryData, reviewsData, bookingsData] = await Promise.all([
        menuRes.json(),
        galleryRes.json(),
        reviewsRes.json(),
        bookingsRes.json()
      ]);
      
      setMenuItems(menuData);
      setGalleryImages(galleryData);
      setReviews(reviewsData);
      setBookings(bookingsData);
    } catch (err) {
      showNotification('error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (data.user) {
        setIsAuthenticated(true);
        setUserEmail(data.user.email || '');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserEmail('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu' as Tab, name: 'Menu Items', icon: Coffee },
    { id: 'gallery' as Tab, name: 'Gallery', icon: Image },
    { id: 'reviews' as Tab, name: 'Reviews', icon: Star },
    { id: 'bookings' as Tab, name: 'Bookings', icon: Calendar },
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#C8A97E] animate-spin mx-auto mb-4" />
          <p className="text-[#F8F5F2]/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Coffee className="w-16 h-16 text-[#C8A97E] mx-auto mb-4" />
            <h1 className="font-cormorant text-4xl font-semibold text-[#F8F5F2]">Admin Panel</h1>
            <p className="text-[#F8F5F2]/60 mt-2">CoffeeVille Udaipur</p>
          </div>
          
          <form onSubmit={handleLogin} className="bg-[#F8F5F2] rounded-2xl p-8 shadow-2xl">
            <div className="mb-4">
              <label className="block text-[#0F172A] font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none transition-all text-[#0F172A]"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-[#0F172A] font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none transition-all text-[#0F172A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0F172A]/50 hover:text-[#0F172A]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#0F172A] text-[#F8F5F2] font-medium rounded-xl hover:bg-[#C8A97E] hover:text-[#0F172A] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
            
            <div className="mt-6 p-4 bg-[#EADBC8]/30 rounded-xl">
              <p className="text-[#0F172A]/70 text-sm text-center">
                <strong>Demo Credentials:</strong><br />
                Email: admin@coffeeville.in<br />
                Password: CoffeeVille2024!
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-[#0F172A] min-h-screen fixed left-0 top-0 z-40 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Coffee className="w-8 h-8 text-[#C8A97E]" />
              <div>
                <h1 className="font-cormorant text-xl font-semibold text-[#F8F5F2]">CoffeeVille</h1>
                <p className="text-[#C8A97E] text-xs">Admin Panel</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#F8F5F2]/60 hover:text-[#F8F5F2] p-2"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#C8A97E] text-[#0F172A]'
                  : 'text-[#F8F5F2]/60 hover:text-[#F8F5F2] hover:bg-[#F8F5F2]/5'
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{tab.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#F8F5F2]/10">
          {sidebarOpen && userEmail && (
            <p className="text-[#F8F5F2]/40 text-xs mb-3 truncate px-4">{userEmail}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#F8F5F2]/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-[#C8A97E] animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardTab 
                  menuItems={menuItems} 
                  reviews={reviews} 
                  bookings={bookings} 
                  galleryImages={galleryImages}
                />
              )}
              {activeTab === 'menu' && (
                <MenuTab 
                  items={menuItems} 
                  setItems={setMenuItems} 
                  showNotification={showNotification}
                  saving={saving}
                  setSaving={setSaving}
                />
              )}
              {activeTab === 'gallery' && (
                <GalleryTab 
                  images={galleryImages} 
                  setImages={setGalleryImages} 
                  showNotification={showNotification}
                  saving={saving}
                  setSaving={setSaving}
                />
              )}
              {activeTab === 'reviews' && (
                <ReviewsTab 
                  reviews={reviews} 
                  setReviews={setReviews} 
                  showNotification={showNotification}
                  saving={saving}
                  setSaving={setSaving}
                />
              )}
              {activeTab === 'bookings' && (
                <BookingsTab 
                  bookings={bookings} 
                  setBookings={setBookings} 
                  showNotification={showNotification}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// Dashboard Tab
const DashboardTab = ({ menuItems, reviews, bookings, galleryImages }: any) => {
  const pendingBookings = bookings.filter((b: Booking) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b: Booking) => b.status === 'confirmed').length;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const stats = [
    { label: 'Menu Items', value: menuItems.length, icon: Coffee, color: 'bg-blue-500' },
    { label: 'Gallery Images', value: galleryImages.length, icon: Image, color: 'bg-purple-500' },
    { label: 'Reviews', value: reviews.length, icon: Star, color: 'bg-yellow-500' },
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'bg-green-500' },
  ];

  return (
    <div>
      <h2 className="font-cormorant text-3xl font-semibold text-[#0F172A] mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#0F172A]/60 text-sm">{stat.label}</p>
            <p className="font-cormorant text-4xl font-bold text-[#0F172A]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-cormorant text-xl font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#C8A97E]" />
            Booking Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <span className="text-yellow-700">Pending</span>
              <span className="font-bold text-yellow-700">{pendingBookings}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <span className="text-green-700">Confirmed</span>
              <span className="font-bold text-green-700">{confirmedBookings}</span>
            </div>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-cormorant text-xl font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C8A97E]" />
            Rating Overview
          </h3>
          <div className="text-center py-6">
            <p className="font-cormorant text-6xl font-bold text-[#C8A97E]">{avgRating}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(Number(avgRating)) ? 'fill-[#C8A97E] text-[#C8A97E]' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-[#0F172A]/60 mt-2">Based on {reviews.length} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Menu Tab
const MenuTab = ({ items, setItems, showNotification, saving, setSaving }: any) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '', description: '', price: 0, category: 'Hot Coffee', image_url: '', is_signature: false
  });

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = async (id: number) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm })
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setItems(items.map((i: MenuItem) => i.id === id ? updated : i));
      setEditingId(null);
      showNotification('success', 'Menu item updated!');
    } catch (err) {
      showNotification('error', 'Failed to update item');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) throw new Error('Failed to add');
      const added = await res.json();
      setItems([...items, added]);
      setShowAddForm(false);
      setNewItem({ name: '', description: '', price: 0, category: 'Hot Coffee', image_url: '', is_signature: false });
      showNotification('success', 'Menu item added!');
    } catch (err) {
      showNotification('error', 'Failed to add item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to delete');
      setItems(items.filter((i: MenuItem) => i.id !== id));
      showNotification('success', 'Menu item deleted!');
    } catch (err) {
      showNotification('error', 'Failed to delete item');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-cormorant text-3xl font-semibold text-[#0F172A]">Menu Items</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A97E] text-[#0F172A] rounded-xl hover:bg-[#0F172A] hover:text-[#F8F5F2] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-cormorant text-2xl font-semibold text-[#0F172A] mb-6">Add New Menu Item</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none resize-none"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={newItem.price || ''}
                    onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                  >
                    <option>Hot Coffee</option>
                    <option>Cold Coffee</option>
                    <option>Tea</option>
                    <option>Shakes</option>
                    <option>Snacks</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.is_signature}
                    onChange={(e) => setNewItem({ ...newItem, is_signature: e.target.checked })}
                    className="w-5 h-5 rounded border-[#C8A97E] text-[#C8A97E] focus:ring-[#C8A97E]"
                  />
                  <span className="text-[#0F172A]">Signature Item</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 border-2 border-[#0F172A]/20 text-[#0F172A] rounded-xl hover:bg-[#0F172A]/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={saving || !newItem.name || !newItem.price}
                  className="flex-1 py-3 bg-[#0F172A] text-[#F8F5F2] rounded-xl hover:bg-[#C8A97E] hover:text-[#0F172A] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: MenuItem) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="h-40 bg-[#EADBC8]/30 relative">
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              )}
              {item.is_signature && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-[#C8A97E] text-[#0F172A] text-xs font-medium rounded-full">
                  Signature
                </span>
              )}
            </div>
            <div className="p-4">
              {editingId === item.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EADBC8]/30 rounded-lg text-sm"
                  />
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EADBC8]/30 rounded-lg text-sm resize-none"
                    rows={2}
                  />
                  <input
                    type="number"
                    value={editForm.price || ''}
                    onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#EADBC8]/30 rounded-lg text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 py-2 border border-[#0F172A]/20 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(item.id)}
                      disabled={saving}
                      className="flex-1 py-2 bg-[#C8A97E] text-[#0F172A] rounded-lg text-sm flex items-center justify-center gap-1"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-cormorant text-xl font-semibold text-[#0F172A]">{item.name}</h3>
                  <p className="text-[#0F172A]/60 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-cormorant text-2xl font-bold text-[#C8A97E]">₹{item.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-[#EADBC8]/50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-[#0F172A]/60" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Gallery Tab
const GalleryTab = ({ images, setImages, showNotification, saving, setSaving }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({ title: '', description: '', image_url: '', display_order: 0 });

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage)
      });
      if (!res.ok) throw new Error('Failed to add');
      const added = await res.json();
      setImages([...images, added]);
      setShowAddForm(false);
      setNewImage({ title: '', description: '', image_url: '', display_order: 0 });
      showNotification('success', 'Image added!');
    } catch (err) {
      showNotification('error', 'Failed to add image');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to delete');
      setImages(images.filter((i: GalleryImage) => i.id !== id));
      showNotification('success', 'Image deleted!');
    } catch (err) {
      showNotification('error', 'Failed to delete image');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-cormorant text-3xl font-semibold text-[#0F172A]">Gallery Images</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A97E] text-[#0F172A] rounded-xl hover:bg-[#0F172A] hover:text-[#F8F5F2] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-cormorant text-2xl font-semibold text-[#0F172A] mb-6">Add Gallery Image</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newImage.image_url}
                  onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <input
                  type="number"
                  placeholder="Display Order"
                  value={newImage.display_order || ''}
                  onChange={(e) => setNewImage({ ...newImage, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 border-2 border-[#0F172A]/20 text-[#0F172A] rounded-xl hover:bg-[#0F172A]/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={saving || !newImage.title || !newImage.image_url}
                  className="flex-1 py-3 bg-[#0F172A] text-[#F8F5F2] rounded-xl hover:bg-[#C8A97E] hover:text-[#0F172A] transition-all disabled:opacity-50"
                >
                  Add Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image: GalleryImage) => (
          <div key={image.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group relative">
            <div className="h-48 bg-[#EADBC8]/30">
              <img src={image.image_url} alt={image.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-cormorant text-lg font-semibold text-[#0F172A]">{image.title}</h3>
              <p className="text-[#0F172A]/60 text-sm">{image.description}</p>
            </div>
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reviews Tab
const ReviewsTab = ({ reviews, setReviews, showNotification, saving, setSaving }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({ customer_name: '', review_text: '', rating: 5, visit_date: '' });

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (!res.ok) throw new Error('Failed to add');
      const added = await res.json();
      setReviews([added, ...reviews]);
      setShowAddForm(false);
      setNewReview({ customer_name: '', review_text: '', rating: 5, visit_date: '' });
      showNotification('success', 'Review added!');
    } catch (err) {
      showNotification('error', 'Failed to add review');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to delete');
      setReviews(reviews.filter((r: Review) => r.id !== id));
      showNotification('success', 'Review deleted!');
    } catch (err) {
      showNotification('error', 'Failed to delete review');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-cormorant text-3xl font-semibold text-[#0F172A]">Customer Reviews</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A97E] text-[#0F172A] rounded-xl hover:bg-[#0F172A] hover:text-[#F8F5F2] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Review
        </button>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-cormorant text-2xl font-semibold text-[#0F172A] mb-6">Add Customer Review</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newReview.customer_name}
                  onChange={(e) => setNewReview({ ...newReview, customer_name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                />
                <textarea
                  placeholder="Review Text"
                  value={newReview.review_text}
                  onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none resize-none"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#0F172A]/60 mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0F172A]/60 mb-1">Visit Date</label>
                    <input
                      type="text"
                      placeholder="e.g., December 2024"
                      value={newReview.visit_date}
                      onChange={(e) => setNewReview({ ...newReview, visit_date: e.target.value })}
                      className="w-full px-4 py-3 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 border-2 border-[#0F172A]/20 text-[#0F172A] rounded-xl hover:bg-[#0F172A]/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={saving || !newReview.customer_name || !newReview.review_text}
                  className="flex-1 py-3 bg-[#0F172A] text-[#F8F5F2] rounded-xl hover:bg-[#C8A97E] hover:text-[#0F172A] transition-all disabled:opacity-50"
                >
                  Add Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-[#C8A97E] text-[#C8A97E]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-[#0F172A]/80 italic mb-3">"{review.review_text}"</p>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#0F172A]">{review.customer_name}</span>
                  <span className="text-[#0F172A]/50 text-sm">{review.visit_date}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bookings Tab
const BookingsTab = ({ bookings, setBookings, showNotification }: any) => {
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (!res.ok) throw new Error('Failed to update');
      setBookings(bookings.map((b: Booking) => b.id === id ? { ...b, status } : b));
      showNotification('success', `Booking ${status}!`);
    } catch (err) {
      showNotification('error', 'Failed to update booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div>
      <h2 className="font-cormorant text-3xl font-semibold text-[#0F172A] mb-8">Table Bookings</h2>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F172A] text-[#F8F5F2]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Guests</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Seating</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBC8]">
              {bookings.map((booking: Booking) => (
                <tr key={booking.id} className="hover:bg-[#EADBC8]/20">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#0F172A]">{booking.customer_name}</p>
                      {booking.special_requests && (
                        <p className="text-xs text-[#0F172A]/50 mt-1 max-w-[200px] truncate">
                          Note: {booking.special_requests}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#0F172A]">{booking.phone}</p>
                    <p className="text-xs text-[#0F172A]/60">{booking.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#0F172A]">{booking.date}</p>
                    <p className="text-xs text-[#0F172A]/60">{booking.time}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-[#0F172A]">{booking.guests}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#0F172A] capitalize">
                      {booking.seating_preference?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bookings.length === 0 && (
          <div className="text-center py-12 text-[#0F172A]/50">
            No bookings yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
