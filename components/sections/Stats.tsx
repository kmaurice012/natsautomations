'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { stats } from '@/lib/utils';

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const statIcons = ['📊', '🎯', '😊', '🚀'];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)]">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  className="text-5xl md:text-6xl mb-4 relative z-10"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {statIcons[index]}
                </motion.div>

                {/* Value */}
                <motion.h3
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-white relative z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.h3>

                {/* Label */}
                <p className="text-white/90 font-bold text-sm md:text-base uppercase tracking-wider relative z-10">
                  {stat.label}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
