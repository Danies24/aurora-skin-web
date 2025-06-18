"use client";

import React from "react";
import "@/styles/components/privacy-policy.css";

const PrivacyPolicyPage = () => {
  return (
    <main>
      <section className="privacy-section">
        <div className="privacy-container">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Your privacy is important to us. This policy outlines how Herb
            Aurora collects, uses, and protects your data.
          </p>

          <div className="privacy-content">
            <section>
              <h2 className="privacy-section-title">Information We Collect</h2>
              <p className="privacy-text">
                We may collect your name, email, phone number, address, and
                order details when you shop or contact us.
              </p>
            </section>

            <section>
              <h2 className="privacy-section-title">How We Use Your Data</h2>
              <ul className="privacy-list">
                <li className="privacy-list-item">
                  To process and deliver your orders
                </li>
                <li className="privacy-list-item">
                  To respond to queries via WhatsApp or email
                </li>
                <li className="privacy-list-item">
                  To improve our product and website experience
                </li>
              </ul>
            </section>

            <section>
              <h2 className="privacy-section-title">Data Security</h2>
              <p className="privacy-text">
                We implement basic security practices to keep your personal
                information safe and never sell or share your data with third
                parties.
              </p>
            </section>

            <section>
              <h2 className="privacy-section-title">WhatsApp Communication</h2>
              <p className="privacy-text">
                By clicking &ldquo;Order on WhatsApp&rdquo;, you consent to
                receive order and product-related messages from us via WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="privacy-section-title">Changes to This Policy</h2>
              <p className="privacy-text">
                This privacy policy may be updated as needed. Any changes will
                be posted here with the updated date.
              </p>
            </section>

            <section>
              <h2 className="privacy-section-title">Contact Us</h2>
              <p className="privacy-text">
                If you have questions about your data or this policy, please
                reach out at{" "}
                <a
                  href="mailto:herbaurora.in@gmail.com"
                  className="contact-email"
                >
                  herbaurora.in@gmail.com
                </a>{" "}
                or chat via WhatsApp.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
