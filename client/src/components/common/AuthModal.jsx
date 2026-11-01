import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        const res = await api.login({ email: formData.email, password: formData.password });
        if (res.success) {
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            loginUser(res.user, res.token);
          }, 600);
        } else {
          setError(res.message || 'Login failed. Please check your credentials.');
        }
      } else {
        const res = await api.register(formData);
        if (res.success) {
          setSuccessMsg('Account registered! Welcome to Glamour.');
          setTimeout(() => {
            loginUser(res.user, res.token);
          }, 600);
        } else {
          setError(res.message || 'Registration failed.');
        }
      }
    } catch (err) {
      setError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (role) => {
    if (role === 'admin') {
      setFormData({
        name: 'Glow Director',
        email: 'admin@glowlikeangel.com',
        password: 'admin123',
        phone: '+91 98765 43210'
      });
      setAuthMode('login');
    } else {
      setFormData({
        name: 'Ananya Sharma',
        email: 'user@glowlikeangel.com',
        password: 'user123',
        phone: '+91 98111 22233'
      });
      setAuthMode('login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-200/50 dark:border-pink-500/30 relative">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold tracking-wider uppercase text-pink-200">Glow Like Angel Portal</span>
          </div>
          <h2 className="font-serif font-bold text-2xl">
            {authMode === 'login' ? 'Welcome Back' : 'Create Exclusive Account'}
          </h2>
          <p className="text-xs text-pink-100 mt-1">
            {authMode === 'login'
              ? 'Access appointments, wishlist, order history & VIP privileges'
              : 'Join Bangalore’s elite beauty & wellness sanctuary'}
          </p>
        </div>

        {/* Quick Demo Login Badges */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500 text-[11px]">Quick 1-Click Fill:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold hover:bg-amber-200 transition-colors"
            >
              👑 Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('user')}
              className="px-2.5 py-1 rounded-md bg-pink-100 dark:bg-pink-950/80 text-pink-800 dark:text-pink-300 font-semibold hover:bg-pink-200 transition-colors"
            >
              🌸 Demo Client
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number (for SMS Confirmations)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-500/30 active:scale-98 transition-all flex items-center justify-center gap-2 btn-3d-pink disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>{authMode === 'login' ? 'Sign In Securely' : 'Create My Account'}</span>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setError('');
                setSuccessMsg('');
                setAuthMode(authMode === 'login' ? 'signup' : 'login');
              }}
              className="text-xs text-pink-600 dark:text-pink-400 hover:underline font-medium"
            >
              {authMode === 'login'
                ? "Don't have an account yet? Register here"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
