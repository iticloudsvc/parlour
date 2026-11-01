import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  RotateCw,
  Heart,
  Users,
  Compass,
  Star
} from 'lucide-react';
import { api } from '../services/api';

const awards = [
  {
    title: 'Vogue India Bridal Excellence 2025',
    org: 'Vogue Beauty & Fashion Awards',
    year: '2025'
  },
  {
    title: 'CIDESCO International Clean Accreditation',
    org: 'CIDESCO World Zurich',
    year: '2024 - 2026'
  },
  {
    title: "L'Oréal Professional Hair Trophy Finalist",
    org: "L'Oréal Paris Hair Design",
    year: '2024'
  },
  {
    title: 'Top 10 Luxury Day Spas in Karnataka',
    org: 'Condé Nast Traveler Readers Choice',
    year: '2023 - 2025'
  }
];

const AboutUsPage = () => {
  const [team, setTeam] = useState([]);
  const [flippedTeam, setFlippedTeam] = useState({});

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.getTeam();
        if (res.success && res.team) {
          setTeam(res.team);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const toggleFlip = (id) => {
    setFlippedTeam(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Our Heritage & Vision</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Crafting Timeless Beauty Since 2012
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Born from a passion for refined Indian bridal couture and holistic Ayurvedic wellness rituals, Glow Like Angel is Bangalore's premier haute beauty destination.
          </p>
        </div>

        {/* Salon Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-pink-500/20 group">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
              alt="Glamour Beauty Studio Interior"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                Flagship Sanctuary • MG Road, Bangalore
              </span>
              <h3 className="font-serif font-bold text-2xl mt-1">
                An Oasis of Calm & Haute Couture Styling
              </h3>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Where Science Meets Sensory Indulgence
            </h2>
            <p>
              Founded on the belief that beauty should celebrate every Indian woman's divine glow, Glow Like Angel began as an intimate boutique salon on MG Road. Over the past 14 years, we have grown into an award-winning sanctuary trusted by over 25,000 discerning guests, brides, and creative icons.
            </p>
            <p>
              We believe in non-toxic, biocompatible formulations. Every shampoo, botanical keratin glaze, and peptide facial is cruelty-free, organic, and chosen for both visible results and skin health longevity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-black text-3xl text-pink-600 dark:text-pink-400 font-serif">25,000+</p>
                <p className="text-xs text-slate-500 mt-1">Transformations Curated</p>
              </div>
              <div>
                <p className="font-black text-3xl text-amber-500 font-serif">1,200+</p>
                <p className="text-xs text-slate-500 mt-1">Royal Weddings Styled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section with 3D Flip Cards */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-200 dark:border-amber-800">
              <Users className="w-3.5 h-3.5" />
              <span>The Masters of Artistry</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Meet Our Celebrity Stylists & Estheticians
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Hover or tap any master artisan to flip in 3D and read their international credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => {
              const isFlipped = flippedTeam[member.id];
              return (
                <div
                  key={member.id}
                  className="h-96 perspective-1000 cursor-pointer group"
                  onClick={() => toggleFlip(member.id)}
                >
                  <div
                    className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : 'group-hover:[transform:rotateY(180deg)]'
                    }`}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden glass-card border border-white/60 dark:border-pink-500/20 shadow-xl flex flex-col justify-between">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-amber-300 backdrop-blur-sm">
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                            {member.experience}
                          </p>
                          <h3 className="font-serif font-bold text-lg">{member.name}</h3>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 line-clamp-2">
                          {member.role}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span>Flip for specialty</span>
                          <span className="text-amber-500 font-bold">3D Details →</span>
                        </div>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-gradient-to-br from-[#1c1c38] to-[#26122d] text-white shadow-2xl border border-pink-500/40 flex flex-col justify-between">
                      <div>
                        <span className="text-xs uppercase font-extrabold text-amber-300">
                          Master Credentials
                        </span>
                        <h4 className="font-serif font-bold text-lg text-pink-200 mt-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-slate-300 font-medium mb-4">
                          {member.role}
                        </p>

                        <div className="space-y-3 text-xs text-slate-300">
                          <div>
                            <strong className="block text-white mb-0.5">Focus Specialty:</strong>
                            <p className="text-slate-300">{member.specialty}</p>
                          </div>
                          <div>
                            <strong className="block text-white mb-0.5">Recognition & Honor:</strong>
                            <p className="text-amber-300">{member.award}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400">
                        <span>Tap to flip front</span>
                        <span className="text-pink-400 font-semibold">Available for Booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications & Awards Grid */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-amber-300/40 dark:border-pink-500/30 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              Certifications & Industry Honors
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Recognized globally for clinical safety, sanitation, and artistic innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((a, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                  {a.title}
                </h4>
                <p className="text-[11px] text-slate-500">{a.org}</p>
                <span className="inline-block text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                  {a.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
