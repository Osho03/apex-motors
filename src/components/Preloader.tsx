"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PHASES = [
  "CALIBRATING TELEMETRY",
  "SYNCING POWERTRAIN DATA",
  "SPOOLING TURBINES",
  "IGNITION SEQUENCE",
];

const STATS = [
  { label: "MACHINES", value: "08" },
  { label: "COMBINED HP", value: "9,458" },
  { label: "TOP SPEED", value: "531 KM/H" },
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef<HTMLSpanElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("apex_preloaded") === "1") {
      rootRef.current?.style.setProperty("display", "none");
      onDone();
      return;
    }

    // Lock page scroll while the curtain is down
    document.body.classList.add("preloader-lock");

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("apex_preloaded", "1");
          document.body.classList.remove("preloader-lock");
          (window as unknown as { __apexRevealed?: boolean }).__apexRevealed = true;
          setDone(true);
          onDone();
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => setProgress(Math.round(counter.v)),
      })
        .to(
          barRef.current,
          { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
          0
        )
        // phase text flicker swaps
        .call(() => {
          if (phaseRef.current) phaseRef.current.textContent = PHASES[1];
        }, [], 0.4)
        .call(() => {
          if (phaseRef.current) phaseRef.current.textContent = PHASES[2];
        }, [], 0.78)
        .call(() => {
          if (phaseRef.current) phaseRef.current.textContent = PHASES[3];
        }, [], 1.15)
        // content fades
        .to(".preloader-inner", {
          opacity: 0,
          y: -26,
          duration: 0.3,
          ease: "power2.in",
        })
        // curtain wipe: two panels slide apart
        .to(".preloader-panel-top", {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
        })
        .to(
          ".preloader-panel-bottom",
          { yPercent: 100, duration: 0.6, ease: "power4.inOut" },
          "<"
        );
    }, rootRef);

    return () => {
      document.body.classList.remove("preloader-lock");
      ctx.revert();
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div ref={rootRef} className="preloader-root" aria-hidden="true">
      <div className="preloader-panel preloader-panel-top"></div>
      <div className="preloader-panel preloader-panel-bottom"></div>

      <div className="preloader-inner">
        <div className="preloader-emblem">◆</div>
        <div className="preloader-brand">
          APEX<span className="preloader-brand-accent">MOTORS</span>
        </div>
        <div className="preloader-phase">
          <span ref={phaseRef} className="preloader-phase-text">
            {PHASES[0]}
          </span>
        </div>

        <div className="preloader-track">
          <div ref={barRef} className="preloader-bar"></div>
        </div>

        <div className="preloader-meta">
          <span className="preloader-pct">{progress}%</span>
          <div className="preloader-stats">
            {STATS.map((s) => (
              <div key={s.label} className="preloader-stat">
                <span className="preloader-stat-val">{s.value}</span>
                <span className="preloader-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
