'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(14,165,233,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border-b border-primary-200/20 dark:border-primary-700/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Animated Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-secondary-400 to-primary-500 rounded-xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse" />

              {/* Logo Container with Enhanced Styling */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-[0_8px_32px_0_rgba(14,165,233,0.3)] group-hover:shadow-[0_12px_48px_0_rgba(168,85,247,0.5)] group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-2 border-primary-200/40 dark:border-primary-700/40 group-hover:border-secondary-400/60 dark:group-hover:border-secondary-500/60">
                <Image
                  src="/images/nats-logo.png"
                  alt="Nats Automations Logo"
                  fill
                  className="object-contain p-1.5 drop-shadow-md"
                  priority
                />
              </div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Nats Automations
              </h1>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Smart Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-bold text-sm uppercase tracking-wide group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-3 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 hover:from-primary-100 hover:to-secondary-100 dark:hover:from-primary-900/50 dark:hover:to-secondary-900/50 transition-all duration-300 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20 group"
                aria-label="Toggle theme"
              >
                <span className="text-2xl group-hover:scale-110 inline-block transition-transform">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </button>
            )}

            <a
              href="#contact"
              className="btn-primary"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50"
                aria-label="Toggle theme"
              >
                <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50"
              aria-label="Toggle menu"
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
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block btn-primary text-center"
            >
              Get Quote
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
