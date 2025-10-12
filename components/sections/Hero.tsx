'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-purple-950 pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* AURORA EFFECT */}
        <div className="aurora" />

        {/* MESH GRADIENT */}
        <div className="absolute inset-0 mesh-gradient opacity-40" />

        {/* Large Animated Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary-400/30 via-primary-500/20 to-transparent dark:from-primary-500/20 dark:via-primary-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary-400/30 via-secondary-500/20 to-transparent dark:from-secondary-500/20 dark:via-secondary-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.4, 0.6],
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-transparent dark:from-purple-500/10 dark:via-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Grid Pattern with Neon Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-gray-900/50" />
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-3 bg-gradient-to-r from-primary-100 via-secondary-100 to-primary-100 dark:from-primary-900/40 dark:via-secondary-900/40 dark:to-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold backdrop-blur-md border border-primary-300/60 dark:border-primary-600/40 shadow-[0_10px_40px_-10px_rgba(14,165,233,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(168,85,247,0.5)] transition-all duration-300 inline-flex items-center gap-2">
                <span className="text-lg animate-bounce">🚀</span>
                <span>Trusted by 500+ Clients</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tight"
            >
              Secure Your World with{' '}
              <span className="neon-text gradient-text bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Smart Technology
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Professional CCTV, Electric Fencing, Solar Solutions, and Smart Home
              Automation in Kenya. Experience peace of mind with cutting-edge
              security and automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a href="#contact" className="btn-primary">
                Get Free Consultation
              </a>
              <a href="#services" className="btn-outline">
                Explore Services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Professional Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Warranty Included</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center">
              {/* Glow Ring */}
              <motion.div
                className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-transparent blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Central Icon */}
              <motion.div
                className="absolute w-40 h-40 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-3xl flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(30,61,89,0.5)] backdrop-blur-sm border-2 border-white/20 dark:border-white/10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.span
                  className="text-6xl filter drop-shadow-lg"
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  🏠
                </motion.span>
              </motion.div>

              {/* Orbiting Icons */}
              {[
                { icon: '📹', delay: 0, distance: 180, color: 'from-blue-500 to-blue-600' },
                { icon: '⚡', delay: 1, distance: 180, color: 'from-yellow-500 to-orange-500' },
                { icon: '☀️', delay: 2, distance: 180, color: 'from-orange-500 to-red-500' },
                { icon: '🚪', delay: 3, distance: 180, color: 'from-green-500 to-emerald-600' },
                { icon: '📱', delay: 4, distance: 180, color: 'from-purple-500 to-pink-500' },
                { icon: '🔐', delay: 5, distance: 180, color: 'from-indigo-500 to-purple-600' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] backdrop-blur-sm border-2 border-white/30 dark:border-white/10 hover:scale-110 transition-transform`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: item.delay,
                  }}
                  style={{
                    left: `calc(50% + ${
                      Math.cos((index * Math.PI) / 3) * item.distance
                    }px - 40px)`,
                    top: `calc(50% + ${
                      Math.sin((index * Math.PI) / 3) * item.distance
                    }px - 40px)`,
                  }}
                >
                  <motion.span
                    className="text-4xl filter drop-shadow-md"
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: item.delay,
                    }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <a
          href="#services"
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
