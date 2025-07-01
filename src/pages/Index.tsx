
import React from 'react';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import HerPicks from '../components/Home/HerPicks';
import Testimonials from '../components/Home/Testimonials';
import Newsletter from '../components/Home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCategories />
      <HerPicks />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
