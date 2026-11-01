const API_BASE = '/api';

const getHeaders = (hasAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (hasAuth) {
    const token = localStorage.getItem('glamour_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Services
  getServices: async (category = '', search = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/services?${params.toString()}`);
    return res.json();
  },
  getServiceById: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`);
    return res.json();
  },
  getSpaPackages: async () => {
    const res = await fetch(`${API_BASE}/services/spa-packages`);
    return res.json();
  },

  // Products
  getProducts: async (category = '', search = '', sort = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    return res.json();
  },
  getProductById: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  // Bookings
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },
  getBookings: async (status = '', email = '') => {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (email) params.append('email', email);
    const res = await fetch(`${API_BASE}/bookings?${params.toString()}`);
    return res.json();
  },
  updateBookingStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  getAdminStats: async () => {
    const res = await fetch(`${API_BASE}/bookings/analytics/stats`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Chatbot
  sendChatMessage: async (message, history = []) => {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ message, history })
    });
    return res.json();
  },

  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials)
    });
    return res.json();
  },
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData)
    });
    return res.json();
  },
  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true)
    });
    return res.json();
  },

  // Reviews, Blogs, Team, Inquiries
  getReviews: async () => {
    const res = await fetch(`${API_BASE}/content/reviews`);
    return res.json();
  },
  createReview: async (reviewData) => {
    const res = await fetch(`${API_BASE}/content/reviews`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(reviewData)
    });
    return res.json();
  },
  getBlogs: async () => {
    const res = await fetch(`${API_BASE}/content/blogs`);
    return res.json();
  },
  getTeam: async () => {
    const res = await fetch(`${API_BASE}/content/team`);
    return res.json();
  },
  submitContact: async (inquiryData) => {
    const res = await fetch(`${API_BASE}/content/contact`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(inquiryData)
    });
    return res.json();
  }
};
