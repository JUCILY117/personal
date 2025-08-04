import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../common/ProfilePicture';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Name or Logo */}
        <Link to="/">
        <ProfilePicture size={64}/>
        </Link>
        {/* Desktop Links */}
        <div className="hidden text-xl md:flex space-x-8 text-teal-400 font-semibold">
          <Link to="about" className="hover:underline">About</Link>
          <Link to="projects" className="hover:underline">Projects</Link>
          <Link to="skills" className="hover:underline">Skills</Link>
          <Link to="contact" className="hover:underline">Contact</Link>
        </div>
        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg py-4 space-y-3 text-center text-teal-400 font-semibold">
          <a href="#about" className="block hover:underline" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" className="block hover:underline" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills" className="block hover:underline" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" className="block hover:underline" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
