import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FiDownload, FiLock, FiUnlock, FiCpu, FiTerminal, FiClock, FiShield } from 'react-icons/fi';

// --- SCRAMBLE TEXT UTILITY ---
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    if (!isHovered) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return letters[Math.floor(Math.random() * 26)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setDisplayText(text); }} className="cursor-default transition-colors duration-300">
      {displayText}
    </span>
  );
};

// --- TIER CARD COMPONENT (Mobile Touch Optimized) ---
const DownloadTierCard = ({ title, type, badgeText, badgeColor, description, features, icon, delay }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Desktop Mouse Events
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Mobile Touch Events
  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  };

  const resetGlow = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={resetGlow}
      onTouchEnd={resetGlow}
      className="relative group flex flex-col bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden hover:border-[color:var(--theme-main)]/50 transition-colors duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.6)] touch-pan-y"
    >
      {/* Hover Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(var(--theme-rgb), 0.12), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[color:var(--theme-main)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            {icon}
          </div>
          <span className={`font-mono text-[9px] md:text-[10px] tracking-widest uppercase px-3 py-1.5 md:px-3.5 rounded-full border text-center ${badgeColor}`}>
            {badgeText}
          </span>
        </div>

        <span className="font-mono text-[10px] md:text-xs text-[color:var(--theme-main)] tracking-widest uppercase mb-2">
          {type}
        </span>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight">
          {title}
        </h3>
        
        <p className="text-[#8a93a6] text-sm md:text-base leading-relaxed mb-8">
          {description}
        </p>

        {/* Feature List */}
        <div className="space-y-3 mb-8 mt-auto">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start md:items-center gap-3 font-mono text-[11px] md:text-xs text-[#c5cbd3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-main)] flex-shrink-0 mt-1.5 md:mt-0" />
              <span className="leading-tight">{feat}</span>
            </div>
          ))}
        </div>

        {/* Coming Soon Button state */}
        <div className="w-full py-3 md:py-4 rounded-xl bg-white/[0.02] border border-white/10 text-center font-mono text-[10px] md:text-xs tracking-widest uppercase text-[#5b6472] flex items-center justify-center gap-2 cursor-not-allowed">
          <FiClock size={14} /> Deployment Underway
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN DOWNLOADS COMPONENT ---
const Downloads = () => {

  // --- SEO & META TAG INJECTION ---
  useEffect(() => {
    document.title = "Software Downloads & Releases | Shavin Heshan Joseph";

    const setMetaTag = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard SEO Tags
    setMetaTag('description', 'Download KWAS (Key Web App Solutions) software, free community utilities, and commercial-grade enterprise applications engineered by Shavin Heshan Joseph.');
    setMetaTag('keywords', 'software downloads, kwas software, shavin joseph apps, full stack applications, commercial software, open source tools, react, python, android app download, sri lanka developer');
    setMetaTag('author', 'Shavin Heshan Joseph');
    
    // Open Graph for Google Images & Socials
    setMetaTag('og:title', 'Software Downloads | KWAS by Shavin Heshan Joseph', true);
    setMetaTag('og:description', 'Access free community tools and advanced commercial-grade software engineered by Shavin Heshan Joseph.', true);
    setMetaTag('og:url', window.location.href, true);
    setMetaTag('og:type', 'website', true);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      // Updated mobile padding to perfectly fit screen and stop edge-clipping
      className="relative z-10 w-full min-h-screen pt-28 pb-32 md:pt-32 md:pb-24 px-4 md:px-8 max-w-[1280px] mx-auto overflow-x-hidden"
    >
      {/* Header */}
      <div className="mb-12 md:mb-24 text-center md:text-left">
        <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-3">
          <span className="w-8 h-px bg-[var(--theme-main)]" />
          <ScrambleText text="KWAS SOFTWARE REPOSITORY" />
        </div>
        <h1 className="font-bold text-[clamp(36px,8vw,80px)] leading-[0.9] tracking-tight uppercase text-white mb-5 md:mb-6">
          Digital <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Releases.</span>
        </h1>
        <p className="max-w-[650px] text-[#8a93a6] text-sm md:text-lg leading-relaxed mx-auto md:mx-0">
          The official distribution portal for <strong className="text-white font-medium">KWAS (Key Web App Solutions)</strong>. Free community tools and advanced commercial-grade software and mobile applications will be available here soon.
        </p>
      </div>

      {/* Grid of Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
        <DownloadTierCard 
          title="Free Community Tier" 
          type="Open Source & Utilities"
          badgeText="Free Access"
          badgeColor="bg-[var(--theme-main)]/10 border-[var(--theme-main)]/30 text-[color:var(--theme-main)]"
          description="Lightweight desktop utilities, developer scripts, and modular open-source codebases designed to accelerate workflow automation and day-to-day productivity."
          features={[
            "No license key required",
            "Open source repositories",
            "Regular community updates",
            "Direct installer packages (.exe / .apk)"
          ]}
          icon={<FiUnlock size={24} className="scale-90 md:scale-100" />}
          delay={0.2}
        />

        <DownloadTierCard 
          title="Commercial Suite Tier" 
          type="Enterprise & Production Apps"
          badgeText="Commercial License"
          badgeColor="bg-amber-500/10 border-amber-500/30 text-amber-400"
          description="High-performance proprietary software solutions—including management platforms like Flux Service—engineered for businesses, real-time analytics, and scalable commercial operations."
          features={[
            "Advanced security & encrypted databases",
            "Priority technical support channels",
            "Automated cloud syncing & backups",
            "Custom enterprise integrations"
          ]}
          icon={<FiLock size={24} className="scale-90 md:scale-100" />}
          delay={0.4}
        />
      </div>

      {/* Ecosystem Notice Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#12151b]/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--theme-main)]/10 border border-[color:var(--theme-main)]/30 flex items-center justify-center text-[color:var(--theme-main)] flex-shrink-0">
            <FiShield size={22} />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-wide mb-1.5 md:mb-1">Ecosystem Build Status</h4>
            <p className="text-[#8a93a6] text-xs md:text-sm">All packages are currently undergoing rigorous integration testing and security hardening prior to public release.</p>
          </div>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-[color:var(--theme-main)] tracking-widest uppercase px-6 py-3 md:px-5 md:py-2.5 rounded-xl bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/30 whitespace-nowrap w-full md:w-auto text-center">
          Launching 2026
        </div>
      </motion.div>

    </motion.main>
  );
};

export default Downloads;