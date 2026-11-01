import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  User,
  Calendar,
  Languages,
  LogOut,
  ShieldAlert,
  Crown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, isAdmin, openLogin, logoutUser } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.products, path: '/products' },
    { name: t.nav.wellness, path: '/wellness' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.contact, path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-[2px] shadow-md group-hover:rotate-6 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#121224] rounded-[14px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                GLOW LIKE ANGEL
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase text-slate-500 dark:text-amber-300/80 -mt-1">
                Luxury Indian Parlour
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-pink-600/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/60 flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Action Tools (Language, Dark Mode, Cart, Book CTA, User Auth) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              title="Toggle English / Hindi"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-pink-600 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Languages className="w-4 h-4 text-amber-500" />
              <span className="uppercase text-[11px]">{lang}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Rose Mode' : 'Switch to Dark Velvet Mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-xs"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Cart Bag Icon with Live Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-pink-600 transition-colors shadow-xs"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* User Account / Login Button */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-pink-50 dark:bg-slate-800 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900/60 text-xs font-semibold">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 hidden group-hover:block z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 font-semibold"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Admin Control</span>
                    </Link>
                  )}
                  <button
                    onClick={logoutUser}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-pink-600 bg-slate-100 dark:bg-slate-800 hover:bg-pink-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Quick Book CTA Button */}
            <Link
              to="/booking"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white text-xs font-bold tracking-wide shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all btn-3d-pink"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.booking}</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-pink-200/50 dark:border-pink-900/40 px-4 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  location.pathname === link.path
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                <Sparkles className="w-3.5 h-3.5 opacity-60" />
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-amber-500 bg-amber-500/10 border border-amber-500/30 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-sm shadow-md"
              >
                {t.nav.booking}
              </Link>
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLogin();
                  }}
                  className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
