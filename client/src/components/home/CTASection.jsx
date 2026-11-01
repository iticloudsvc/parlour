import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white overflow-hidden shadow-2xl">
          {/* Subtle 3D background shapes */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
              <span>Glow Like An Angel Tonight</span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-5xl leading-tight">
              Ready For Your Most Radiant Transformation?
            </h2>

            <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Book your private bespoke appointment with Bangalore’s foremost hair maestros and skin estheticians today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-sm sm:text-base shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2.5 btn-3d"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Reserve Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm sm:text-base border border-white/40 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Concierge: +91 98765 43210</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4 text-xs text-pink-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Instant Confirmation with SMS & Email</span>
              </div>
              <span>•</span>
              <span>Zero Cancellation Fee up to 4 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
