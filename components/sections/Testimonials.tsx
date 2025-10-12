'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Kamau',
      role: 'Homeowner, Karen',
      content:
        'Exceptional service! The CCTV system installation was professional and the team was very knowledgeable. I can now monitor my home from anywhere. Highly recommended!',
      rating: 5,
      image: '👨‍💼',
    },
    {
      name: 'Sarah Wanjiru',
      role: 'Business Owner, Westlands',
      content:
        'Nats Automations transformed our office security with their integrated CCTV and access control system. The 24/7 support is fantastic. Best investment we made!',
      rating: 5,
      image: '👩‍💼',
    },
    {
      name: 'David Ochieng',
      role: 'Residential Client, Runda',
      content:
        'The solar installation exceeded our expectations. Our electricity bills dropped by 80%! Professional team, quality equipment, and excellent after-sales support.',
      rating: 5,
      image: '👨‍🔧',
    },
    {
      name: 'Grace Muthoni',
      role: 'Property Manager, Kilimani',
      content:
        'We use Nats Automations for all our properties. Their electric fencing and automatic gates are top-notch. Reliable, professional, and great value for money.',
      rating: 5,
      image: '👩‍💻',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to
            say about our services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card text-center"
          >
            <div className="text-7xl mb-6">{testimonials[activeIndex].image}</div>

            <div className="flex justify-center mb-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
              "{testimonials[activeIndex].content}"
            </p>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              {testimonials[activeIndex].name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {testimonials[activeIndex].role}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:-translate-x-1"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-primary-500 w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:translate-x-1"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
