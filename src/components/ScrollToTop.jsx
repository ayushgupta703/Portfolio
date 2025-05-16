import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showScroll && (
        <button 
          className="scroll-top-btn" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
} 