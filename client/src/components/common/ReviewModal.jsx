import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

const ReviewModal = ({ isOpen, onClose, onReviewAdded }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [service, setService] = useState('Haircut & Keratin Treatment');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitting(true);
    try {
      const res = await api.createReview({ name, rating, comment, service });
      if (res.success) {
        setSuccess(true);
        if (onReviewAdded) onReviewAdded(res.review);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30">
        <div className="p-6 bg-gradient-to-r from-pink-600 to-amber-600 text-white flex justify-between items-center">
          <div>
            <h3 className="font-serif font-bold text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              Share Your Glamour Experience
            </h3>
            <p className="text-xs text-pink-100">Your feedback inspires our beauty artisans</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-slate-800 dark:text-white">
              Thank You For Your Review!
            </h4>
            <p className="text-xs text-slate-500">Your testimony has been published to the guest wall.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shalini Roy"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Service Experienced
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option>Haircut, Styling & Keratin Treatment</option>
                <option>Hydra-Glow Facial & De-Tan Therapy</option>
                <option>Royal Couture Bridal Makeup & Styling</option>
                <option>Swedish & Volcanic Hot Stone Massage</option>
                <option>Artisan Gel Nail Art & Luxury Spa Pedicure</option>
                <option>General Spa & Salon Experience</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Detailed Review
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How did our therapists treat you? What results did you love most?"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-pink-500/30 transition-all btn-3d-pink disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
