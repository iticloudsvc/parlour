import { getStore } from '../store/dbStore.js';

export const createBooking = (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      services,
      staff,
      date,
      timeSlot,
      totalAmount,
      notes,
      paymentMethod,
    } = req.body;

    if (!customerName || !email || !phone || !services || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required appointment booking details.'
      });
    }

    const store = getStore();
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: bookingId,
      customerName,
      email,
      phone,
      services: Array.isArray(services) ? services : [services],
      staff: staff || 'Any Available Master Specialist',
      date,
      timeSlot,
      totalAmount: Number(totalAmount) || 2999,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || 'UPI / Instant Online Gateway',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    store.bookings.unshift(newBooking);

    // Simulated Email & SMS Dispatch
    const dummyNotification = {
      emailSentTo: email,
      emailSubject: `Confirmation: Your Appointment ${bookingId} at Glow Like Angel`,
      smsSentTo: phone,
      smsMessage: `Glow Like Angel: Hi ${customerName}, your appointment ${bookingId} on ${date} at ${timeSlot} is confirmed. Address: 123 Beauty St, MG Rd, Bangalore. Call +91 98765 43210 for queries.`,
      dispatchedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Appointment successfully confirmed! Confirmation dispatched via Email & SMS.',
      booking: newBooking,
      notification: dummyNotification
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = (req, res) => {
  try {
    const store = getStore();
    const { status, email } = req.query;
    let list = [...store.bookings];

    if (email) {
      list = list.filter(b => b.email.toLowerCase() === email.toLowerCase());
    }

    if (status && status !== 'All') {
      list = list.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    res.json({ success: true, count: list.length, bookings: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const store = getStore();
    const booking = store.bookings.find(b => b.id === id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    booking.status = status || booking.status;
    res.json({ success: true, message: `Booking status updated to ${status}.`, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStats = (req, res) => {
  try {
    const store = getStore();
    const totalBookings = store.bookings.length;
    const totalRevenue = store.bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const confirmedCount = store.bookings.filter(b => b.status === 'confirmed').length;
    const totalServices = store.services.length;
    const totalProducts = store.products.length;
    const totalUsers = store.users.length;

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalRevenue,
        confirmedCount,
        totalServices,
        totalProducts,
        totalUsers,
        satisfactionRate: '99.4%'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
