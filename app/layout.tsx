import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LiveChat from '@/components/LiveChat';
import Particles from '@/components/effects/Particles';
import CustomCursor from '@/components/effects/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nats Electric & Automations | Smart Home & Security Solutions',
  description: 'Professional CCTV, Electric Fencing, Solar Solutions, Automatic Gates, and Smart Home Automation in Nairobi, Kenya. 24/7 Support & Installation.',
  keywords: 'CCTV Kenya, Electric Fencing Nairobi, Solar Solutions, Automatic Gates, Smart Home Kenya, Security Systems',
  authors: [{ name: 'Nats Automations' }],
  openGraph: {
    title: 'Nats Electric & Automations',
    description: 'Professional Smart Home & Security Solutions in Kenya',
    url: 'https://natsautomations.co.ke',
    siteName: 'Nats Automations',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} font-body antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* PARTICLE STAR FIELD */}
          <Particles />

          {/* CUSTOM MAGNETIC CURSOR */}
          <CustomCursor />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
