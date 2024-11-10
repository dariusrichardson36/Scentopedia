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
import FragrancePage from './pages/FragrancePage';
import YourListsPage from './pages/YourListsPage';
import { AuthProvider } from './contexts/authContext/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/your-lists" element={<YourListsPage />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/fragrance/:id" element={<FragrancePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
