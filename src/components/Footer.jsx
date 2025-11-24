import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="mt-20 py-8 text-center liquid-glass-footer">
      <p className="font-press text-xs md:text-sm text-retroText">
        © {new Date().getFullYear()} {profile.name}.
      </p>
   
      <div className="flex justify-center gap-4 text-xs font-press text-retroText/60">
        <Link to="/privacy-policy" className="hover:text-retroAccent hover:underline">Privacy</Link>
        <span>|</span>
        <Link to="/cookie-policy" className="hover:text-retroAccent hover:underline">Cookies</Link>
        <span>|</span>
        <Link to="/terms-of-service" className="hover:text-retroAccent hover:underline">Terms</Link>
      </div>
    </footer>
  );
}
