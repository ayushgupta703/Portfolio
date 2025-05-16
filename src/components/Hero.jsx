import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';

export default function Hero() {
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Lifelong Learner'
  ];

  // Animation for the hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const text = textArray[currentTextIndex];
    
    const type = () => {
      if (isDeleting) {
        // Deleting text
        setTypedText(text.substring(0, typedText.length - 1));
        setTypingSpeed(60);
        
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % textArray.length);
          setTypingSpeed(150);
        }
      } else {
        // Typing text
        setTypedText(text.substring(0, typedText.length + 1));
        
        if (typedText === text) {
          // Pause at the end of typing
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      }
    };
    
    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentTextIndex, isDeleting, textArray, typingSpeed]);

  // Smooth scroll function
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="hero">
      <div className="particle-background"></div>
      
      <div ref={heroRef} className="hero-content animate-on-scroll visible fade-in-up">
        <h1>Hello, I'm <span className="highlight">Ayush Gupta</span></h1>
        <p className="tagline">
          <span className="typing-text">{typedText}</span>
          <span className="cursor-blink">|</span>
        </p>
        
        <div className="social-links">
          <a href="https://github.com/ayushgupta703" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ayush-gupta-b077ba256" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/ag6691602" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
            <FaTwitter />
          </a>
        </div>
        
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </div>
      </div>
      
      <div className="hero-image">
        <img src="./profile-image.jpg" alt="Ayush Gupta" className="profile-image" />
      </div>
      
      <div className="scroll-indicator" onClick={scrollToAbout}>
        <HiChevronDown className="scroll-arrow" />
        <span>Scroll Down</span>
      </div>
    </header>
  );
} 