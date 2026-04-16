import { Coffee, Heart, Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0F172A] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-6">
              <Coffee className="w-10 h-10 text-[#C8A97E]" />
              <div>
                <h2 className="font-cormorant text-3xl font-semibold text-[#F8F5F2] tracking-wider">COFFEEVILLE</h2>
                <p className="text-[#C8A97E] text-xs tracking-[0.3em]">UDAIPUR</p>
              </div>
            </a>
            <p className="text-[#F8F5F2]/60 max-w-md leading-relaxed mb-6">
              Udaipur's most aesthetic cafe experience. Where every sip tells a story 
              and every corner is designed for moments worth remembering.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/coffeevilleudaipur?igsh=MWRycmxqZ3QzdmVlMw=="
                className="w-10 h-10 bg-[#F8F5F2]/10 rounded-lg flex items-center justify-center hover:bg-[#C8A97E] transition-colors duration-300 group"
              >
                <Instagram className="w-5 h-5 text-[#F8F5F2] group-hover:text-[#0F172A]" />
              </a>
              <a
                href="https://wa.me/918239196999"
                className="w-10 h-10 bg-[#F8F5F2]/10 rounded-lg flex items-center justify-center hover:bg-[#C8A97E] transition-colors duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-[#F8F5F2] group-hover:text-[#0F172A]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#F8F5F2]/60 hover:text-[#C8A97E] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2] mb-6">Contact</h3>
            <ul className="space-y-3 text-[#F8F5F2]/60">
              <li>
                <a href="tel:08239196999" className="hover:text-[#C8A97E] transition-colors">
                  08239196999
                </a>
              </li>
              <li>A-56, Sukhadia Circle</li>
              <li>Near Jockey, New Fatehpura</li>
              <li>Udaipur, Rajasthan 313001</li>
              <li className="pt-2">
                <span className="text-[#C8A97E]">Open:</span> 11 AM – 11 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C8A97E]/30 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F8F5F2]/40 text-sm flex items-center gap-2">
            © 2024 CoffeeVille Udaipur. Crafted with
            <Heart className="w-4 h-4 text-[#C8A97E] fill-[#C8A97E]" />
            in Udaipur
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-[#F8F5F2]/60 hover:text-[#C8A97E] transition-colors duration-300"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
