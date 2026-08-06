import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTimes, FaAward, FaGraduationCap } from 'react-icons/fa';
import profileImg from '../../img/profile_img.png';
import RetroGame from '../../components/RetroGame';
import CardTilt from '../../components/CardTilt';
import ImageReveal from '../../components/ImageReveal';
import { profile, summary, skills, experience, projects, certifications, education } from '../../content/techContent';

export default function Tech() {
  const [showRetroGame, setShowRetroGame] = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    topic: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Map project names to live deployed URLs
  const projectUrls = {
    // TODO: confirm live URL
    "MemoVault": "https://memovault-three.vercel.app/",
    // TODO: confirm live URL
    "Khabri": "https://khabri-newswala.vercel.app/",
    "Personal Portfolio Website": "https://www.therajatdua.com"
  };

  const handleImageError = (projectName) => {
    setImgErrors(prev => ({ ...prev, [projectName]: true }));
  };

  // EmailJS form validation
  const validateForm = () => {
    const newErrors = {};
    if (!contactForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!contactForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!contactForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!contactForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors above');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
    const templateIdAuto = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTO;
    const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateIdAdmin || !publicKey) {
      setSubmitMessage('Error: Missing EmailJS configuration. Check .env file and restart server.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const templateParams = {
      from_name: `${contactForm.firstName} ${contactForm.lastName}`,
      from_email: contactForm.email,
      phone_number: contactForm.phoneNumber,
      topic: contactForm.topic,
      message: contactForm.message,
      to_name: profile.name,
      to_email: profile.email,
      reply_to: contactForm.email
    };

    try {
      await emailjs.send(serviceId, templateIdAdmin, templateParams, publicKey);
      setSubmitMessage("Message sent successfully! A confirmation was emailed to you.");
      setContactForm({ firstName: '', lastName: '', email: '', phoneNumber: '', topic: '', message: '' });

      if (templateIdAuto) {
        const autoParams = {
          ...templateParams,
          to_name: contactForm.firstName,
          to_email: contactForm.email,
          user_email: contactForm.email,
          email: contactForm.email,
          recipient: contactForm.email,
          github_url: profile.github,
          linkedin_url: profile.linkedin
        };
        try {
          await emailjs.send(serviceId, templateIdAuto, autoParams, publicKey);
        } catch (autoError) {
          console.warn('Auto-reply failed to send.', autoError);
        }
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage(`Failed to send: ${error.text || error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 site-max px-6 md:px-12 space-y-28 w-full overflow-hidden">
      {/* Game overlay */}
      <AnimatePresence>
        {showRetroGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          >
            <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full max-w-[840px] shadow-2xl">
              <button
                onClick={() => setShowRetroGame(false)}
                className="absolute top-4 right-4 text-white hover:text-brandAccent z-10 p-2"
                title="Close Game"
              >
                <FaTimes size={20} />
              </button>
              <div className="flex flex-col items-center">
                <RetroGame onClose={() => setShowRetroGame(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        {/* Biography */}
        <div className="lg:col-span-8 space-y-6 w-full text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brandAccent bg-brandAccent/10 px-3 py-1 rounded">
            ✦ Software Engineer Portfolio
          </span>
          
          <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-extrabold text-themeText leading-none tracking-tight font-serif italic">
            Developer Workspace
          </h1>
          
          <p className="text-base md:text-lg font-mono text-brandAccent font-medium leading-relaxed">
            {profile.title}
          </p>
          
          <p className="text-sm md:text-base text-themeTextMuted leading-relaxed font-normal">
            {summary}
          </p>
          
          <p className="text-xs text-themeTextMuted italic font-normal">
            * Click my portrait avatar to trigger the hidden interactive Canvas retro game!
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/resume3.pdf" className="pill select-none">Download CV</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="px-4 py-2 border border-themeBorder rounded bg-themeCardBg transition font-semibold text-sm hover:border-brandAccent flex items-center gap-1.5 text-themeText">
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 border border-themeBorder rounded bg-themeCardBg transition font-semibold text-sm hover:border-brandAccent flex items-center gap-1.5 text-themeText">
              <FaLinkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Navy-Suit Profile Avatar (Triggers hidden Canvas Game) */}
        <div className="lg:col-span-4 flex justify-center w-full">
          <div className="relative group cursor-pointer w-full max-w-[280px]" onClick={() => setShowRetroGame(true)}>
            <div className="absolute inset-0 bg-brandAccent/15 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-200" />
            <div className="w-full aspect-square rounded-2xl border border-themeBorder overflow-hidden bg-themeCardBg shadow-xs relative">
              <img
                src={profileImg}
                alt="Rajat Dua Navy Suit Headshot"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-250">
                <span className="bg-brandAccent text-zinc-900 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  🎮 Play Retro Game
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorized Skills section */}
      <section className="pt-8 border-t border-themeBorder space-y-8 w-full">
        <h2 className="text-xl font-bold uppercase tracking-widest text-themeText font-serif italic">Skills & Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Languages */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brandAccent">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill, index) => (
                <span key={index} className="text-[12px] font-medium text-themeText bg-themeCardBg border border-themeBorder px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brandAccent">Frameworks & Services</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((skill, index) => (
                <span key={index} className="text-[12px] font-medium text-themeText bg-themeCardBg border border-themeBorder px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brandAccent">Developer Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill, index) => (
                <span key={index} className="text-[12px] font-medium text-themeText bg-themeCardBg border border-themeBorder px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Concepts */}
          <div className="space-y-3 lg:col-span-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brandAccent">Key Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {skills.concepts.map((skill, index) => (
                <span key={index} className="text-[12px] font-medium text-themeText bg-themeCardBg border border-themeBorder px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brandAccent">Professional Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <span key={index} className="text-[12px] font-medium text-themeText bg-themeCardBg border border-themeBorder px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric grid for Projects */}
      <section className="pt-8 border-t border-themeBorder space-y-10 w-full">
        <div>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold text-themeText tracking-tight font-serif italic">Featured Projects</h2>
          <p className="text-sm text-themeTextMuted mt-2">Screenshots rendered live from actual deployed application URLs via Microlink service.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {projects.map((project, idx) => {
            const gridClass = project.featured 
              ? 'lg:col-span-8' 
              : 'lg:col-span-4';

            const projectUrl = projectUrls[project.name];

            return (
              <div key={idx} className={`${gridClass} flex w-full`}>
                <CardTilt className="w-full h-full">
                  <article className="bg-themeCardBg border border-themeBorder hover:border-brandAccent/40 p-6 md:p-8 rounded-2xl shadow-xs flex flex-col justify-between h-full w-full">
                    <div className="space-y-5">
                      
                      {/* Live Screenshot with fallback on error */}
                      {imgErrors[project.name] || !projectUrl ? (
                        <div className="aspect-[16/9] w-full rounded-lg bg-themeBg border border-themeBorder flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-3xl mb-1.5">💻</span>
                          <span className="text-xs text-themeText font-bold">{project.name}</span>
                          <span className="text-[10px] text-themeTextMuted mt-1">Live demo page offline or screenshot loading failed</span>
                        </div>
                      ) : (
                        <ImageReveal
                          src={`https://api.microlink.io/?url=${encodeURIComponent(projectUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                          alt={`${project.name} Deployed Screenshot`}
                          className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-themeBorder/50"
                          onError={() => handleImageError(project.name)}
                        />
                      )}

                      <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="text-xl font-bold tracking-tight text-themeText">{project.name}</h3>
                          <span className="text-[10px] font-mono text-themeTextMuted">{project.date}</span>
                        </div>
                        
                        <p className="text-xs uppercase font-bold text-brandAccent tracking-wider">{project.subtitle}</p>
                        
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-themeTextMuted font-normal leading-relaxed">
                          {project.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-themeBorder/50 flex flex-col gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span key={t} className="text-[10px] font-semibold text-themeTextMuted bg-themeBg px-2 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-themeTextMuted pt-2">
                        {projectUrl && (
                          <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brandAccent transition flex items-center gap-1.5">
                            <FaExternalLinkAlt size={12} />
                            <span>Live Deployed App</span>
                          </a>
                        )}
                        <a href="https://github.com/therajatdua" target="_blank" rel="noopener noreferrer" className="hover:text-brandAccent transition flex items-center gap-1.5">
                          <FaGithub size={12} />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </CardTilt>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="pt-8 border-t border-themeBorder space-y-8 w-full text-left">
        <h2 className="text-xl font-bold uppercase tracking-widest text-themeText font-serif italic">Experience</h2>
        <div className="space-y-8 max-w-2xl">
          {experience.map((exp, index) => (
            <div key={index} className="space-y-3 border-l-2 border-brandAccent/40 pl-6 relative">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-brandAccent left-[-6px] top-[6px]" />
              
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <h3 className="text-[16px] font-bold text-themeText leading-tight">{exp.role}</h3>
                  <p className="text-xs text-brandAccent font-bold mt-0.5">{exp.org}</p>
                </div>
                <span className="text-[10px] font-mono bg-themeBg px-2.5 py-0.5 rounded border border-themeBorder text-themeTextMuted">
                  {exp.dates}
                </span>
              </div>
              
              <span className="inline-block text-[11px] font-semibold text-themeTextMuted uppercase bg-themeBg border border-themeBorder px-2 py-0.5 rounded">
                {exp.track}
              </span>
              
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-themeTextMuted font-normal leading-relaxed">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Timeline */}
      <section className="pt-8 border-t border-themeBorder space-y-8 w-full text-left">
        <h2 className="text-xl font-bold uppercase tracking-widest text-themeText font-serif italic">Education</h2>
        <div className="space-y-6 max-w-xl">
          {education.map((edu, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <span className="text-brandAccent shrink-0 mt-1"><FaGraduationCap size={18} /></span>
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <h4 className="text-[14px] font-bold text-themeText leading-tight">{edu.school}</h4>
                  <span className="text-[10px] font-mono text-themeTextMuted shrink-0">{edu.dates}</span>
                </div>
                <p className="text-xs text-themeTextMuted font-semibold">{edu.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications strip */}
      <section className="pt-8 border-t border-themeBorder space-y-6 w-full text-left">
        <h2 className="text-xl font-bold uppercase tracking-widest text-themeText font-serif italic">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-themeCardBg border border-themeBorder rounded-xl shadow-xs">
              <span className="text-brandAccent shrink-0"><FaAward size={18} /></span>
              <div>
                <h4 className="text-[13px] font-bold text-themeText leading-tight">{c.name}</h4>
                <p className="text-[11px] text-themeTextMuted mt-0.5">{c.org} • {c.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-8 border-t border-themeBorder grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24 w-full">
        <div className="lg:col-span-5 space-y-6 text-left">
          <h2 className="text-3xl font-extrabold text-themeText tracking-tight font-serif italic">Let's Connect</h2>
          <p className="text-sm md:text-base text-themeTextMuted leading-relaxed font-normal max-w-sm">
            Have a project concept, an internship scope, or simply want to chat? Drop a query here or email me directly.
          </p>
          <div className="space-y-4 text-sm text-themeTextMuted">
            <div className="flex items-center gap-2">
              <span className="text-brandAccent"><FaPhone size={14} /></span>
              <a href={`tel:${profile.phone}`} className="hover:text-brandAccent transition font-semibold">{profile.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brandAccent"><FaEnvelope size={14} /></span>
              <a href={`mailto:${profile.email}`} className="hover:text-brandAccent transition font-semibold">{profile.email}</a>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7 bg-themeCardBg border border-themeBorder p-8 rounded-2xl shadow-xs w-full">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-bold uppercase text-themeTextMuted">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={contactForm.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent"
                  placeholder="First name"
                />
                {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName}</span>}
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-bold uppercase text-themeTextMuted">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={contactForm.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent"
                  placeholder="Last name"
                />
                {errors.lastName && <span className="text-red-500 text-xs mt-1 block">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-bold uppercase text-themeTextMuted">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent"
                  placeholder="email@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-bold uppercase text-themeTextMuted">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={contactForm.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent"
                  placeholder="+91..."
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase text-themeTextMuted">Topic</label>
              <select
                name="topic"
                value={contactForm.topic}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent appearance-none"
              >
                <option value="">Select a topic</option>
                <option value="web-development">Web Development Project</option>
                <option value="freelance-work">Freelance Work</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase text-themeTextMuted">Message *</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-themeBg border border-themeBorder rounded-sm text-sm text-themeText focus:outline-hidden focus:border-brandAccent resize-none"
                placeholder="Tell me about your project..."
                rows="5"
              />
              {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-brandAccent text-zinc-900 font-semibold rounded-sm hover:bg-brandAccent/90 transition disabled:opacity-75 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Transmitting...' : 'Send Message'}
            </button>

            <AnimatePresence>
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 border text-center rounded-sm text-xs font-semibold ${
                    submitMessage.toLowerCase().includes('success')
                      ? 'border-green-600/30 bg-green-50 text-green-700'
                      : 'border-red-600/30 bg-red-50 text-red-700'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
}
