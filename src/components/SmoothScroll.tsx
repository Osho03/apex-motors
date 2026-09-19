"use client";

import { useEffect } from "react";
import { Lenis as ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      );
      if (!target || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -70,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [lenis]);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
        syncTouch: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}