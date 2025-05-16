import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Ayush Gupta</h3>
          <p>Full Stack Developer</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://github.com/ayushgupta703" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ayush-gupta-b077ba256" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/ag6691602" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          © {currentYear} Ayush Gupta. All rights reserved. Made with <Heart size={14} className="heart-icon" /> in India
        </p>
      </div>
    </footer>
  );
} 