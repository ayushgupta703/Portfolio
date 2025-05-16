import { useRef, useEffect } from 'react';
import { skills } from '../utils/data';

export default function About() {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about visible" ref={aboutRef}>
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a passionate and detail-oriented full stack developer who loves building interactive, responsive, and user-friendly web applications. With a strong foundation in HTML, CSS, JavaScript, and modern frameworks like React, I strive to create digital experiences that not only function smoothly but also look great.
          </p>
          <p>
            My development journey began with curiosity and evolved into a commitment to solving real-world problems through technology. I enjoy exploring new tools and frameworks, optimizing performance, and delivering clean, maintainable code.
          </p>
        </div>
        <div className="skills-container">
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-tag" key={index}>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 