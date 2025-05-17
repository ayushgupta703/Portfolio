import { useState, useRef, useEffect } from 'react';
import { submitContactForm } from '../utils/formHandler';
import { Send, Loader, Mail, MapPin, Github, Linkedin, Twitter, Clock, Calendar, Target } from 'lucide-react';
import { availabilityStatus } from '../utils/data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
    preferredContact: 'email'
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
        setFormData({ name: '', email: '', message: '', subject: '', preferredContact: 'email' });
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
          
          <div className="availability-status">
            <div className="status-badge">
              <span className="status-dot"></span>
              {availabilityStatus.status}
            </div>
            <p className="status-description">{availabilityStatus.description}</p>
          </div>
          
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
                <p>{availabilityStatus.responseTime}</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <Target size={20} />
              </div>
              <div className="contact-details">
                <h4>Current Focus</h4>
                <p>{availabilityStatus.currentFocus}</p>
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
          <h3>Send Me a Message</h3>
          <p className="form-intro">Have a project in mind or want to discuss opportunities? Fill out the form below and I'll get back to you as soon as possible.</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
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
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="What's this about?"
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
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredContact">Preferred Contact Method</label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="email">Email</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
              </select>
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