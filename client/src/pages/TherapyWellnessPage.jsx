import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Clock,
  Check,
  ArrowRight,
  Flame,
  Wind,
  Droplet,
  ShieldCheck,
  Star
} from 'lucide-react';
import CardTilt3D from '../components/3d/CardTilt3D';
import { api } from '../services/api';

const modalities = [
  {
    icon: Wind,
    title: 'French Lavender Aromatherapy',
    desc: 'Pure botanical essential oils extracted from Grasse, France. Custom blended for your nervous system to dissolve insomnia and stress.',
    duration: '60 / 90 Mins',
    temp: 'Ambient Warm'
  },
  {
    icon: Flame,
    title: 'Volcanic Basalt Hot Stone Therapy',
    desc: 'Hand-harvested volcanic stones warmed to 54°C to melt deep myofascial tension and restore neuromuscular equilibrium.',
    duration: '90 Mins',
    temp: 'Heated Basalt'
  },
  {
    icon: Droplet,
    title: 'Dead Sea Mineral Body Detox',
    desc: 'Lymphatic dry brushing followed by black mineral mud wrap in an infrared thermal cocoon to eliminate cellular metabolic toxins.',
    duration: '90 Mins',
    temp: 'Thermal Wrap'
  },
  {
    icon: Heart,
    title: 'Sound Bath & Reflexology',
    desc: 'Harmonic Tibetan singing bowls and acupressure reflexology to entrain alpha brainwaves into profound parasympathetic stillness.',
    duration: '45 / 75 Mins',
    temp: 'Meditative Room'
  }
];

const TherapyWellnessPage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.getSpaPackages();
        if (res.success && res.packages) {
          setPackages(res.packages);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-200 dark:border-amber-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Sanctuary & Day Spa</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Therapy & Wellness Sanctuary
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Recharge your vital life force with therapeutic bodywork, organic aromatherapy, and metabolic detox rituals in Bangalore.
          </p>
        </div>

        {/* 4 Pillars of Therapy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {modalities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-lg space-y-4 hover:border-amber-400 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  <span>{item.duration}</span>
                  <span>{item.temp}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spa Package Pricing Table with 3D Cards */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
              Signature Spa & Wellness Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Comprehensive multi-hour wellness retreats crafted for couples, brides, and deep restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <CardTilt3D key={pkg.id} className="h-full">
                <div
                  className={`h-full flex flex-col justify-between rounded-3xl p-8 glass-card border shadow-2xl relative transition-all ${
                    pkg.popular
                      ? 'border-pink-500 dark:border-pink-500 ring-2 ring-pink-500/20'
                      : 'border-white/60 dark:border-pink-500/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                        Most Requested Ritual
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider">
                          VIP Sanctuary
                        </span>
                        <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mt-1">
                          {pkg.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                      {pkg.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        Package Inclusions:
                      </h4>
                      {pkg.includes?.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-semibold">All-Inclusive Fee</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-black text-3xl text-slate-900 dark:text-white">
                            ₹{pkg.price.toLocaleString()}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-xs line-through text-slate-400">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Save 25%</span>
                    </div>

                    <Link
                      to={`/booking?service=${encodeURIComponent(pkg.name)}`}
                      className={`w-full py-3.5 rounded-full font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white btn-3d-pink'
                          : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-pink-600 btn-3d'
                      }`}
                    >
                      <span>Reserve This Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </CardTilt3D>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyWellnessPage;
