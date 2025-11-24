import React from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

export default function MainPage() {
  return (
    <div className="flex flex-col gap-20 md:gap-32 pb-20">
      <section id="home" className="min-h-screen flex flex-col justify-center">
        <Home />
      </section>
      
      <section id="about" className="scroll-mt-24">
        <About />
      </section>
      
      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>
      
      <section id="contact" className="scroll-mt-24">
        <Contact />
      </section>
    </div>
  );
}
