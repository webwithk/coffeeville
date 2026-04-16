import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-[#C8A97E] via-[#EADBC8] to-[#C8A97E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 -left-20 w-40 h-40 border border-[#0F172A]/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 -right-20 w-60 h-60 border border-[#0F172A]/20 rounded-full"
      />

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-7xl font-semibold text-[#0F172A] mb-6">
            Ready to Experience
            <br />
            <span className="italic">CoffeeVille?</span>
          </h2>
          <p className="text-[#0F172A]/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Your perfect coffee moment awaits. Visit us today and discover why 
            CoffeeVille is Udaipur's favorite aesthetic cafe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/axZ6ovNgBfcaG2G79?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-[#F8F5F2] font-medium tracking-wider rounded-full hover:bg-[#0F172A]/90 transition-all duration-300"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:08239196999"
              className="group flex items-center gap-3 px-8 py-4 bg-[#F8F5F2] text-[#0F172A] font-medium tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          {/* Open Hours Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A]/10 rounded-full"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[#0F172A] font-medium">Open Daily: 11:00 AM – 11:00 PM</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
