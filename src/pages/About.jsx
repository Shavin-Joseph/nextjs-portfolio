import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMonitor, FiCpu, FiSmartphone, FiCrosshair, FiMapPin } from 'react-icons/fi';

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

// --- 3D HOLOGRAPHIC PROFILE CARD (Mobile Touch Enabled) ---
const ProfileCard = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the tilt
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  
  // Map mouse position to rotation angles (max tilt: 15 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Desktop Mouse Events
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Mobile Touch Events
  const handleTouchMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.touches[0].clientX - rect.left) / rect.width - 0.5);
    y.set((e.touches[0].clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1000px] w-full max-w-[400px] mx-auto xl:mx-0">
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetTilt}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#0d1015] shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-crosshair touch-none"
      >
        {/* Animated Scanline Overlay */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-1/4 bg-gradient-to-b from-transparent via-[var(--theme-main)]/20 to-transparent z-20 pointer-events-none"
          style={{ transform: "translateZ(30px)" }}
        />
        
        {/* 3D Corner Brackets */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--theme-main)] z-20 transition-transform duration-300 group-hover:scale-125" style={{ transform: "translateZ(40px)" }} />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--theme-main)] z-20 transition-transform duration-300 group-hover:scale-125" style={{ transform: "translateZ(40px)" }} />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--theme-main)] z-20 transition-transform duration-300 group-hover:scale-125" style={{ transform: "translateZ(40px)" }} />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--theme-main)] z-20 transition-transform duration-300 group-hover:scale-125" style={{ transform: "translateZ(40px)" }} />

        {/* Profile Image (Optimized for Image SEO) */}
        <img 
          src="/profile.jpg" 
          alt="Shavin Heshan Joseph - Website Developer and Android App Developer in Sri Lanka" 
          title="Shavin Heshan Joseph - Systems Architect & Developer"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 z-10 scale-105"
          onError={(e) => { 
            e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'; 
          }} 
        />
        
        {/* 3D Floating Tech Overlay Data */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#090b0f] via-[#090b0f]/90 to-transparent z-20 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
          <h3 className="font-bold text-white text-xl leading-none uppercase">Shavin Heshan Joseph</h3>
          <p className="font-mono text-[11px] text-[#8a93a6] mt-2 flex items-center gap-1.5 uppercase tracking-widest">
            <FiMapPin className="text-[color:var(--theme-main)]"/> Wattala, LK
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- DATA MODULE CARD ---
const DataModule = ({ title, icon, items, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6, delay }}
    className="bg-[#12151b]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-[color:var(--theme-main)]/50 transition-colors duration-500 group"
  >
    <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-5 text-[color:var(--theme-main)] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-sans text-[16px] font-bold text-white mb-4 uppercase tracking-wide">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 font-mono text-[13px] text-[#8a93a6]">
          <span className="text-[color:var(--theme-main)] mt-0.5">›</span> {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// --- MAIN ABOUT COMPONENT ---
const About = () => {
  // --- SEO & META TAG INJECTION ---
  useEffect(() => {
    document.title = "About Shavin Heshan Joseph | Website & Android App Developer";

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

    // Inject Search Engine Keywords & Descriptions
    setMetaTag('description', 'Learn more about Shavin Heshan Joseph, a professional website developer, Android app developer, and full-stack systems architect from the University of Colombo.');
    setMetaTag('keywords', 'shavin joseph, shavin heshan joseph, heshan joseph, shavin, heshan, joseph, website developer, android app developer, full stack developer, web design sri lanka, app creator, software engineer');
    setMetaTag('author', 'Shavin Heshan Joseph');
    
    // Image & Social SEO (Ensures profile image shows in Google searches and links)
    setMetaTag('og:title', 'Shavin Heshan Joseph | Developer Profile', true);
    setMetaTag('og:description', 'System profile for Shavin Heshan Joseph - Expert in full-stack web, mobile apps, and Cisco networks.', true);
    setMetaTag('og:image', `${window.location.origin}/profile.jpg`, true);
    setMetaTag('og:type', 'profile', true);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full min-h-screen pt-32 pb-24 px-5 md:px-8 max-w-[1280px] mx-auto"
    >
      {/* Header */}
      <div className="mb-16 md:mb-24 text-center md:text-left mt-8 md:mt-0">
        <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-4 flex items-center justify-center md:justify-start gap-3">
          <span className="w-8 h-px bg-[var(--theme-main)]" />
          <ScrambleText text="OPERATOR CLEARANCE LEVEL" />
        </div>
        <h1 className="font-bold text-[clamp(40px,6vw,80px)] leading-[0.9] tracking-tight uppercase text-white">
          System <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Profile.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-12 xl:gap-20 items-start">
        
        {/* Left Side: 3D Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 xl:order-1"
        >
          <ProfileCard />
        </motion.div>

        {/* Right Side: Bio & Specs */}
        <div className="order-2 xl:order-2 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none font-sans text-base md:text-lg text-[#8a93a6] leading-relaxed mb-12"
          >
            <p className="mb-6">
              I am an undergraduate at the <strong className="text-[#eef1f6] font-medium">Faculty of Technology, University of Colombo</strong>, pursuing a Bachelor of Information and Communication Technology. Beyond academia, I am an entrepreneur and digital creator focused on building robust solutions that bridge complex backend logic with seamless user experiences.
            </p>
            <p className="mb-6 p-5 rounded-xl border border-white/10 bg-white/[0.02] shadow-inner">
              I design and develop <strong className="text-[color:var(--theme-main)] font-medium">full stack web and mobile applications</strong> using HTML, CSS, JavaScript, Python, and modern development frameworks. I also build <strong className="text-white font-medium">Android applications</strong>, configure and troubleshoot <strong className="text-white font-medium">Cisco network infrastructure</strong>, diagnose and resolve software issues, and leverage <strong className="text-[color:var(--theme-main)] font-medium">AI tools</strong> to streamline development, automate workflows, and create scalable digital solutions.
            </p>
            <p>
              I believe in holistic system design. True engineering doesn't stop at the frontend it extends through the routing protocols and into the databases. My background also includes serving as President of a local youth association, where I honed the leadership skills necessary to manage complex, community driven projects from the ground up.
            </p>
          </motion.div>

          {/* Technical Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <DataModule 
              delay={0.4} 
              title="Full-Stack & Web" 
              icon={<FiMonitor size={20} />} 
              items={['HTML, CSS, JavaScript', 'Python backend systems', 'Modern JS Frameworks', 'API Integration']}
            />
            <DataModule 
              delay={0.5} 
              title="Mobile & Software" 
              icon={<FiSmartphone size={20} />} 
              items={['Android Application Dev', 'Software Architecture', 'System Diagnostics', 'Digital Solutions']}
            />
            <DataModule 
              delay={0.6} 
              title="Networks & Systems" 
              icon={<FiCpu size={20} />} 
              items={['Cisco Network Infrastructure', 'Network Routing / Switching', 'System Architecture', 'Protocol Configuration']}
            />
            <DataModule 
              delay={0.7} 
              title="AI" 
              icon={<FiCrosshair size={20} />} 
              items={['AI Workflow Automation', 'Content Generation Pipelines', 'Project Management']}
            />
          </div>

        </div>
      </div>
    </motion.main>
  );
};

export default About;