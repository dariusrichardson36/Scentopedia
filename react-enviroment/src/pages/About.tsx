// src/pages/About.tsx
import React, { useEffect } from 'react';

const About: React.FC = () => {
  return (
    <div className="text-black text-center py-10">
      <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bebas Neue, normal' }}>About Scentopedia</h2>
      <p className="text-2xl font-body">Welcome to Scentopedia, a fragrance discovery platform created by five friends who are passionate about scents. We believe fragrance is a personal experience, and our mission is to help you find the perfect scent that fits your style and personality. With our diverse tastes and years of exploration, we’ve crafted a site that offers expert recommendations, and smart tools to make discovering fragrances easier and more enjoyable. Whether you're new to the world of fragrance or an experienced enthusiast, we’re here to guide you in finding your signature scent. Let’s embark on this fragrant journey together!</p>
    </div>
  );
};

export default About;
