import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export const metadata = {
  title: {
    template: '%s | Shavin Joseph', // This adds "| Shavin Joseph" to every page title
    default: 'Shavin Joseph | Digital Architect & Creative Developer', // The default title for the homepage
  },
  description: 'The professional portfolio of Shavin Joseph, a developer and designer specializing in creating intuitive, powerful, and beautiful software.',
  // Add more metadata for better SEO
  keywords: ['Shavin Joseph', 'Web Developer', 'React Developer', 'UI/UX Designer', 'Portfolio'],
  author: [{ name: 'Shavin Joseph' }],
  creator: 'Shavin Joseph',
  publisher: 'Shavin Joseph',
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