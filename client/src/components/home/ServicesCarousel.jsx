import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Star, ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import CardTilt3D from '../3d/CardTilt3D';
import { api } from '../../services/api';

const ServicesCarousel = () => {
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        if (res.success && res.services) {
          setServices(res.services);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchServices();
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % Math.max(1, services.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + Math.max(1, services.length - 2)) % Math.max(1, services.length - 2));
  };

  return (
    <section className="py-20 relative overflow-hidden bg-pink-50/40 dark:bg-[#151528]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Haute Aesthetics Menu</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Signature Treatments & Rituals
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Immerse yourself in our clinical skincare, couture bridal artistry, and deep botanical hair restoration.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              to="/services"
              className="ml-2 inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
            >
              <span>View All 10 Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Carousel Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(currentIndex, currentIndex + 3).map((service) => (
            <CardTilt3D key={service.id} className="h-full">
              <div className="h-full flex flex-col rounded-3xl overflow-hidden glass-card shadow-xl border border-white/60 dark:border-pink-500/20 group hover:border-pink-400 transition-colors">
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-extrabold text-slate-800 dark:text-amber-300 shadow-md">
                      {service.category}
                    </span>
                  </div>

                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-pink-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{service.rating}</span>
                      <span className="text-slate-300">({service.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white line-clamp-1 group-hover:text-pink-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features pills */}
                    <div className="mt-3 space-y-1.5">
                      {service.features?.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Special Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                          ₹{service.price.toLocaleString()}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs line-through text-slate-400">
                            ₹{service.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all flex items-center gap-1.5 btn-3d-pink"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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

export default ServicesCarousel;
