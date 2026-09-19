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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <nav className="nav-menu" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeLink === link.href ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
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
        </div>
      </div>
    </header>
  );
}