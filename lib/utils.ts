import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export const services = [
  {
    id: 'cctv',
    title: 'CCTV Systems',
    description: 'High-definition surveillance systems with 24/7 monitoring, remote access, and AI-powered analytics for maximum security.',
    icon: '📹',
    features: ['HD & 4K Cameras', 'Night Vision', 'Remote Monitoring', 'Cloud Storage', 'Motion Detection', 'AI Analytics'],
  },
  {
    id: 'electric-fencing',
    title: 'Electric Fencing',
    description: 'Professional perimeter security with advanced electric fencing systems that deter intruders while ensuring safety.',
    icon: '⚡',
    features: ['High Voltage Output', 'Alarm Integration', '24/7 Monitoring', 'Battery Backup', 'Weatherproof', 'Anti-Tamper'],
  },
  {
    id: 'solar',
    title: 'Solar Solutions',
    description: 'Sustainable energy solutions with premium solar panels, inverters, and battery storage for homes and businesses.',
    icon: '☀️',
    features: ['Premium Panels', 'Hybrid Systems', 'Battery Storage', 'Grid Tie', 'Monitoring App', 'Maintenance'],
  },
  {
    id: 'automatic-gates',
    title: 'Automatic Gates',
    description: 'Convenient and secure automated gate systems with remote access, smartphone control, and backup power.',
    icon: '🚪',
    features: ['Remote Control', 'Smartphone Access', 'Safety Sensors', 'Battery Backup', 'Multiple Users', 'Auto-Close'],
  },
  {
    id: 'video-intercom',
    title: 'Video Intercoms',
    description: 'Modern video intercom systems with crystal-clear video, two-way audio, and smartphone integration.',
    icon: '📱',
    features: ['HD Video', 'Two-Way Audio', 'Mobile App', 'Night Vision', 'Recording', 'Cloud Access'],
  },
  {
    id: 'biometric',
    title: 'Biometric Systems',
    description: 'Advanced access control with fingerprint, facial recognition, and card-based entry systems for enhanced security.',
    icon: '🔐',
    features: ['Fingerprint Scanner', 'Face Recognition', 'Card Access', 'Time Attendance', 'Cloud Sync', 'Multi-User'],
  },
];

export const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Completed', value: '500+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: '24/7 Support', value: 'Always' },
];
