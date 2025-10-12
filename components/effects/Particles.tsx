'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    // Create MORE particles with enhanced properties
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5, // Bigger particles (1.5 to 4.5)
        speedX: (Math.random() - 0.5) * 0.8, // Faster movement
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.6, // Higher opacity (0.6 to 1.0)
        hue: Math.random() * 80 + 180, // Blue to purple range
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch rendering for better performance
      particles.forEach((particle, index) => {
        // Update pulse phase
        particle.pulsePhase += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulsePhase) * 0.3 + 0.7; // Pulse between 0.7 and 1.0

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction - stronger repel with glow effect
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Larger interaction radius

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.x -= (dx / distance) * force * 3;
          particle.y -= (dy / distance) * force * 3;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with GLOW
        const currentSize = particle.size * pulseFactor;
        const currentOpacity = particle.opacity * pulseFactor;

        // Outer glow (bigger)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 80%, 65%, ${currentOpacity * 0.4})`);
        glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 65%, ${currentOpacity * 0.2})`);
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 80%, 65%, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Inner particle (bright core)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 70%, ${currentOpacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw connections with enhanced visibility
        particles.forEach((otherParticle, otherIndex) => {
          if (index >= otherIndex) return; // Only draw each connection once

          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 150) { // Longer connection distance
            const lineOpacity = 0.4 * (1 - distance2 / 150); // More visible
            ctx.beginPath();

            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 65%, ${lineOpacity})`);
            gradient.addColorStop(1, `hsla(${otherParticle.hue}, 80%, 65%, ${lineOpacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }} // Much more visible!
      transition={{ duration: 1 }}
    />
  );
}
