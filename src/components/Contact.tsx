import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Mail } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['A-56, Sukhadia Circle', 'Near Jockey, New Fatehpura', 'Main Road, Udaipur 313001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['08239196999'],
      link: 'tel:08239196999',
    },
    {
      icon: Clock,
      title: 'Open Hours',
      details: ['Daily: 11:00 AM – 11:00 PM', 'All days of the week'],
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F8F5F2] relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">FIND US</span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] mt-4 mb-6">
            Visit
            <span className="text-[#C8A97E] italic"> CoffeeVille</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.4876!2d73.6834!3d24.5856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM1JzA4LjIiTiA3M8KwNDEnMDAuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CoffeeVille Location"
            />
            <div className="absolute inset-0 pointer-events-none border-4 border-[#C8A97E]/20 rounded-2xl" />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#C8A97E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-7 h-7 text-[#C8A97E]" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-[#0F172A] mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    info.link ? (
                      <a
                        key={i}
                        href={info.link}
                        className="block text-[#0F172A]/70 hover:text-[#C8A97E] transition-colors text-lg"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={i} className="text-[#0F172A]/70">
                        {detail}
                      </p>
                    )
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 bg-[#0F172A] rounded-2xl"
            >
              <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2] mb-4">
                Follow Our Journey
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/coffeevilleudaipur?igsh=MWRycmxqZ3QzdmVlMw=="
                  className="w-12 h-12 bg-[#F8F5F2]/10 rounded-xl flex items-center justify-center hover:bg-[#C8A97E] transition-colors duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-[#F8F5F2] group-hover:text-[#0F172A]" />
                </a>
                <a
                  href="https://wa.me/918239196999"
                  className="w-12 h-12 bg-[#F8F5F2]/10 rounded-xl flex items-center justify-center hover:bg-[#C8A97E] transition-colors duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 text-[#F8F5F2] group-hover:text-[#0F172A]" />
                </a>
              </div>
            </motion.div>

            {/* Visit CTA */}
            <motion.a
              href="https://maps.app.goo.gl/axZ6ovNgBfcaG2G79?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="block w-full py-5 bg-[#C8A97E] text-[#0F172A] text-center font-medium tracking-wider rounded-2xl hover:bg-[#0F172A] hover:text-[#F8F5F2] transition-all duration-300 text-lg"
            >
              Visit Today
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
