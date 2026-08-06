# Rajat Dua - Digital Operating System (Redesign)

A modern, high-contrast personal ecosystem and digital home built with React 18, Vite, React Router, Tailwind CSS, and Framer Motion. 

This redesign restructures the personal site into three distinct parts, blending a light architectural design with a dark editorial cinematic aesthetic.

## 🚀 Live Demo
Visit the live site: [www.therajatdua.dev](https://www.therajatdua.dev)

---

## 🗺️ Site Architecture & Routes

The site uses **React Router** to partition content into three dedicated views:

1.  **`/` — Landing Page:** Base style is light and architectural. Features a clean name heading, a serif tagline quote, placeholder stat badges, and a split path choice (Light card for Tech, Dark card for Social) to preview the sections before entering.
2.  **`/tech` — Developer Portfolio:** Base style is light and clean. Showcases your professional profile, skills tags list, a filtered projects showcase, timeline cards, and a contact form connected to EmailJS.
    *   *Hidden Game Easter Egg:* Click your profile picture to trigger a retro HTML5 Canvas action game overlay.
3.  **`/social` — YouTube Creator Hub:** Base style is dark and cinematic. Details your YouTube video tutorial libraries, channel stats monospace grids, editing process flows, and rotating marquees.

---

## 🛠️ How to Add Content

All core text, projects list data, and video records are kept inside `src/data.js` to enable simple, single-file updates.

### 💻 Adding a Tech Project
To add a new project to your portfolio, append a new object to the `projects` array in `src/data.js`:
```javascript
export const projects = [
  {
    title: "Project Title",
    desc: "A short, one-line summary of what you engineered.",
    tech: "React, Node.js, Tailwind, etc.",
    link: "https://github.com/your-username/repository",
    demo: "https://live-deployment.app",
    src: importedImageOrNull
  }
];
```

### 🎥 Adding a YouTube Video
To add a new video block to your social feed, update the `videos` array in `src/pages/Social.jsx`:
```javascript
const videos = [
  {
    title: "Video Tutorial Headline",
    date: "August 2026",
    youtubeUrl: "https://youtube.com/watch?v=your-video-id",
    thumbnail: "https://images.unsplash.com/photo-..." // Unsplash or local import
  }
];
```

---

## 📧 Contact Integration (EmailJS)

The contact form on `/tech` uses **EmailJS** for delivery. Configure credentials inside a `.env` file at the root:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
VITE_EMAILJS_TEMPLATE_ID_AUTO=your_auto_reply_template_id
VITE_EMAILJS_USER_ID=your_public_key
```

---

## 📦 Run Locally

1. Install modules:
   ```bash
   npm install
   ```
2. Launch dev server:
   ```bash
   npm start
   ```
3. Compile bundle:
   ```bash
   npm run build
   ```
