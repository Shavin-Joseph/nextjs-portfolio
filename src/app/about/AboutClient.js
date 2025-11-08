"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // CHANGE 1: Import the Next.js Image component
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiJavascript, SiPython, SiTypescript } from 'react-icons/si';
import { pageVariants, pageTransition } from '../../animations';

import myProfilePic from '@/assets/shavin-joseph-web-developer.png';

const AboutClient = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      {/* CHANGE 2: Removed redundant <title>, <meta>, and <link> tags. The metadata object handles these. */}
      <div className="container about-container">
        <h1 className="page-title">About Me</h1>
        
        <div className="about-intro">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2>I build bridges between creative ideas and technical reality.</h2>
            <p>
              I am a passionate and detail oriented university student with a deep fascination for the digital world. My journey started with a simple question: "How does this work?". This curiosity has since blossomed into a career path dedicated to not just understanding technology, but shaping it. I thrive on solving complex problems, whether it involves architecting a performant backend or designing a user interface that feels both natural and delightful.
            </p>
            <p>
              My dual focus on development and design allows me to approach projects holistically, ensuring that the final product is not only technically sound but also aesthetically pleasing and strategically effective.
            </p>
          </motion.div>
          
          <motion.div 
            className="about-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {/* CHANGE 3: Replaced <img> with the optimized <Image> component */}
            <Image 
              src={myProfilePic} 
              alt="Shavin Joseph, a professional React web developer and UI/UX designer."
              className="about-image" 
              priority 
              placeholder="blur"
              // Set width and height to match your image's aspect ratio
              width={400} 
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        <div className="tech-stack-section">
          <h2 className="section-title">My Digital Toolkit</h2>
          <p className="section-subtitle">The primary technologies and tools I use to bring ideas to life.</p>
          <div className="tech-grid">
            <motion.div className="tech-card" whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 198, 255, 0.2)' }}><FaReact /><span>React</span></motion.div>
            <motion.div className="tech-card" whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 198, 255, 0.2)' }}><SiJavascript /><span>JavaScript</span></motion.div>
            <motion.div className="tech-card" whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 198, 255, 0.2)' }}><SiPython /><span>Python</span></motion.div>
            <motion.div className="tech-card" whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 198, 255, 0.2)' }}><FaNodeJs /><span>Node.js</span></motion.div>
            <motion.div className="tech-card" whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 198, 255, 0.2)' }}><FaFigma /><span>Figma</span></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutClient;