import React from 'react';
import HeroSection from '../components/home/HeroSection';
import IndianBeautyShowcase from '../components/home/IndianBeautyShowcase';
import ServicesCarousel from '../components/home/ServicesCarousel';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials3D from '../components/home/Testimonials3D';
import InstagramGrid from '../components/home/InstagramGrid';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <IndianBeautyShowcase />
      <ServicesCarousel />
      <WhyChooseUs />
      <Testimonials3D />
      <InstagramGrid />
      <CTASection />
    </div>
  );
};

export default HomePage;
