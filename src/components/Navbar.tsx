import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Book Table', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0F172A]/95 backdrop-blur-md py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <Coffee className="w-8 h-8 text-[#C8A97E] group-hover:rotate-12 transition-transform duration-300" />
            <div>
              <h1 className="font-cormorant text-2xl font-semibold text-[#F8F5F2] tracking-wider">COFFEEVILLE</h1>
              <p className="text-[#C8A97E] text-[10px] tracking-[0.3em] -mt-1">UDAIPUR</p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#F8F5F2]/80 hover:text-[#C8A97E] text-sm tracking-wider transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A97E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:block px-6 py-2.5 bg-[#C8A97E] text-[#0F172A] text-sm font-medium tracking-wider hover:bg-[#F8F5F2] transition-all duration-300 rounded-full"
          >
            Visit Us
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-[#F8F5F2] p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A] z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <Coffee className="w-8 h-8 text-[#C8A97E]" />
                  <h1 className="font-cormorant text-2xl font-semibold text-[#F8F5F2]">COFFEEVILLE</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#F8F5F2] p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-[#F8F5F2] text-2xl font-cormorant tracking-wider hover:text-[#C8A97E] transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="tel:08239196999"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 block w-full py-4 bg-[#C8A97E] text-[#0F172A] text-center font-medium tracking-wider rounded-full"
              >
                Call Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
