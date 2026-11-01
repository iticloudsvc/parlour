import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Clock,
  Star,
  Check,
  ArrowRight,
  Filter,
  Info,
  Calendar
} from 'lucide-react';
import CardTilt3D from '../components/3d/CardTilt3D';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { api } from '../services/api';

const categories = [
  'All',
  'Hair Styling & Treatment',
  'Skin Care',
  'Bridal Makeup Packages',
  'Nail Art & Manicure/Pedicure',
  'Spa & Body Massage Therapy',
  'Waxing Services',
  'Threading & Eyebrow shaping',
  'Hair Spa & Scalp Treatment',
  'Body Detox Therapy',
  'Anti-aging Treatments'
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await api.getServices(activeCategory, searchQuery);
        if (res.success && res.services) {
          setServices(res.services);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Complete Aesthetic Portfolio</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Our World-Class Salon & Spa Services
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Handcrafted luxury treatments administered by international master stylists and CIDESCO certified aesthetic doctors.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, keratin, facial..."
                className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900 dark:text-white">{services.length}</span> bespoke rituals
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <CardTilt3D key={service.id} className="h-full">
                <div className="h-full flex flex-col rounded-3xl overflow-hidden glass-card shadow-xl border border-white/60 dark:border-pink-500/20 group hover:border-pink-400 transition-colors">
                  {/* Service Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-900 dark:text-amber-300 shadow-md">
                        {service.category}
                      </span>
                    </div>

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

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Included steps */}
                      <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {service.features?.map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Booking Action */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Special Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-black text-2xl text-slate-900 dark:text-white">
                            ₹{service.price.toLocaleString()}
                          </span>
                          {service.originalPrice && (
                            <span className="text-xs line-through text-slate-400">
                              ₹{service.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-slate-800"
                          title="View detailed procedure"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <Link
                          to={`/booking?service=${encodeURIComponent(service.title)}`}
                          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all flex items-center gap-1.5 btn-3d-pink"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardTilt3D>
            ))}
          </div>
        )}

        {/* Detailed Procedure Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30">
              <div className="relative h-56">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-pink-600"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                    {selectedService.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl mt-1">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{selectedService.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Rating: <strong className="text-slate-800 dark:text-slate-200">{selectedService.rating} / 5.0</strong> ({selectedService.reviewCount} client reviews)</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    Treatment Overview & Clinical Protocol
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Key Highlights & Steps Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-pink-50/50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Total Treatment Fee</span>
                    <p className="font-black text-2xl text-pink-600 dark:text-pink-400">
                      ₹{selectedService.price.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/booking?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-sm shadow-lg btn-3d-pink flex items-center gap-2"
                  >
                    <span>Reserve My Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
