// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Section 1: Background Image */}
      <div className="bg-[url('/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-no-repeat bg-center w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-center mt-0 text-8xl" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Welcome to the world of fragrance
        </h1>
        <div className="py-10">
          <p className="text-white text-center text-8xl pb-10" style={{ fontFamily: 'Bebas Neue, normal' }}>
            Find the scent for you
          </p>
          <div className="text-center mt-8">
            <Link to="/fragrances">
              <button
                className="bg-white text-black font-semibold py-4 px-8 rounded-none text-xl hover:bg-gray-200 transition duration-300 ease-in-out"
                style={{ fontFamily: 'Bebas Neue, normal' }}
              >
                Find a Fragrance
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: New Background with Content and Photos at the Bottom */}
      <div className="w-full min-h-screen bg-gray-100 pt-20">
        <h2 className="text-black text-center text-5xl py-20" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Discover More Fragrances
        </h2>
        <p className="text-black text-center max-w-3xl mx-auto text-2xl pb-10" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Explore our wide collection of perfumes, colognes, and scented products. Find something that suits your style and personality.
        </p>
        <div className="scroll-pl-6 grid grid-flow-col auto-cols-max snap-x overflow-x-auto mt-20 pb-10">
          <div className="snap-start mx-4">
            <img src="/creed_aventus_absolu.PNG" className="rounded-lg" />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          {/* Additional images */}
        </div>
      </div>

      {/* Section 3: Additional Content */}
      <div className="w-full min-h-screen bg-black pt-20">
        <h2 className="text-white text-center text-5xl py-20" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Join the Scentopedia Community
        </h2>
        <p className="text-white text-center max-w-3xl mx-auto text-2xl pb-10" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Become part of a community that shares your passion for fragrances. Discover new scents, share your experiences, and connect with others.
        </p>
      </div>
    </div>
  );
};

export default Home;
