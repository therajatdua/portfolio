# Rajat Dua - Retro Portfolio

A unique, retro-themed personal portfolio website built with modern web technologies. This project combines a nostalgic 90s computer aesthetic with high-performance React architecture, featuring a hidden "Contra-style" mini-game, pixel art visuals, and smooth Framer Motion animations.

![Portfolio Preview](src/img/profile_img.png)

## 🚀 Live Demo
Visit the live site: [www.therajatdua.dev](https://www.therajatdua.dev)

## ✨ Features

- **Retro Aesthetic**: Custom pixel-art UI, CRT-style fonts (`Press Start 2P`), and a cohesive 8-bit color palette.
- **Dark/Light Mode**: Fully accessible theme toggling with persistent state.
- **Hidden Mini-Game**: A fully functional, custom-built platformer game engine (Contra-style) hidden within the portfolio.
  - *Hint: Click the waving hand on the profile picture!*
- **Interactive UI**:
  - Typewriter effects for introductions.
  - Floating animations for skill cards.
  - Responsive navigation with scroll-spy active states.
- **Contact Form**: Integrated with EmailJS for real-time email delivery and auto-replies.
- **Responsive Design**: Optimized for all devices, from mobile phones to large desktop screens.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion, React Type Animation
- **Game Engine**: Custom HTML5 Canvas + JavaScript Entity Component System (ECS)
- **Icons**: React Icons (FontAwesome, Material Design)
- **Deployment**: GitHub Pages (Custom Domain)

## 🎮 The Hidden Game Engine

The portfolio includes a custom-written game engine located in `src/components/ContraGame/engine/`. It features:
- **Entity System**: Modular classes for Player, Enemies, Bullets, and Level assets.
- **Procedural Assets**: All game sprites (Player, Soldiers, Tiles) are generated programmatically via HTML5 Canvas API to ensure zero asset loading errors.
- **Physics**: Custom AABB collision detection and gravity simulation.
- **State Management**: Finite State Machine for player actions (Idle, Run, Jump, Shoot).

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/therajatdua/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📧 Contact Configuration

The contact form uses **EmailJS**. To make it work in your own fork:
1.  Create a `.env` file in the root directory.
2.  Add your EmailJS credentials:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
    VITE_EMAILJS_TEMPLATE_ID_AUTO=your_auto_reply_template_id
    VITE_EMAILJS_USER_ID=your_public_key
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built by **Rajat Dua**
