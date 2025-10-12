'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: '🎯',
      title: 'Customized Solutions',
      description: 'Tailored security and automation systems designed specifically for your unique needs.',
    },
    {
      icon: '⚙️',
      title: 'Professional Installation',
      description: 'Expert technicians ensure perfect installation and integration with your existing systems.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Energy',
      description: 'Eco-friendly solar solutions that reduce costs and environmental impact.',
    },
    {
      icon: '🛡️',
      title: 'Advanced Security',
      description: 'State-of-the-art security technologies with AI-powered monitoring and alerts.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">About Nats Automations</h2>
            <p className="section-subheading">
              Leading provider of smart home and security solutions in Kenya since 2020.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At Nats Electric & Automations, we believe in creating safer, smarter, and
              more sustainable spaces. With over 5 years of industry experience and 500+
              successfully completed projects, we've established ourselves as a trusted
              partner for homes and businesses across Kenya.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our team of certified technicians combines cutting-edge technology with
              professional expertise to deliver solutions that exceed expectations. From
              initial consultation to installation and ongoing support, we're committed to
              your complete satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Get Started
              </a>
              <a href="tel:+254726259977" className="btn-outline">
                📞 +254 726 259 977
              </a>
            </div>
          </motion.div>

          {/* Right Content - Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
