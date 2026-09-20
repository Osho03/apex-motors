"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/AppProvider";
import { CONTACT_EMAIL } from "@/lib/site-config";

const OWNER_EMAIL = CONTACT_EMAIL;
const OWNER_SUBJECT = "VIP Consultation Request — Apex Motors";

const FAQS = [
  {
    q: "How do I request a vehicle?",
    a: "Tap CONTACT VIP below — it opens your mail app with a pre-filled request addressed to our concierge. Tell us the model, allocation window, and specification; we reply within one business day.",
  },
  {
    q: "Can I save a favourite for later?",
    a: "Yes — every roster card has a heart button. Tapping it adds the car to your Dream Garage so you can revisit it anytime from the garage drawer.",
  },
  {
    q: "When can I take delivery?",
    a: "Hyperseries and TrackBeast programs are allocation-based. Contacting our concierge starts the conversation; typical lead times run 6–24 months depending on the model.",
  },
  {
    q: "Is financing or trade-in available?",
    a: "Yes. Our concierge prepares bespoke purchase programs, including trade-ins, leases, and private sale structuring — mention it in your message.",
  },
];

export default function HelpWidget() {
  const { setVipOpen } = useApp();
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowGreeting(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const togglePanel = () => {
    if (!open) setShowGreeting(false);
    setOpen(!open);
  };

  const openMail = () => {
    const body = encodeURIComponent(
      "Hi Apex Motors concierge,\n\nI'm interested in a vehicle from your hypercar roster.\n\nModel: \nPreferred delivery window: \nAdditional notes: \n\nBest regards"
    );
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(OWNER_SUBJECT)}&body=${body}`;
  };

  return (
    <div className="help-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            className="help-panel is-open motion-host"
            role="dialog"
            aria-label="Apex Motors VIP assistant"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.26, ease: [0.22, 0.75, 0.2, 1] }}
          >
        <div className="help-panel-head">
          <div className="help-panel-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M4.8 20c.9-3.4 3.5-5.2 7.2-5.2s6.3 1.8 7.2 5.2" />
            </svg>
            <span className="status-dot" />
          </div>
          <div className="help-panel-title">
            APEX ASSIST
            <small>LIVE CONCIERGE · ONLINE</small>
          </div>
          <button
            className="help-panel-close"
            type="button"
            aria-label="Close help"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="help-panel-body">
          <p className="help-panel-greeting">
            Welcome to the Apex command hatch. Whether you want a private
            viewing, allocation advice, or a trade-in appraisal — the concierge
            is one tap away.
          </p>

          <span className="help-panel-kicker">FREQUENTLY ASKED</span>
          <ul className="help-faq-list">
            {FAQS.map((item) => (
              <li className="help-faq-item" key={item.q}>
                <details>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              </li>
            ))}
          </ul>

          <span className="help-panel-kicker">VIP CONSULTATION</span>
          <a
            className="help-contact-list"
            href={`mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(OWNER_SUBJECT)}`}
            onClick={openMail}
          >
            <span className="help-contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span>CONTACT VIP CONCIERGE</span>
            </span>
          </a>

          <button className="help-actions" type="button" onClick={() => { setVipOpen(true); setOpen(false); }}>
            OPEN VIP CONSULTATION
          </button>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`help-greeting-bubble ${showGreeting && !open ? "is-visible" : ""}`} role="status">
        <button
          type="button"
          className="help-greeting-dismiss"
          aria-label="Dismiss"
          onClick={() => setShowGreeting(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <span className="help-greeting-text">Hello, how can we help?</span>
        <button
          type="button"
          className="help-greeting-link"
          onClick={() => { setOpen(true); setShowGreeting(false); }}
        >
          FAQ &amp; Contact
        </button>
      </div>

      <button
        className={`help-fab ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close help" : "Open help"}
        aria-expanded={open}
        onClick={togglePanel}
      >
        <svg className="fab-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M20 14a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
        <svg className="fab-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
