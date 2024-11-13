// src/App.tsx
import 'bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatApp from './ChatApp';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/authContext/AuthProvider';
import About from './pages/About';
import Brands from './pages/Brands';
import FragrancePage from './pages/FragrancePage';
import Fragrances from './pages/Fragrances';
import Home from './pages/Home';
import Notes from './pages/Notes';
import TestPage from './pages/TestPage';
import YourListsPage from './pages/YourListsPage';

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
      <ChatApp />
    </AuthProvider>
  );
}

export default App;
