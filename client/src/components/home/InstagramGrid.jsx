import React from 'react';
import { Instagram, Heart, MessageCircle, Crown } from 'lucide-react';

const instaPosts = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    likes: '3,420',
    comments: '184',
    tag: '#IndianBridalGlow'
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    likes: '2,890',
    comments: '98',
    tag: '#KashmiriSaffronHydra'
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    likes: '1,950',
    comments: '72',
    tag: '#BotanicalKeratin'
  },
  {
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    likes: '2,140',
    comments: '112',
    tag: '#BridalNailArt'
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    likes: '1,780',
    comments: '64',
    tag: '#AyurvedicSpaDay'
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    likes: '3,110',
    comments: '146',
    tag: '#GlowLikeAngel'
  }
];

const InstagramGrid = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>@glowlikeangel.studio</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Real Indian Brides & Everyday Angels
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Explore daily transformations, wedding trials, and skin glow journeys on our official Instagram.
          </p>
        </div>

        {/* 6-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instaPosts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200/60 dark:border-slate-800"
            >
              <img
                src={post.image}
                alt="Instagram salon capture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                <span className="text-[10px] font-bold text-amber-300 mb-1">{post.tag}</span>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
