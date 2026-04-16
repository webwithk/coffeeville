import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import supabase from '../lib/supabase';

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error} = await supabase
        .from('reviews')
        .select('*') 
        .order('visit_date', { ascending: false });

      if (error) {
        console.error('Failed to fetch reviews:', error);
        return;
      }

      setReviews(data);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A97E]/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">TESTIMONIALS</span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#F8F5F2] mt-4 mb-6">
            What Our Guests
            <span className="text-[#C8A97E] italic"> Say</span>
          </h2>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {reviews.length > 0 && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-16 h-16 text-[#C8A97E]/30 mx-auto mb-8" />
              <p className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-[#F8F5F2] italic leading-relaxed mb-8">
                "{reviews[currentIndex]?.review_text}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(reviews[currentIndex]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C8A97E] text-[#C8A97E]" />
                ))}
              </div>
              <p className="text-[#F8F5F2] font-medium text-lg">
                {reviews[currentIndex]?.customer_name}
              </p>
              <p className="text-[#F8F5F2]/50 text-sm">
                {reviews[currentIndex]?.visit_date}
              </p>
            </motion.div>
          )}

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#C8A97E] w-8'
                    : 'bg-[#F8F5F2]/30 hover:bg-[#F8F5F2]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className="bg-[#F8F5F2]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#F8F5F2]/10 hover:border-[#C8A97E]/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A97E] text-[#C8A97E]" />
                ))}
              </div>
              <p className="text-[#F8F5F2]/80 text-sm leading-relaxed mb-4 line-clamp-3">
                "{review.review_text}"
              </p>
              <p className="text-[#C8A97E] font-medium text-sm">
                — {review.customer_name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
