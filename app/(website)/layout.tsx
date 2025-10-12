import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LiveChat from '@/components/LiveChat';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <LiveChat />
    </>
  );
}
