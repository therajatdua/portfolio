import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-themeBorder bg-themeBg/30 text-themeTextMuted">
      <div className="site-max px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-brandAccent transition-colors">Privacy Policy</Link>
          <Link to="/cookie-policy" className="hover:text-brandAccent transition-colors">Cookie Policy</Link>
          <Link to="/terms-of-service" className="hover:text-brandAccent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
