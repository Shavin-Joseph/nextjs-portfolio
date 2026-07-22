import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

// --- THEME ENGINE ---
const THEMES = {
  red: { main: '#ff5f56', rgb: '255, 95, 86' },
  yellow: { main: '#ffbd2e', rgb: '255, 189, 46' },
  green: { main: '#63ffb0', rgb: '99, 255, 176' } // Default
};

// --- GLOBAL KINETIC CURSOR ---
const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .magnetic, .hover-trigger')) setIsHovered(true);
      else setIsHovered(false);
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div 
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block transition-colors duration-500" 
        style={{ x: cursorX, y: cursorY, backgroundColor: "var(--theme-main)", boxShadow: "0 0 8px var(--theme-main)" }} 
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border hidden md:block transition-colors duration-500"
        animate={{ 
          width: isHovered ? 64 : 34, 
          height: isHovered ? 64 : 34, 
          borderColor: isHovered ? "var(--theme-main)" : 'rgba(240,244,250,0.16)', 
          backgroundColor: isHovered ? 'rgba(var(--theme-rgb), 0.12)' : 'transparent' 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
    </>
  );
};

// --- MAGNETIC BUTTON WRAPPER ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.25);
    y.set((e.clientY - top - height / 2) * 0.35);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }} className="inline-block magnetic hover-trigger">
      {children}
    </motion.div>
  );
};

// --- GLOBAL ANIMATED LOGO ---
const GlobalLogo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-6 lg:left-8 z-50 hidden md:block"
    >
      <Magnetic>
        <Link to="/" className="flex items-center gap-1 group hover-trigger px-4 py-2 rounded-2xl bg-[#0a0c10]/80 backdrop-blur-[14px] border border-white/10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-500 hover:border-[color:var(--theme-main)]/40">
          <motion.div 
            animate={{ x: ['-200%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[color:var(--theme-main)]/10 to-transparent skew-x-12 z-0"
          />
          <motion.div 
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--theme-main)] mr-2 relative z-10 shadow-[0_0_8px_var(--theme-main)]"
          />
          <div className="relative z-10 flex items-baseline">
            <span className="font-sans font-black text-xl tracking-tighter text-white">
              SJ
            </span>
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono font-bold text-lg tracking-tight text-[color:var(--theme-main)]"
            >
              .me
            </motion.span>
          </div>
        </Link>
      </Magnetic>
    </motion.div>
  );
};

// --- RESPONSIVE NAVIGATION BAR ---
const NavBar = ({ setTheme }) => {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically close the mobile menu when clicking a link
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        // Changed container to w-max and added gap-4 for mobile to ensure elements don't get squished
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 md:gap-0 p-1.5 md:p-2 bg-[#0a0c10]/80 backdrop-blur-[14px] border border-[#f0f4fa]/[0.08] rounded-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] w-max"
      >
        {/* MacOS Style Theme Switcher Dots (Always Visible) */}
        <div className="flex items-center gap-2 pl-2 md:pl-3 flex-shrink-0">
          <button onClick={() => setTheme('red')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Red Theme" />
          <button onClick={() => setTheme('yellow')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Yellow Theme" />
          <button onClick={() => setTheme('green')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Green Theme" />
          <div className="w-[1px] h-5 bg-white/10 ml-2 hidden md:block" />
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-1 md:gap-2 mr-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`whitespace-nowrap px-3 md:px-4 py-2 rounded-full font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase transition-all duration-300 hover-trigger ${
                path === link.path 
                  ? 'bg-white/[0.06] text-[color:var(--theme-main)]' 
                  : 'text-[#8a93a6] hover:text-[#eef1f6] hover:bg-white/[0.02]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button (Hidden on Mobile) */}
        <div className="hidden md:block">
          <Magnetic>
            <Link 
              to="/contact"
              className="block whitespace-nowrap px-5 md:px-6 py-2 md:py-2.5 bg-[var(--theme-main)] text-[#04140c] font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase font-bold rounded-full shadow-[0_0_15px_rgba(var(--theme-rgb),0.2)] hover:shadow-[0_10px_30px_-8px_rgba(var(--theme-rgb),0.4),0_0_0_4px_rgba(var(--theme-rgb),0.12)] transition-all duration-300 flex-shrink-0"
            >
              Let's Talk
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle (Flex on Mobile, Hidden on Desktop) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden items-center justify-center w-10 h-10 mr-1 rounded-full bg-white/[0.05] border border-white/10 text-white cursor-pointer hover:bg-white/[0.1] transition-colors"
        >
          <div className="relative w-4 h-3 flex flex-col justify-between items-center pointer-events-none">
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="w-full h-[1.5px] bg-[#eef1f6] rounded-full origin-center transition-transform" />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-[1.5px] bg-[#eef1f6] rounded-full transition-opacity" />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} className="w-full h-[1.5px] bg-[#eef1f6] rounded-full origin-center transition-transform" />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#0a0c10]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center px-6"
          >
            <div className="flex flex-col items-center w-full max-w-sm gap-2">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  className="w-full"
                >
                  <Link 
                    to={link.path} 
                    className={`block text-center py-4 text-lg font-mono tracking-[0.15em] uppercase border-b border-white/5 ${
                      path === link.path ? 'text-[color:var(--theme-main)] font-bold' : 'text-[#8a93a6]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.4 }}
                className="w-full mt-8"
              >
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center w-full py-4 bg-[var(--theme-main)] text-[#04140c] font-mono text-sm tracking-[0.1em] uppercase font-bold rounded-2xl shadow-[0_0_20px_rgba(var(--theme-rgb),0.3)]"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const location = useLocation();
  const [activeTheme, setActiveTheme] = useState('green');

  // Inject CSS Variables globally whenever the theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-main', THEMES[activeTheme].main);
    root.style.setProperty('--theme-rgb', THEMES[activeTheme].rgb);
  }, [activeTheme]);

  return (
    <div className="bg-[#090b0f] text-[#eef1f6] font-sans selection:bg-[var(--theme-main)] selection:text-[#04140c] min-h-screen relative overflow-x-hidden transition-colors duration-500">
      <CustomCursor />
      
      {/* Global Background Grid */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 w-full h-full" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(240,244,250,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,250,0.08) 1px, transparent 1px)`, 
          backgroundSize: '56px 56px', 
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%)' 
        }} 
      />

      <GlobalLogo />
      <NavBar setTheme={setActiveTheme} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} /> 
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;