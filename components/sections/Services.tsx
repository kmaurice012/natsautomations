'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { services } from '@/lib/utils';
import ServiceModal from '@/components/ui/ServiceModal';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section id="services" className="relative py-24 bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Our Services</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Comprehensive smart home and security solutions tailored to your needs.
            From CCTV surveillance to solar energy, we've got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-interactive group tilt-card holographic neon-border"
              onClick={() => setSelectedService(service)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Icon with Glow Effect */}
              <div className="relative mb-6">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 scale-0 group-hover:scale-110"
                />
                <motion.div
                  className="text-7xl relative z-10 inline-block"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {service.icon}
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 relative z-10">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {service.features.slice(0, 3).map((feature, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-xs font-semibold px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200/50 dark:border-primary-700/50 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/20 transition-all backdrop-blur-sm"
                  >
                    ✓ {feature}
                  </motion.span>
                ))}
              </div>
              <div className="flex items-center text-primary-600 dark:text-primary-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 font-bold gap-2 group-hover:gap-4 transition-all relative z-10">
                <span className="text-sm uppercase tracking-wide">Learn More</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M9 5l7 7-7 7" />
                </motion.svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
