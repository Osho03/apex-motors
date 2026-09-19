"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_KEY = "apex-theme";
const THEME_EVENT = "apex:themechange";

function readTheme(): boolean {
  try {
    return window.localStorage.getItem(THEME_KEY) === "light";
  } catch {
    return false;
  }
}

function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function applyTheme(light: boolean) {
  const body = document.body;
  body.classList.toggle("apex-light-theme", light);
  if (light) {
    body.classList.remove("apex-dark-theme");
  } else {
    body.classList.add("apex-dark-theme");
  }
  body.classList.add("theme-anim");
  window.setTimeout(() => body.classList.remove("theme-anim"), 650);
}

export default function ThemeToggle() {
  const isLight = useSyncExternalStore(subscribeTheme, readTheme, () => false);

  useEffect(() => {
    applyTheme(isLight);
  }, [isLight]);

  const toggle = () => {
    const next = !isLight;
    try {
      window.localStorage.setItem(THEME_KEY, next ? "light" : "dark");
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      className="theme-toggle-btn"
      type="button"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-label="Toggle dark and light mode"
      onClick={toggle}
    >
      <svg
        className="icon-sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        className="icon-moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  );
}