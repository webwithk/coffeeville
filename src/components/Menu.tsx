import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import supabase from '../lib/supabase';

const Menu = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error} = await supabase
        .from('menu_items')
        .select('*');

    if (error) {
      console.error('Failed to fetch menu items:', error);
      setLoading(false);
      return;
    }

    console.log("MENU DATA:", data);

    setMenuItems(data || []);
    setLoading(false);

    fetchMenuItems();
      
  }},);

  return (
    <section id="menu" className="py-24 md:py-32 bg-[#F8F5F2] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-[#C8A97E]/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#C8A97E]/20 rounded-full" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">OUR MENU</span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] mt-4 mb-6">
            Signature
            <span className="text-[#C8A97E] italic"> Creations</span>
          </h2>
          <p className="text-[#0F172A]/60 text-lg max-w-2xl mx-auto">
            Handcrafted beverages made with premium Lavazza beans, 
            each cup a masterpiece of flavor and aroma.
          </p>
        </motion.div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent" />
                  
                  {item.is_signature && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C8A97E] rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0F172A]" />
                      <span className="text-[#0F172A] text-xs font-medium">Signature</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-cormorant text-xl font-semibold text-[#0F172A] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#0F172A]/60 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-2xl font-bold text-[#C8A97E]">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-[#0F172A]/40 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0F172A] text-[#0F172A] font-medium tracking-wider rounded-full hover:bg-[#0F172A] hover:text-[#F8F5F2] transition-all duration-300"
          >
            Explore Full Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
};
console.log("MENU DATA: menuItems");

export default Menu;