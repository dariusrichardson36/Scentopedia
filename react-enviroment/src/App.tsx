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
import TestPage from './pages/TestPage';
import EachFragrance from './pages/EachFragrance';

function App() {
  return (
    <Router>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/eachfragrance" element={<EachFragrance />} />
        </Routes>
      
    </Router>
  );
}

export default App;
