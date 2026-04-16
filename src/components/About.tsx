import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: '☕',
      title: 'Premium Lavazza Beans',
      description: 'Imported Italian coffee for the perfect cup every time',
    },
    {
      icon: '🌿',
      title: 'Open-Air Seating',
      description: 'Dreamy backyard with natural ambiance',
    },
    {
      icon: '❤️',
      title: 'Romantic Vibes',
      description: 'Perfect setting for intimate moments',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F8F5F2] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F172A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="/images/about-main.jpg"
                alt="CoffeeVille Interior"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#C8A97E] rounded-2xl -z-0" />
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-[#0F172A] text-[#F8F5F2] p-6 rounded-xl shadow-xl z-20"
            >
              <p className="font-cormorant text-4xl font-semibold text-[#C8A97E]">Since</p>
              <p className="font-cormorant text-5xl font-bold">2019</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">OUR STORY</span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] mt-4 mb-6 leading-tight">
              More Than Just
              <br />
              <span className="text-[#C8A97E] italic">A Cafe</span>
            </h2>
            
            <p className="text-[#0F172A]/70 text-lg leading-relaxed mb-8">
              CoffeeVille Udaipur is more than a cafe—it's a place where conversations flow, 
              moments slow down, and every corner feels like home. Nestled in the heart of 
              Udaipur, we've created a sanctuary for coffee lovers and dreamers alike.
            </p>

            <p className="text-[#0F172A]/70 text-lg leading-relaxed mb-10">
              Every cup we serve tells a story of passion, crafted with premium Lavazza beans 
              and served with warmth that makes you feel like family.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[#EADBC8]/30 rounded-xl hover:bg-[#EADBC8]/50 transition-colors duration-300"
                >
                  <div className="p-3 bg-[#C8A97E]/20 rounded-lg">
                    <span className="text-2xl text-[#C8A97E]">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-cormorant text-xl font-semibold text-[#0F172A]">{feature.title}</h3>
                    <p className="text-[#0F172A]/60 text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
