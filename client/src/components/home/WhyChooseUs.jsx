import React from 'react';
import { Award, ShieldCheck, Sparkles, HeartHandshake, CheckCircle2, Feather } from 'lucide-react';
import CardTilt3D from '../3d/CardTilt3D';

const features = [
  {
    icon: Award,
    title: 'International CIDESCO Masters',
    desc: 'Our senior artists and therapists hold certifications from Milan, Paris, and London academies with over a decade of celebrity styling experience.',
    accent: 'from-amber-400 to-amber-600'
  },
  {
    icon: ShieldCheck,
    title: 'Autoclave Medical Sterilization',
    desc: 'Strict 5-stage hospital-grade instrument sterilization and single-use sealed luxury towels, spatulas, and disposable robes for every guest.',
    accent: 'from-pink-500 to-rose-600'
  },
  {
    icon: Feather,
    title: 'Cruelty-Free Botanical Formulas',
    desc: 'Zero harmful parabens, silicones, or formaldehydes. We exclusively use certified organic argan, 24K nano gold, and plant peptides.',
    accent: 'from-emerald-400 to-teal-600'
  },
  {
    icon: HeartHandshake,
    title: 'Private Suites & Bespoke Care',
    desc: 'Escape the rush in sound-insulated private suites featuring customized acoustic music, aromatherapy diffusers, and warm herbal tea service.',
    accent: 'from-purple-500 to-indigo-600'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-200 dark:border-amber-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Glamour Distinction</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Why Bangalore’s Connoisseurs Choose Us
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Every ritual is choreographed to elevate your natural beauty with precision, hygiene, and timeless luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <CardTilt3D key={idx} className="h-full">
                <div className="h-full p-8 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl flex flex-col justify-between group hover:border-amber-400 transition-colors">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accent} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Guaranteed Excellence</span>
                  </div>
                </div>
              </CardTilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
