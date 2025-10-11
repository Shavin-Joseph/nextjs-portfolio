"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <nav className="navbar container">
        <Link href="/" className="nav-logo" onClick={closeMobileMenu}>
          Shavin Joseph
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <Link href="/" className="nav-item">Home</Link>
          <Link href="/about" className="nav-item">About</Link>
          <Link href="/work" className="nav-item">Work</Link>
          <Link href="/downloads" className="nav-item">Downloads</Link> {/* ADD THIS LINE */}
          <Link href="/contact" className="nav-item-button">Let's Talk</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="nav-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu Overlay */}
        <div className={isMobileMenuOpen ? "nav-menu-mobile active" : "nav-menu-mobile"}>
          <Link href="/" className="nav-item-mobile" onClick={closeMobileMenu}>Home</Link>
          <Link href="/about" className="nav-item-mobile" onClick={closeMobileMenu}>About</Link>
          <Link href="/work" className="nav-item-mobile" onClick={closeMobileMenu}>Work</Link>
           <Link href="/downloads" className="nav-item-mobile" onClick={closeMobileMenu}>Downloads</Link> {/* ADD THIS LINE */}
          <Link href="/contact" className="nav-item-mobile-button" onClick={closeMobileMenu}>Let's Talk</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
