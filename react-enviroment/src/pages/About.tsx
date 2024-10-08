// src/pages/About.tsx
import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    // This will log an error message in the console whenever the About page is rendered
    console.error('Error: You have navigated to the About page!');
  }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <div className="text-black text-center py-10">
      <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bebas Neue, normal' }}>About Scentopedia</h2>
      <p className="text-2xl">Learn more about our mission and the fragrances we recommend.</p>
    </div>
  );
};

export default About;
