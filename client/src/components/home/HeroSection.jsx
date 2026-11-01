import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Star,
  ShieldCheck,
  Heart,
  Crown,
  CheckCircle2,
  Box,
  Image as ImageIcon,
  Flame,
  ChevronRight
} from 'lucide-react';
import Hero3DCanvas from '../3d/Hero3DCanvas';
import CardTilt3D from '../3d/CardTilt3D';
import { useLanguage } from '../../context/LanguageContext';

const radiantLooks = [
  {
    id: 'kundan-bride',
    title: 'Royal Kundan Airbrush Bride',
    tagline: '24K Saffron Luminous Glass Skin',
    image: 'https://images.pexels.com/photos/29368881/pexels-photo-29368881.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowScore: '99.8%',
    badge: '👑 Royal Bride',
    desc: 'Transfer-free HD airbrush with authentic temple Kundan draping and radiant golden luminescence.'
  },
  {
    id: 'saffron-glow',
    title: '24K Saffron Diamond Radiance',
    tagline: 'Dewy Porcelain Cheekbone Shine',
    image: 'https://images.pexels.com/photos/29368877/pexels-photo-29368877.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowScore: '99.5%',
    badge: '✨ Glass Skin',
    desc: 'High-definition micro-luminescence with natural rosy highlights and sparkling eyes.'
  },
  {
    id: 'mirror-radiance',
    title: 'Heritage Muhuratham Look',
    tagline: 'Mirror-Finish Golden Glow',
    image: 'https://images.pexels.com/photos/28941551/pexels-photo-28941551.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowScore: '99.7%',
    badge: '💎 Pure Elegance',
    desc: 'Royal bridal reflection with antique gold jewelry, flawless complexion and fresh jasmine styling.'
  },
  {
    id: 'hydra-facial',
    title: 'Kashmiri Saffron Hydra Facial',
    tagline: 'Deep Cellular Aura Glow',
    image: 'https://images.pexels.com/photos/15416958/pexels-photo-15416958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowScore: '99.9%',
    badge: '🌸 Salon Glow',
    desc: 'Deep cellular hydration infused with pure 24K gold foil, herbal antioxidants, and organic Kashmiri saffron.'
  }
];

const HeroSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('integrated'); // 'integrated' | '3d-focus' | 'photo-focus'
  const [selectedLook, setSelectedLook] = useState(radiantLooks[0]);

  return (
    <section className="relative min-h-[96vh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-pink-50/30 dark:from-[#0d0d1a] dark:via-[#131326] dark:to-[#0a0a14]">
      {/* Background ambient lighting orbs - warm gold & bright rose glow */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-300/25 dark:bg-amber-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-rose-400/20 dark:bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (5 cols on xl, 6 on lg): Typography, Headlines & CTAs */}
          <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left space-y-6 pt-2 lg:pt-0">
            {/* Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-amber-300/80 dark:border-pink-500/50 shadow-md backdrop-blur-md">
              <Crown className="w-4 h-4 text-amber-500 animate-bounce" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-300 tracking-wide">
                Glow Like Angel • Luxury Indian Parlour
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Headline */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl xl:text-6xl text-slate-900 dark:text-white leading-[1.12]">
              Radiant & Luminous{' '}
              <span className="block mt-1 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                Glowing Elegance
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Transform your aura with Bangalore's most celebrated beauty sanctuary. Experience radiant glass skin with 24K Kashmiri saffron hydra facials, royal Kundan bridal HD airbrush couture, and botanical keratin silk therapies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-black text-sm sm:text-base tracking-wide shadow-xl hover:shadow-pink-500/40 active:scale-95 transition-all flex items-center justify-center gap-2.5 btn-3d-pink group"
              >
                <Calendar className="w-5 h-5 text-amber-200" />
                <span>Book Bridal Glow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 hover:text-pink-600 dark:hover:text-pink-400 font-extrabold text-sm sm:text-base border-2 border-amber-300/60 dark:border-slate-700 shadow-md hover:border-pink-400 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Royal Services Menu</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-amber-200/60 dark:border-slate-800 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex-shrink-0 shadow-sm">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">4.99 / 5</p>
                  <p className="text-[10px] text-slate-500">5,800+ Glowing Brides</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">CIDESCO</p>
                  <p className="text-[10px] text-slate-500">Certified Artists</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex-shrink-0 shadow-sm">
                  <Heart className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">24K Saffron</p>
                  <p className="text-[10px] text-slate-500">100% Herbal Glow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols on xl, 6 on lg): UNSUPPRESSED 3D COSMETIC STAGE + RADIANT GLOWING INDIAN BEAUTY SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            
            {/* Top Interactive Mode Switcher Pill */}
            <div className="flex items-center justify-center sm:justify-end gap-2 mb-3 z-30 relative">
              <div className="inline-flex p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-amber-300/80 dark:border-pink-500/40 shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab('integrated')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'integrated'
                      ? 'bg-gradient-to-r from-amber-500 to-pink-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-pink-600'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D & Radiant Glow</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('3d-focus')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === '3d-focus'
                      ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-pink-600'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-amber-300" />
                  <span>3D Cosmetic Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('photo-focus')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'photo-focus'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-pink-600'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>Bridal Lookbook</span>
                </button>
              </div>
            </div>

            {/* Main Visual Stage Frame */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/90 via-amber-50/50 to-pink-50/70 dark:from-[#18182e] dark:via-[#1e1e38] dark:to-[#141428] border-2 border-amber-300/80 dark:border-pink-500/40 shadow-2xl backdrop-blur-xl min-h-[480px] sm:min-h-[550px]">
              
              {/* Shimmer Border Light Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-pink-500/10 pointer-events-none" />

              {/* ----------------- MODE 1: INTEGRATED (DUAL 3D + RADIANT GLOWING BRIDE CARD) ----------------- */}
              {activeTab === 'integrated' && (
                <div className="relative w-full h-[520px] sm:h-[580px] p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Left inside card: Radiant Glowing Indian Bride Photo in 3D Tilt Card */}
                  <div className="w-full sm:w-[48%] h-full relative z-20 flex flex-col justify-between">
                    <CardTilt3D className="w-full h-full">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/90 group">
                        <img
                          src={selectedLook.image}
                          alt={selectedLook.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                        />
                        
                        {/* Golden Radiance Aura Overlay (NO heavy dark shading) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-amber-200/20" />

                        {/* Top floating pill */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-white/95 text-amber-900 font-black text-[11px] shadow-md border border-amber-300 flex items-center gap-1">
                            <Crown className="w-3 h-3 text-amber-600" />
                            {selectedLook.badge}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/95 text-white font-extrabold text-[11px] shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {selectedLook.glowScore} Glow
                          </span>
                        </div>

                        {/* Bottom Info on Image */}
                        <div className="absolute bottom-3 left-3 right-3 text-white p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20">
                          <p className="text-xs font-black text-amber-300 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-400" />
                            {selectedLook.title}
                          </p>
                          <p className="text-[10px] text-pink-100 mt-0.5 line-clamp-2">
                            {selectedLook.desc}
                          </p>
                        </div>
                      </div>
                    </CardTilt3D>

                    {/* Quick Look Selector Thumbnails below photo */}
                    <div className="grid grid-cols-4 gap-1.5 pt-2">
                      {radiantLooks.map((look) => (
                        <button
                          key={look.id}
                          type="button"
                          onClick={() => setSelectedLook(look)}
                          className={`relative h-12 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedLook.id === look.id
                              ? 'border-amber-500 ring-2 ring-pink-500 scale-105 z-10'
                              : 'border-white/60 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={look.image} alt={look.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right inside: Prominent Interactive 3D Cosmetic Canvas (Unsuppressed!) */}
                  <div className="w-full sm:w-[52%] h-full relative z-10 flex flex-col items-center justify-center">
                    <div className="absolute top-2 right-2 z-20 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
                      <Box className="w-3 h-3 text-amber-500" />
                      <span>Interactive 3D Stage • Move Cursor</span>
                    </div>

                    <div className="w-full h-[320px] sm:h-[440px] relative">
                      <Hero3DCanvas />
                    </div>

                    {/* 3D Features Tagline */}
                    <div className="flex items-center gap-2 mt-1 z-20">
                      <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
                        ✨ 3D Gold Perfume
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
                        💄 Ruby Bullet
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
                        💎 Orbiting Pearls
                      </span>
                    </div>
                  </div>

                </div>
              )}

              {/* ----------------- MODE 2: FULL 3D COSMETIC STUDIO ----------------- */}
              {activeTab === '3d-focus' && (
                <div className="relative w-full h-[520px] sm:h-[580px] p-6 flex flex-col items-center justify-between">
                  <div className="w-full flex items-center justify-between z-20">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        ✨ 360° Interactive Canvas
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 dark:text-white">
                        Three.js Luxury Cosmetic Stage
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-pink-600 text-white text-xs font-bold shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-200" />
                      Live 3D Gyro Tilt
                    </span>
                  </div>

                  {/* Spacious 3D Canvas */}
                  <div className="w-full flex-1 relative my-2">
                    <Hero3DCanvas />
                  </div>

                  {/* 3D Stage Info Pills */}
                  <div className="w-full grid grid-cols-3 gap-2 z-20">
                    <div className="p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-amber-300/60 shadow-sm text-center">
                      <p className="text-[11px] font-black text-slate-900 dark:text-white">Crystal Glass Bottle</p>
                      <p className="text-[9px] text-slate-500">Reflective Gold Core</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-pink-300/60 shadow-sm text-center">
                      <p className="text-[11px] font-black text-slate-900 dark:text-white">Ruby Satin Lipstick</p>
                      <p className="text-[9px] text-slate-500">360° Precision Rotation</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-amber-300/60 shadow-sm text-center">
                      <p className="text-[11px] font-black text-slate-900 dark:text-white">Floating Stardust</p>
                      <p className="text-[9px] text-slate-500">Additive Particle Blend</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- MODE 3: BRIDAL LOOKBOOK FULL RADIANCE ----------------- */}
              {activeTab === 'photo-focus' && (
                <div className="relative w-full h-[520px] sm:h-[580px] p-6 flex flex-col justify-between">
                  <div className="relative z-20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">
                        👑 Real Indian Brides & Clients
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 dark:text-white">
                        {selectedLook.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md">
                      {selectedLook.glowScore} Radiant Luminescence
                    </span>
                  </div>

                  {/* Full Size Radiant Glowing Bride Portrait */}
                  <div className="relative flex-1 my-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/90 group">
                    <img
                      src={selectedLook.image}
                      alt={selectedLook.title}
                      className="w-full h-full object-cover object-center filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-950/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                      <p className="text-sm sm:text-base font-black text-amber-300">{selectedLook.tagline}</p>
                      <p className="text-xs text-pink-100 max-w-lg mt-0.5">{selectedLook.desc}</p>
                    </div>
                  </div>

                  {/* Look Switcher Row */}
                  <div className="grid grid-cols-4 gap-3 z-20">
                    {radiantLooks.map((look) => (
                      <button
                        key={look.id}
                        type="button"
                        onClick={() => setSelectedLook(look)}
                        className={`p-2 rounded-xl flex items-center gap-2 border-2 transition-all ${
                          selectedLook.id === look.id
                            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 shadow-md scale-102'
                            : 'bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        <img src={look.image} alt={look.title} className="w-9 h-9 rounded-lg object-cover" />
                        <div className="text-left hidden sm:block">
                          <p className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight truncate">
                            {look.title.split(' ')[0]}
                          </p>
                          <p className="text-[9px] text-emerald-600 font-bold">{look.glowScore}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
