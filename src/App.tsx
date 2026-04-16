import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0F172A] flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#C8A97E] border-t-transparent rounded-full mx-auto mb-6"
          />
          <h1 className="font-cormorant text-3xl text-[#F8F5F2] tracking-widest">COFFEEVILLE</h1>
          <p className="text-[#C8A97E] text-sm mt-2 tracking-wider">UDAIPUR</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5F2] text-[#0F172A] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Menu />
      <WhyChooseUs />
      <Reviews />
      <Booking />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
