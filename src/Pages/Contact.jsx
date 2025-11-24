import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Contact() {
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

  // socialLinks unchanged from your code
  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/therajatdua', 
      color: '#0077b5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/therajatdua', 
      color: '#333',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://linkedin.com/in/therajatdua', 
      color: '#1da1f2',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors above');
      return;
    }
    
    // Check for environment variables
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

    // Template params we send to EmailJS
    const templateParams = {
      from_name: `${contactForm.firstName} ${contactForm.lastName}`,
      from_email: contactForm.email,
      phone_number: contactForm.phoneNumber,
      topic: contactForm.topic,
      message: contactForm.message,
      to_name: 'Rajat Dua',
      to_email: 'rajatdua.work@gmail.com', // Ensure Admin template has a recipient if using {{to_email}}
      reply_to: contactForm.email
    };

    try {
      // 1. Send Admin Notification (Critical)
      await emailjs.send(
        serviceId,
        templateIdAdmin,
        templateParams,
        publicKey
      );

      // If we get here, the important email was sent.
      setSubmitMessage("Message sent successfully! A confirmation was emailed to you.");
      setContactForm({ firstName: '', lastName: '', email: '', phoneNumber: '', topic: '', message: '' });

      // 2. Try Auto-Reply (Non-critical)
      if (templateIdAuto) {
        const autoParams = {
          ...templateParams,
          to_name: contactForm.firstName,
          to_email: contactForm.email,
          // Add common variations to ensure the template finds the recipient address
          user_email: contactForm.email,
          email: contactForm.email,
          recipient: contactForm.email,
          github_url: 'https://github.com/therajatdua',
          linkedin_url: 'https://linkedin.com/in/therajatdua'
        };
        
        try {
            await emailjs.send(
                serviceId,
                templateIdAuto,
                autoParams,
                publicKey
            );
            console.log('Auto-reply sent successfully');
        } catch (autoError) {
            console.warn('Auto-reply failed to send. Check if "To Email" is set to {{to_email}} in your EmailJS template settings.', autoError);
        }
      }

    } catch (error) {
      console.error('EmailJS error:', error);
      // Display the specific error message from EmailJS
      setSubmitMessage(`Failed to send: ${error.text || error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto pt-10 px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Info (left column) */}
        <div className="space-y-8">
          <div className="inline-block bg-retroAccent text-white px-3 py-1 font-press text-xs mb-4">
            <span>📧</span> Let's Connect
          </div>

          <h2 className="text-3xl md:text-4xl font-press text-retroText leading-tight">
            Ready to bring your <span className="text-retroAccent">ideas to life?</span>
          </h2>

          <p className="text-lg font-sans text-retroText leading-relaxed">
            Whether you have a project in mind, or just want to chat about tech and creativity, I'd love to hear from you.
          </p>

          <div className="space-y-4">
            <div className="liquid-glass p-4 flex items-center gap-4">
              <div className="text-retroAccent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4 className="font-press text-xs text-retroText uppercase mb-1">Email</h4>
                <a href="mailto:rajatdua.work@gmail.com" className="font-sans text-retroText hover:text-retroAccent">rajatdua.work@gmail.com</a>
              </div>
            </div>

            <div className="liquid-glass p-4 flex items-center gap-4">
              <div className="text-retroAccent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4 className="font-press text-xs text-retroText uppercase mb-1">Location</h4>
                <span className="font-sans text-retroText">Gwalior, MP, India</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-4 border-retroAccent">
            <h4 className="font-press text-xs text-retroText mb-4 uppercase">Follow my journey</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-button p-3 flex items-center justify-center hover:bg-retroSecondary/20"
                  title={`Follow me on ${social.name}`}
                >
                  {/* It’s fine to render text icon placeholders or your svg icons */}
                  <span style={{color: social.color}}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form (right column) */}
        <div className="liquid-glass p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-press text-xl text-retroText mb-6 border-b-4 border-retroAccent pb-2">Send me a message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={contactForm.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${errors.firstName ? 'border-red-500' : 'border-retroText'} bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors`}
                  placeholder="First name"
                />
                {errors.firstName && <span className="text-red-500 text-xs font-sans mt-1 block">{errors.firstName}</span>}
              </div>

              <div>
                <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={contactForm.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${errors.lastName ? 'border-red-500' : 'border-retroText'} bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors`}
                  placeholder="Last name"
                />
                {errors.lastName && <span className="text-red-500 text-xs font-sans mt-1 block">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-retroText'} bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors`}
                  placeholder="email@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs font-sans mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={contactForm.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-retroText bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors"
                  placeholder="+91..."
                />
              </div>
            </div>

            <div>
              <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="topic">What's this about?</label>
              <select
                id="topic"
                name="topic"
                value={contactForm.topic}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-retroText bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors appearance-none"
              >
                <option value="">Select a topic</option>
                <option value="web-development">Web Development Project</option>
                <option value="freelance-work">Freelance Work</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-press text-xs text-retroText mb-2 uppercase" htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 ${errors.message ? 'border-red-500' : 'border-retroText'} bg-retroBg dark:bg-retroSecondary/30 text-retroText font-sans focus:outline-none focus:border-retroAccent transition-colors resize-none`}
                placeholder="Tell me about your project..."
                rows="5"
              />
              {errors.message && <span className="text-red-500 text-xs font-sans mt-1 block">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full pixel-button bg-retroCta text-white hover:bg-retroCta/90 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              )}
            </button>

            <AnimatePresence>
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 border-2 ${submitMessage.toLowerCase().includes('success') ? 'border-green-500 bg-green-100 text-green-800' : 'border-red-500 bg-red-100 text-red-800'} font-sans text-sm text-center`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
