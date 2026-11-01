import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Quote, CheckCircle2, RotateCw, Plus } from 'lucide-react';
import { api } from '../../services/api';
import ReviewModal from '../common/ReviewModal';

const Testimonials3D = () => {
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.getReviews();
        if (res.success && res.reviews) {
          setReviews(res.reviews);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchReviews();
  }, []);

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewAdded = (newRev) => {
    setReviews(prev => [newRev, ...prev]);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-pink-50/40 dark:bg-[#131326]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Client Adoration</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Loved by Brides, Models & Connoisseurs
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Hover or tap any card to flip in 3D and read their authentic transformation stories.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all flex items-center gap-2 btn-3d-pink self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => {
            const isFlipped = flippedCards[rev.id];
            return (
              <div
                key={rev.id}
                className="h-80 perspective-1000 cursor-pointer group"
                onClick={() => toggleFlip(rev.id)}
              >
                <div
                  className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : 'group-hover:[transform:rotateY(180deg)]'
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl p-7 glass-card border border-white/60 dark:border-pink-500/20 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400 px-2.5 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/80">
                          {rev.service}
                        </span>
                      </div>

                      <Quote className="w-8 h-8 text-amber-400/40 mb-2" />
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic line-clamp-4 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                          alt={rev.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                            {rev.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{rev.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <RotateCw className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
                        <span>Flip 3D</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-7 bg-gradient-to-br from-[#1b1b33] to-[#25152a] text-white shadow-2xl border border-pink-500/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Verified Client Experience
                        </span>
                        <span className="text-[10px] text-slate-400">Bangalore Salon</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-pink-200 mb-2">
                        {rev.name}’s Transformation
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed overflow-y-auto max-h-36 pr-1">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-semibold">{rev.service}</span>
                      <span className="text-[10px] text-pink-400">Click to flip back</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </section>
  );
};

export default Testimonials3D;
