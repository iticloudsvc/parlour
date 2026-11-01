import { getStore } from '../store/dbStore.js';

export const getReviews = (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, reviews: store.testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = (req, res) => {
  try {
    const { name, rating, comment, service } = req.body;
    if (!name || !comment || !rating) {
      return res.status(400).json({ success: false, message: 'Name, rating, and review comments are required.' });
    }

    const store = getStore();
    const newReview = {
      id: `test-${Date.now()}`,
      name,
      role: 'Verified Guest',
      rating: Number(rating) || 5,
      comment,
      service: service || 'Salon Experience',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString()
    };

    store.testimonials.unshift(newReview);
    res.status(201).json({ success: true, review: newReview, message: 'Thank you for your valuable feedback!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogs = (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, blogs: store.blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTeam = (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, team: store.team, staff: store.staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitContactInquiry = (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please enter your name, email, and message.' });
    }

    const store = getStore();
    const inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    store.inquiries.push(inquiry);
    res.status(201).json({
      success: true,
      message: 'Your message has been sent to the Glamour Concierge. We will get back to you within 2 hours.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
