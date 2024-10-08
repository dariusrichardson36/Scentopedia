// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap';
import Home from './pages/Home';
import Fragrances from './pages/Fragrances';
import Brands from './pages/Brands';
import Notes from './pages/Notes';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
