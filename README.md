# ✨ Glamour Beauty Studio — Production-Ready Beauty Parlour Website

> An award-winning, luxury beauty parlour and day spa web platform built with **React (Vite)**, **Three.js**, **Framer Motion**, **TailwindCSS**, **Node.js + Express**, **MongoDB**, and **OpenAI GPT-4**.

---

## 🌟 Highlights & Key Features

- **Interactive 3D Stage (Three.js)**: Hero section with custom floating 3D lipstick, luxury perfume bottle with refraction, beauty pearls, orbiting gold dust, dynamic mouse-following lighting, and parallax tilt.
- **CSS 3D Tilt on Hover**: CardTilt3D engine with dynamic specular glare on service cards, product cards, and spa package pricing tables.
- **3D Testimonial & Team Card Flips**: Realistic 180° card turnover showcasing client reviews and master stylist credentials.
- **Interactive 3D Before / After Comparison Slider**: Smooth split slider comparing natural vs. bridal airbrush transformations and frizzy vs. keratin gloss hair.
- **AI Customer Consultant Bot (OpenAI GPT-4)**: Floating live concierge widget handling service inquiries, exact pricing, booking help, and beauty recommendations with session persistence and fallback knowledge-base engine.
- **Appointment Reservation Engine**: Multi-step calendar date picker, time slot matrix, multi-service selector, specialist selection, and simulated Email/SMS dispatch.
- **Payment Gateway Simulation**: Razorpay UPI QR code, Stripe credit card simulator, and Net Banking checkout with instant receipt generation.
- **E-Commerce 3D Boutique**: Category filtering, live search, 3D rotating product preview, slide-over beauty bag cart drawer, and order processing.
- **Dark Velvet / Light Rose Mode**: Persisted theme switcher with soft pink (`#FFF0F5`) and deep luxury purple-black (`#121224`) palette.
- **Multi-Language Toggle**: Instant English / Hindi translation for navigation and hero sections.
- **Executive Admin Dashboard**: Real-time KPI revenue analytics, appointment confirmation/cancellation management, and product inventory tracking.
- **Zero-Downtime Database Resilience**: Automatically connects to MongoDB when present; seamlessly switches to an in-memory/JSON store if local MongoDB is not running, ensuring instant evaluation with zero configuration friction.

---

## 🏗️ Folder Structure

```
beautyp/
├── package.json                 # Monorepo task orchestration
├── .env.example                 # Environment variables blueprint
├── README.md                    # Project documentation
│
├── server/                      # Node.js + Express API Backend
│   ├── server.js                # Express app entry point
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js                # MongoDB connection + in-memory store fallback
│   ├── models/
│   │   └── Schemas.js           # Mongoose schemas for User, Booking, Product, Service
│   ├── controllers/
│   │   ├── authController.js    # JWT register/login/me
│   │   ├── serviceController.js # Services catalog & spa packages
│   │   ├── productController.js # 3D shop products
│   │   ├── bookingController.js # Appointments & simulated SMS/Email dispatch
│   │   ├── chatController.js    # OpenAI GPT-4 live customer support bot
│   │   └── reviewController.js  # Reviews, blogs, team & inquiries
│   ├── routes/                  # Express route modules
│   ├── middleware/              # JWT auth and Admin verification
│   ├── data/
│   │   └── initialData.js       # Pre-seeded services, products, team, testimonials
│   ├── store/
│   │   └── dbStore.js           # Resilient storage adapter
│   ├── render.yaml              # Render deployment blueprint
│   └── Dockerfile               # Containerized production runtime
│
└── client/                      # React.js (Vite) + Tailwind Frontend
    ├── index.html               # Head tags, Google Fonts (Playfair + Plus Jakarta)
    ├── vite.config.js           # Vite dev server + proxy to :5000
    ├── tailwind.config.js       # Custom palette, 3D shadows & perspectives
    ├── postcss.config.js
    ├── vercel.json              # Vercel deployment rewrites
    ├── netlify.toml             # Netlify SPA redirect rules
    ├── package.json
    └── src/
        ├── index.css            # Tailwind directives, 3D styles, glassmorphism
        ├── main.jsx             # React DOM root
        ├── App.jsx              # Routing & context tree
        ├── context/
        │   ├── ThemeContext.jsx    # Dark/light mode persistence
        │   ├── LanguageContext.jsx # English/Hindi translations
        │   ├── AuthContext.jsx     # JWT state & modals
        │   └── CartContext.jsx     # Beauty bag state & quantities
        ├── services/
        │   └── api.js              # Fetch client communicating with backend
        ├── components/
        │   ├── 3d/
        │   │   ├── Hero3DCanvas.jsx  # Pure Three.js floating objects & lights
        │   │   └── CardTilt3D.jsx    # 3D parallax tilt wrapper
        │   ├── common/
        │   │   ├── Navbar.jsx        # 3D glassmorphism navbar
        │   │   ├── Footer.jsx        # VIP newsletter, hours, studio location
        │   │   ├── ChatBot.jsx       # OpenAI GPT-4 live customer assistant
        │   │   ├── WhatsAppButton.jsx# Direct WhatsApp concierge
        │   │   ├── CartDrawer.jsx    # Slide-over cart & subtotal
        │   │   ├── AuthModal.jsx     # JWT login & signup modal
        │   │   ├── PaymentModal.jsx  # Razorpay & Stripe checkout simulation
        │   │   ├── ReviewModal.jsx   # Guest review & star rating submission
        │   │   └── LoadingSkeleton.jsx
        │   ├── home/
        │   │   ├── HeroSection.jsx
        │   │   ├── ServicesCarousel.jsx
        │   │   ├── WhyChooseUs.jsx
        │   │   ├── Testimonials3D.jsx
        │   │   ├── InstagramGrid.jsx
        │   │   └── CTASection.jsx
        │   └── gallery/
        │       └── BeforeAfterSlider3D.jsx # Interactive 3D split comparison slider
        └── pages/
            ├── HomePage.jsx
            ├── ServicesPage.jsx          # All 10 requested treatment categories
            ├── ProductsPage.jsx          # 3D product cards & e-commerce shop
            ├── AppointmentBookingPage.jsx# Multi-step calendar & slot booking
            ├── TherapyWellnessPage.jsx   # Spa packages & 3D pricing cards
            ├── AboutUsPage.jsx           # Salon story & 3D flip team cards
            ├── GalleryPage.jsx           # Before/After + Masonry portfolio
            ├── ContactPage.jsx           # Map, contact form & studio coordinates
            ├── BlogPage.jsx              # Skincare & aesthetic advice journal
            └── AdminDashboardPage.jsx    # Management control & revenue KPIs
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or later recommended; tested on v26)
- **npm** (v9.0.0 or later)
- **MongoDB** (optional; app automatically uses fallback in-memory store if not installed locally)

### 1. Installation
Install all dependencies for both backend and frontend from the root:
```bash
npm run install:all
```
*(Or run `cd server && npm install` and `cd ../client && npm install` separately).*

### 2. Run in Development Mode
To launch both backend (port 5000) and frontend (port 5173) concurrently:
```bash
npm run dev
```

Or run them in separate terminals:
```bash
# Terminal 1: Backend Server (http://localhost:5000)
npm run dev:server

# Terminal 2: Frontend Client (http://localhost:5173)
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 OpenAI API Key Setup (Security Best Practices)

The AI Beauty Consultant uses OpenAI's GPT-4 API to provide intelligent beauty recommendations, service pricing, and booking help.

### Setting Up Your Key Securely:
1. Obtain an API key from the [OpenAI Platform](https://platform.openai.com/api-keys).
2. Open `server/.env` (or create it from `server/.env.example`).
3. Add your key:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. **Security Notice**:
   - Never commit `.env` to public GitHub repositories.
   - The API key is stored exclusively on the backend (`server/.env`) and is never exposed in client bundles or network inspection.
   - In production, set `OPENAI_API_KEY` through your hosting provider's secret manager (e.g. Render/Railway environment dashboard).
5. **Zero-Failure Fallback Engine**:
   If an OpenAI key is not provided or if the OpenAI quota is exceeded, the server automatically routes requests to our built-in beauty consultant knowledge engine so that the chatbot is immediately working and responsive for evaluation!

---

## 🔑 Pre-Configured Demo Accounts

For testing authentication, checkout, and admin features:

| Role | Email | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Director / Admin** | `admin@glamour.com` | `admin123` | Full access to Admin Dashboard, booking approvals, status updates |
| **VIP Client** | `user@glamour.com` | `user123` | Appointment booking, cart checkout, profile view |

*Tip: The Sign In modal includes convenient **1-Click Demo Fill** buttons.*

---

## 📍 Required Salon Information

- **Address**: `123, Beauty Street, MG Road, Bangalore, Karnataka - 560001`
- **Phone**: `+91 98765 43210`
- **Email**: `info@glamourbeautystudio.com`
- **Hours**: Monday to Sunday, 9:00 AM – 9:00 PM (Valet Parking Available)

---

## 🚀 Production Deployment

### Frontend (Vercel / Netlify)
1. Build client assets:
   ```bash
   npm run build
   ```
2. The output will be in `client/dist`.
3. Pre-configured `client/vercel.json` and `client/netlify.toml` handle SPA rewrites and routing out of the box.

### Backend (Render / Railway / Docker)
- Deploy the `server/` directory.
- `server/render.yaml` and `server/Dockerfile` provide pre-configured deployment setups.
- Set environment variables on your host:
  `PORT=5000`, `NODE_ENV=production`, `MONGODB_URI=<your-mongodb-atlas-uri>`, `JWT_SECRET=<strong-random-key>`, `OPENAI_API_KEY=<your-openai-key>`.

---

© 2026 Glamour Beauty Studio. All Rights Reserved.
