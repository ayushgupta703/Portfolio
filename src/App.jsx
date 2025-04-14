import React, { useState, useEffect } from "react";
import './App.css';

const projectsData = [
    { id: 1, title: "GourmetFusion Website", description: "React-based modern restaurant web app.", tags: ["Frontend: HTML, CSS, JavaScript, React", "Authentication: Clerk", "Form Handling (planned): Google Sheets"] },
    { id: 2, title: "🤖 GLA Chatbot Using LLM", description: "AI-powered chatbot built with LLM to assist students and faculty.", tags: ["Python", "Gemini API (LLM)", "BeautifulSoup", "Command-line Interface"] },
    { id: 3, title: "🤖 AI Chatbot Assistant", description: "A real-time conversational assistant built with Streamlit and Google’s Generative AI for natural, interactive user experiences.", tags: ["Frontend: Streamlit", "Backend/Logic: Python", "AI/ML: Google Generative AI API", "Prompt Engineering: LangChain"] },
    { id: 2, title: "Real-Time Weather Dashboard", description: "Full-stack weather monitoring application with live data visualization and dynamic UI.", tags: ["Frontend: React, CSS3, Axios", "Backend: Node.js, Express", "API Integration: OpenWeatherMap", "UI Features: Dark Mode, Responsive Design", "State Management: React Hooks","Error Handling & Loading States"]}
];

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showScroll, setShowScroll] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        // Intersection Observer for animations
        const elements = document.querySelectorAll(".animate-on-scroll");
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
        elements.forEach((el) => observer.observe(el));

        // Cursor movement
        const moveCursor = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveCursor);

        // Scroll to top button
        const checkScroll = () => {
            setShowScroll(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', checkScroll);

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    const filteredProjects = projectsData.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log("Form submitted:", formData);
        alert("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="app-container">
            {/* Custom Cursor */}
            <div className="cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
            <div className="cursor-follower" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />

            <nav className="navbar">
                <div className="logo">Ayush Gupta</div>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="/Ayush Gupta Resume GLA.docx" download className="resume-link">Resume</a></li>
                </ul>
            </nav>

            <header id="hero" className="hero">
                <div className="hero-content animate-on-scroll fade-in-up">
                    <h1>Hello, I'm Ayush Gupta</h1>
                    <p>Full Stack Developer</p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn-primary">View My Work</a>
                        <a href="#contact" className="btn-secondary">Contact Me</a>
                    </div>
                </div>
            </header>

            <section id="about" className="about animate-on-scroll">
                <h2>About Me</h2>
                <div className="about-content">
                    <p>
                        I'm a passionate and detail-oriented full stack developer who loves building interactive, responsive, and user-friendly web applications. With a strong foundation in HTML, CSS, JavaScript, and modern frameworks like React, I strive to create digital experiences that not only function smoothly but also look great.
                    </p>
                    <p>
                        My development journey began with curiosity and evolved into a commitment to solving real-world problems through technology. I enjoy exploring new tools and frameworks, optimizing performance, and delivering clean, maintainable code.
                    </p>
                    <div className="skills">
                        <h3>Technical Skills</h3>
                        <div className="skills-grid">
                            <span>JavaScript</span>
                            <span>React</span>
                            <span>Node.js</span>
                            <span>HTML5</span>
                            <span>CSS3</span>
                            <span>Python</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="projects animate-on-scroll">
                <h2>Projects</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search projects or technologies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="project-list">
                    {filteredProjects.map(project => (
                        <div className="project-card animate-on-scroll" key={project.id}>
                            <div className="project-card-inner">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" className="contact animate-on-scroll">
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit}>
                    <div className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
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
                            />
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </div>
                </form>
            </section>

            <footer>
                <div className="social-links">
                    <a href="https://github.com/ayushgupta703" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/ayush-gupta-b077ba256" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://x.com/ag6691602" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Ayush Gupta. All rights reserved.</p>
            </footer>

            {showScroll && (
                <button
                    className="scroll-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </div>
    );
}