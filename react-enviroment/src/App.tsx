// Import necessary modules for routing, components, and styling
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navigation component
import About from './pages/About'; // Page component for the "About" page
import Notes from './pages/Notes'; // Page component for the "Notes" page
import Brands from './pages/Brands'; // Page component for the "Brands" page
import Fragrances from './pages/Fragrances'; // Page component for the "Fragrances" page
import 'bootstrap'; // Bootstrap for styling and responsiveness
import './App.css'; // Custom application styles

// Main App component sets up routing and the basic layout for the application
function App() {
  return (
    <Router>
      {/* Main container for the app with a background image and full-screen styling */}
      <div className="bg-[url('public/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-local w-full h-screen">
        <Navbar /> {/* Navbar is included on all pages for consistent navigation */}

        {/* Routes component defines the paths and renders the corresponding components */}
        <Routes>
          <Route path="/" element={<h1 className="text-white text-center text-3xl py-10">Welcome to Scentopedia</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/fragrances" element={<Fragrances />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component so it can be used as the main component in the application
export default App;
