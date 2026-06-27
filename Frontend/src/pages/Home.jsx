import React from 'react';
import Hero from '../components/Hero';
import FindPharmacy from '../components/FindPharmacy';
import FeaturedPharmacies from '../components/FeaturedPharmacies';
import KeyFeatures from '../components/KeyFeatures';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQSection from '../components/FAQSection';
import CTABanner from '../components/CTABanner';
import Stat from '../components/Stat';

const Home = () => {
  return (
    <>
      <Hero />
      <FindPharmacy />
      <FeaturedPharmacies />
      <KeyFeatures />
      <Stat />
      <TestimonialCarousel />
      <FAQSection />
      <CTABanner />
    </>
  );
};

export default Home;
