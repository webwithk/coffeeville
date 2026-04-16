import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Coffee, Leaf, Car, Users, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: Star,
      title: '4.8 Customer Rating',
      description: 'Consistently rated as one of Udaipur\'s finest cafes',
    },
    {
      icon: Coffee,
      title: 'Premium Lavazza Coffee',
      description: 'Authentic Italian beans for the perfect brew',
    },
    {
      icon: Leaf,
      title: 'Open-Air Backyard',
      description: 'Dreamy outdoor seating with natural vibes',
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Complimentary parking service for your convenience',
    },
    {
      icon: Users,
      title: 'Friendly Staff',
      description: 'Warm and courteous service every visit',
    },
    {
      icon: Heart,
      title: 'Romantic Ambiance',
      description: 'Perfect setting for special moments',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#EADBC8]/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#C8A97E] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-[#C8A97E] rounded-full" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">WHY COFFEEVILLE</span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] mt-4 mb-6">
            The CoffeeVille
            <span className="text-[#C8A97E] italic"> Difference</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#F8F5F2] p-8 rounded-2xl hover:bg-[#0F172A] transition-all duration-500 cursor-default"
            >
              <div className="w-16 h-16 bg-[#C8A97E]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C8A97E]/30 transition-colors duration-500">
                <reason.icon className="w-8 h-8 text-[#C8A97E]" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-[#0F172A] group-hover:text-[#F8F5F2] mb-3 transition-colors duration-500">
                {reason.title}
              </h3>
              <p className="text-[#0F172A]/60 group-hover:text-[#F8F5F2]/70 transition-colors duration-500">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
