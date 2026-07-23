import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FiCpu, FiTerminal, FiDatabase, FiWifi, FiLayers, FiCode } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

// --- ANIMATED NETWORK TOPOLOGY (Responsive) ---
const NetworkTopology = () => {
  const nodes = ['UI', 'API', 'NET', 'IoT', 'SHOP'];
  return (
    <div className="relative aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[480px] mx-auto w-full" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(240,244,250,0.06)" strokeWidth="1" />
        {nodes.map((label, i) => {
          const angle = (Math.PI * 2 / nodes.length) * i - Math.PI / 2;
          const x = 200 + Math.cos(angle) * 140;
          const y = 200 + Math.sin(angle) * 140;
          return (
            <g key={label}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="rgba(240,244,250,0.12)" strokeWidth="1" />
              <motion.circle r="4" fill="url(#packet-glow)" initial={{ cx: 200, cy: 200, opacity: 0 }} animate={{ cx: [200, x], cy: [200, y], opacity: [0, 1, 1, 0] }} transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 2 }} />
              <circle cx={x} cy={y} r="18" fill="#0d1015" stroke="rgba(240,244,250,0.22)" strokeWidth="1" />
              <text x={x} y={y + 3} fill="#8a93a6" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">{label}</text>
            </g>
          );
        })}
        {/* Center Node uses Theme Color */}
        <circle cx="200" cy="200" r="26" fill="#12151b" stroke="var(--theme-main)" strokeWidth="1.4" className="transition-colors duration-500" />
        <text x="200" y="204" fill="#eef1f6" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="600">SJ</text>
        <defs>
          <radialGradient id="packet-glow">
            <stop offset="0%" stopColor="rgba(var(--theme-rgb), 0.9)" className="transition-colors duration-500" />
            <stop offset="100%" stopColor="rgba(var(--theme-rgb), 0)" className="transition-colors duration-500" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// --- 1. HOLOGRAPHIC MASK TEXT (Touch Supported) ---
const HolographicHero = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleTouchMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - left);
    mouseY.set(e.touches[0].clientY - top);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => { mouseX.set(-1000); mouseY.set(-1000); }}
      onTouchEnd={() => { mouseX.set(-1000); mouseY.set(-1000); }}
      className="relative w-full py-4 md:py-10 cursor-crosshair group touch-none"
    >
      {/* Base Layer: Outline & Solid */}
      <h1 className="font-bold text-[clamp(45px,11vw,140px)] leading-[0.85] tracking-tighter uppercase flex flex-col">
        <span className="text-transparent pb-1" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
          SHAVIN
        </span>
        <span className="text-white/90 pb-1">
          JOSEPH
        </span>
      </h1>

      {/* Reveal Layer: Neon Text masked by mouse/touch position */}
      <motion.div
        className="absolute top-4 md:top-10 left-0 pointer-events-none"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${springX}px ${springY}px, black 40%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(200px circle at ${springX}px ${springY}px, black 40%, transparent 100%)`,
        }}
      >
        <h1 className="font-bold text-[clamp(45px,11vw,140px)] leading-[0.85] tracking-tighter uppercase flex flex-col drop-shadow-[0_0_40px_rgba(var(--theme-rgb),0.8)]">
          <span className="text-transparent pb-1 transition-colors duration-500" style={{ WebkitTextStroke: '2px var(--theme-main)' }}>
            SHAVIN
          </span>
          <span className="text-[color:var(--theme-main)] pb-1 transition-colors duration-500">
            JOSEPH
          </span>
        </h1>
      </motion.div>
    </div>
  );
};

// --- 2. DRAGGABLE PHYSICS ORBS ---
const DraggableNode = ({ icon, label, positionClasses, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ type: "spring", delay, stiffness: 200, damping: 20 }}
      className={`absolute z-30 pointer-events-auto ${positionClasses}`}
    >
      <motion.div
        drag
        dragElastic={0.2}
        dragMomentum={true}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="flex items-center gap-1.5 md:gap-3 px-3 md:px-5 py-2 md:py-3 bg-[#12151b]/80 backdrop-blur-md border border-[rgba(240,244,250,0.1)] rounded-full cursor-grab shadow-xl hover:border-[color:var(--theme-main)] transition-colors duration-300"
      >
        <span className="text-[color:var(--theme-main)] transition-colors duration-500 scale-75 md:scale-100">{icon}</span>
        <span className="font-mono text-[8px] md:text-xs text-[#eef1f6] tracking-widest uppercase whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
};

// --- 3. BLUEPRINT DRAWING LINES ---
const BlueprintLines = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute left-[5%] md:left-[10%] top-0 w-px bg-white/10" />
    <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} className="absolute right-[5%] md:right-[10%] top-0 w-px bg-white/10" />
    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }} className="absolute top-[15%] md:top-[20%] left-0 h-px bg-white/10" />
    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }} className="absolute bottom-[15%] md:bottom-[20%] left-0 h-px bg-white/10" />
  </div>
);

// --- 4. CONTINUOUS DATA STREAM ---
const SystemLog = () => {
  const [logs, setLogs] = useState([
    "[INIT] System booting...",
    "Routing architecture verified.",
  ]);

  useEffect(() => {
    const events = [
      "Connecting to PostgreSQL...",
      "PostgreSQL connection active.",
      "Parsing React component tree.",
      "Next.js SSR enabled.",
      "Pinging ESP32 nodes...",
      "LUMINA lighting arrays active.",
      "Cisco Packet Tracer running.",
      "Syncing FrostLink data...",
      "Fetching Spicera API..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, events[i]];
        if (newLogs.length > 3) newLogs.shift();
        return newLogs;
      });
      i = (i + 1) % events.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-5 right-5 md:bottom-6 md:right-12 text-right flex flex-col items-end gap-1 font-mono text-[8px] md:text-[10px] tracking-widest text-[#5b6472] uppercase z-40 pointer-events-none">
      {logs.map((log, index) => (
        <motion.div 
          key={log + index} 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: index === logs.length - 1 ? 1 : 0.5, x: 0 }} 
          className={index === logs.length - 1 ? "text-[color:var(--theme-main)] transition-colors duration-500" : ""}
        >
          {log}
        </motion.div>
      ))}
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
  useEffect(() => {
    document.title = "Shavin Heshan Joseph | Website & Android App Developer";

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

    setMetaTag('description', 'Official portfolio of Shavin Heshan Joseph. Top tier website developer, Android app developer, and full stack systems architect based in Sri Lanka.');
    setMetaTag('keywords', 'shavin joseph, shavin heshan joseph, heshan joseph, shavin, heshan, joseph, website developer, android app developer, full stack developer sri lanka, web designer, cisco networks, software engineer');
    setMetaTag('author', 'Shavin Heshan Joseph');
    
    setMetaTag('og:title', 'Shavin Heshan Joseph | Developer & Architect', true);
    setMetaTag('og:description', 'Explore the digital portfolio of Shavin Heshan Joseph. Professional website and Android app developer.', true);
    setMetaTag('og:image', `${window.location.origin}/profile.jpg`, true);
    setMetaTag('og:url', window.location.href, true);
    setMetaTag('og:type', 'website', true);

    let script = document.getElementById('seo-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Shavin Heshan Joseph",
      "alternateName": ["Shavin Joseph", "Heshan Joseph", "Shavin", "Heshan", "Joseph"],
      "jobTitle": "Website Developer & Android App Developer",
      "url": window.location.origin,
      "image": `${window.location.origin}/profile.jpg`,
      "sameAs": [
        "https://linkedin.com", 
        "https://github.com" 
      ]
    };
    script.innerHTML = JSON.stringify(structuredData);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden pt-28 pb-32 md:pt-20 md:pb-12"
    >
      <BlueprintLines />
      <SystemLog />

      {/* Floating Draggable Tech Nodes */}
      <div className="absolute inset-0 w-full h-full max-w-[1280px] mx-auto pointer-events-none overflow-hidden">
        <div className="pointer-events-none z-40 relative h-full w-full"> 
          <DraggableNode icon={<FiLayers size={16}/>} label="Front End" positionClasses="top-[6%] left-[4%] md:top-[12%] md:left-[2%]" delay={0.8} />
          <DraggableNode icon={<FiTerminal size={16}/>} label="Python" positionClasses="top-[12%] right-[4%] md:top-[85%] md:left-[8%] md:right-auto" delay={0.9} />
          <DraggableNode icon={<FiDatabase size={16}/>} label="Android" positionClasses="top-[46%] left-[4%] md:top-[85%] md:left-[50%]" delay={1.0} />
          <DraggableNode icon={<FiWifi size={16}/>} label="Cisco" positionClasses="top-[60%] right-[4%] md:top-[10%] md:left-[70%] md:right-auto" delay={1.1} />
          <DraggableNode icon={<FiCpu size={16}/>} label="AI" positionClasses="bottom-[8%] left-[4%] md:top-[75%] md:bottom-auto md:left-[80%]" delay={1.2} />
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="relative z-20 max-w-[1280px] w-full px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-center pointer-events-none mt-8 lg:mt-0">
        
        {/* Left Side: Text and Content */}
        {/* Added flex-col to perfectly control the vertical ordering using 'order-1', 'order-2' */}
        <div className="flex flex-col justify-center w-full relative z-10">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="order-1 font-mono text-xs md:text-sm tracking-[0.06em] text-[#8a93a6] mb-[2vh]">
            <ScrambleText text="// undergraduate — university of colombo" />
          </motion.div>
          
          <div className="order-2 pointer-events-auto w-max">
             <HolographicHero />
          </div>
          
          {/* Action Button: Moves directly under the name (order-3) on mobile, and drops to the bottom (order-4) on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }} 
            className="order-3 lg:order-4 flex flex-wrap items-center gap-4 md:gap-6 mt-6 lg:mt-[6vh] mb-4 lg:mb-0 pointer-events-auto relative z-20"
          >
            <Link 
              to="/work" 
              className="group flex items-center gap-3 text-[#eef1f6] font-mono text-[11px] md:text-[13px] tracking-widest uppercase hover:text-[color:var(--theme-main)] transition-colors duration-300"
            >
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[color:var(--theme-main)] transition-colors duration-300">
                <FiCode size={14} className="md:w-4 md:h-4" />
              </span>
              Initialize Systems
            </Link>
            
            <div className="w-6 md:w-12 h-[1px] bg-white/20 hidden xs:block" />
            
            <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#5b6472] uppercase">
              Wattala, LK <br/> Active Environment
            </div>
          </motion.div>

          {/* Paragraph: Sits under the button on mobile (order-4), and moves back up under the name on desktop (order-3) */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }} 
            className="order-4 lg:order-3 max-w-[500px] text-[#8a93a6] text-sm md:text-lg leading-relaxed mt-4 lg:mt-[2vh] relative z-20"
          >
            I am a professional <strong className="text-[#eef1f6] font-medium">website developer</strong> and <strong className="text-[#eef1f6] font-medium">Android app developer</strong> building full-stack applications using HTML, CSS, JavaScript, and Python. I configure complex <strong className="text-[#eef1f6] font-medium">Cisco network infrastructure</strong>, diagnose hardware issues, and leverage <strong className="text-[#eef1f6] font-medium">AI tools</strong> to create automated digital solutions.
          </motion.p>
          
        </div>

        {/* Right Side: Network Topology */}
        {/* Opacity lowered on mobile (opacity-40) so the overlapping text remains perfectly readable */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.3 }} 
          className="absolute right-[-40px] top-[5%] w-[260px] sm:w-[320px] pointer-events-none opacity-40 sm:opacity-60 lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:w-full lg:opacity-100 flex justify-center lg:justify-end z-0 lg:z-10"
        >
          <NetworkTopology />
        </motion.div>

      </div>
    </motion.main>
  );
};

export default Home;