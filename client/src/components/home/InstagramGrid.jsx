import React from 'react';
import { Instagram, Heart, MessageCircle, Crown } from 'lucide-react';

const instaPosts = [
  {
    image: 'https://images.pexels.com/photos/29368881/pexels-photo-29368881.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '4,820',
    comments: '284',
    tag: '#RoyalBridalGlow'
  },
  {
    image: 'https://images.pexels.com/photos/29368877/pexels-photo-29368877.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '3,890',
    comments: '198',
    tag: '#24KSaffronGlassSkin'
  },
  {
    image: 'https://images.pexels.com/photos/28941551/pexels-photo-28941551.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '3,450',
    comments: '172',
    tag: '#MirrorReflectionBride'
  },
  {
    image: 'https://images.pexels.com/photos/15416958/pexels-photo-15416958.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '2,940',
    comments: '142',
    tag: '#DewyFacialTreatment'
  },
  {
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    likes: '2,380',
    comments: '89',
    tag: '#BridalNailCouture'
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    likes: '3,110',
    comments: '146',
    tag: '#AyurvedicWellness'
  }
];

const InstagramGrid = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-[#0c0c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800 shadow-sm">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>@glowlikeangel.studio</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Real Indian Brides & Everyday Angels
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Explore daily transformations, wedding trials, and fair glowing skin journeys on our official Instagram.
          </p>
        </div>

        {/* 6-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instaPosts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-slate-100 dark:border-slate-800"
            >
              <img
                src={post.image}
                alt="Instagram salon capture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-bold text-amber-300 mb-1">{post.tag}</span>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-white" />
                    {post.comments}
                  </span>
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
