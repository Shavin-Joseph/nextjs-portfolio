import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { FiMail, FiSend, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; 

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

// --- SOCIAL / COMMUNICATION CHANNELS DATA ---
const channels = [
  {
    name: "WhatsApp",
    handle: "+94 Chat Direct",
    description: "Instant messaging channel for project inquiries, quick discussions, and real-time collaboration.",
    icon: <FaWhatsapp size={24} />,
    link: "https://wa.me/94725578158", 
    badge: "Fastest Response",
    color: "from-emerald-500/20 to-transparent",
    borderColor: "hover:border-emerald-500/50"
  },
  {
    name: "Gmail",
    handle: "Josephshavin3@gmail.com", 
    description: "Official electronic mail for formal propositions, architecture breakdowns, and enterprise contracts.",
    icon: <FiMail size={24} />,
    link: "mailto:josephshavin3@gmail.com",
    badge: "Direct Mail",
    color: "from-rose-500/20 to-transparent",
    borderColor: "hover:border-rose-500/50"
  },
  {
    name: "LinkedIn",
    handle: "Shavin Heshan Joseph",
    description: "Professional networking profile showcasing academic milestones, leadership history, and technical credentials.",
    icon: <FaLinkedinIn size={24} />,
    link: "https://www.linkedin.com/in/shavin-joseph-5193a73b5", 
    badge: "Professional",
    color: "from-blue-500/20 to-transparent",
    borderColor: "hover:border-blue-500/50"
  },
  {
    name: "GitHub",
    handle: "Shavin-Joseph",
    description: "Source code repositories, open-source utilities, full-stack web applications, and experiment builds.",
    icon: <FaGithub size={24} />,
    link: "https://github.com/Shavin-Joseph",
    badge: "Repositories",
    color: "from-purple-500/20 to-transparent",
    borderColor: "hover:border-purple-500/50"
  },
  {
    name: "Facebook",
    handle: "Shavin Joseph",
    description: "Personal social network connection, community updates, and peer networking channels.",
    icon: <FaFacebookF size={24} />,
    link: "https://www.facebook.com/share/1KCFrYKsdU/",
    badge: "Social",
    color: "from-sky-500/20 to-transparent",
    borderColor: "hover:border-sky-500/50"
  }
];

// --- 3D KINETIC CHANNEL CARD ---
const ChannelCard = ({ channel, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.a
        href={channel.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative group flex flex-col bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 h-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] ${channel.borderColor}`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(var(--theme-rgb), 0.15), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-6">
            <motion.div 
              className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[color:var(--theme-main)] transition-colors duration-300 group-hover:bg-[var(--theme-main)]/10"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              {channel.icon}
            </motion.div>
            <span className="font-mono text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#c5cbd3] group-hover:border-[color:var(--theme-main)]/40 transition-colors duration-300">
              {channel.badge}
            </span>
          </div>

          <span className="font-mono text-xs text-[color:var(--theme-main)] tracking-widest uppercase mb-1">
            {channel.name}
          </span>
          
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[color:var(--theme-main)] transition-colors duration-300">
            {channel.handle}
          </h3>
          
          <p className="text-[#8a93a6] text-sm leading-relaxed mb-6 flex-grow">
            {channel.description}
          </p>

          <motion.div 
            className="font-mono text-xs text-white flex items-center gap-2 group-hover:text-[color:var(--theme-main)] transition-colors mt-auto"
            whileHover={{ x: 5 }}
          >
            Initialize Link <span>→</span>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};

// --- MAIN CONTACT COMPONENT ---
const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: formState.name,
        email: formState.email,
        message: formState.message,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Transmission Error: ", error);
      alert("Transmission failed. Please verify your network connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full min-h-screen pt-32 pb-24 px-5 md:px-8 max-w-[1280px] mx-auto"
    >
      <div className="mb-16 md:mb-24 text-center md:text-left">
        <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-4 flex items-center justify-center md:justify-start gap-3">
          <span className="w-8 h-px bg-[var(--theme-main)]" />
          <ScrambleText text="ESTABLISH CONNECTION" />
        </div>
        <h1 className="font-bold text-[clamp(40px,6vw,80px)] leading-[0.9] tracking-tight uppercase text-white mb-6">
          Let's <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Talk.</span>
        </h1>
        <p className="max-w-[600px] text-[#8a93a6] text-base md:text-lg leading-relaxed mx-auto md:mx-0">
          Connect directly via secure communication channels or send an encrypted transmission straight to the terminal array.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        {channels.map((channel, index) => (
          <ChannelCard key={channel.name} channel={channel} index={index} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Animated Breathing Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-main)] rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-[700px] mb-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs text-[color:var(--theme-main)] tracking-widest uppercase mb-2 flex items-center gap-2"
          >
            <FiMessageSquare /> Secure Terminal Dispatch
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight"
          >
            Send a Direct Transmission
          </motion.h2>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="p-8 rounded-2xl bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/40 text-center font-mono text-sm text-white relative z-10"
          >
            [OK] Transmission received and securely encrypted. System operator will respond shortly.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block font-mono text-xs text-[#8a93a6] uppercase tracking-wider mb-2">Operator Name</label>
                <motion.input 
                  whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)" }}
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-[#5b6472] font-mono text-sm focus:outline-none focus:border-[color:var(--theme-main)] transition-colors"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block font-mono text-xs text-[#8a93a6] uppercase tracking-wider mb-2">Return Address (Email)</label>
                <motion.input 
                  whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)" }}
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-[#5b6472] font-mono text-sm focus:outline-none focus:border-[color:var(--theme-main)] transition-colors"
                />
              </motion.div>

            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block font-mono text-xs text-[#8a93a6] uppercase tracking-wider mb-2">Transmission Message</label>
              <motion.textarea 
                whileFocus={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.02)" }}
                rows="5"
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Enter project details, inquiry, or collaboration terms..."
                className="w-full bg-[#0a0c10] border border-white/10 rounded-xl p-5 text-white placeholder-[#5b6472] font-mono text-sm focus:outline-none focus:border-[color:var(--theme-main)] transition-colors resize-none"
              />
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-[var(--theme-main)] text-[#090b0f] font-mono text-xs tracking-widest uppercase font-bold hover:brightness-110 transition-all shadow-[0_0_30px_rgba(var(--theme-rgb),0.3)] cursor-pointer disabled:opacity-50"
            >
              <FiSend size={16} className={loading ? "animate-pulse" : "group-hover:translate-x-1 transition-transform"} /> 
              {loading ? "Transmitting Data..." : "Transmit Data Packet"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.main>
  );
};

export default Contact;