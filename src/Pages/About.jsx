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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000`}>
            <div className="relative z-10">
              <div className="liquid-glass p-2 md:p-4">
                <div className="bg-retroAccent/10 overflow-hidden">
                  <img 
                    src={aboutImg} 
                    alt="Rajat Dua - About Me"
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Floating Skills - Positioned absolutely around the image */}
              <div className="absolute -top-6 -right-6 w-full h-full pointer-events-none hidden md:block">
                 {skills.slice(0, 3).map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="absolute liquid-glass px-3 py-1 font-press text-xs text-retroText shadow-lg animate-bounce"
                      style={{
                        top: `${index * 20}%`,
                        right: `${index % 2 === 0 ? -20 : -40}px`,
                        animationDelay: `${index * 0.5}s`,
                        borderLeft: `4px solid ${skill.color}`
                      }}
                    >
                      {skill.name}
                    </div>
                 ))}
              </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute top-4 left-4 w-full h-full border-4 border-retroAccent/30 -z-0"></div>
          </div>
          
          {/* Content Section */}
          <div className={`space-y-8 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-300`}>
            <div>
              <div className="inline-block bg-retroAccent text-white px-3 py-1 font-press text-xs mb-4">
                <span>👋</span> Get to know me
              </div>
              
              <h2 className="text-3xl md:text-4xl font-press text-retroText leading-tight mb-6">
                Bridging <span className="text-retroAccent">Code</span> and 
                <span className="text-retroCta"> Creativity</span>
              </h2>
              
              <div className="space-y-4 font-sans text-lg text-retroText/90 leading-relaxed">
                <p>
                  Hey there! I'm Rajat, a passionate full-stack developer based in India. My journey began with curiosity about how things work on the web, 
                  and it evolved into a love for building applications.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies. I believe in the power of 
                  storytelling through code.
                </p>
                
                <p>
                  My goal is to build products that make a difference.
                </p>
              </div>
            </div>
            
            {/* Skills Grid */}
            <div className="space-y-6">
              <h3 className="font-press text-lg text-retroText border-b-4 border-retroText inline-block pb-2">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="space-y-2"
                  >
                    <div className="flex justify-between font-press text-xs text-retroText">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-4 bg-white dark:bg-retroSecondary/20 border-2 border-retroText p-0.5">
                      <div 
                        className="h-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          backgroundColor: skill.color,
                          transitionDelay: `${index * 0.1 + 0.5}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.title}
                  className="liquid-glass p-4 flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-press text-sm text-retroText mb-1">{achievement.title}</h4>
                    <p className="font-sans text-xs text-retroText/70">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <button 
                className="pixel-button bg-retroCta text-white hover:bg-retroCta/90 flex items-center gap-2"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Work Together
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;