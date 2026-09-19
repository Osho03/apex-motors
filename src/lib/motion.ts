/**
 * APEX MOTORS // CINEMATIC MOTION ENGINE
 * Central GSAP choreography: scroll reveals, split-text title masks,
 * hero cinematic parallax, and scroll-velocity reactions.
 *
 * Every initializer returns a cleanup function (React strict-mode safe).
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ----------------------------------------------------
   1. SECTION REVEAL SYSTEM
   Staggered mask-up entrance for section headers,
   cards, and feature blocks.
---------------------------------------------------- */
export function initSectionReveals(): () => void {
  if (REDUCED) return () => {};

  const ctx = gsap.context(() => {
    // Section headers: badge -> title -> desc cascade
    gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
      const kids = header.querySelectorAll(
        ".section-badge, .section-title, .section-desc, .roster-filters-bar"
      );
      if (!kids.length) return;
      gsap.from(kids, {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 82%" },
      });
    });

    // Roster cards: the CSS `cardAppear` keyframe already gives every
    // card (initial + filtered) a rising entrance, so GSAP stays out
    // of the way here to avoid double-animation.

    // Studio / Arena / Chamber panels: soft rise
    gsap.utils
      .toArray<HTMLElement>(
        ".studio-workspace-grid, .arena-card-wrapper, .acoustic-chamber-box, .concierge-card"
      )
      .forEach((panel) => {
        gsap.from(panel, {
          y: 56,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 85%" },
        });
      });
  });

  return () => ctx.revert();
}

/* ----------------------------------------------------
   2. SPLIT-TITLE MASK REVEAL
   Wraps each word of .section-title in a clipping mask
   and slides words up like editorial kinetic type.
---------------------------------------------------- */
export function initSplitTitles(): () => void {
  if (REDUCED) return () => {};

  const cleanups: Array<() => void> = [];
  const titles = gsap.utils.toArray<HTMLElement>(".section-title");

  titles.forEach((title) => {
    if (title.dataset.split === "true") return;

    const words = (title.textContent || "").split(/\s+/).filter(Boolean);
    if (!words.length) return;

    title.dataset.split = "true";
    title.textContent = "";
    title.setAttribute("aria-label", words.join(" "));

    const wrappers: HTMLElement[] = [];
    words.forEach((word) => {
      const mask = document.createElement("span");
      mask.className = "word-mask";
      mask.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.className = "word-inner";
      inner.textContent = word;
      mask.appendChild(inner);
      title.appendChild(mask);
      title.appendChild(document.createTextNode(" "));
      wrappers.push(mask);
    });

    const tween = gsap.from(title.querySelectorAll(".word-inner"), {
      yPercent: 115,
      duration: 0.9,
      stagger: 0.07,
      ease: "power4.out",
      scrollTrigger: { trigger: title, start: "top 85%" },
    });

    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
      title.textContent = words.join(" ");
      delete title.dataset.split;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/* ----------------------------------------------------
   3. HERO CINEMATIC PARALLAX
   Backdrop image drifts/scales, content lifts away as
   the user scrolls out of the hero (Awwwards staple).
---------------------------------------------------- */
export function initHeroParallax(): () => void {
  if (REDUCED) return () => {};

  const section = document.getElementById("hero-runway");
  const bg = section?.querySelector<HTMLElement>(".hero-bg-img");
  const content = section?.querySelector<HTMLElement>(".hero-content-wrapper");
  if (!section || !bg || !content) return () => {};

  const ctx = gsap.context(() => {
    gsap.to(bg, {
      yPercent: 22,
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(content, {
      yPercent: -14,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "70% top",
        scrub: true,
      },
    });
  }, section);

  return () => ctx.revert();
}
