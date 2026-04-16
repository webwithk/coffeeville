import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import supabase from '../lib/supabase';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error} = await supabase
          .from('gallery_images')
          .select('*');

        if (error) {
          throw new Error(error.message || 'Failed to fetch gallery images');
        }

        setImages(data);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="experience" className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C8A97E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EADBC8]/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">THE EXPERIENCE</span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#F8F5F2] mt-4 mb-6">
            Designed for Moments
            <br />
            <span className="text-[#C8A97E] italic">Worth Remembering</span>
          </h2>
          <p className="text-[#F8F5F2]/60 text-lg max-w-2xl mx-auto">
            From cozy indoor corners to our dreamy open-air backyard, every space 
            is crafted to make your visit unforgettable.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[240px]'}`}>
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-cormorant text-2xl font-semibold text-[#F8F5F2]">{image.title}</h3>
                  <p className="text-[#C8A97E] text-sm mt-1">{image.description}</p>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C8A97E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C8A97E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#F8F5F2]/60 text-lg mb-6">
            Experience the magic in person
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8A97E] text-[#0F172A] font-medium tracking-wider rounded-full hover:bg-[#F8F5F2] transition-all duration-300"
          >
            Plan Your Visit
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;