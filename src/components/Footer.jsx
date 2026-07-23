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
        <div className="flex-1 overflow-hidden relative group py-3">
          {/* Fading Edges to make the text seamlessly disappear */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#12151b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#12151b] to-transparent z-10 pointer-events-none" />

          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 80 }} 
            className="flex whitespace-nowrap items-center font-mono text-[10px] md:text-xs text-[#8a93a6] uppercase tracking-widest"
          >
            {marqueeItems.map((article, index) => (
              <React.Fragment key={index}>
                {/* 3. DYNAMIC LINKS: Clicking a scrolling title goes to that specific article */}
                <Link 
                  to={`/blog/${article.id}`} 
                  className="mx-4 md:mx-8 flex items-center gap-2 hover:text-[color:var(--theme-main)] transition-colors duration-300"
                >
                  {article.title}
                </Link>
                <span className="text-white/20">///</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Read More Button (Right Side, Pinned) */}
        <Link 
          to="/blog" 
          className="flex items-center gap-2 px-5 md:px-8 bg-[#0a0c10] border-l border-white/10 hover:bg-white/[0.03] transition-colors font-mono text-[10px] md:text-xs uppercase tracking-widest text-[color:var(--theme-main)] font-bold shrink-0 z-20"
        >
          <span className="hidden sm:inline">Read All Logs</span>
          <span className="sm:hidden">Logs</span>
          <FiArrowUpRight size={14} />
        </Link>
      </div>

      {/* --- MIDDLE: MAIN FOOTER CONTENT --- */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* Column 1: Brand & SEO Text */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <Link to="/" className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter flex items-center gap-2 mb-4 hover:text-[color:var(--theme-main)] transition-colors">
            <FiTerminal className="text-[color:var(--theme-main)]" /> Shavin Joseph
          </Link>
          <p className="text-[#8a93a6] text-xs md:text-sm leading-relaxed max-w-md mb-6">
            A professional website developer and Android app developer based in Wattala, Sri Lanka. Architecting scalable full-stack applications, configuring network infrastructure, and deploying intelligent AI solutions.
          </p>
          <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#5b6472] uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            System Status: Online
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
          <h4 className="font-mono text-[10px] md:text-xs text-white uppercase tracking-widest mb-1 md:mb-2">Directories</h4>
          <Link to="/" className="text-[#8a93a6] text-xs md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">System Root (Home)</Link>
          <Link to="/work" className="text-[#8a93a6] text-xs md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">Architectural Builds (Work)</Link>
          <Link to="/blog" className="text-[#8a93a6] text-xs md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">Engineering Logs (Blog)</Link>
          <Link to="/downloads" className="text-[#8a93a6] text-xs md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max">KWAS Repository (Downloads)</Link>
        </nav>

        {/* Column 3: Social & Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-[10px] md:text-xs text-white uppercase tracking-widest mb-1 md:mb-2">Network</h4>
          <a href="https://www.linkedin.com/in/shavin-joseph-5193a73b5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8a93a6] text-xs md:text-sm hover:text-white transition-colors w-max">
            <FiLinkedin size={14} /> LinkedIn
          </a>
          <a href="https://github.com/Shavin-Joseph" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8a93a6] text-xs md:text-sm hover:text-white transition-colors w-max">
            <FiGithub size={14} /> GitHub Repository
          </a>
          <a href="mailto:josephshavin3@gmail.com" className="flex items-center gap-2 text-[#8a93a6] text-xs md:text-sm hover:text-white transition-colors w-max mt-1 md:mt-2">
            <FiMail size={14} className="text-[color:var(--theme-main)]" /> Initialize Comm Link
          </a>
        </div>

      </div>

      {/* --- BOTTOM: COPYRIGHT --- */}
      <div className="border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex flex-col items-center justify-center">
          <p className="font-mono text-[9px] md:text-[10px] text-[#5b6472] uppercase tracking-widest text-center">
            &copy; 2026 Shavin Heshan Joseph. All Data Secured.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;