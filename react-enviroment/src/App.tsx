// src/App.tsx

import Navbar from './components/Navbar.tsx'; // Adjust path as needed
import 'bootstrap';


function App() {
  return (
    <div className="bg-[url('public/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-local w-full h-screen">
      <Navbar /> {/* Use the Navbar component here */}
      <h1 className="text-white text-center  text-3xl py-10">Welcome to Scentopedia</h1>
      {/* Your other components and content */}
    </div>
  );
}

export default App;
