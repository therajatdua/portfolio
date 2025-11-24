import memovaultImg from './img/memovault.png';

export const profile = {
  name: "Rajat Dua",
  title: "Full-Stack Web Developer",
  location: "India",
  email: "rajatdua.work@gmail.com",
  phone: "+91 12345 54321",
  github: "https://github.com/therajatdua",
  linkedin: "https://linkedin.com/in/therajatdua",
  resume: "#", // set to resume file url
  bio: `I build responsive, accessible web applications with React, Node.js and Firebase. I love turning ideas into polished, production-ready experiences and learning new tools along the way.`,
};

export const skills = [
  "HTML5 & CSS3",
  "JavaScript (ES6+)",
  "React, Redux, Next.js",
  "Node.js & Express",
  "Firebase / Firestore",
  "RESTful APIs",
  "Responsive Design",
  "Git & GitHub",
];

export const projects = [
  {
    title: "MemoVault",
    desc: "An intelligent memory companion powered by Google Gemini AI. Features include AI chat, secure memory storage, and custom themes.",
    tech: "React, Node.js, Gemini AI, Tailwind",
    link: "https://github.com/therajatdua/memovault",
    demo: "https://memovault-three.vercel.app/",
    src: memovaultImg
  },
  {
    title: "Portfolio Website",
    desc: "A retro-themed personal portfolio website featuring a 90s computer UI aesthetic, pixel art elements, and smooth animations.",
    tech: "React, Tailwind CSS, Framer Motion",
    link: "https://github.com/therajatdua/portfolio",
    demo: "https://www.therajatdua.dev",
    src: null
  },
  {
    title: "Coming Soon",
    desc: "More exciting projects are in the works. Stay tuned for updates!",
    tech: "Future Tech",
    link: null,
    demo: null,
    src: null
  },
];
