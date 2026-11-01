import bcrypt from 'bcryptjs';
import {
  initialServices,
  initialProducts,
  initialSpaPackages,
  initialTestimonials,
  initialBlogs,
  initialTeam,
  initialStaffList
} from '../data/initialData.js';

// Pre-hash default passwords
const adminHash = bcrypt.hashSync('admin123', 10);
const demoUserHash = bcrypt.hashSync('user123', 10);

const store = {
  users: [
    {
      id: 'usr-admin',
      name: 'Glow Director',
      email: 'admin@glowlikeangel.com',
      password: adminHash,
      role: 'admin',
      phone: '+91 98765 43210',
      createdAt: new Date().toISOString()
    },
    {
      id: 'usr-demo',
      name: 'Ananya Sharma',
      email: 'user@glowlikeangel.com',
      password: demoUserHash,
      role: 'customer',
      phone: '+91 98111 22233',
      createdAt: new Date().toISOString()
    }
  ],
  services: [...initialServices],
  products: [...initialProducts],
  spaPackages: [...initialSpaPackages],
  testimonials: [...initialTestimonials],
  blogs: [...initialBlogs],
  team: [...initialTeam],
  staff: [...initialStaffList],
  bookings: [
    {
      id: 'BK-8902',
      customerName: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+91 98765 12345',
      services: ['Royal Bridal Airbrush & HD Couture Styling'],
      staff: 'Priya Sundaram (Celebrity Bridal Artist)',
      date: '2026-11-05',
      timeSlot: '11:00 AM',
      totalAmount: 14999,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'UPI / Razorpay',
      notes: 'Bridal muhuratham styling trial.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'BK-8903',
      customerName: 'Priya Mehta',
      email: 'priya@example.com',
      phone: '+91 97654 32109',
      services: ['24K Gold Saffron Radiance & Hydra-Glow Facial'],
      staff: 'Dr. Evelyn Vance (Chief Aesthetician)',
      date: '2026-11-08',
      timeSlot: '02:30 PM',
      totalAmount: 2799,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'Card / Stripe',
      notes: 'Allergic to synthetic scents, prefers natural rosewater.',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  inquiries: []
};

export const getStore = () => store;
