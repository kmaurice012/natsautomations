import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'CCTV Systems', href: '#services' },
      { label: 'Electric Fencing', href: '#services' },
      { label: 'Solar Solutions', href: '#services' },
      { label: 'Automatic Gates', href: '#services' },
      { label: 'Video Intercoms', href: '#services' },
      { label: 'Biometric Systems', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
      { label: 'CRM Login', href: '/crm/login' },
    ],
    support: [
      { label: '24/7 Support', href: 'tel:+254726259977' },
      { label: 'Emergency Line', href: 'tel:+254726259977' },
      { label: 'Email Support', href: 'mailto:info@natsautomations.co.ke' },
      { label: 'WhatsApp', href: 'https://wa.me/254726259977' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl blur-lg opacity-40 animate-pulse" />

                {/* Logo container */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-primary-50 border-2 border-primary-600/40 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                  <Image
                    src="/images/nats-logo.png"
                    alt="Nats Automations Logo"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Nats Automations</h3>
                <p className="text-sm text-primary-400 font-semibold">Smart Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading provider of smart home and security solutions in Kenya. Your
              security is our priority.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Nats Electric & Automations. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
