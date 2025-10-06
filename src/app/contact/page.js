"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../animations';
import { FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';


export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Shavin Joseph to discuss your next project, collaboration, or job opportunity.',
};
const Contact = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div className="container contact-container">
        <h1 className="page-title">Let's Create Together</h1>
        <p className="page-subtitle">Have a project idea, a job opportunity, or just want to connect? My inbox is always open.</p>
        
        <div className="contact-options">
          <motion.a href="mailto:josephshavin3@gmail.com" className="contact-card" whileHover={{ y: -5 }}>
            <FaEnvelope />
            <h3>Email Me</h3>
            <p>josephshavin3@gmail.com</p>
          </motion.a>
          <motion.a href="#" className="contact-card" whileHover={{ y: -5 }}>
            <FaLinkedin />
            <h3>LinkedIn</h3>
            <p>Connect with me</p>
          </motion.a>
          <motion.a href="#" className="contact-card" whileHover={{ y: -5 }}>
            <FaGithub />
            <h3>GitHub</h3>
            <p>See my code</p>
          </motion.a>
         

          <motion.a href="https://www.facebook.com/share/17NaFhzwu4/" className="contact-card" whileHover={{ y: -5 }}>
            <FaFacebook />
            <h3>Facebook</h3>
            <p>See my Profile</p>
          </motion.a>

          <motion.a href="https://www.instagram.com/shavinheshan?igsh=MXJlMnU3d2luZXVycg==" className="contact-card" whileHover={{ y: -5 }}>
            <FaInstagram />
            <h3>Instagram</h3>
            <p>See my Profile</p>
          </motion.a>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;