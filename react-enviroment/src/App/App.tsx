import Navbar from '../components/Navbar.tsx'; // Adjust path as needed
import 'bootstrap';

function App() {
  return (
    <div>
      {/* Section 1: Background Image */}
      <div className="bg-[url('/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-local w-full min-h-screen">
        <Navbar /> {/* Use the Navbar component here */}
        
        {/* Title */}
        <h1 className="text-white text-center mt-56 text-8xl" style={{ fontFamily: 'Bebas Neue, normal' }}>
          Welcome to the world of fragrance
        </h1>

        {/* Subtitle and Button Section */}
        <div className="py-20">
          <p className="text-white text-center text-8xl pb-10" style={{ fontFamily: 'Bebas Neue, normal' }}>
            Find the scent for you
          </p>

          {/* Box-Shaped Button Below Text */}
          <div className="text-center mt-8">
            <button
              className="bg-white text-black font-semibold py-4 px-8 rounded-none text-xl hover:bg-gray-200 transition duration-300 ease-in-out"
              style={{ fontFamily: 'Bebas Neue, normal' }}
            >
              Find a Fragrance
            </button>
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

        {/* Photo Gallery Section at the Bottom */}
        <div className="scroll-pl-6 grid grid-flow-col auto-cols-max snap-x overflow-x-auto mt-20 pb-10">
          <div className="snap-start mx-4">
            <img
              src="/creed_aventus_absolu.PNG"
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
              src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
          <div className="snap-start mx-4">
            <img
              src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Additional Content or Another Background */}
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
}

export default App;
