import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Check,
  Star,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const AdminDashboardPage = () => {
  const { user, isAdmin, openLogin, loginUser } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'products' | 'services'
  const [stats, setStats] = useState({
    totalBookings: 2,
    totalRevenue: 21297,
    confirmedCount: 2,
    totalServices: 10,
    totalProducts: 8,
    totalUsers: 2,
    satisfactionRate: '99.4%'
  });
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, productsRes, servicesRes] = await Promise.all([
        api.getAdminStats().catch(() => ({ success: false })),
        api.getBookings(statusFilter).catch(() => ({ success: false })),
        api.getProducts().catch(() => ({ success: false })),
        api.getServices().catch(() => ({ success: false }))
      ]);

      if (statsRes?.success && statsRes.stats) setStats(statsRes.stats);
      if (bookingsRes?.success && bookingsRes.bookings) setBookings(bookingsRes.bookings);
      if (productsRes?.success && productsRes.products) setProducts(productsRes.products);
      if (servicesRes?.success && servicesRes.services) setServices(servicesRes.services);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, statusFilter]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await api.updateBookingStatus(bookingId, newStatus);
      if (res.success) {
        setBookings(prev =>
          prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickAdminLogin = async () => {
    try {
      const res = await api.login({ email: 'admin@glowlikeangel.com', password: 'admin123' });
      if (res.success) {
        loginUser(res.user, res.token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-card border border-amber-300/60 dark:border-pink-500/30 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
            Administrator Access Required
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            This portal is restricted to Glow Like Angel directors and managers. Please sign in with administrator credentials.
          </p>
          <div className="pt-2 space-y-3">
            <button
              onClick={handleQuickAdminLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:shadow-pink-500/30 transition-all btn-3d-pink flex items-center justify-center gap-2"
            >
              <span>👑 1-Click Login as Admin (admin@glowlikeangel.com)</span>
            </button>
            <button
              onClick={openLogin}
              className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Sign In with Other Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter((b) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Studio Management Control</span>
            </div>
            <h1 className="font-serif font-black text-3xl text-slate-900 dark:text-white">
              Executive Director Dashboard
            </h1>
            <p className="text-xs text-slate-500">Live booking analytics, inventory counts, and staff assignments.</p>
          </div>

          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-pink-600 hover:bg-pink-50 flex items-center gap-2 text-xs font-semibold self-start sm:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-lg space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-xs">
              <span>Total Revenue</span>
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="font-black text-2xl text-slate-900 dark:text-white">
              ₹{stats.totalRevenue?.toLocaleString()}
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">● Live Gateway Collections</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-lg space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-xs">
              <span>Confirmed Bookings</span>
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="font-black text-2xl text-slate-900 dark:text-white">
              {stats.confirmedCount}
            </p>
            <span className="text-[10px] text-slate-400">Total: {stats.totalBookings} Registered</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-lg space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-xs">
              <span>Boutique Inventory</span>
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-black text-2xl text-slate-900 dark:text-white">
              {stats.totalProducts} Items
            </p>
            <span className="text-[10px] text-purple-600 font-bold">100% In-Stock</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-lg space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-xs">
              <span>Satisfaction Rate</span>
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                <Star className="w-4 h-4 fill-emerald-500" />
              </div>
            </div>
            <p className="font-black text-2xl text-slate-900 dark:text-white">
              {stats.satisfactionRate}
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">5-Star Verified Guests</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservations & Appointments ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-300'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Salon Services ({services.length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by booking ID, client name..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="flex gap-2">
                {['All', 'confirmed', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`capitalize px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table Card */}
            <div className="rounded-3xl overflow-hidden glass-card border border-white/60 dark:border-pink-500/20 shadow-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Client Details</th>
                    <th className="p-4">Treatments</th>
                    <th className="p-4">Date & Slot</th>
                    <th className="p-4">Staff</th>
                    <th className="p-4">Total Fee</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-slate-400">
                        No appointments found matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30">
                        <td className="p-4 font-mono font-bold text-pink-600 dark:text-pink-400">
                          {b.id}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{b.customerName}</p>
                          <p className="text-[11px] text-slate-500">{b.phone}</p>
                          <p className="text-[10px] text-slate-400">{b.email}</p>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="line-clamp-2 text-slate-700 dark:text-slate-300 font-medium">
                            {b.services?.join(', ')}
                          </p>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="font-semibold text-slate-900 dark:text-white">{b.date}</span>
                          <span className="block text-[11px] text-slate-500">{b.timeSlot}</span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">
                          {b.staff}
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          ₹{b.totalAmount?.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : b.status === 'completed'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-md flex gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-500 uppercase">{p.category}</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{p.name}</h4>
                    <p className="text-sm font-extrabold text-pink-600 dark:text-pink-400 mt-1">
                      ₹{p.price?.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                      <span>Stock: <strong>{p.stockCount || 25} units</strong></span>
                      <span className="text-emerald-500 font-bold">● Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES CATALOG */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-md flex gap-4"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 uppercase">
                    {s.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{s.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{s.shortDesc}</p>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      ₹{s.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">{s.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
