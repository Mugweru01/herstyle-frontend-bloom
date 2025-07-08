
import React from 'react';

import NewHeroSection from '../components/Home/NewHeroSection';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import HerPicks from '../components/Home/HerPicks';
import Testimonials from '../components/Home/Testimonials';
import Newsletter from '../components/Home/Newsletter';

const Index = () => {
  return (
    <>
      <NewHeroSection />
      <FeaturedCategories />
      <HerPicks />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Index;
