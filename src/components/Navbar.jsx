import { useState, useEffect } from 'react';
import { useTheme } from '../utils/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">Ayush Gupta</div>
      
      <div className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>
      
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        <li>
          <a href="https://drive.google.com/uc?export=download&id=1Oio3pL9zAL3F2OAiAW-trIh6wAskxlnE" download className="resume-link" onClick={closeMenu}>
            Resume
          </a>
        </li>
        <li className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </li>
      </ul>
    </nav>
  );
} 