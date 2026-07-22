import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { 
  FiHeart, 
  FiEye, 
  FiClock, 
  FiX, 
  FiTrendingUp, 
  FiBookOpen
} from 'react-icons/fi';

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
    <span 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => { setIsHovered(false); setDisplayText(text); }} 
      className="cursor-default transition-colors duration-300"
    >
      {displayText}
    </span>
  );
};

// --- HARDCODED ARTICLE DATABASE ---
// Add new articles to the top of this array.
const HARDCODED_ARTICLES = [
  {
    id: "1",
    title: "Why Traditional Full-Stack Development is Dead (And What I'm Building Instead)",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    views: 1245,
    likes: 342,
    date: "July 22, 2026",
    tags: ["AI Integration", "Full Stack", "System Architecture", "Future Tech"],
    summary: "The era of simple CRUD (Create, Read, Update, Delete) applications is over. Modern platforms require predictive intelligence, real-time tracking, and automated workflows. Here is how I am rewiring my approach to full-stack architecture.",
    content: `For the past few years, "Full-Stack Development" meant spinning up a React frontend, attaching a Node or Python backend, connecting a database, and calling it a day. But as I started building production-level systems, I realized something: **that architecture is no longer enough.**

When I was architecting **Flux Service**, an enterprise-level AC maintenance software, I realized that business owners didn't just want to record data—they wanted the system to *think* for them. 

### The Shift to Intelligent Systems
Instead of just logging when a technician serviced an AC unit, the system needed to predict *when* the next failure would occur. This meant moving away from static databases and integrating AI prediction models directly into the routing architecture.

Modern development is no longer about just connecting the frontend to the backend. It's about:
• **Real-Time Data Pipelines:** Ensuring inventory and fuel tracking sync globally with zero latency.
• **Automated Workflows:** Generating quotations and invoices without human intervention.
• **Predictive Analytics:** Using historical data to inform future business decisions automatically.

### What This Means for Developers
As developers, we have to stop thinking like "coders" and start thinking like "Systems Architects." Understanding how to write a Python endpoint is great, but understanding how that endpoint interacts with a Cisco network infrastructure, secures user data, and feeds into an AI diagnostic tool is what separates a basic app from an enterprise solution.

The systems of tomorrow are self-monitoring, self-healing, and deeply interconnected. That is exactly what I am focusing on building next with the KWAS ecosystem.`
  },
  {
    id: "2",
    title: "Bridging the Gap: Hardware Diagnostics Meets Web Infrastructure",
    category: "Hardware & Networking",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    views: 890,
    likes: 156,
    date: "July 15, 2026",
    tags: ["Cisco Networks", "Hardware", "Troubleshooting", "Infrastructure"],
    summary: "A deep dive into why full-stack developers need to understand the physical network layer. Exploring Cisco configurations, hardware troubleshooting, and how physical latency impacts digital code.",
    content: `There is a massive disconnect in the modern development community: software engineers rarely understand the hardware their code runs on, and network engineers rarely look at the application layer. 

I've always believed that to be a true Systems Architect, you must understand the entire pipeline—from the JavaScript rendering in the browser all the way down to the Cisco routing protocols directing the packets.

### The Physical Impact on Digital Code
You can write the most optimized Python algorithm in the world, but if your network architecture is flawed, your application will fail under load. Understanding subnetting, hardware diagnostics, and server limits changes how you write software. It forces you to write lighter, more efficient, and highly resilient code.`
  }
];

// --- BLOG CARD COMPONENT ---
const BlogCard = ({ article, onSelect, onLike, isLiked }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      className="relative group flex flex-col bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[color:var(--theme-main)]/50 transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(var(--theme-rgb), 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full" onClick={() => onSelect(article.id)}>
        {/* Image Banner */}
        {article.coverImage && (
          <div className="w-full h-48 overflow-hidden bg-[#0a0c10] relative border-b border-white/10">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0a0c10]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[color:var(--theme-main)] uppercase tracking-wider">
              {article.category}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 font-mono text-[10px] text-[#5b6472] uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
            <span className="flex items-center gap-1"><FiEye /> {article.views} Views</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[color:var(--theme-main)] transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-[#8a93a6] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs text-[#8a93a6]">
            <span className="text-[color:var(--theme-main)] font-semibold flex items-center gap-1">
              Read Transmission <FiBookOpen size={13} />
            </span>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLike(article.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
                isLiked 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                : 'bg-white/[0.03] border-white/10 hover:border-rose-500/50 hover:text-rose-400'
              }`}
            >
              <FiHeart className={isLiked ? "fill-rose-400 text-rose-400" : "text-rose-500 fill-rose-500/20"} />
              <span>{article.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN BLOG COMPONENT ---
const Blog = () => {
  // State for local interaction (makes the hardcoded data feel alive)
  const [articles, setArticles] = useState(HARDCODED_ARTICLES);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [filter, setFilter] = useState("latest"); 
  const [likedPosts, setLikedPosts] = useState(new Set());

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  // Dynamic SEO Injection
  useEffect(() => {
    if (selectedArticle) {
      document.title = `${selectedArticle.title} | Shavin Heshan Joseph`;

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

      setMetaTag('description', selectedArticle.summary);
      setMetaTag('keywords', selectedArticle.tags ? selectedArticle.tags.join(', ') : 'technology, web development, software');
      setMetaTag('og:title', selectedArticle.title, true);
      setMetaTag('og:description', selectedArticle.summary, true);
      if (selectedArticle.coverImage) {
        setMetaTag('og:image', selectedArticle.coverImage, true);
      }

      let script = document.getElementById('seo-blog-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-blog-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedArticle.title,
        "description": selectedArticle.summary,
        "image": selectedArticle.coverImage || `${window.location.origin}/profile.jpg`,
        "author": {
          "@type": "Person",
          "name": "Shavin Heshan Joseph",
          "url": window.location.origin
        },
        "publisher": {
          "@type": "Person",
          "name": "Shavin Heshan Joseph"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };
      script.innerHTML = JSON.stringify(schemaData);

    } else {
      document.title = "Engineering Log & Technical Articles | Shavin Heshan Joseph";
    }
  }, [selectedArticle]);

  // Handle Client-Side View Increment
  const handleSelectArticle = (id) => {
    setSelectedArticleId(id);
    setArticles(prev => prev.map(a => a.id === id ? { ...a, views: a.views + 1 } : a));
  };

  // Handle Client-Side Like Increment
  const handleLike = (id) => {
    if (likedPosts.has(id)) return; // Prevent double liking locally
    
    setLikedPosts(prev => new Set([...prev, id]));
    setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  // Sort Articles
  const sortedArticles = [...articles].sort((a, b) => {
    if (filter === "trending") {
      return b.likes - a.likes;
    }
    return 0; // Default order in array acts as "Latest"
  });

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full min-h-screen pt-28 pb-32 md:pt-32 md:pb-24 px-4 md:px-8 max-w-[1280px] mx-auto overflow-x-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--theme-main)]" />
            <ScrambleText text="KNOWLEDGE BASE ARCHIVE" />
          </div>
          <h1 className="font-bold text-[clamp(36px,8vw,80px)] leading-[0.9] tracking-tight uppercase text-white">
            Engineering <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Logs.</span>
          </h1>
        </div>

        {/* Sorting Filters */}
        <div className="flex items-center p-1 bg-[#12151b] border border-white/10 rounded-full font-mono text-xs w-max">
          <button 
            onClick={() => setFilter("latest")}
            className={`px-4 py-2 rounded-full transition-colors ${filter === "latest" ? "bg-[var(--theme-main)] text-[#090b0f] font-bold" : "text-[#8a93a6]"}`}
          >
            Latest
          </button>
          <button 
            onClick={() => setFilter("trending")}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 ${filter === "trending" ? "bg-[var(--theme-main)] text-[#090b0f] font-bold" : "text-[#8a93a6]"}`}
          >
            <FiTrendingUp /> Trending
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {sortedArticles.map((article) => (
          <BlogCard 
            key={article.id} 
            article={article} 
            onSelect={handleSelectArticle}
            onLike={handleLike}
            isLiked={likedPosts.has(article.id)}
          />
        ))}
      </div>

      {/* --- READER DRAWER / MODAL --- */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex justify-end"
            onClick={() => setSelectedArticleId(null)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl h-full bg-[#0a0c10] border-l border-white/10 overflow-y-auto p-6 md:p-12 relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArticleId(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="mt-8">
                <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--theme-main)] uppercase tracking-wider mb-4">
                  <span className="px-3 py-1 rounded-full bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/30">
                    {selectedArticle.category}
                  </span>
                  <span className="text-[#5b6472]">{selectedArticle.date}</span>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight mb-6 leading-tight">
                  {selectedArticle.title}
                </h1>

                {selectedArticle.coverImage && (
                  <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/10">
                    <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Markdown Formatting applied via standard HTML elements */}
                <div className="prose prose-invert prose-headings:text-white prose-a:text-[color:var(--theme-main)] max-w-none text-[#c5cbd3] text-base md:text-lg leading-relaxed whitespace-pre-line font-sans mb-12">
                  {selectedArticle.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-white/10">
                  {selectedArticle.tags.map((tag, i) => (
                    <span key={i} className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#8a93a6]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Reader Interactive Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#12151b] border border-white/10 mt-auto">
                  <button 
                    onClick={() => handleLike(selectedArticle.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-mono text-xs font-bold transition-colors ${
                      likedPosts.has(selectedArticle.id) 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                    }`}
                  >
                    <FiHeart className={likedPosts.has(selectedArticle.id) ? "fill-rose-400" : ""} /> 
                    {likedPosts.has(selectedArticle.id) ? 'Liked' : 'Like Article'} ({selectedArticle.likes})
                  </button>

                  <div className="font-mono text-xs text-[#5b6472] flex items-center gap-1">
                    <FiEye /> {selectedArticle.views} Total Views
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.main>
  );
};

export default Blog;