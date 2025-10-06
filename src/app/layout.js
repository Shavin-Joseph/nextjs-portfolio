import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export const metadata = {
  title: 'Shavin Joseph | Digital Architect & Creative Developer',
  description: 'The professional portfolio of Shavin Joseph, a developer and designer specializing in creating intuitive, powerful, and beautiful software.',
};

export default function RootLayout({ children }) {
  return (
    // --- ADD THE PROP HERE ---
    <html lang="en" suppressHydrationWarning>
      <body>
        <AnimatedBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}