import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        const increment = progress < 80 ? 3 : 2;
        setProgress(prevProgress => Math.min(prevProgress + increment, 100));
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  return (
    <div className={`loading-screen ${progress === 100 ? 'complete' : ''}`}>
      <div className="loading-content">
        <h2>Ayush Gupta</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">{progress}%</p>
      </div>
    </div>
  );
} 