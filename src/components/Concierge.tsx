"use client";

import { useApp } from "@/components/AppProvider";

export default function Concierge() {
  const { setVipOpen } = useApp();
  return (
    <section id="concierge-vip" className="concierge-banner-section">
      <div className="section-container">
        <div className="concierge-card">
          <div className="concierge-content">
            <div className="section-badge">VIP PRIVATE CLIENTELE</div>
            <h2 className="concierge-title">
              Book a Private Closed-Circuit Track Session
            </h2>
            <p className="concierge-text">
              Experience the exhilarating threshold of our hypercar fleet with
              dedicated factory test drivers and bespoke hospitality.
            </p>
            <button
              className="btn-primary-glow"
              type="button"
              onClick={() => setVipOpen(true)}
            >
              REQUEST VIP TRACK CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}