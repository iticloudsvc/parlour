import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Calendar, ArrowRight, Eye, Heart, Crown } from 'lucide-react';
import CardTilt3D from '../3d/CardTilt3D';

const beautyLooks = [
  {
    id: 1,
    title: 'Imperial Kundan Bridal Airbrush',
    style: 'Royal North Indian Wedding',
    image: 'https://images.pexels.com/photos/29368881/pexels-photo-29368881.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowType: '24-Hr Dewy Porcelain Glass Skin',
    duration: '210 mins',
    price: 14999,
    rating: 5.0,
    tags: ['HD Airbrush', 'Kundan Draping', 'Mink Lashes'],
    desc: 'Bespoke bridal styling crafted for 4K video with luminous HD foundation, ruby bindi, and heavy kundan jewelry.'
  },
  {
    id: 2,
    title: 'South Indian Kanjeevaram Muhuratham',
    style: 'Traditional Gold & Jasmine Glow',
    image: 'https://images.pexels.com/photos/28941551/pexels-photo-28941551.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowType: 'Mirror-Finish Golden Luminescence',
    duration: '180 mins',
    price: 12999,
    rating: 4.99,
    tags: ['Temple Jewelry', 'Jasmine Gajra', 'Dewy Highlights'],
    desc: 'Timeless temple bridal elegance with radiant golden highlights, traditional poola jada hair styling, and royal silk saree draping.'
  },
  {
    id: 3,
    title: '24K Kashmiri Saffron Hydra-Facial',
    style: 'Pure Skin Cellular Radiance',
    image: 'https://images.pexels.com/photos/15416958/pexels-photo-15416958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowType: 'Luminous Crystal Glass Skin',
    duration: '75 mins',
    price: 2799,
    rating: 4.98,
    tags: ['Kashmiri Saffron', '24K Gold Mask', 'Vortex Clean'],
    desc: 'Deep ultrasound vortex pore extraction that infuses organic saffron peptides, creating natural sparkling cheekbone radiance.'
  },
  {
    id: 4,
    title: 'Botanical Keratin Indian Silk Gloss',
    style: 'Lustrous Radiant Glow & Silk Tresses',
    image: 'https://images.pexels.com/photos/29368877/pexels-photo-29368877.jpeg?auto=compress&cs=tinysrgb&w=1200',
    glowType: '5-Month Mirror Shine & Crystal Glow',
    duration: '150 mins',
    price: 3499,
    rating: 4.96,
    tags: ['Formaldehyde-Free', 'Argan Serum', 'Glass Finish'],
    desc: 'Tames tropical frizz and restores crystal radiance with pure plant proteins and cold-pressed botanical argan oil.'
  }
];

const IndianBeautyShowcase = () => {
  const [activeLook, setActiveLook] = useState(beautyLooks[0]);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-pink-50/20 dark:from-[#0f0f1c] dark:via-[#16162a] dark:to-[#0b0b14] relative overflow-hidden">
      {/* Background soft ambient orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
            <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Radiant Indian Elegance Lookbook</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
            Celebrated Indian Brides &{' '}
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Celestial Glow Rituals
            </span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Immerse yourself in authentic Indian luxury. Each bridal look and skincare treatment is customized to deliver luminous, illuminated, high-definition radiance.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {beautyLooks.map((look) => (
            <button
              key={look.id}
              onClick={() => setActiveLook(look)}
              className={`px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 border shadow-sm ${
                activeLook.id === look.id
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white border-transparent shadow-lg shadow-pink-500/25 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-pink-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{look.title}</span>
            </button>
          ))}
        </div>

        {/* Active Look Feature Showcase */}
        <div className="bg-white/90 dark:bg-[#151528]/90 backdrop-blur-xl rounded-3xl border border-amber-200/80 dark:border-pink-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Photo Card with 3D Tilt */}
            <div className="lg:col-span-6">
              <CardTilt3D className="w-full">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white dark:border-pink-500/40 group">
                  <img
                    src={activeLook.image}
                    alt={activeLook.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-105"
                  />
                  
                  {/* Radiant overlay with soft golden glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-900 font-black text-xs shadow-md border border-amber-300 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{activeLook.rating} Rating (Verified Bride)</span>
                    </span>
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                      {activeLook.style}
                    </span>
                    <h3 className="font-serif font-black text-2xl drop-shadow-md">
                      {activeLook.title}
                    </h3>
                  </div>
                </div>
              </CardTilt3D>
            </div>

            {/* Look Details & Booking Callout */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-1">
                  ✨ Signature Radiance Treatment
                </span>
                <h3 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
                  {activeLook.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base mt-3 leading-relaxed">
                  {activeLook.desc}
                </p>
              </div>

              {/* Highlights Pill Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase">Complexion Result</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{activeLook.glowType}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
                  <p className="text-xs text-pink-700 dark:text-pink-400 font-bold uppercase">Session Duration</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{activeLook.duration}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeLook.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price & Booking Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase block">Special Bridal Package</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-pink-600 dark:text-pink-400">
                      ₹{activeLook.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{Math.round(activeLook.price * 1.25).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/booking?service=${encodeURIComponent(activeLook.title)}`}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-black text-sm tracking-wide shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 btn-3d-pink"
                >
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>Reserve This Glow Look</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Look Grid Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {beautyLooks.map((look) => (
            <div
              key={look.id}
              onClick={() => setActiveLook(look)}
              className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all cursor-pointer group shadow-sm hover:shadow-xl ${
                activeLook.id === look.id
                  ? 'border-amber-400 ring-2 ring-pink-500 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-pink-300'
              }`}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                  {look.glowType.split(' ')[0]} Glow
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {look.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 truncate">{look.style}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black text-pink-600">₹{look.price}</span>
                <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {look.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndianBeautyShowcase;
