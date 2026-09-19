"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { CARS_DATA } from "@/lib/data";

/**
 * APEX MOTORS // VELOCITY TICKER TAPE
 * Infinite spec marquee that reacts to scroll velocity:
 * speeds up and skews as you scroll faster, direction-aware.
 * Placed as a section divider between Hero and Holodeck.
 */

export default function TickerTape() {
  const lenis = useLenis();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const velRef = useRef(0);

  // Lenis velocity sampler
  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ velocity }: { velocity: number }) => {
      velRef.current = velocity;
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let skew = 0;
    let raf = 0;

    const half = () => track.scrollWidth / 2 || 1;

    const tick = () => {
      const v = velRef.current;
      // direction-aware speed boost from scroll velocity
      const boost = gsap.utils.clamp(-260, 260, v * 14);
      x -= 0.6 + boost;
      // skew proportional to velocity, eased back to 0
      skew += (gsap.utils.clamp(-10, 10, v * 0.55) - skew) * 0.1;
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;

      const w = half();
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Build one long string of specs, duplicated 2x for seamless wrap
  const specs = CARS_DATA.flatMap((c) => [
    c.name.toUpperCase(),
    `${c.horsepower} HP`,
    `${c.zeroToHundred}s 0-100`,
    `${c.topSpeed} KM/H`,
    c.price,
  ]);

  return (
    <div ref={wrapRef} className="ticker-tape" aria-hidden="true">
      <div ref={trackRef} className="ticker-track">
        <Row specs={specs} />
        <Row specs={specs} />
      </div>
    </div>
  );
}

function Row({ specs }: { specs: string[] }) {
  return (
    <div className="ticker-row" aria-hidden="true">
      {specs.map((s, i) => (
        <span key={i} className="ticker-item">
          <span className="ticker-diamond">◆</span>
          {s}
        </span>
      ))}
    </div>
  );
}
