import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiEye, FiClock, FiTrendingUp, FiArrowLeft, FiShare2, FiBookOpen } from 'react-icons/fi';
import { db } from '../firebase'; // Ensure your firebase config is correct
import { doc, setDoc, updateDoc, increment, collection, onSnapshot } from 'firebase/firestore';

// --- HARDCODED CONTENT DATABASE (Fast, Secure, Free) ---
 export const HARDCODED_ARTICLES = [
  {
    id: "1",
    title: "Why Traditional Full-Stack Development is Dead (And What I'm Building Instead)",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2026-07-22",
    tags: ["AI Integration", "Full Stack", "System Architecture", "Future Tech"],
    summary: "The era of simple CRUD applications is over. Modern platforms require predictive intelligence, real-time tracking, and automated workflows. Here is how I am rewiring my approach to full-stack architecture.",
    content: `For the past few years, "Full-Stack Development" meant spinning up a React frontend, attaching a Node or Python backend, connecting a database, and calling it a day. But as I started building production-level systems, I realized something: **that architecture is no longer enough.**\n\nWhen I was architecting **Flux Service**, an enterprise-level AC maintenance software, I realized that business owners didn't just want to record data—they wanted the system to *think* for them.\n\n### The Shift to Intelligent Systems\nInstead of just logging when a technician serviced an AC unit, the system needed to predict *when* the next failure would occur. This meant moving away from static databases and integrating AI prediction models directly into the routing architecture.\n\nModern development is no longer about just connecting the frontend to the backend. It's about:\n• **Real-Time Data Pipelines:** Ensuring inventory and fuel tracking sync globally with zero latency.\n• **Automated Workflows:** Generating quotations and invoices without human intervention.\n• **Predictive Analytics:** Using historical data to inform future business decisions automatically.\n\n### What This Means for Developers\nAs developers, we have to stop thinking like "coders" and start thinking like "Systems Architects." Understanding how to write a Python endpoint is great, but understanding how that endpoint interacts with a Cisco network infrastructure, secures user data, and feeds into an AI diagnostic tool is what separates a basic app from an enterprise solution.\n\nThe systems of tomorrow are self-monitoring, self-healing, and deeply interconnected. That is exactly what I am focusing on building next with the KWAS ecosystem.`
  },
  {
    id: "2",
    title: "Bridging the Gap: Hardware Diagnostics Meets Web Infrastructure",
    category: "Hardware & Networking",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-07-15",
    tags: ["Cisco Networks", "Hardware", "Troubleshooting", "Infrastructure"],
    summary: "A deep dive into why full-stack developers need to understand the physical network layer. Exploring Cisco configurations, hardware troubleshooting, and how physical latency impacts digital code.",
    content: `There is a massive disconnect in the modern development community: software engineers rarely understand the hardware their code runs on, and network engineers rarely look at the application layer.\n\nI've always believed that to be a true Systems Architect, you must understand the entire pipeline—from the JavaScript rendering in the browser all the way down to the Cisco routing protocols directing the packets.\n\n### The Physical Impact on Digital Code\nYou can write the most optimized Python algorithm in the world, but if your network architecture is flawed, your application will fail under load. Understanding subnetting, hardware diagnostics, and server limits changes how you write software. It forces you to write lighter, more efficient, and highly resilient code.`
  },
  {
    id: "3",
    title: "Injecting AI into Legacy Industries: How Flux Service Predicts Hardware Failures",
    category: "Artificial Intelligence",
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-06-18",
    tags: ["AI", "Python", "Flask", "Machine Learning"],
    summary: "Air conditioning maintenance hasn't changed in decades. By integrating Python-based AI models into the Flux Service platform, we turned a reactive industry into a proactive one.",
    content: `When building **Flux Service**, I noticed a fundamental flaw in how service management software operates: it is entirely reactive. A client’s air conditioner breaks, they call, and a technician is dispatched. 

To create a true enterprise solution, the software needed to anticipate problems before they happened.

### The Power of Predictive Maintenance
By utilizing Python and Flask, I integrated automated AI predictions into the core workflow. Instead of waiting for a breakdown, the system analyzes historical service records, unit specifications (down to the 60 BTU level), and usage patterns to calculate the probability of a future failure.

### Real-Time Ecosystems
This isn't just about throwing AI at a wall. The predictions tie directly into a real-time tracking system. If the AI flags a unit for potential failure, the platform automatically syncs this data with inventory control to ensure the correct parts are in the van, and tracks the technician's fuel usage for the route. 

Bringing legacy industries into the future doesn't require reinventing the wheel—it requires giving the wheel a brain.`
  },
  {
    id: "4",
    title: "Beyond the Screen: Programming ESP32 for 23-Foot Structural Lighting",
    category: "IoT & Hardware",
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
    readTime: "7 min read",
    date: "2026-05-04",
    tags: ["ESP32", "Hardware", "IoT", "C++", "Architecture"],
    summary: "Software doesn't just live in browsers. Here is how I architected the network and code for a massive 23-foot smart lighting installation using ESP32 controllers.",
    content: `As a developer, there is a profound satisfaction in seeing your code physically manipulate the real world. In December 2025, I stepped away from the IDE to manage a large-scale, 23-foot structural lighting project for a community installation.

### The Hardware-Software Bridge
The brain of the operation was the **ESP32 microcontroller**. Working with structural lighting at scale is an entirely different beast than writing a web app. 
• **Latency is visible:** If your data packets drop, a section of your 23-foot structure goes dark. 
• **Memory limits are absolute:** You can't just buy more RAM; your C++ code has to be ruthlessly efficient.

### Network Administration in the Real World
This is where Cisco networking fundamentals shine. Managing the data flow for thousands of LEDs requires a flawless local network architecture to prevent bottlenecks and signal degradation. 

Building physical tech forces you to write better code. It teaches you that "full stack" doesn't just mean frontend and backend—it means understanding the silicon, the copper wire, and the visual output.`
  },
  {
    id: "5",
    title: "Real-Time Location Tracking in Android: The FrostLink Architecture",
    category: "Mobile Development",
    coverImage: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2026-04-12",
    tags: ["Android Studio", "Kotlin", "Firebase", "Mobile Apps"],
    summary: "Building native Android apps that handle real-time location data without draining batteries or dropping connections is a delicate balancing act.",
    content: `When architecting **FrostLink Sales**, the primary challenge wasn't building the UI—it was managing state and location tracking in real-time. FrostLink is designed for daily sales analytics with live location features, which means the app has to constantly communicate with the server without destroying the user's mobile battery.

### The Challenge of Native Android Location
Modern Android OS versions (especially Android 13+) heavily restrict background location tracking for privacy and battery preservation. 

To overcome this, I leveraged optimized foreground services and intelligent polling intervals. The app doesn't just blindly send data every second; it batches location packets and utilizes Firebase's real-time sync only when meaningful movement occurs.

### Unified Analytics
Because FrostLink ties directly into a broader sales ecosystem, the mobile app acts as an edge node. The data collected by the Android device is instantly pushed to the central database, populating the daily sales analytics dashboards for admins. Mobile development isn't just about Kotlin and XML—it's about edge computing.`
  },
  {
    id: "6",
    title: "The Anatomy of a High-Converting E-Commerce Store (Spicera.store)",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-03-28",
    tags: ["E-Commerce", "React", "Stripe", "UI/UX"],
    summary: "Creating an e-commerce platform goes far beyond rendering a shopping cart. It requires psychological design, zero-friction payment gateways, and flawless mobile responsiveness.",
    content: `When a user lands on an online store, you have exactly three seconds to convince them that your brand is trustworthy. When I developed **Spicera.store**, an e-commerce platform for an online spice merchant, the entire architecture was built around building trust through speed and design.

### Frictionless UI/UX
The product catalog was designed to be vibrant but minimalist. Heavy, unoptimized images kill conversions. Every product mockup was generated and compressed to load in milliseconds, ensuring that the mobile shopping experience was identical in quality to the desktop experience.

### Secure Gateway Integration
A store is useless if users are afraid to pull out their credit cards. By integrating Stripe's robust payment gateway directly into the React architecture, the checkout process remains securely on the site. No jarring redirects, no clunky third-party popups. 

Building Spicera reinforced a golden rule: Great code should be invisible to the user. All they should see is a beautiful product and a fast checkout.`
  },
  {
    id: "7",
    title: "Why I Built KWAS: The Future of Independent Software Ecosystems",
    category: "Software Ecosystem",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-02-15",
    tags: ["KWAS", "Entrepreneurship", "SaaS", "Full Stack"],
    summary: "The story behind Key Web App Solutions (KWAS) and why the future of software belongs to independent, highly specialized ecosystem builders.",
    content: `The tech industry is dominated by massive, bloated SaaS platforms that force businesses to adapt to the software. I believe software should adapt to the business. That is why I founded **KWAS (Key Web App Solutions)**.

### The Incubator Concept
KWAS operates as an incubator brand. Instead of building one massive, complex app that tries to do everything for everyone, KWAS focuses on proprietary, highly targeted software and mobile applications. 

Whether it is a full-stack platform like Flux Service for AC maintenance, or a bespoke web architecture for Roy J Tailors, the goal is the same: streamline client operations through custom deployment.

### Commercial Scale
The next phase of KWAS is expanding into a suite of downloadable desktop software and mobile apps. By keeping the development independent, we retain the agility to deploy commercial-grade tools without the overhead of a massive corporation. The future of software is agile, independent, and fiercely customized.`
  },
  {
    id: "8",
    title: "Mastering Framer Motion & Tailwind: Building Kinetic UIs",
    category: "Frontend Architecture",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2026-01-30",
    tags: ["React", "Framer Motion", "TailwindCSS", "Animation"],
    summary: "Static websites are obsolete. Learn how to combine Framer Motion and Tailwind CSS to create fluid, physics-based interfaces that respond to user touch.",
    content: `If your website doesn't react to the user, it feels dead. Modern frontend architecture requires a marriage between rapid styling and complex physics engines. 

### The Tailwind + Framer Synergy
Tailwind CSS handles the grid, the typography, and the absolute positioning with utility classes. But Framer Motion brings it to life. 

By tracking mouse and touch positions via \`useMotionValue\`, we can create effects like holographic masking and draggable physics orbs that don't just look cool—they feel physically satisfying to interact with.

### Touch Optimization is Mandatory
A frequent mistake developers make is building incredible hover animations for desktop and completely forgetting mobile users. Using \`onTouchMove\` event listeners ensures that the kinetic energy of a site translates perfectly to smartphones without breaking the native scroll experience.`
  },
  {
    id: "9",
    title: "Scaling Software While Studying: Life as a UoC Undergraduate",
    category: "Developer Journey",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2026-01-10",
    tags: ["University of Colombo", "Productivity", "Student Life", "Startup"],
    summary: "Balancing a Bachelor of Information and Communication Technology degree with running a software startup and building enterprise apps requires ruthless efficiency.",
    content: `Studying at the University of Colombo while actively deploying commercial software is an exercise in extreme time management. 

### Theory vs. Application
There is a profound synergy between academic coursework and real-world development. While the university curriculum builds a rock-solid foundation in data structures, algorithms, and computing theory, my work with KWAS and freelance clients forces me to apply those theories to messy, real-world problems.

When a university exam tests you on database normalization, it becomes incredibly relevant when you are actively designing the PostgreSQL schema for a live e-commerce platform like Spicera.store.

### The Power of Automation
To survive the workload, you have to automate your life. This necessity is what drove me to build complex Notion templates and leverage AI tools for branding and mockups. When you automate the repetitive tasks, you leave your brain free to focus on studying and architecting.`
  },
  {
    id: "10",
    title: "Building the Ultimate Language Learning Lab in Notion",
    category: "Digital Products",
    coverImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-12-28",
    tags: ["Notion", "Gumroad", "Productivity", "Creator Economy"],
    summary: "How I engineered complex database logic inside Notion to create a commercially viable Language Learning Lab template for Gumroad.",
    content: `Notion is no longer just a note-taking app; it is a full-fledged relational database system disguised as a workspace. 

### Engineering the Template
When I launched the "Language Learning Lab" template on Gumroad, I approached it like software development. It wasn't just about making it look pretty. I utilized complex database relations, rollups, and formula properties to create a system that automatically tracks vocabulary retention and spaced repetition.

### The Digital Creator Economy
Building templates is an excellent entry point into digital product architecture. You learn how to package logic, write documentation, and market a digital asset. Platforms like Gumroad and Fiverr allow developers to diversify their income streams by turning internal workflow tools into commercial assets.`
  },
  {
    id: "11",
    title: "Cisco Packet Tracer in 2026: Why Virtual Networks Build Better Coders",
    category: "Networking",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-12-10",
    tags: ["Cisco", "Networking", "Infrastructure", "Packet Tracer"],
    summary: "Before you deploy your code to the cloud, you need to understand how the cloud actually routes your data. A look at virtual network simulation.",
    content: `There is a tendency for modern developers to treat the cloud as "magic." Code goes up, website comes down. But understanding the physical architecture beneath that magic is what makes a senior engineer.

### Simulating the World
Cisco Packet Tracer remains one of the most powerful tools in an architect's arsenal. By simulating complex network topologies, switches, routers, and firewalls, you gain an intimate understanding of packet loss, latency, and routing protocols.

When you spend hours configuring virtual subnets and troubleshooting dead access points, you start to view your frontend API calls entirely differently. You stop taking the network for granted and start building in robust error handling, fallbacks, and optimized data payloads.`
  },
  {
    id: "12",
    title: "Diversifying Digital Income: From Client Sites to Adobe Assets",
    category: "Digital Economy",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-11-20",
    tags: ["Freelance", "Passive Income", "Design Assets", "Strategy"],
    summary: "A blueprint for developers and creators to step out of the time-for-money trap by leveraging AI, Adobe Stock, and the gig economy.",
    content: `Client work is fantastic for building skills and capital, but it scales linearly: you only get paid when you work. To truly scale in the digital economy, you must decouple your time from your income.

### The Asset Portfolio
In addition to building bespoke sites like Roy J Tailors, I dedicate time to AI-assisted content creation. By generating professional logos, branding mockups, and cinematic assets, I am able to operate as an Adobe Stock Contributor.

These digital assets live on servers permanently, generating passive income while I focus on coding my next application. 

### The Gig Economy Pipeline
Platforms like Fiverr act as the perfect testing ground. You can rapidly prototype a service—whether it's web development, bug fixing, or Notion templates—see what the market responds to, and then package that service into an automated, standalone digital product.`
  },
  {
    id: "13",
    title: "State Management in 2026: Why We Stopped Overcomplicating Redux",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-11-05",
    tags: ["React", "State Management", "Zustand", "Frontend"],
    summary: "For years, developers spent more time writing boilerplate for state containers than building features. Here is why lightweight state engines and React server state have won.",
    content: `State management used to be the most contentious topic in web development. We spent years creating actions, reducers, and dispatchers just to toggle a modal or update a user name in a sidebar.

### The Shift to Atomic and Server State
In modern web applications, state naturally breaks down into two distinct categories:
• **Server State:** Data that belongs to the database (cached via tools like React Query or SWR).
• **UI State:** Temporary interface changes (handled via local atomic stores like Zustand or React context).

When you decouple client-side UI toggles from your remote data fetching layer, your codebase instantly becomes cleaner, faster, and far easier to debug.

### Performance Under Load
In complex platforms where dozens of components need real-time data sync, over-engineered state containers cause unnecessary re-renders. Moving to lightweight, targeted state sub-subscriptions keeps frame rates locked at 60fps even on low-end mobile devices.`
  },
  {
    id: "14",
    title: "How AI Agents Are Replacing Standard Web APIs in Enterprise Systems",
    category: "AI & Automation",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-10-28",
    tags: ["AI Agents", "Python", "API", "Automation"],
    summary: "Static REST endpoints are no longer the peak of backend integration. Autonomous AI agents are now dynamic middleware that interpret user intent in real time.",
    content: `Traditional software relies on hardcoded logic paths: \`IF user clicks X, THEN call endpoint Y\`. But enterprise operations aren't always linear.

### Autonomous Middleware
When building intelligent platforms, we are moving toward agentic middleware. Instead of forcing a user to fill out a 15-field form to generate an invoice or schedule a technician, an AI agent takes raw text, parses the intent, validates inventory databases, and executes the database mutation autonomously.

### The Python Ecosystem Advantage
Python continues to dominate this domain due to its native integration with LLM orchestration frameworks. By exposing structured tools to AI agents via Flask backends, we allow system components to dynamically negotiate workflows. The API of tomorrow isn't just a list of JSON schemas—it's an active conversation between intelligent microservices.`
  },
  {
    id: "15",
    title: "Building Offline-First Mobile Apps: Native Kotlin vs. Hybrid PWAs",
    category: "Mobile Development",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-10-14",
    tags: ["Android Studio", "Kotlin", "PWA", "Offline First"],
    summary: "When connectivity drops in the field, your software cannot fail. A technical comparison between native Android storage engines and browser service workers.",
    content: `Field technicians, sales representatives, and logistics managers frequently operate in poor signal zones. If an app requires a continuous internet connection to function, it is unreliable in commercial environments.

### Native Room DB vs. IndexedDB
When architecting native apps in Kotlin, Android's **Room persistence library** allows local SQLite databases to act as the single source of truth. The UI observes the local database, and background workers silently attempt network syncs when signal returns.

In hybrid PWAs, **IndexedDB** managed via Service Workers provides a similar experience in the browser. 

### Which Should You Choose?
If your platform requires precise background hardware access—such as low-power Bluetooth sync, background location tracking, or direct camera hardware acceleration—native Kotlin is non-negotiable. For content-heavy catalogs and lightweight portals, an offline-first PWA offers faster deployment cycles.`
  },
  {
    id: "16",
    title: "Zero-Trust Web Security: Lessons Learned from Cisco Network Architectures",
    category: "Cyber Security",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-09-30",
    tags: ["Security", "Cisco", "Zero Trust", "Backend"],
    summary: "Never trust, always verify. Applying network-level access control lists and perimeter isolation to modern full-stack web applications.",
    content: `In traditional network administration, security focused on perimeter defense: build a strong firewall around the internal network, and trust everything inside. Modern cyber security has completely discarded this model in favor of **Zero-Trust Architecture**.

### Applying Network Control to Web Apps
Web applications must adopt the exact same principles used in Cisco network design:
• **Principle of Least Privilege:** JWT tokens and session cookies should grant access only to granular endpoints required for the current action.
• **Perimeter Isolation:** Microservices should never expose database connections directly to client-facing web servers.
• **Continuous Verification:** Re-authenticating sensitive operations (like updating billing data or altering system access) rather than relying solely on an active browser session.

Treating every request—even those originating from internal microservices—as untrusted guarantees your system remains resilient against unauthorized access.`
  },
  {
    id: "17",
    title: "Optimizing Flask Backends for High-Frequency Automated Quotations",
    category: "Backend Engineering",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-09-12",
    tags: ["Python", "Flask", "Backend", "Performance"],
    summary: "Generating PDF documents and complex pricing matrices dynamically can quickly lock up server threads. Here is how to keep Flask backends asynchronous and blazing fast.",
    content: `Dynamic PDF generation and real-time quotation calculation are surprisingly resource-intensive tasks. If handled synchronously inside a standard HTTP request cycle, a few concurrent requests can easily exhaust your WSGI worker threads.

### Asynchronous Queue Pipelines
When building quotation systems in Flask, intensive generation tasks must be offloaded to asynchronous task queues (such as Celery or RQ) backed by Redis.

1. **Client Request:** The user clicks "Generate Quotation".
2. **Immediate Response:** Flask instantly returns a job tracking ID.
3. **Background Worker:** A worker process calculates hardware pricing matrices, formats the document, and uploads it to storage.
4. **Real-time Notify:** WebSockets push the completed download link to the user interface.

This architecture ensures your primary API remains lightning fast, regardless of heavy document processing loads.`
  },
  {
    id: "18",
    title: "The Psychology of Micro-Interactions: Why Small Animations Drive Conversions",
    category: "UI/UX Design",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-08-25",
    tags: ["UI/UX", "Framer Motion", "Design", "Productivity"],
    summary: "Subtle feedback loops—like text scrambling, border glows, and tactile button presses—reassure users and dramatically lower bounce rates.",
    content: `Great interface design isn't about flashy graphics; it's about clear feedback loops. When a user interacts with a digital element, they expect instant tactile confirmation that their action was registered.

### The Physics of Digital Tactility
Using spring physics rather than linear CSS transitions makes digital interfaces feel natural. A linear transition feels synthetic; a spring-loaded button press mimicking momentum feels real.

Micro-interactions serve key psychological purposes:
• **State Confirmation:** A subtle scramble or glow tells the user the system is processing.
• **Spatial Orientation:** Smooth page transitions prevent cognitive disorientation when routing across views.
• **Reward Loops:** Engaging hover animations encourage exploration and keep visitors on page longer.

When implemented with restraint, micro-interactions turn a standard utility website into a memorable digital experience.`
  },
  {
    id: "19",
    title: "Building Real-Time Multi-Tenant E-Commerce Engines in React",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    readTime: "6 min read",
    date: "2025-08-10",
    tags: ["React", "E-Commerce", "Multi-Tenant", "UI/UX"],
    summary: "How to structure scalable product databases, client-side cart states, and seamless checkout integrations for growing retail merchants.",
    content: `E-commerce development is often underestimated. Beyond rendering a list of items, a production-grade store must handle concurrent inventory reservation, complex variant logic, dynamic shipping calculations, and instant search filtering.

### Modular Architecture
When engineering platforms like **Spicera.store**, isolating concerns is essential:
• **Cart Context:** An optimistic, client-side store that persists local items across sessions.
• **Product Indexing:** Fast filtering using Memoized selectors to eliminate UI stutters when searching large catalogs.
• **Payment Gateways:** Secure PCI-compliant Stripe mounts that handle card validation client-side before communicating with the server.

Building with a modular architecture allows merchants to easily scale from a few dozen specialized products to thousands without requiring a complete system rebuild.`
  },
  {
    id: "20",
    title: "Dark Mode Engineering: Managing CSS Variables and Theme Flickers",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
    date: "2025-07-29",
    tags: ["CSS", "React", "Dark Mode", "Performance"],
    summary: "Eliminating the dreaded 'white flash' on page reload and architecting dynamic CSS color tokens for seamless theme customization.",
    content: `Implementing dark mode looks easy on the surface, but doing it correctly without flash-of-unstyled-content (FOUC) or sluggish CSS overrides requires careful planning.

### CSS Custom Properties Over Theme Classes
Instead of hardcoding color hex codes across hundreds of Tailwind or CSS classes, establish dynamic RGB CSS variables:

\`\`\`css
:root {
  --theme-main: #00f0ff;
  --theme-rgb: 0, 240, 255;
}
\`\`\`

By storing both hex and RGB values as custom properties, you can effortlessly apply opacity overlays in Framer Motion spotlights and dynamic borders without writing separate styling logic for every element.

### Preventing Theme Flickers
To stop dark-themed sites from flashing bright white on page load, read local storage preference via a blocking inline script in your \`index.html\` *before* the main React bundle executes.`
  },
  {
    id: "21",
    title: "The Developer's Guide to Automation: Turning Workflows into Products",
    category: "Productivity & SaaS",
    coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-07-14",
    tags: ["Automation", "SaaS", "Productivity", "Notion"],
    summary: "Every internal tool or automation script you write to solve your own problem is a potential commercial digital asset waiting to be packaged.",
    content: `Developers automate things by nature. We write bash scripts to deploy code, build Notion databases to track our tasks, and train AI workflows to speed up branding. 

What many developers overlook is that the broader market actively pays for these exact solutions.

### The Productization Pipeline
1. **Solve Your Own Problem:** Build a custom tracking system or automated workflow for your own daily operations.
2. **Refine and Document:** Abstract the business logic so anyone can use it without technical support.
3. **Package and Distribute:** List the asset on Gumroad, Adobe Stock, or as a template product.

By treating your internal developer scripts and templates as commercial assets, you create digital assets that generate ongoing revenue long after the initial code is written.`
  },
  {
    id: "22",
    title: "From Code to Leadership: Lessons Learned Heading a Youth Organization",
    category: "Leadership & Growth",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
    date: "2025-07-01",
    tags: ["Leadership", "Community", "Soft Skills", "Growth"],
    summary: "How serving as President of a youth association taught me communication, delegation, and project management skills that made me a better Systems Architect.",
    content: `Writing code is clean. Logic either works or it throws an error. Leading people, on the other hand, is complex, subjective, and unpredictable.

Serving as President of a local youth association completely transformed my approach to software engineering.

### Project Management in the Real World
Managing multi-phase community projects taught me how to break massive initiatives into deliverable milestones—a skill that directly translates to planning full-stack software architectures.

### Clear Technical Communication
If you cannot explain complex technical decisions to non-technical stakeholders, clients, or team members, even the most brilliant code will fail to get deployed. Leadership forces you to strip away technical jargon and focus on value, objectives, and practical outcomes.`
  },
  {
    id: "23",
    title: "The Serverless Illusion: Why I Moved Back to Long-Lived Containers",
    category: "Cloud Architecture",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    readTime: "12 min read",
    date: "2025-06-18",
    tags: ["DevOps", "Serverless", "AWS", "Backend", "Docker"],
    summary: "Serverless functions are marketed as the holy grail of infinite scaling. But for complex, data-heavy enterprise applications, they introduce devastating latency, database connection exhaustion, and architectural nightmares.",
    content: `For the past five years, the development industry has been completely obsessed with the "Serverless" paradigm. The promise was intoxicating: deploy your code, let the cloud provider handle the infrastructure, pay only for the exact milliseconds your code executes, and watch your application scale infinitely. 

When I first began architecting scalable web applications, I bought into this hype. I broke monolithic APIs down into dozens of micro-functions deployed via AWS Lambda and Vercel Edge Functions. But as I started building highly complex platforms with intense data-sync requirements—like the real-time tracking engines behind FrostLink Sales—the cracks in the serverless foundation became impossible to ignore.

### The Cold Start Phenomenon
The first major architectural hurdle is the infamous "cold start." When a serverless function is not invoked for a certain period, the cloud provider spins down the container to save resources. When a new request comes in, the provider must provision a new container, load the runtime environment (like Node.js or Python), pull in your dependencies, and execute your code.

In a traditional long-lived server, this environment is always hot. A request hits the server and is processed in 20-50 milliseconds. In a serverless architecture, a cold start can introduce a latency spike of anywhere from 800 milliseconds to over 3 seconds. 

If you are building an e-commerce platform like Spicera.store, a 3-second delay on the checkout API endpoint is a conversion killer. Users are conditioned to expect instantaneous tactile feedback. While you can implement "provisioned concurrency" to keep functions warm, you are essentially paying for a permanent server anyway, entirely defeating the cost-saving purpose of the serverless model.

### Database Connection Exhaustion
This is the silent killer of serverless applications, and it stems from a fundamental misunderstanding of network layer protocols. 

When you write a traditional Python Flask backend or a Node.js Express server, you open a connection pool to your PostgreSQL database. Let's say you allow 20 concurrent connections. The server boots up, establishes the TCP handshakes with the database, and keeps those 20 connections open. When 1,000 users hit your API, the server efficiently multiplexes those 1,000 requests through the 20 open connections.

Serverless completely destroys this paradigm. 

Because serverless functions are ephemeral (short-lived) and isolated, they cannot share a connection pool. If 1,000 users hit your serverless API simultaneously, the cloud provider spins up 1,000 isolated containers. Each container attempts to open a brand new TCP connection to your PostgreSQL database. 

Databases are not designed to handle thousands of rapid-fire connection handshakes. The database CPU spikes to 100% just managing the network overhead, legitimate queries are dropped, and your entire application crashes under the weight of its own infrastructure. 

While tools like PgBouncer or serverless database proxies attempt to mitigate this, they are ultimately band-aids over a fundamentally flawed architectural pairing. You are forcing a stateless computing model to interact with a highly stateful data persistence layer.

### The Network Routing Reality
My background in Cisco networking heavily influences how I view cloud infrastructure. In the physical networking world, establishing a connection requires a three-way TCP handshake (SYN, SYN-ACK, ACK). This physical reality doesn't disappear just because we call it "the cloud."

Every time a serverless function boots up and connects to a managed database, packets are traversing physical routers, switches, and fiber-optic cables. By relying on long-lived Docker containers, we maintain persistent network tunnels. The three-way handshake happens once upon deployment, not ten thousand times an hour. 

### The Hybrid Architecture Approach
I am not entirely anti-serverless. The technology is brilliant for specific, isolated workflows. If you need an event-driven function to resize an image after a user uploads it to an S3 bucket, serverless is the perfect tool.

However, for the core business logic, the primary API gateway, and the heavy database transactions, I have transitioned back to containerized architectures using Docker and Kubernetes. By deploying persistent containers, we maintain total control over our connection pools, eliminate cold starts entirely, and establish a predictable, flat-rate financial model.

As I continue to build out the KWAS (Key Web App Solutions) ecosystem, the architecture relies on a hybrid model: edge-cached static assets and lightweight middleware for immediate user delivery, backed by highly robust, long-lived backend containers for the heavy lifting.`
  },
  {
    id: "24",
    title: "Engineering Data Consistency Across Distributed E-Commerce Systems",
    category: "System Architecture",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    readTime: "11 min read",
    date: "2025-05-22",
    tags: ["E-Commerce", "Databases", "System Design", "Architecture"],
    summary: "When thousands of users attempt to purchase the same inventory simultaneously, simple database queries result in overselling and catastrophic data failure. Here is how to architect true distributed consistency.",
    content: `Building a localized, single-user application is easy. You read data, you mutate it, and you write it back. But when you step into the world of multi-tenant enterprise software or high-traffic digital commerce, that simplistic approach leads to catastrophic data corruption.

When I was designing the backend architecture for high-conversion platforms, the most complex engineering challenge wasn't the UI or the payment gateway—it was managing state and data consistency across distributed systems under load.

### The Fallacy of the Single Source of Truth
In academic computer science, we are taught to maintain a single source of truth—usually a normalized relational database. The theory is that if all microservices query the exact same database table, the data will always be accurate.

In the real world, physics gets in the way. 

Let's look at a practical scenario: a flash sale on an e-commerce platform. You have exactly 5 units of a specific product left in stock. Suddenly, 500 users click the "Checkout" button at the exact same millisecond. 

If your backend is a simple CRUD API, here is what happens:
1. 500 API threads query the database: "How many units are in stock?"
2. The database responds to all 500 threads simultaneously: "There are 5 units left."
3. All 500 threads process the logic: "5 is greater than 1, so proceed with the sale."
4. All 500 threads deduct 1 from the inventory and charge the customers.

You have just sold 500 items when you only had 5 in stock. You now have 495 angry customers who need refunds, and your inventory count is a negative integer. This is known as a Race Condition, and it destroys poorly architected platforms.

### Row-Level Locking and Transactions
To solve this, junior developers often turn to standard database transactions. They wrap the inventory check and the inventory deduction in a single SQL transaction. While this guarantees accuracy, it introduces a severe performance bottleneck.

If you lock the inventory row while a transaction processes, the other 499 requests are forced to wait in a queue. If the payment gateway takes 3 seconds to process the credit card for the first user, the 500th user will have to wait 25 minutes just to get a response from the server. The database connection pool will exhaust, and the server will crash.

### The Saga Pattern and Eventual Consistency
To build a system that is both accurate AND highly performant, we must abandon the idea of immediate, synchronous consistency and embrace Eventual Consistency using the Saga Pattern.

Instead of locking the database while waiting for Stripe to process a credit card, the architecture works like this:
1. When a user clicks checkout, a lightweight, lightning-fast Redis cache handles the inventory reservation. Redis is single-threaded and operates in memory, meaning it can process thousands of atomic decrements per second without race conditions.
2. The system generates an "Order Pending" event and places it into a message queue (like RabbitMQ or Apache Kafka).
3. The API immediately returns a success response to the user's browser, keeping the UI fast and responsive.
4. In the background, worker microservices pick up the event from the queue. They process the Stripe payment and finalize the database write asynchronously.

If the payment fails, a compensating transaction is fired to release the inventory reservation back into the Redis cache.

### Network Partitions and Idempotency
Because we are passing data between mobile applications, backend APIs, payment gateways, and message queues, we have to assume that the network will fail. A packet will drop. A webhook will misfire. 

This requires the implementation of Idempotency Keys. 

When the FrostLink Sales Android app sends a daily sales analytics packet to the backend, it includes a unique UUID generated on the mobile device. If the mobile app loses cell service halfway through the transmission, it doesn't know if the server received the data. When the signal returns, the app sends the exact same packet again.

Because the backend is architected to be idempotent, it checks the UUID. If it has already processed that specific key, it safely ignores the duplicate request without corrupting the sales analytics data. 

Engineering systems at this level requires you to stop trusting your code, stop trusting the network, and design architectures that are inherently resilient to failure.`
  },
  {
    id: "25",
    title: "Advanced Component Architecture: Inversion of Control in React Applications",
    category: "Frontend Engineering",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    readTime: "10 min read",
    date: "2025-04-10",
    tags: ["React", "Architecture", "JavaScript", "Design Patterns"],
    summary: "As React applications scale, standard prop-drilling and context APIs become unmaintainable. Discover how to apply enterprise-grade design patterns like Dependency Injection to modern frontend development.",
    content: `The React ecosystem is brilliant for rapid prototyping, but it gives developers enough rope to hang themselves. Because React is unopinionated about how you structure your code, it is incredibly easy to build a massive, tangled web of components that are impossible to test, maintain, or scale.

When I audit legacy codebases, the most common anti-pattern I see is the tight coupling of UI presentation and business logic. A single React component will fetch data from an API, parse the JSON, handle loading states, manage error boundaries, and render the HTML. 

This violates the Single Responsibility Principle and makes the component entirely untestable in isolation.

### The Pitfalls of Standard Prop Drilling
As applications grow, developers typically handle state by lifting it to a high-level parent component and passing it down through props. When a component is nested five layers deep, you end up passing props through four intermediate components that don't actually care about the data. 

The community's response to this was the Context API and global state managers like Redux. While these solve the prop-drilling issue, they introduce a new problem: your components are now permanently tethered to a global state structure. You cannot pick up a dashboard widget and drop it into another project, because it relies on a highly specific Redux store to function.

### Applying Inversion of Control (IoC)
In strictly typed, object-oriented languages like Java or C#, enterprise developers rely heavily on Inversion of Control and Dependency Injection. We can—and should—adapt these patterns for modern functional React.

Instead of a component importing an API service directly, we inject the service into the component. 

Consider a component designed to display a list of air conditioning units for the Flux Service platform. 

Instead of writing this inside the component:
    import { fetchACUnits } from './api/services';
    const units = fetchACUnits();

We architect the component to accept a data-fetching strategy as a prop or through a highly localized context provider. 

By passing the behavior *into* the component rather than hardcoding it, we decouple the UI from the network layer. This allows us to instantly swap out a live PostgreSQL API call for a mock data service during testing, without altering a single line of the component's internal code.

### The Strategy Pattern in UI Engineering
This architectural concept shines when dealing with complex, multi-tenant systems. 

Imagine building a dynamic data table for the KWAS ecosystem that needs to display different columns depending on whether the user is viewing Sales Analytics or Hardware Inventory.

Instead of writing massive, unreadable \`if/else\` statements inside the JSX renderer, we use the Strategy Pattern. We define discrete "Configuration Objects" outside of the component lifecycle. The React component simply takes in the raw data and the configuration strategy, and maps over the data based on the provided ruleset. 

### Render Optimization
By completely abstracting business logic and data fetching out of the visual components, we drastically reduce unnecessary re-renders. 

When a React component only receives primitive data types (strings, numbers, booleans) and purely deterministic functions, we can safely wrap it in \`React.memo\`. The React reconciliation engine can instantly compare the previous props with the new props, realize nothing has changed on the visual layer, and skip the render cycle entirely.

Frontend development is no longer just "HTML and CSS." It is complex software engineering that requires the exact same structural discipline and design patterns as enterprise backend architecture.`
  }
  
];

// --- 1. INDIVIDUAL BLOG POST PAGE (With SEO & Firebase Tracking) ---
// --- 1. INDIVIDUAL BLOG POST PAGE (With SEO & Firebase Tracking) ---
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = HARDCODED_ARTICLES.find(a => a.id === id);
  
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [isLiked, setIsLiked] = useState(false);
  
  // 👇 ADD THIS MISSING LINE RIGHT HERE 👇
  const hasRecordedView = useRef(false); 

  useEffect(() => {
    if (!article) return;
    


    // 1. INJECT VIRAL SEO METADATA
    document.title = `${article.title} | Shavin Heshan Joseph`;
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta('description', article.summary);
    setMeta('keywords', article.tags.join(', '));
    setMeta('og:title', article.title, true);
    setMeta('og:description', article.summary, true);
    setMeta('og:image', article.coverImage, true);
    setMeta('og:url', window.location.href, true);
    setMeta('og:type', 'article', true);

const docRef = doc(db, 'articleStats', article.id);

  // 2. REAL-TIME FIREBASE LISTENER (Watches for live changes)
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      setStats({ views: docSnap.data().views || 0, likes: docSnap.data().likes || 0 });
    }
  });

// 3. SECURE VIEW COUNTER (Only counts once per session)
  const recordView = async () => {
    if (hasRecordedView.current) return;
    hasRecordedView.current = true;

    try {
      // Try to increment existing document
      await updateDoc(docRef, { views: increment(1) });
    } catch (error) {
      // If document doesn't exist yet, create it safely
      await setDoc(docRef, { views: 1, likes: 0 }, { merge: true });
    }
  };
  
  recordView();

  // Cleanup the listener when user leaves the page
  return () => unsubscribe();
}, [article]);

const handleLike = async () => {
  if (isLiked || !article) return;
  setIsLiked(true); // Instantly update UI for the user
  
  const docRef = doc(db, 'articleStats', article.id);
  try {
    await updateDoc(docRef, { likes: increment(1) });
  } catch (error) {
    await setDoc(docRef, { views: 1, likes: 1 }, { merge: true });
  }
};
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Transmission Link Copied!");
  };

  if (!article) return <div className="min-h-screen flex items-center justify-center text-white">Article Not Found</div>;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-28 pb-32 md:pt-32 md:pb-24 px-5 md:px-8 max-w-[900px] mx-auto overflow-x-hidden"
    >
      <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-[#8a93a6] hover:text-[color:var(--theme-main)] transition-colors mb-8 font-mono text-xs uppercase tracking-widest">
        <FiArrowLeft /> Return to Logs
      </button>

      <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--theme-main)] uppercase tracking-wider mb-5">
        <span className="px-3 py-1 rounded-full bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/30">{article.category}</span>
        <span className="text-[#5b6472]">{article.date}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">{article.title}</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 mb-10">
        <div className="flex items-center gap-6 font-mono text-xs text-[#8a93a6] uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><FiClock /> {article.readTime}</span>
          <span className="flex items-center gap-1.5"><FiEye /> {stats.views} Reads</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#8a93a6] hover:text-white transition-colors">
            <FiShare2 />
          </button>
          <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs font-bold transition-colors ${isLiked ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'}`}>
            <FiHeart className={isLiked ? "fill-rose-400" : ""} /> {stats.likes}
          </button>
        </div>
      </div>

      {article.coverImage && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-invert prose-headings:text-white prose-a:text-[color:var(--theme-main)] max-w-none text-[#c5cbd3] text-lg leading-relaxed whitespace-pre-line font-sans mb-16">
        {article.content}
      </div>

      <div className="flex flex-wrap gap-2 mb-10 pt-8 border-t border-white/10">
        {article.tags.map((tag, i) => (
          <span key={i} className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#8a93a6]">#{tag}</span>
        ))}
      </div>
    </motion.article>
  );
};



// --- 2. MAIN BLOG LIST PAGE (Intelligent Layout & Cover Flow) ---
const BlogHome = () => {
  const [stats, setStats] = useState({});
  
  // Slider Controls
  const sliderRef = useRef(null);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title = "Engineering Logs | Shavin Heshan Joseph";
    
    // REAL-TIME LISTENER FOR ALL BLOGS
  const unsubscribe = onSnapshot(collection(db, "articleStats"), (snapshot) => {
    const statsData = {};
    snapshot.forEach((doc) => {
      statsData[doc.id] = doc.data();
    });
    setStats(statsData);
  });

  // Cleanup listener on unmount
  return () => unsubscribe();
}, []);

  const intelligentArticles = HARDCODED_ARTICLES.map(article => ({
    ...article,
    views: stats[article.id]?.views || 0,
    likes: stats[article.id]?.likes || 0
  }));

  const latestArticles = [...intelligentArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
  const trendingArticles = [...intelligentArticles].sort((a, b) => (b.views + b.likes * 2) - (a.views + a.likes * 2)).slice(0, 5); // Increased to 5 so the slider has more items to show

  // --- SCROLL TRACKING MATH (Finds the exact center card) ---
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    
    // Calculate the exact pixel center of the visible scrolling area
    const scrollCenter = slider.scrollLeft + slider.clientWidth / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    Array.from(slider.children).forEach((child, index) => {
      // Find the center of each individual card
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      const distance = Math.abs(scrollCenter - childCenter);
      
      // The card with the shortest distance to the center becomes active
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    setActiveIndex(closestIndex);
  };

  // Run scroll check once on load to center the first item
  useEffect(() => {
    handleScroll();
  }, [trendingArticles.length]);

  // --- INTELLIGENT AUTO-SCROLL TIMER ---
  useEffect(() => {
    if (isSliderHovered || trendingArticles.length === 0) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        // Calculate the next card, looping back to 0 if at the end
        const nextIndex = (activeIndex + 1) % trendingArticles.length;
        const targetChild = sliderRef.current.children[nextIndex];
        
        if (targetChild) {
          // Scroll the container so the target child is perfectly centered
          const scrollPos = targetChild.offsetLeft - (sliderRef.current.clientWidth / 2) + (targetChild.offsetWidth / 2);
          sliderRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSliderHovered, activeIndex, trendingArticles.length]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="relative z-10 w-full min-h-screen pt-28 pb-32 md:pt-32 md:pb-24 overflow-x-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="mb-10">
          <div className="font-mono text-sm tracking-[0.06em] text-[color:var(--theme-main)] mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--theme-main)]" /> <span className="uppercase tracking-widest">Knowledge Base Archive</span>
          </div>
          <h1 className="font-bold text-[clamp(36px,8vw,80px)] leading-[0.9] tracking-tight uppercase text-white">
            Engineering <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>Logs.</span>
          </h1>
        </div>
      </div>

      {/* --- NETFLIX-STYLE TRENDING MARQUEE (CENTER FOCUSED) --- */}
      <div className="w-full mb-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 mb-2 flex items-center gap-3 font-mono text-xs text-white uppercase tracking-widest">
          <FiTrendingUp className="text-rose-500" size={16} /> Trending Transmissions
        </div>
        
        {/* Scroll Container with heavy padding to allow first/last items to reach the center */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
          onTouchStart={() => setIsSliderHovered(true)}
          onTouchEnd={() => setIsSliderHovered(false)}
          className="relative flex items-center overflow-x-auto gap-4 md:gap-8 px-[15vw] md:px-[35vw] py-12 snap-x snap-mandatory hide-scrollbar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingArticles.map((article, index) => (
            <motion.div
              key={`trending-${article.id}`}
              // The magic happens here: If it is the active center index, scale to 1. Otherwise shrink to 0.8
              animate={{ 
                scale: activeIndex === index ? 1 : 0.8,
                opacity: activeIndex === index ? 1 : 0.4
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              // Cards are now much smaller (w-[240px] and w-[340px])
              className="w-[240px] md:w-[340px] flex-shrink-0 snap-center"
            >
              <Link to={`/blog/${article.id}`} className="block w-full group">
                <div 
                  className={`relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 border transition-colors duration-500 shadow-2xl ${activeIndex === index ? 'border-[color:var(--theme-main)]/50' : 'border-white/10'}`}
                >
                  <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-mono text-[10px] text-[color:var(--theme-main)] uppercase tracking-wider mb-2">{article.category}</div>
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight line-clamp-2">{article.title}</h3>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md font-mono text-[10px] text-white">
                    <FiEye className="text-[color:var(--theme-main)]" /> {article.views}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LATEST ARTICLES GRID */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="mb-8 flex items-center gap-3 font-mono text-xs text-white uppercase tracking-widest border-b border-white/10 pb-4">
          <FiClock className="text-[color:var(--theme-main)]" size={16} /> Chronological Release
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestArticles.map((article) => (
            <Link key={article.id} to={`/blog/${article.id}`}>
              <motion.div whileHover={{ y: -5 }} className="flex flex-col bg-[#12151b]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[color:var(--theme-main)]/50 transition-all duration-300 h-full">
                <div className="w-full h-48 overflow-hidden bg-[#0a0c10] relative">
                  <img src={article.coverImage} className="w-full h-full object-cover opacity-80" alt={article.title} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#5b6472] uppercase tracking-widest mb-3">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1"><FiHeart className="text-rose-500" /> {article.likes}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-[#8a93a6] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{article.summary}</p>
                  <div className="pt-4 border-t border-white/5 font-mono text-xs text-[color:var(--theme-main)] font-semibold flex items-center gap-2">
                    Read Transmission <FiBookOpen size={13} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

    </motion.main>
  );
};

// --- 3. MASTER ROUTER COMPONENT ---
// This handles deciding whether to show the Blog List or a Specific Article
const Blog = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogHome />} />
      <Route path="/:id" element={<BlogPost />} />
    </Routes>
  );
};

export default Blog;