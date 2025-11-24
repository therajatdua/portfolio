import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);

  const categories = ['all', 'web', 'mobile'];
  
  // Adapt existing data to include categories if missing
  const projectsWithCategories = projects.map(project => ({
    ...project,
    category: project.title.toLowerCase().includes('app') ? 'mobile' : 'web', // Simple heuristic
    src: project.src || null // Ensure src exists
  }));

  const filteredProjects = filter === 'all' 
    ? projectsWithCategories
    : projectsWithCategories.filter(project => project.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTechStack = (techString) => {
    return techString ? techString.split(', ') : [];
  };

  return (
    <section className="pt-10" id="projects-section" ref={projectsRef}>
      <div className="text-center mb-12">
        <div className="inline-block bg-retroAccent text-white px-3 py-1 font-press text-xs mb-4">
          <span>💻</span> Featured Work
        </div>
        
        <h2 className="text-3xl md:text-4xl font-press text-retroText mb-4">
          Projects That <span className="text-retroAccent">Define</span> My Journey
        </h2>
        
        <p className="text-xl font-sans text-retroText max-w-2xl mx-auto">
          From innovative web applications to complex systems, 
          each project represents a unique challenge and learning experience.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`pixel-button ${filter === category ? 'bg-retroAccent text-white' : 'bg-white dark:bg-retroSecondary/20 hover:dark:bg-retroSecondary/40'}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'All Projects' : 
             category === 'web' ? 'Web Apps' : 'Mobile Apps'}
          </button>
        ))}
      </div>

      <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
        {filteredProjects.map((project, index) => (
          <div 
            key={project.title}
            className="liquid-glass flex flex-col h-full group hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="h-48 bg-retroSecondary/20 relative overflow-hidden border-b-4 border-retroText group">
              {project.src ? (
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-retroText/40 text-4xl">
                  👾
                </div>
              )}
              
              <div className="absolute inset-0 bg-retroText/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-retroAccent text-white pixel-border hover:scale-110 transition-transform"
                    aria-label="View live demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
                
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-retroText pixel-border hover:scale-110 transition-transform"
                    aria-label="View source code"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-press text-retroText group-hover:text-retroAccent transition-colors">{project.title}</h3>
                <span className={`text-xs font-press px-2 py-1 ${project.demo ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} border-2 border-retroText`}>
                  {project.demo ? 'Live' : 'Dev'}
                </span>
              </div>
              
              <p className="text-retroText font-sans text-lg leading-relaxed mb-6 flex-1">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {getTechStack(project.tech).map((tech) => (
                  <span key={tech} className="text-xs font-press bg-retroSecondary/20 px-2 py-1 text-retroText border-2 border-transparent hover:border-retroText transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-6 pt-4 border-t-4 border-retroAccent">
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 pixel-button text-xs flex items-center justify-center bg-retroAccent text-white hover:bg-retroAccent/90"
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                )}
                
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 pixel-button text-xs flex items-center justify-center"
                  >
                    Source Code <FaGithub className="ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="liquid-glass p-8 text-center mt-16">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-press text-retroText mb-4">Have a project in mind?</h3>
          <p className="text-lg font-sans text-retroText mb-8">
            I'm always excited to work on new challenges and bring innovative ideas to life.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            className="pixel-button bg-retroCta text-white hover:bg-retroCta/90"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Project
          </button>
          
          <a 
            href="https://github.com/therajatdua"
            target="_blank" 
            rel="noopener noreferrer" 
            className="pixel-button"
          >
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
