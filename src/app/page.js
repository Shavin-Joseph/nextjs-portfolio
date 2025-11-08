// src/app/page.js

"use client"; // REQUIRED for homepage animations

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaCode, FaPaintBrush, FaPalette } from 'react-icons/fa';

// THIS IS THE CORRECT CODE FOR YOUR HOMEPAGE
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="hero-title">
              <span className="hero-intro-text">I Build & Design</span>
              <TypeAnimation
                sequence={[
                  'Elegant Code.', 2000,
                  'Intuitive UI/UX.', 2000,
                  'Digital Solutions.', 2000,
                ]}
                wrapper="span"
                speed={50}
                className="hero-dynamic-text"
                repeat={Infinity}
              />
            </h1>
          </motion.div>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Hi, I'm Shavin Joseph. I specialize in bridging the gap between ambitious ideas and their digital execution, delivering software that is as elegant as it is effective.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container services-section">
        <h2 className="section-title">What I Bring to the Table</h2>
        <div className="services-grid">
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}}>
            <FaCode className="service-icon" />
            <h3>Development</h3>
            <p>Building scalable and robust web applications with clean code and modern architecture.</p>
          </motion.div>
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.2}}>
            <FaPaintBrush className="service-icon" />
            <h3>UI/UX Design</h3>
            <p>Designing user-centric interfaces that are not only beautiful but also intuitive and accessible.</p>
          </motion.div>
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.4}}>
            <FaPalette className="service-icon" />
            <h3>Graphic Design</h3>
            <p>Creating compelling visuals, from posters to social media graphics, that tell a story.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}