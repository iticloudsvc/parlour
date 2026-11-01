import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Calendar, ArrowRight, Eye, Heart, Crown } from 'lucide-react';
import CardTilt3D from '../3d/CardTilt3D';

const beautyLooks = [
  {
    id: 1,
    title: 'Imperial Kundan Bridal Airbrush',
    style: 'Royal North Indian Wedding',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    glowType: '24-Hr Sweat-Proof Glass Skin',
    duration: '210 mins',
    price: 14999,
    rating: 5.0,
    tags: ['HD Airbrush', 'Kundan Draping', 'Mink Lashes'],
    desc: 'Bespoke bridal styling crafted for high-definition 4K wedding videography with transfer-free dewy foundation.'
  },
  {
    id: 2,
    title: 'South Indian Kanjeevaram Muhuratham',
    style: 'Traditional Gold & Jasmine Glow',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    glowType: 'Warm Golden Luminescence',
    duration: '180 mins',
    price: 12999,
    rating: 4.98,
    tags: ['Temple Jewelry', 'Jasmine Gajra', 'Matte Glow'],
    desc: 'Timeless temple bridal elegance with dewy golden highlights, traditional poola jada hair styling, and saree draping.'
  },
  {
    id: 3,
    title: '24K Kashmiri Saffron Hydra-Facial',
    style: 'Pure Skin Cellular Radiance',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    glowType: 'Zero-Pigmentation Sun De-Tan',
    duration: '75 mins',
    price: 2799,
    rating: 4.96,
    tags: ['Kashmiri Saffron', '24K Gold Mask', 'Vortex Clean'],
    desc: 'Deep ultrasound vortex pore extraction that infuses organic saffron peptides, creating natural cheekbone radiance.'
  },
  {
    id: 4,
    title: 'Botanical Keratin Indian Silk Gloss',
    style: 'Lustrous Frizz-Free Indian Tresses',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    glowType: '5-Month Mirror Shine',
    duration: '150 mins',
    price: 3499,
    rating: 4.94,
    tags: ['Formaldehyde-Free', 'Argan Serum', 'Layered Cut'],
    desc: 'Tames tropical Indian monsoon frizz and restores bouncy, silky texture with plant proteins and cold-pressed argan oil.'
  }
];

const IndianBeautyShowcase = () => {
  const [activeLook, setActiveLook] = useState(beautyLooks[0]);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-pink-100/30 to-transparent dark:via-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-300 dark:border-pink-800 shadow-xs">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Royal Indian Beauty Lookbook</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Glowing Indian Radiance, Sculpted to Perfection
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3">
            Real Indian brides, red-carpet transformations, and Ayurvedic skincare rituals captured in our Bangalore parlour.
          </p>
        </div>

        {/* 4 Rich Visual Indian Beauty Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {beautyLooks.map((look) => (
            <CardTilt3D key={look.id} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-3xl overflow-hidden glass-card shadow-2xl border border-amber-200/50 dark:border-pink-500/30 group hover:border-pink-500 transition-all duration-300 bg-white/90 dark:bg-[#151528]/90">
                {/* Image Box with glowing Indian Face */}
                <div className="relative h-80 sm:h-88 overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/30 shadow-md">
                      {look.style}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-pink-600 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      {look.rating}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {look.glowType}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight text-white drop-shadow-md">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Booking CTA */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {look.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {look.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-[10px] font-semibold border border-pink-200 dark:border-pink-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold">Special Package</span>
                      <p className="font-black text-xl text-slate-900 dark:text-white">
                        ₹{look.price.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      to={`/booking?service=${encodeURIComponent(look.title)}`}
                      className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs tracking-wide shadow-md active:scale-95 transition-all flex items-center gap-1.5 btn-3d-pink"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Look</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndianBeautyShowcase;
