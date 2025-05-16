import { useState, useRef, useEffect } from 'react';
import { submitContactForm } from '../utils/formHandler';
import { Send, Loader, Mail, MapPin, Github, Linkedin, Twitter, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <h2 className="section-title">Contact Me</h2>
      
      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Build Something Amazing Together</h3>
          <p>I'm currently available for freelance work, full-time positions, and collaborative projects. Whether you have a question, proposal, or just want to say hello, I'd love to hear from you!</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <a href="mailto:ag6991602@gmail.com" className="contact-link">ag6991602@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>Mathura, Uttar Pradesh, India</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <Clock size={20} />
              </div>
              <div className="contact-details">
                <h4>Response Time</h4>
                <p>Usually within 24-48 hours</p>
              </div>
            </div>
          </div>
          
          <div className="social-section">
            <h4>Connect With Me</h4>
            <div className="social-icons">
              <a 
                href="https://github.com/ayushgupta703" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="GitHub Profile"
              >
                <Github size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ayush-gupta-b077ba256" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="https://x.com/ag6691602" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Twitter Profile"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows="5"
              />
            </div>
            
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="spinner-icon" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 