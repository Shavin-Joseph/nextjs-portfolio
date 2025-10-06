"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../animations';
import { templates } from '../../templatesData'; // Import your templates


export const metadata = {
  title: 'Website Templates',
  description: 'Discover professionally designed, developer-ready website templates for businesses, creatives, and agencies, created by Shavin Joseph.',
};
const Templates = () => {
  return (

    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <title>Professional Website Templates | Shavin Joseph</title>
      <meta name="description" content="Discover professionally designed, developer-ready website templates for businesses, creatives, and agencies. Built with modern tools like Next.js and HTML/CSS." />
      <link rel="canonical" href="https://shavinjoseph.me/templates" />
      {/* --------------------------- */}
      <div className="container templates-container">
        <h1 className="page-title">Digital Templates</h1>
        <p className="page-subtitle">
          A collection of professionally designed, developer ready templates to help you launch your next project faster.
        </p>
        <div className="templates-intro-text">
          <p>
            Every template is built with a focus on clean code, modern design principles, and ease of customization. Whether you need a sophisticated Next.js portfolio or a fast, lightweight HTML/CSS template for your business, you'll find a production ready solution here. Save hundreds of hours of development time and launch a beautiful website today.
          </p>
        </div>
        <div className="templates-grid">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="template-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={template.image}
                alt={`${template.title} - ${template.description.substring(0, 50)}...`} // Example of a dynamic, descriptive alt tag
                className="template-image"
              />
              <div className="template-info">
                <h3>{template.title}</h3>
                <p>{template.description}</p>
                <div className="template-tags">
                  {template.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div className="template-buttons">
                  <a href={template.demoLink} target="_blank" rel="noopener noreferrer" className="demo-button">
                    View Demo
                  </a>
                  <a href={template.gumroadLink} target="_blank" rel="noopener noreferrer" className="buy-button">
                    Buy Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Templates;