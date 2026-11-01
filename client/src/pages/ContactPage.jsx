import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Car
} from 'lucide-react';
import { api } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        setError(res.message || 'Submission failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Concierge & Flagship Location</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Connect With Our Studio
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Have questions regarding wedding packages, bridal trials, or custom hair formulas? Our concierge team is at your service.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column (5 cols): Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
                Glow Like Angel Studio
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Flagship Studio Address</strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      123, Beauty Street, MG Road, Bangalore, Karnataka - 560001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Concierge Phone</strong>
                    <a href="tel:+919876543210" className="text-pink-600 dark:text-pink-400 font-bold hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">VIP Email</strong>
                    <a href="mailto:care@glowlikeangel.com" className="text-slate-600 dark:text-slate-400 hover:text-pink-600 hover:underline">
                      care@glowlikeangel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Operating Hours</strong>
                    <p className="text-slate-600 dark:text-slate-400">Monday - Sunday: 9:00 AM – 9:00 PM</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      Open on all public holidays
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Valet Parking</strong>
                    <p className="text-slate-600 dark:text-slate-400">
                      Complimentary covered valet parking available at our MG Road portico.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Glamour%20Studio%2C%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
                <div>
                  <h4 className="font-bold text-sm">Need Instant Assistance?</h4>
                  <p className="text-xs text-emerald-100">Message our on-duty beauty manager on WhatsApp</p>
                </div>
              </div>
              <span className="text-xs font-bold underline group-hover:translate-x-1 transition-transform">
                Chat Now →
              </span>
            </a>
          </div>

          {/* Right Column (7 cols): Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
                  Send a Message to the Concierge
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  We reply within 2 hours during studio operational hours.
                </p>
              </div>

              {success && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Your message has been received! Our concierge will connect with you shortly.</span>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Shalini Roy"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="shalini@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option>General Inquiry</option>
                      <option>Bridal Package Consultation</option>
                      <option>Keratin & Hair Smoothing Query</option>
                      <option>Spa & Corporate Booking</option>
                      <option>Product Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the dates, treatments, or specific questions you have..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-bold text-sm shadow-xl hover:shadow-pink-500/30 active:scale-98 transition-all flex items-center justify-center gap-2 btn-3d-pink disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message to Studio</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30">
          <div className="p-4 bg-white/90 dark:bg-[#16162a] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
              <MapPin className="w-4 h-4 text-pink-600" />
              <span>Studio Location • MG Road, Bangalore</span>
            </div>
            <a
              href="https://maps.google.com/?q=MG+Road+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline"
            >
              Open in Google Maps App →
            </a>
          </div>
          <iframe
            title="Glamour Beauty Studio Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9856425313936!2d77.60803447589255!3d12.972797914856952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1681a9807567%3A0x67396a84f3e580e0!2sMahatma%20Gandhi%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full filter contrast-105"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
