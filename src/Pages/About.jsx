import React, { useEffect, useRef, useState } from 'react';
import aboutImg from '../img/about-me.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  const skills = [
    { name: 'React', level: 60, color: '#61DAFB' },
    { name: 'Node.js', level: 55, color: '#68A063' },
    { name: 'JavaScript', level: 75, color: '#F7DF1E' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'Firebase', level: 75, color: '#FFCA28' }
  ];

  const achievements = [
    {
      icon: '💻',
      title: '2+ Projects',
      description: 'Full-stack web applications'
    },
    {
      icon: '🏆',
      title: '1+ Years',
      description: 'Development experience'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-20 pb-16" id="about" ref={aboutRef}>
      <div className="site-max mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000`}>
            <div className="relative z-10">
              <div className="glass-soft p-2 md:p-4 rounded-lg overflow-hidden">
                <img 
                  src={aboutImg} 
                  alt="Rajat Dua - About Me"
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-md"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className={`space-y-8 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-300`}>
            <div>
              <div className="inline-block pill mb-4">👋 Get to know me</div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Bridging <span className="accent">Code</span> and Creativity
              </h2>

              <div className="space-y-4 text-lg text-muted leading-relaxed">
                <p>
                  Hey there! I'm Rajat, a full-stack developer focused on building thoughtful, accessible interfaces.
                </p>

                <p>
                  I enjoy turning ideas into products and learning new approaches to front-end and back-end design.
                </p>

                <p>
                  My goal is to build products that make a difference.
                </p>
              </div>
            </div>
            
            {/* Skills Grid */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b inline-block pb-2">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm text-muted">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>

                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          backgroundColor: skill.color,
                          transition: 'width 1s ease-out',
                          transitionDelay: `${index * 0.1 + 0.3}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.title} className="glass-soft p-4 flex flex-col gap-2 rounded-md">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <button
                className="pill"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;