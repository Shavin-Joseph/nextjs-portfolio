import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiTerminal } from 'react-icons/fi';

// 1. AUTOMATICALLY IMPORT YOUR REAL BLOG DATA
import { HARDCODED_ARTICLES } from '../pages/Blog';

const Footer = () => {
  const [newestLogs, setNewestLogs] = useState([]);

  useEffect(() => {
    // 2. THE ENGINE: Sort all articles by date (newest first) and grab the top 5
    if (HARDCODED_ARTICLES) {
      const sortedArticles = [...HARDCODED_ARTICLES]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setNewestLogs(sortedArticles);
    }
  }, []);

  // Duplicate the array so the marquee loops seamlessly without gaps
  const marqueeItems = [...newestLogs, ...newestLogs, ...newestLogs];

  return (
    <footer className="relative w-full bg-[#0a0c10] border-t border-white/10 z-50">
      
      {/* --- TOP: ANIMATED BLOG MARQUEE & READ MORE BUTTON --- */}
      <div className="flex items-stretch w-full border-b border-white/10 bg-[#12151b]">
        
        {/* Scrolling Marquee (Left Side, Flex-Grow) */}
        {/* Reduced mobile padding to py-2 */}
        <div className="flex-1 overflow-hidden relative group py-2 md:py-3">
          {/* Fading Edges to make the text seamlessly disappear */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-[#12151b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-[#12151b] to-transparent z-10 pointer-events-none" />

          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 80 }} 
            className="flex whitespace-nowrap items-center font-mono text-[10px] md:text-xs text-[#8a93a6] uppercase tracking-widest"
          >
            {marqueeItems.map((article, index) => (
              <React.Fragment key={index}>
                {/* DYNAMIC LINKS: Clicking a scrolling title goes to that specific article */}
                <Link 
                  to={`/blog/${article.id}`} 
                  className="mx-3 md:mx-8 flex items-center gap-2 hover:text-[color:var(--theme-main)] transition-colors duration-300"
                >
                  {article.title}
                </Link>
                <span className="text-white/20">///</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Read More Button (Right Side, Pinned) */}
        {/* Tightened mobile padding (px-4) */}
        <Link 
          to="/blog" 
          className="flex items-center gap-1.5 md:gap-2 px-4 md:px-8 bg-[#0a0c10] border-l border-white/10 hover:bg-white/[0.03] transition-colors font-mono text-[9px] md:text-xs uppercase tracking-widest text-[color:var(--theme-main)] font-bold shrink-0 z-20"
        >
          <span className="hidden sm:inline">Read All Logs</span>
          <span className="sm:hidden">Logs</span>
          <FiArrowUpRight size={12} className="md:w-[14px] md:h-[14px]" />
        </Link>
      </div>

      {/* --- MIDDLE: MAIN FOOTER CONTENT --- */}
      {/* Reduced mobile padding (py-8) and optimized gap */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
        
        {/* Column 1: Brand & SEO Text */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <Link to="/" className="text-lg md:text-2xl font-bold text-white uppercase tracking-tighter flex items-center gap-2 mb-3 md:mb-4 hover:text-[color:var(--theme-main)] transition-colors">
            <FiTerminal className="text-[color:var(--theme-main)] w-4 h-4 md:w-5 md:h-5" /> Shavin Joseph
          </Link>
          <p className="text-[#8a93a6] text-[11px] md:text-sm leading-relaxed max-w-md mb-4 md:mb-6">
            A professional website developer and Android app developer based in Wattala, Sri Lanka. Architecting scalable full-stack applications, configuring network infrastructure, and deploying intelligent AI solutions.
          </p>
          <div className="font-mono text-[8.5px] md:text-[10px] tracking-widest text-[#5b6472] uppercase px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-white/10 bg-white/5">
            System Status: Online
          </div>
        </div>

        {/* 
          Pro-Mobile Trick: Wrap the links and network sections in a 2-column grid on mobile 
          so they sit side-by-side, cutting the vertical height in half! 
        */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 w-full">
          
          {/* Column 2: Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5 md:gap-3">
            <h4 className="font-mono text-[9px] md:text-[10px] text-white uppercase tracking-widest mb-0.5 md:mb-2">Directories</h4>
            <Link to="/" className="text-[#8a93a6] text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">System Root</Link>
            <Link to="/work" className="text-[#8a93a6] text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">Builds</Link>
            <Link to="/blog" className="text-[#8a93a6] text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">Logs</Link>
            <Link to="/downloads" className="text-[#8a93a6] text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">KWAS Repo</Link>
          </nav>

          {/* Column 3: Social & Contact */}
          <div className="flex flex-col gap-2.5 md:gap-3">
            <h4 className="font-mono text-[9px] md:text-[10px] text-white uppercase tracking-widest mb-0.5 md:mb-2">Network</h4>
            <a href="https://www.linkedin.com/in/shavin-joseph-5193a73b5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 text-[#8a93a6] text-[11px] md:text-sm hover:text-white transition-colors w-max">
              <FiLinkedin className="w-3.5 h-3.5 md:w-4 md:h-4" /> LinkedIn
            </a>
            <a href="https://github.com/Shavin-Joseph" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 text-[#8a93a6] text-[11px] md:text-sm hover:text-white transition-colors w-max">
              <FiGithub className="w-3.5 h-3.5 md:w-4 md:h-4" /> GitHub
            </a>
            <a href="mailto:josephshavin3@gmail.com" className="flex items-center gap-1.5 md:gap-2 text-[#8a93a6] text-[11px] md:text-sm hover:text-white transition-colors w-max mt-1 md:mt-2">
              <FiMail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[color:var(--theme-main)]" /> Comm Link
            </a>
          </div>

        </div>

      </div>

      {/* --- BOTTOM: COPYRIGHT --- */}
      {/* Tightened mobile bottom padding */}
      <div className="border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-3 md:py-4 flex flex-col items-center justify-center">
          <p className="font-mono text-[8px] md:text-[10px] text-[#5b6472] uppercase tracking-widest text-center">
            &copy; 2026 Shavin Heshan Joseph. All Data Secured.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;