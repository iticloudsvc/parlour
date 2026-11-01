import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Send,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import PaymentModal from '../components/common/PaymentModal';

const timeSlots = [
  '09:30 AM',
  '10:30 AM',
  '11:45 AM',
  '01:00 PM',
  '02:15 PM',
  '03:30 PM',
  '04:45 PM',
  '06:00 PM',
  '07:15 PM'
];

const staffList = [
  { id: 'any', name: 'Any Available Master Specialist', role: 'Fastest availability' },
  { id: 'marcella', name: 'Marcella Rossi', role: 'Artistic Creative Director (Hair Maestro)' },
  { id: 'evelyn', name: 'Dr. Evelyn Vance', role: 'Lead Aesthetician (Skincare & Facials)' },
  { id: 'priya', name: 'Priya Sundaram', role: 'Celebrity Bridal Makeup Artist' },
  { id: 'liam', name: 'Liam Chen', role: 'Master Spa Therapist & Reflexologist' },
  { id: 'simran', name: 'Simran Kaur', role: 'Master Gel Nail Artist' }
];

const AppointmentBookingPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedService = searchParams.get('service');

  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('Any Available Master Specialist');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:45 AM');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        if (res.success && res.services) {
          setAvailableServices(res.services);
          if (preselectedService) {
            const match = res.services.find(s => s.title.toLowerCase() === preselectedService.toLowerCase());
            if (match) setSelectedServices([match]);
          } else if (res.services.length > 0) {
            setSelectedServices([res.services[0]]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, [preselectedService]);

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(s => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!customer.name || !customer.email || !customer.phone) {
      setErrorMsg('Please enter your full name, email address, and phone number.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one beauty treatment.');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setIsPaymentModalOpen(false);
    try {
      const payload = {
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        services: selectedServices.map(s => s.title),
        staff: selectedStaff,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        totalAmount,
        notes: customer.notes,
        paymentMethod: paymentDetails.gateway.toUpperCase()
      };

      const res = await api.createBooking(payload);
      if (res.success) {
        setConfirmedBooking({
          ...res.booking,
          notification: res.notification
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!confirmedBooking ? (
          <div>
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Seamless Concierge Reservation</span>
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
                Reserve Your Private Appointment
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
                Personalized care, zero waiting queues, and guaranteed complimentary herbal refreshments upon arrival.
              </p>
            </div>

            {errorMsg && (
              <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (7 cols): Selection controls */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Services Multi-Select */}
                <div className="p-6 sm:p-7 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                      Select Treatments (Multi-Select)
                    </h3>
                    <span className="text-xs text-pink-600 dark:text-pink-400 font-semibold">
                      {selectedServices.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {availableServices.map((service) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-pink-500 bg-pink-50/70 dark:bg-pink-950/40 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              readOnly
                              checked={isSelected}
                              className="w-4 h-4 text-pink-600 rounded-md focus:ring-pink-500"
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                {service.title}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {service.category} • {service.duration}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            ₹{service.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Staff / Specialist Selection */}
                <div className="p-6 sm:p-7 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Select Preferred Specialist
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {staffList.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStaff(st.name)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          selectedStaff === st.name
                            ? 'border-pink-500 bg-pink-50/70 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-xs sm:text-sm">{st.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{st.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Date & Time Selection */}
                <div className="p-6 sm:p-7 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Choose Date & Available Time Slot
                  </h3>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-pink-600" />
                      <span>Select Appointment Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                    />
                  </div>

                  {/* Time Slot Grid */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Select Time Slot</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                            selectedTimeSlot === slot
                              ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Guest Details & Booking Summary */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                {/* Guest Details Card */}
                <div className="p-6 sm:p-7 rounded-3xl glass-card border border-white/60 dark:border-pink-500/20 shadow-xl space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    Your Contact Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="e.g. Shalini Roy"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (for calendar invite) *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="shalini@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (for SMS & WhatsApp reminder) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Special Requests / Skin Allergies (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="e.g. Sensitive scalp, fragrance sensitivity..."
                      className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                {/* Booking Order Summary Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-pink-50/80 dark:bg-[#16162a] border border-pink-200 dark:border-pink-900/50 shadow-xl space-y-4">
                  <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                    Appointment Summary
                  </h4>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <strong className="text-slate-900 dark:text-white">{selectedDate} at {selectedTimeSlot}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Specialist:</span>
                      <strong className="text-slate-900 dark:text-white truncate max-w-[200px]">{selectedStaff}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-slate-800 dark:text-slate-200">123 Beauty St, MG Rd, Bangalore</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500">Payable Amount</span>
                      <p className="font-black text-2xl text-pink-600 dark:text-pink-400">
                        ₹{totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Taxes Included
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 btn-3d-pink"
                  >
                    <CreditCard className="w-5 h-5 text-amber-200" />
                    <span>Proceed to Secure Payment</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Razorpay & Stripe Dummy Gateway Integration</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl glass-card border border-amber-300/60 dark:border-pink-500/30 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                Reservation Confirmed
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
                We Await Your Arrival, {confirmedBooking.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                Your appointment ID is <strong className="text-pink-600 dark:text-pink-400 font-mono text-base">{confirmedBooking.id}</strong>.
              </p>
            </div>

            {/* Simulated Dispatched Email & SMS Notice */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-left text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold border-b border-amber-200 dark:border-slate-800 pb-2">
                <Send className="w-4 h-4" />
                <span>Simulated SMS & Email Dispatched (Dummy Integration)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>SMS to {confirmedBooking.phone}:</strong> {confirmedBooking.notification?.smsMessage}
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Email to {confirmedBooking.email}:</strong> Subject: "{confirmedBooking.notification?.emailSubject}"
              </p>
            </div>

            {/* Appointment Details Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Master Specialist:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{confirmedBooking.staff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatments:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{confirmedBooking.services?.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-pink-600 dark:text-pink-400">₹{confirmedBooking.totalAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Salon Address:</span>
                <span className="text-slate-800 dark:text-slate-200">123, Beauty Street, MG Road, Bangalore</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-full border border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Print / Save Appointment
              </button>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="flex-1 py-3 rounded-full bg-pink-600 text-white font-bold text-xs hover:bg-pink-700 shadow-md"
              >
                Book Another Ritual
              </button>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        details={{
          type: 'booking',
          title: selectedServices.map(s => s.title).join(', '),
          totalAmount
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default AppointmentBookingPage;
