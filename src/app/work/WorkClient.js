"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // CHANGE 1: Import the Next.js Image component
import { pageVariants, pageTransition } from '../../animations';
import { projects } from '../../projectData';

const WorkClient = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div className="container work-container">
        <h1 className="page-title">My Work</h1>
        <p className="page-subtitle">A curated selection of projects that showcase my skills and passion.</p>
        <div className="work-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* CHANGE 2: Replaced <img> with the optimized <Image> component */}
              <Image 
                src={project.image} // Assuming project.image is a path like '/images/project.jpg'
                alt={project.title} 
                className="project-image" 
                // Set width and height to match your project image aspect ratio
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkClient;