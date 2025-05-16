import { useState, useRef, useEffect } from 'react';
import { projectsData } from '../utils/data';
import { ExternalLink, Github, Search } from 'lucide-react';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const projectsRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});

  // Filter projects based on search term
  const filteredProjects = projectsData.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle image loading errors
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  useEffect(() => {
    // Shorter loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  // Set first project as active by default
  useEffect(() => {
    if (filteredProjects.length > 0 && !activeProject) {
      setActiveProject(filteredProjects[0].id);
    }
  }, [filteredProjects, activeProject]);

  const getActiveProject = () => {
    return filteredProjects.find(project => project.id === activeProject) || null;
  };

  const renderProjectImage = (project) => {
    if (imageErrors[project.id]) {
      return (
        <div className="project-thumbnail" style={{
          backgroundColor: getProjectColor(project.id),
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '1.2rem',
          textAlign: 'center',
          padding: '1rem'
        }}>
          {project.title}
        </div>
      );
    }
    
    return (
      <img 
        src={project.image} 
        alt={project.title}
        onError={() => handleImageError(project.id)}
      />
    );
  };

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <h2 className="section-title">My Projects</h2>
      
      <div className="search-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {filteredProjects.length > 0 ? (
            <div className="projects-showcase">
              <div className="projects-list">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`project-item ${activeProject === project.id ? 'active' : ''}`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <div className="project-selector">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-tags-mini">
                        {project.tags.slice(0, 1).map((tag, index) => (
                          <span key={index} className="tag-mini">{tag.split(':')[0]}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {getActiveProject() && (
                <div className="project-details animate-on-scroll visible">
                  <div className="project-preview">
                    {renderProjectImage(getActiveProject())}
                  </div>
                  <div className="project-info">
                    <h2>{getActiveProject().title}</h2>
                    <p className="project-description">{getActiveProject().description}</p>
                    
                    <div className="project-tech">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {getActiveProject().tags.map((tag, index) => (
                          <span key={index} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-actions">
                      {getActiveProject().githubLink && (
                        <a href={getActiveProject().githubLink} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                          <Github size={18} /> View Code
                        </a>
                      )}
                      {getActiveProject().liveLink && (
                        <a href={getActiveProject().liveLink} target="_blank" rel="noopener noreferrer" className="project-btn demo-btn">
                          <ExternalLink size={18} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-results">
              <p>No projects match your search criteria.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Function to generate colors based on project ID for better visuals
function getProjectColor(id) {
  const colors = [
    '#4361ee', // Primary color
    '#3a0ca3', // Secondary color
    '#7209b7', // Purple
    '#f72585', // Pink
  ];
  
  return colors[(id - 1) % colors.length];
} 