import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Star,
  ShieldCheck,
  Heart,
  Crown,
  CheckCircle2
} from 'lucide-react';
import Hero3DCanvas from '../3d/Hero3DCanvas';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[94vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-400/25 dark:bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-300/25 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (6 cols): Typography, Headlines & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6 pt-2 lg:pt-0">
            {/* Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-300/60 dark:border-pink-500/40 shadow-sm backdrop-blur-md">
              <Crown className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-300 tracking-wide">
                Glow Like Angel • Luxury Indian Parlour
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl xl:text-6xl text-slate-900 dark:text-white leading-[1.12]">
              Royal Indian Radiance,{' '}
              <span className="block mt-1 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Glow Like Angel
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into an oasis of celestial elegance. Specializing in award-winning Indian bridal HD airbrush couture, 24K pure Kashmiri saffron hydra facials, botanical keratin silk smoothening, and Ayurvedic spa rituals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2.5 btn-3d-pink group"
              >
                <Calendar className="w-5 h-5 text-amber-200" />
                <span>Book Your Transformation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 hover:text-pink-600 dark:hover:text-pink-400 font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-md hover:border-pink-300 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Explore Indian Bridal Menu</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-amber-200/40 dark:border-slate-800 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">4.98 / 5</p>
                  <p className="text-[10px] text-slate-500">5,000+ Brides Styled</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">CIDESCO</p>
                  <p className="text-[10px] text-slate-500">Certified Artists</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex-shrink-0">
                  <Heart className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">100% Clean</p>
                  <p className="text-[10px] text-slate-500">Ayurvedic Formulations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Photo-Rich Glowing Indian Faces Showcase + 3D Elements */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual Hero Photo Card Grid with Glowing Indian Faces */}
            <div className="relative w-full max-w-[520px] aspect-[4/5] sm:aspect-square">
              
              {/* Main Focal Image: Royal Indian Bride with Glowing Skin & Kundan Jewelry */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 dark:border-pink-500/30 group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                  alt="Royal Indian Bride Glowing Makeup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom Photo Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                    <Crown className="w-4 h-4" />
                    <span>Royal Indian Bridal Couture 2026</span>
                  </div>
                  <h3 className="font-serif font-black text-xl sm:text-2xl drop-shadow-md">
                    24K Pure Saffron HD Glow
                  </h3>
                  <p className="text-[11px] text-pink-200 mt-0.5">
                    Transfer-proof airbrush makeup with authentic temple jewelry draping
                  </p>
                </div>
              </div>

              {/* Floating Badge Card 1 (Top-Right): Glowing Skin Dewy Facial */}
              <div className="absolute -top-6 -right-4 sm:-right-6 w-44 sm:w-52 p-3 rounded-2xl bg-white/95 dark:bg-[#16162a]/95 backdrop-blur-xl border border-amber-300/60 dark:border-pink-500/30 shadow-2xl animate-float">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    alt="Indian Glowing Facial Client"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400"
                  />
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 block">
                      ✨ Hydra-Glow
                    </span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      Saffron Glass Skin
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>99.4% Luminous</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Card 2 (Bottom-Left): Hair & Salon Excellence */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 w-48 sm:w-56 p-3 rounded-2xl bg-white/95 dark:bg-[#16162a]/95 backdrop-blur-xl border border-pink-300/60 dark:border-pink-500/30 shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Indian Hair Silk Smoothening"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-pink-500"
                  />
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                      👑 5-Month Shine
                    </span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      Botanical Keratin
                    </p>
                    <p className="text-[10px] text-slate-500">Zero Tropical Frizz</p>
                  </div>
                </div>
              </div>

              {/* Subtle 3D floating cosmetic accent */}
              <div className="absolute -bottom-4 right-4 hidden sm:block w-32 h-32 pointer-events-none opacity-85 z-20">
                <Hero3DCanvas />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
