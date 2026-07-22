import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { FiFolder, FiCode } from 'react-icons/fi';

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

// --- PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "Flux Service - AC Service & Management Software",
    category: "Full Stack Platform",
    description: "A comprehensive air conditioner maintenance software system featuring real-time tracking, AC service updates, unit management, auto AI predictions, interactive chats, inventory control, fuel tracking, and automated quotation generation.",
    tags: ["Real-Time Tracking", "AI Predictions", "Inventory", "Quotations", "Fuel Tracking", "Flask", "Python"],
    image: "/ac-platform.png", 
    imageFit: "contain",
  },
  {
    id: 2,
    title: "spicera.store - E-Commerce Website",
    category: "E-Commerce Development",
    description: "Designed and developed a vibrant and user-friendly e-commerce platform for an online spice merchant. The site features a clean product catalog, secure payment gateway integration with Stripe, and a fully responsive design for a seamless shopping experience on mobile and desktop.",
    tags: ["E-Commerce", "React", "UI/UX", "Responsive Design", "Payment Gateway"],
    image: "/spicera.png", 
    imageFit: "contain",
  },
  {
    id: 3,
    title: "royjtailors.store - Bespoke Tailoring Website",
    category: "Web Design & Development",
    description: "Created an elegant and professional online presence for a bespoke tailoring business. This project focused on showcasing high-quality craftsmanship through a clean visual gallery and simplifying the client consultation process with an integrated contact and appointment-request form.",
    tags: ["Web Design", "UI/UX", "Small Business", "Responsive"],
    image: "/roy-tailors.png", 
    imageFit: "contain",
  }
];

// --- 3D KINETIC PROJECT CARD (Mobile Touch Optimized) ---
const ProjectCard = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Desktop Mouse Events
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Mobile Touch Events
  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
    x.set((touch.clientX - rect.left) / rect.width - 0.5);
    y.set((touch.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetTilt}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group flex flex-col bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[color:var(--theme-main)]/50 transition-colors duration-500 h-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] touch-pan-y cursor-crosshair"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(var(--theme-rgb), 0.15), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          
          {/* Image Container */}
          <div className="relative w-full aspect-video overflow-hidden border-b border-white/10 bg-[#0a0c10]">
            <div className="absolute inset-0 bg-[color:var(--theme-main)]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img 
              src={project.image} 
              alt={project.title} 
              title={project.title}
              className={`w-full h-full ${
                project.imageFit === "contain"
                  ? "object-contain p-2 md:p-0"
                  : "object-cover object-top scale-105 group-hover:scale-110"
              } transition-transform duration-700 ease-out grayscale-[40%] group-hover:grayscale-0`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Missing Image Placeholder */}
            <div className="absolute inset-0 hidden items-center justify-center text-[#5b6472]">
              <FiFolder size={32} className="opacity-20" />
              <span className="absolute bottom-4 font-mono text-[10px] uppercase tracking-widest opacity-40">Awaiting Asset</span>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-5 md:p-8 flex flex-col flex-grow">
            <span className="font-mono text-[10px] text-[color:var(--theme-main)] tracking-widest uppercase mb-3 md:mb-4 block">
              {project.category}
            </span>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[color:var(--theme-main)] transition-colors duration-300 line-clamp-2 md:line-clamp-none">
              {project.title}
            </h3>
            
            <p className="text-[#8a93a6] text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-grow">
              {project.description}
            </p>
            
            {/* Tags Container */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="font-mono text-[9px] md:text-[10px] tracking-wide px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#eef1f6] group-hover:border-[color:var(--theme-main)]/30 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN WORK COMPONENT ---
const Work = () => {
  // --- ADVANCED SEO & SCHEMA INJECTION FOR PORTFOLIO ---
  useEffect(() => {
    document.title = "Architectural Builds & Projects | Shavin Heshan Joseph";

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
    setMetaTag('description', 'Explore the portfolio of Shavin Heshan Joseph. Featuring full-stack platforms, Android applications, and bespoke web architectures like Flux Service and KWAS.');
    setMetaTag('keywords', 'shavin joseph portfolio, shavin heshan joseph projects, website developer portfolio sri lanka, android app developer projects, full stack web apps, kwas solutions, flux ac software');
    setMetaTag('author', 'Shavin Heshan Joseph');
    
    // Open Graph for Google Images & Socials
    setMetaTag('og:title', 'Systems Deployed | Shavin Heshan Joseph Portfolio', true);
    setMetaTag('og:description', 'Explore full stack platforms, digital commerce environments, and web architectures engineered by Shavin Heshan Joseph.', true);
    setMetaTag('og:image', `${window.location.origin}/ac-platform.png`, true); // Uses a project image as the default share thumbnail
    setMetaTag('og:url', window.location.href, true);
    setMetaTag('og:type', 'website', true);

    // JSON-LD Structured Data (Tells Google exactly what projects you built)
    let script = document.getElementById('seo-structured-data-work');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-structured-data-work';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Shavin Heshan Joseph - Architectural Builds & Projects",
      "description": "A curated selection of full stack platforms, digital commerce environments, and web architectures engineered for performance and scalability.",
      "author": {
        "@type": "Person",
        "name": "Shavin Heshan Joseph",
        "url": window.location.origin
      },
      "itemListElement": projects.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": p.title,
        "description": p.description
      }))
    };
    script.innerHTML = JSON.stringify(structuredData);

    // Cleanup script when navigating away to avoid duplicate schemas
    return () => {
      const existingScript = document.getElementById('seo-structured-data-work');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full min-h-screen pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-8 max-w-[1280px] mx-auto overflow-x-hidden"
    >
      {/* Header */}
      <div className="mb-12 md:mb-20 text-center md:text-left">
        <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-3">
          <span className="w-8 h-px bg-[var(--theme-main)]" />
          <ScrambleText text="SYSTEMS DEPLOYED" />
        </div>
        <h1 className="font-bold text-[clamp(36px,8vw,80px)] leading-[0.9] tracking-tight uppercase text-white mb-5 md:mb-6">
          Architectural <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Builds.</span>
        </h1>
        <p className="max-w-[600px] text-[#8a93a6] text-sm md:text-lg leading-relaxed mx-auto md:mx-0">
          A curated selection of full stack platforms, digital commerce environments, and web architectures engineered for performance and scalability.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-16 md:mb-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* KWAS Brand Ecosystem Showcase Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-[#12151b]/90 backdrop-blur-xl border border-[color:var(--theme-main)]/30 rounded-3xl p-6 md:p-8 lg:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[var(--theme-main)]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-8 items-center text-center lg:text-left">
          
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 font-mono text-[10px] md:text-xs text-[color:var(--theme-main)] tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-main)] animate-pulse" />
              Independent Brand Ecosystem
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight mb-4 flex flex-col lg:block items-center">
              KWAS <span className="text-[color:var(--theme-main)] font-mono text-sm md:text-lg lowercase font-normal mt-1 lg:mt-0 lg:ml-2">(Key Web App Solutions)</span>
            </h2>
            
            <p className="text-[#8a93a6] text-sm md:text-base lg:text-lg max-w-[700px] leading-relaxed">
              Serving as the incubator brand for upcoming proprietary software and mobile applications. Built to streamline client operations, KWAS is expanding into a full suite of downloadable desktop software and mobile apps built for independent deployment and commercial scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <div className="px-5 md:px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center lg:justify-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--theme-main)]/10 flex items-center justify-center overflow-hidden border border-[color:var(--theme-main)]/30 p-1 flex-shrink-0">
                <img src="/kwas-logo.png" alt="KWAS Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[9px] md:text-[10px] text-[#5b6472] uppercase tracking-widest">Future Releases</div>
                <div className="text-white font-bold text-xs md:text-sm tracking-wide">Software & Apps</div>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
      
    </motion.main>
  );
};

export default Work;