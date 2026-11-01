import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Heart,
  ShieldCheck,
  Award
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white/90 dark:bg-[#0e0e1c] border-t border-amber-200/40 dark:border-pink-900/30 text-slate-700 dark:text-slate-300 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Card */}
        <div className="relative rounded-3xl p-8 sm:p-10 mb-14 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Glamour VIP Circle</span>
              </div>
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl">
                Unlock 15% Off Your First Luxury Treatment
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm mt-1">
                Receive curated beauty tips, seasonal bridal trends, and private salon member perks.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email..."
                className="px-5 py-3.5 rounded-full bg-white/90 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 w-full sm:w-72 shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 btn-3d"
              >
                <span>{subscribed ? 'Joined VIP!' : 'Subscribe'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          {subscribed && (
            <p className="text-xs text-amber-200 mt-3 text-center md:text-left font-medium">
              ✨ Welcome to the Glamour VIP Circle! Check your inbox for your 15% discount voucher.
            </p>
          )}
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-white dark:bg-[#121224] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <span className="font-serif font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                GLOW LIKE ANGEL
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bangalore's sanctuary for haute Indian bridal aesthetics, pure Kashmiri saffron hydra-facials, and holistic Ayurvedic rejuvenation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Signature Services */}
          <div>
            <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Signature Rituals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Haircut & Botanical Keratin
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Hydra-Glow Facial & De-Tan
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Royal Couture Bridal Makeup
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Volcanic Hot Stone Therapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Artisan Gel Nail Art & Pedicure
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  24K Gold Collagen Anti-Aging
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/booking" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Book Online Appointment
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  3D Boutique & Skincare Shop
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Before & After Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Master Artisans & Story
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Beauty & Skincare Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Directions & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Salon Address & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-4">
              Flagship Studio
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
              <span>123, Beauty Street, MG Road, Bangalore, Karnataka - 560001</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <a href="tel:+919876543210" className="hover:text-pink-600 transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 text-pink-500 flex-shrink-0" />
              <a href="mailto:care@glowlikeangel.com" className="hover:text-pink-600 transition-colors">
                care@glowlikeangel.com
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Monday - Sunday</p>
                <p>9:00 AM – 9:00 PM (Valet Available)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Glow Like Angel. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>for timeless elegance & wellbeing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
