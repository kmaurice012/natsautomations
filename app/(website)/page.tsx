import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Stats from '@/components/sections/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
