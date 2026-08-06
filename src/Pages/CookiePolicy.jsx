import React from "react";

export default function CookiePolicy() {
  return (
    <section className="min-h-screen pt-28 pb-16 px-6" id="CookiePolicy">
      <div className="site-max mx-auto bg-themeCardBg border border-themeBorder p-8 rounded-2xl shadow-xs">
        <h1 className="text-3xl font-extrabold text-themeText font-serif italic mb-6">Cookie Policy</h1>
        <p className="text-lg text-themeTextMuted mb-4">Last updated: July 19, 2025</p>
        <p className="text-md text-themeTextMuted mb-4">
          We use cookies to help improve your experience of our website. This
          cookie policy is part of our privacy policy, and covers the use of
          cookies between your device and our site.
        </p>
        <h3 className="text-xl font-bold text-themeText font-serif italic mt-8 mb-4">What is a cookie?</h3>
        <p className="text-md text-themeTextMuted mb-4">
          A cookie is a small piece of data that a website stores on your
          device when you visit. It typically contains information about the
          website itself, a unique identifier that allows the site to recognize
          your web browser when you return, additional data that serves the
          purpose of the cookie, and the lifespan of the cookie itself.
        </p>
        <h3 className="text-xl font-bold text-themeText font-serif italic mt-8 mb-4">How we use cookies</h3>
        <p className="text-md text-themeTextMuted mb-4">
          We use cookies to help improve your experience of our website. We use
          cookies to enable certain features, to track site usage, to store
          your settings, and to personalize your experience.
        </p>
        <h3 className="text-xl font-bold text-themeText font-serif italic mt-8 mb-4">Third-party cookies on our site</h3>
        <p className="text-md text-themeTextMuted mb-4">
          We may employ third-party companies and individuals on our websites.
          These third parties have access to your personal information only to
          perform these tasks on our behalf and are obligated not to disclose
          or use it for any other purpose.
        </p>
      </div>
    </section>
  );
}
