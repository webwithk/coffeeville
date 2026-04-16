import { motion } from 'framer-motion';
import { Star, MapPin, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src="/images/hero-bg.jpg"
            alt="CoffeeVille Ambience"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/60 to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#C8A97E]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#EADBC8]/10 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F8F5F2]/10 backdrop-blur-sm rounded-full mb-8 border border-[#C8A97E]/30"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C8A97E] text-[#C8A97E]" />
            ))}
          </div>
          <span className="text-[#F8F5F2] text-sm font-medium">4.8 Rated by Customers</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-semibold text-[#F8F5F2] leading-tight mb-6"
        >
          Udaipur's Most
          <br />
          <span className="text-[#C8A97E] italic">Aesthetic</span> Cafe Experience
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#F8F5F2]/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Relax, unwind, and indulge in handcrafted coffee made with Lavazza beans 
          in a cozy, romantic setting.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-[#C8A97E] text-[#0F172A] font-medium tracking-wider rounded-full hover:bg-[#F8F5F2] transition-all duration-300 flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Visit Us Today
          </a>
          <a
            href="#menu"
            className="px-8 py-4 border-2 border-[#F8F5F2]/30 text-[#F8F5F2] font-medium tracking-wider rounded-full hover:bg-[#F8F5F2]/10 hover:border-[#C8A97E] transition-all duration-300"
          >
            View Menu
          </a>
        </motion.div>

        {/* Location Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-2 text-[#F8F5F2]/60 text-sm"
        >
          <MapPin className="w-4 h-4" />
          <span>Sukhadia Circle, Udaipur</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[#F8F5F2]/60"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
