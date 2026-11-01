import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const serviceSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  tags: [String],
  popular: { type: Boolean, default: false },
  features: [String]
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.8 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 10 },
  image: { type: String, required: true },
  badge: { type: String, default: '' },
  description: { type: String, required: true },
  ingredients: { type: String, default: '' }
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  services: [{ type: String, required: true }],
  staff: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'paid' },
  paymentMethod: { type: String, default: 'UPI / Razorpay' },
  notes: { type: String, default: '' }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Verified Client' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  avatar: { type: String },
  service: { type: String, default: 'General Experience' }
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const ServiceModel = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export const ReviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);
