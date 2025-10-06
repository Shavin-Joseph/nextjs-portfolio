"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../animations';
import { projects } from '../../projectData';


const Work = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <title>My Work | Shavin Joseph</title>
      <meta name="description" content="A curated selection of web development, software, and design projects by Shavin Joseph." />
      <link rel="canonical" href="https://www.shavinjoseph.me/work" />
      {/* ------------------------------------ */}
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
              <img src={project.image} alt={project.title} className="project-image" />
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

export default Work;