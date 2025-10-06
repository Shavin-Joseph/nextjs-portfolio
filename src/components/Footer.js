import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-container">
      <div className="footer-about">
        <h4>Shavin Joseph</h4>
        <p>A digital architect building the future, one line of code at a time.</p>
      </div>
      <div className="footer-socials">
        <a href="#"><FaGithub /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Shavin Joseph. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;