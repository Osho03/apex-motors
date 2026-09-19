"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="brand-logo">
              <span className="emblem-mark">◆</span>
              <span className="brand-text">
                APEX<span className="brand-accent">MOTORS</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              The global benchmark in automotive excellence, celebrating the pure
              mechanical soul and hyper-speed innovation of the world&apos;s most
              extreme supercars.
            </p>
          </div>
          <div className="footer-links-col">
            <h4>FLAGSHIP BRANDS</h4>
            <a href="#hypercar-roster">Bugatti Molsheim</a>
            <a href="#hypercar-roster">Porsche Weissach</a>
            <a href="#hypercar-roster">Koenigsegg Ängelholm</a>
            <a href="#hypercar-roster">Complete Fleet</a>
          </div>
          <div className="footer-links-col">
            <h4>EXPERIENCE</h4>
            <a href="#telemetry-arena">Drag Strip Arena</a>
            <a href="#acoustic-chamber">Acoustic Sound Lab</a>
            <a href="#concierge-vip">VIP Concierge</a>
          </div>
          <div className="footer-links-col">
            <h4>GLOBAL ATELIER</h4>
            <p className="location-text">Circuit Paul Ricard - Le Castellet, France</p>
            <p className="location-text">Yas Marina Circuit - Abu Dhabi, UAE</p>
            <p className="location-text">Laguna Seca - Monterey, California</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 APEX MOTORS HYPER DIVISION. CRAFTED FOR AUTOMOTIVE ENTHUSIASTS WORLDWIDE.</p>
          <div className="footer-legal-tags">
            <span>HIGH-OCTANE WEB EXPERIENCE</span>
            <span>AWARDS RECOGNITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}