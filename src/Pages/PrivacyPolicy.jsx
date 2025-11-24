import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen pt-20 px-6 max-w-4xl mx-auto" id="PrivacyPolicy">
      <div className="bg-white p-8 pixel-border">
        <h1 className="text-3xl font-press text-retroText mb-6">Privacy Policy</h1>
        <p className="text-lg font-sans text-retroText mb-4">Last updated: July 19, 2025</p>
        <p className="text-md font-sans text-retroText mb-4">
          Your privacy is important to us. It is our policy to respect your
          privacy regarding any information we may collect from you across our
          website.
        </p>
        <h3 className="text-xl font-press text-retroText mt-8 mb-4">Information We Collect</h3>
        <p className="text-md font-sans text-retroText mb-4">
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
        <h3 className="text-xl font-press text-retroText mt-8 mb-4">How We Use Your Information</h3>
        <p className="text-md font-sans text-retroText mb-4">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use or
          modification.
        </p>
        <h3 className="text-xl font-press text-retroText mt-8 mb-4">Third-Party Services</h3>
        <p className="text-md font-sans text-retroText mb-4">
          We may link to external sites that are not operated by us. Please be
          aware that we have no control over the content and practices of these
          sites, and cannot accept responsibility or liability for their
          respective privacy policies.
        </p>
        <h3 className="text-xl font-press text-retroText mt-8 mb-4">Your Consent</h3>
        <p className="text-md font-sans text-retroText mb-4">
          You are free to refuse our request for your personal information,
          with the understanding that we may be unable to provide you with some
          of your desired services.
        </p>
      </div>
    </section>
  );
}
