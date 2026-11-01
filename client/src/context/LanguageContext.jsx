import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: '3D Boutique',
      booking: 'Book Appointment',
      wellness: 'Spa & Wellness',
      about: 'About Us',
      gallery: 'Gallery',
      blog: 'Beauty Journal',
      contact: 'Contact',
      admin: 'Admin'
    },
    hero: {
      badge: '👑 Glow Like Angel • Bangalore’s Premier Luxury Beauty Sanctuary',
      title1: 'Royal Indian Radiance,',
      title2: 'Glow Like Angel',
      desc: 'Step into an oasis of pure celestial elegance. Indulge in award-winning Indian bridal couture, 24K pure Kashmiri saffron hydra facials, botanical keratin smoothening, and Ayurvedic day spa retreats.',
      bookBtn: 'Reserve Your Transformation',
      exploreBtn: 'Explore Indian Bridal & Facials'
    },
    common: {
      quickBook: 'Book Now',
      addToCart: 'Add to Cart',
      price: 'Price',
      reviews: 'Reviews',
      rating: 'Rating',
      viewAll: 'View All',
      viewDetails: 'View Details'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      products: '3D बुटीक',
      booking: 'अपॉइंटमेंट बुक करें',
      wellness: 'स्पा और वेलनेस',
      about: 'हमारे बारे में',
      gallery: 'गैलरी',
      blog: 'ब्यूटी ब्लॉग',
      contact: 'संपर्क करें',
      admin: 'एडमिन'
    },
    hero: {
      badge: '👑 ग्लो लाइक एंजेल • बैंगलोर का शाही ब्यूटी स्टूडियो',
      title1: 'शाही भारतीय सौंदर्य,',
      title2: 'ग्लो लाइक एंजेल',
      desc: 'ग्लो लाइक एंजेल में आपका स्वागत है। हमारे विशेषज्ञ भारतीय ब्राइडल मेकअप आर्टिस्ट, 24K कश्मीरी केसर हाइड्रा फेशियल और आयुर्वेदिक थेरेपी से अपनी सुंदरता को नया रूप दें।',
      bookBtn: 'अपॉइंटमेंट बुक करें',
      exploreBtn: 'ब्राइडल व फेशियल देखें'
    },
    common: {
      quickBook: 'बुक करें',
      addToCart: 'कार्ट में जोड़ें',
      price: 'मूल्य',
      reviews: 'समीक्षाएं',
      rating: 'रेटिंग',
      viewAll: 'सभी देखें',
      viewDetails: 'विवरण देखें'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('glow_lang') || 'en');

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('glow_lang', next);
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
