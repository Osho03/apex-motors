"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function HelpWidget() {
  const { setVipOpen } = useApp();
  const [open, setOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div className="help-widget">
      {faqOpen && (
        <section className="help-faq-panel" aria-label="Frequently asked questions">
          <button className="help-panel-close" type="button" onClick={() => setFaqOpen(false)} aria-label="Close FAQs">×</button>
          <span className="help-panel-kicker">APEX ASSIST</span>
          <h2>Frequently asked questions</h2>
          <details open>
            <summary>How do I request a vehicle?</summary>
            <p>Open VIP Consultation and our concierge will contact you to discuss allocation and delivery.</p>
          </details>
          <details>
            <summary>Can I save a favourite?</summary>
            <p>Tap the heart on any vehicle to add it to your Dream Garage.</p>
          </details>
        </section>
      )}

      <div className={`help-actions ${open ? "is-open" : ""}`}>
        <button type="button" onClick={() => { setFaqOpen(true); setOpen(false); }}>FAQ</button>
        <button type="button" onClick={() => { setVipOpen(true); setOpen(false); }}>CONTACT</button>
      </div>

      <button
        className={`help-fab ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close help menu" : "Open help menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20 14a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          <path d="M7 9h.01M12 9h.01M17 9h.01" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
      </button>
    </div>
  );
}
