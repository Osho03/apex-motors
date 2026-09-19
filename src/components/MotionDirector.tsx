"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initSectionReveals,
  initSplitTitles,
  initHeroParallax,
} from "@/lib/motion";

/**
 * APEX MOTORS // MOTION DIRECTOR
 * Mounts once inside the app shell. Boots the scroll-reveal,
 * split-title, and hero-parallax systems, then plays the hero
 * entrance once the preloader curtain lifts.
 */

export default function MotionDirector() {
  useEffect(() => {
    const cleanups = [initSectionReveals(), initSplitTitles(), initHeroParallax()];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const playHeroIntro = () => {
      if (reduce) return;
      gsap.context(() => {
        gsap.from(".hero-copy-block > *", {
          y: 46,
          opacity: 0,
          duration: 1.0,
          stagger: 0.09,
          ease: "power3.out",
        });
        gsap.from(".hero-hud-dock", {
          x: 60,
          opacity: 0,
          duration: 1.1,
          delay: 0.25,
          ease: "power3.out",
        });
        gsap.from(".hero-roster-switcher .hero-car-nav-btn", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          delay: 0.45,
          ease: "power2.out",
        });
      });
      // keep intro tweens (one-shot); just refresh triggers after layout settles
      gsap.delayedCall(1.6, () => ScrollTrigger.refresh());
    };

    // Hero intro fires when the preloader curtain lifts.
    // Preloader sets window.__apexRevealed synchronously before its onDone
    // callback runs, so this check can never miss the transition.
    const revealed = () => {
      playHeroIntro();
      ScrollTrigger.refresh();
    };
    if ((window as unknown as { __apexRevealed?: boolean }).__apexRevealed) {
      // Preloader already finished (e.g. cached session skip)
      revealed();
    } else {
      window.addEventListener("apex:revealed", revealed);
    }

    return () => {
      window.removeEventListener("apex:revealed", revealed);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
