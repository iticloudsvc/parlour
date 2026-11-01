import React, { useState } from 'react';
import { Sparkles, Eye, Filter, ArrowRight, X, Heart } from 'lucide-react';
import BeforeAfterSlider3D from '../components/gallery/BeforeAfterSlider3D';

const galleryItems = [
  {
    id: 1,
    title: 'Imperial Kundan Bridal Hair & HD Airbrush',
    category: 'Bridal Couture',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80',
    height: 'h-80'
  },
  {
    id: 2,
    title: 'Ash Blonde Seamless French Balayage',
    category: 'Hair Artistry',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    height: 'h-96'
  },
  {
    id: 3,
    title: '24K Gold Foil Hydra Infusion',
    category: 'Skin Glow',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    height: 'h-72'
  },
  {
    id: 4,
    title: 'Chrome Holographic Almond Nail Extensions',
    category: 'Nail Art',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
    height: 'h-80'
  },
  {
    id: 5,
    title: 'Heated Volcanic Stone Relaxation Sanctuary',
    category: 'Spa & Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    height: 'h-96'
  },
  {
    id: 6,
    title: 'Velvet Matte Royal Rose Lip Styling',
    category: 'Bridal Couture',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80',
    height: 'h-72'
  },
  {
    id: 7,
    title: 'Botanical Keratin Liquid Glass Finish',
    category: 'Hair Artistry',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    height: 'h-80'
  },
  {
    id: 8,
    title: 'Diamond Microdermabrasion Glow',
    category: 'Skin Glow',
    image: 'https://images.unsplash.com/photo-1512290903028-09559c3a0df4?auto=format&fit=crop&w=1000&q=80',
    height: 'h-88'
  }
];

const categories = ['All', 'Bridal Couture', 'Hair Artistry', 'Skin Glow', 'Nail Art', 'Spa & Wellness'];

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [activeBeforeAfter, setActiveBeforeAfter] = useState('bridal'); // 'bridal' | 'hair'
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Visual Portfolio</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Transformations & Artisan Gallery
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Explore our dramatic before-and-after client transformations and high-fashion hair, bridal, and skincare portfolio.
          </p>
        </div>

        {/* 3D Before / After Interactive Showcase */}
        <div className="mb-20 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
                Interactive 3D Before & After Showcase
              </h2>
              <p className="text-xs text-slate-500">Slide horizontal bar to witness the real-life transformation</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveBeforeAfter('bridal')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeBeforeAfter === 'bridal'
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                👑 Royal Bridal Couture
              </button>
              <button
                onClick={() => setActiveBeforeAfter('hair')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeBeforeAfter === 'hair'
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                💇‍♀️ Keratin Glass Hair
              </button>
            </div>
          </div>

          {activeBeforeAfter === 'bridal' ? (
            <BeforeAfterSlider3D
              beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
              beforeLabel="Natural Look"
              afterLabel="Royal Airbrush Bridal Couture"
              title="Celebrity Bridal Transformation"
              subtitle="HD Airbrush, 3D Mink Lashes, Jewelry Draping"
            />
          ) : (
            <BeforeAfterSlider3D
              beforeImage="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80"
              beforeLabel="Frizzy / Unmanaged"
              afterLabel="Botanical Keratin Gloss"
              title="Frizz-Free Botanical Keratin Therapy"
              subtitle="5 Months Long Mirror Shine & Thermal Repair"
            />
          )}
        </div>

        {/* Portfolio Masonry Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              Work Portfolio Grid
            </h2>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === c
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-3xl overflow-hidden break-inside-avoid shadow-lg cursor-pointer border border-slate-200/80 dark:border-slate-800/80"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-pink-300 mt-2 font-medium">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View High-Res Photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[75vh] w-auto mx-auto object-contain"
              />
              <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase text-amber-400 font-bold">
                    {lightboxItem.category}
                  </span>
                  <h4 className="font-serif font-bold text-lg">{lightboxItem.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Glamour Studio Portfolio</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
