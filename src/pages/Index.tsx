
import React from 'react';
import Layout from '../components/Layout/Layout';
import NewHeroSection from '../components/Home/NewHeroSection';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import HerPicks from '../components/Home/HerPicks';
import Testimonials from '../components/Home/Testimonials';
import Newsletter from '../components/Home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <NewHeroSection />
      <FeaturedCategories />
      <HerPicks />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
