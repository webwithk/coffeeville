import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Clock, Users, MapPin, Sparkles, Check, Loader2, Phone, Mail, User } from 'lucide-react';
import supabase from '../lib/supabase';

const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    seating_preference: 'no_preference',
    special_requests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
  ];

  const seatingOptions = [
    { value: 'no_preference', label: 'No Preference' },
    { value: 'indoor', label: 'Indoor Cozy Seating' },
    { value: 'outdoor', label: 'Open-Air Backyard' },
    { value: 'window', label: 'Window Side' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data, error} = await supabase 
        .from('table_bookings')
        .insert([formData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message || 'Failed to submit booking');
      }
        

      setIsSuccess(true);
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        seating_preference: 'no_preference',
        special_requests: ''
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C8A97E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#EADBC8]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C8A97E 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A97E] tracking-[0.3em] text-sm font-medium">RESERVATIONS</span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-[#F8F5F2] mt-4 mb-6 leading-tight">
              Reserve Your
              <br />
              <span className="text-[#C8A97E] italic">Perfect Table</span>
            </h2>
            <p className="text-[#F8F5F2]/70 text-lg leading-relaxed mb-10">
              Secure your spot at Udaipur's most aesthetic cafe. Whether it's a romantic 
              date, a catch-up with friends, or a quiet coffee moment, we'll have your 
              table ready.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A97E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2]">Choose Your Spot</h3>
                  <p className="text-[#F8F5F2]/60 text-sm mt-1">Indoor cozy corners or dreamy outdoor backyard</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A97E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2]">Special Occasions</h3>
                  <p className="text-[#F8F5F2]/60 text-sm mt-1">Let us know and we'll make it memorable</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A97E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-[#F8F5F2]">Flexible Timing</h3>
                  <p className="text-[#F8F5F2]/60 text-sm mt-1">Open daily from 11 AM to 11 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#F8F5F2] rounded-3xl p-8 md:p-10 shadow-2xl">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-cormorant text-3xl font-semibold text-[#0F172A] mb-3">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-[#0F172A]/60">
                    We've received your booking request. You'll receive a confirmation call shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="font-cormorant text-2xl font-semibold text-[#0F172A]">
                      Book Your Table
                    </h3>
                    <p className="text-[#0F172A]/60 text-sm mt-1">Fill in the details below</p>
                  </div>

                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] placeholder:text-[#0F172A]/40"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] placeholder:text-[#0F172A]/40"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] placeholder:text-[#0F172A]/40"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] placeholder:text-[#0F172A]/40"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] appearance-none cursor-pointer"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests & Seating */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                        <option value={10}>Large Group (10+)</option>
                      </select>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                      <select
                        name="seating_preference"
                        value={formData.seating_preference}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] appearance-none cursor-pointer"
                      >
                        {seatingOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <textarea
                      name="special_requests"
                      value={formData.special_requests}
                      onChange={handleChange}
                      placeholder="Special requests or occasion details (optional)"
                      rows={3}
                      className="w-full px-4 py-4 bg-[#EADBC8]/30 rounded-xl border-2 border-transparent focus:border-[#C8A97E] focus:bg-white outline-none transition-all text-[#0F172A] placeholder:text-[#0F172A]/40 resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#0F172A] text-[#F8F5F2] font-medium tracking-wider rounded-xl hover:bg-[#C8A97E] hover:text-[#0F172A] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>

                  <p className="text-center text-[#0F172A]/50 text-xs">
                    We'll confirm your booking via phone call within 30 minutes
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
