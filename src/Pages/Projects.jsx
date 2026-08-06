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
    <section className="pt-10" id="projects" ref={projectsRef}>
      <div className="text-center mb-12">
        <div className="inline-block pill mb-4">💻 Featured Work</div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Projects That <span className="accent">Define</span> My Journey
        </h2>

        <p className="text-xl text-muted max-w-2xl mx-auto">
          From web apps to thoughtful interfaces, each project highlights a problem I enjoyed solving.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-medium ${filter === category ? 'pill' : 'glass-soft'}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'All Projects' : category === 'web' ? 'Web Apps' : 'Mobile Apps'}
          </button>
        ))}
      </div>

      <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            className="glass-soft flex flex-col h-full group rounded-md overflow-hidden"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
              {project.src ? (
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-4xl">👾</div>
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 pill" aria-label="View live demo">
                    <FaExternalLinkAlt />
                  </a>
                )}

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 glass-soft" aria-label="View source code">
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                <span className={`text-xs px-2 py-1 ${project.demo ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded`}>{project.demo ? 'Live' : 'Dev'}</span>
              </div>

              <p className="text-muted text-base leading-relaxed mb-6 flex-1">{project.desc}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {getTechStack(project.tech).map((tech) => (
                  <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-muted">{tech}</span>
                ))}
              </div>

              <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 pill text-center">View Project</a>
                )}

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 glass-soft text-center">Source Code</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-soft p-8 text-center mt-16 rounded-md">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Have a project in mind?</h3>
          <p className="text-lg text-muted mb-8">I'm always excited to work on new challenges and bring innovative ideas to life.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="pill" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Start a Project</button>

          <a href="https://github.com/therajatdua" target="_blank" rel="noopener noreferrer" className="pill">View All on GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
