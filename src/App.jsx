import { useState, useEffect } from "react";
import { ThemeProvider } from './utils/ThemeContext';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Shorter loading time for better user experience
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        // Custom cursor
        const moveCursor = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveCursor);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <div className="app-container">
                    {/* Custom Cursor */}
                    <div className="cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
                    <div className="cursor-follower" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />

                    <Navbar />
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                    <Footer />
                    <ScrollToTop />
                </div>
            </ThemeProvider>
        </ErrorBoundary>
    );
}