"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "#hero-runway", label: "RUNWAY" },
  { href: "#holodeck-3d", label: "HOLODECK" },
  { href: "#hypercar-roster", label: "FLEET" },
  { href: "#telemetry-arena", label: "TELEMETRY" },
  { href: "#acoustic-chamber", label: "SOUND LAB" },
];

export default function Header() {
  const { garageCount, setDrawerOpen, setVipOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero-runway");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.classList.add("mobile-menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href)
    ).filter(Boolean) as Element[];
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#hero-runway" className="brand-logo">
          <span className="emblem-mark">◆</span>
          <span className="brand-text">
            APEX<span className="brand-accent">MOTORS</span>
          </span>
          <span className="brand-badge">HYPER-DIVISION</span>
        </a>

        <nav
          id="mobile-navigation"
          className={`nav-menu ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <p className="mobile-menu-label">EXPLORE APEX</p>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeLink === link.href ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-menu-actions">
            <button type="button" onClick={() => { setMenuOpen(false); setDrawerOpen(true); }}>
              DREAM GARAGE{garageCount > 0 ? ` (${garageCount})` : ""}
            </button>
            <button type="button" onClick={() => { setMenuOpen(false); setVipOpen(true); }}>
              VIP CONSULTATION
            </button>
            <div className="mobile-theme-control">
              <span>DISPLAY</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />

          <button
            className="btn-garage-hud"
            type="button"
            title="View Dream Garage"
            onClick={() => setDrawerOpen(true)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>GARAGE</span>
            <span
              className="garage-count-badge"
              style={{ display: garageCount > 0 ? "inline-flex" : "none" }}
            >
              {garageCount}
            </span>
          </button>

          <button
            className="btn-vip-concierge"
            type="button"
            onClick={() => setVipOpen(true)}
          >
            <span>VIP CONSULTATION</span>
          </button>

          <button
            className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <button
        className={`mobile-menu-backdrop ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}
