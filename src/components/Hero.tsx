"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/AppProvider";
import { CARS_DATA, getHeroCars } from "@/lib/data";
import { CanvasEffects } from "@/lib/canvasEffects";

const HERO_IMG_SIZES = [480, 900, 1400, 1920];

function heroSrcSet(url: string): string {
  return HERO_IMG_SIZES.map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(", ");
}

export default function Hero() {
  const { heroCarId, setHeroCarId } = useApp();
  const heroCars = getHeroCars();
  const car = CARS_DATA.find((c) => c.id === heroCarId) ?? CARS_DATA[0];

  const warpRef = useRef<HTMLCanvasElement | null>(null);
  const effectsRef = useRef<CanvasEffects | null>(null);

  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement | null>(null);
  const heroPriceRef = useRef<HTMLSpanElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const heroHpRef = useRef<HTMLSpanElement | null>(null);
  const heroSpeedRef = useRef<HTMLSpanElement | null>(null);
  const heroSprintRef = useRef<HTMLSpanElement | null>(null);
  const heroEngineRef = useRef<HTMLSpanElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);

  // Warp effect canvas (desktop only — phones skip it to stay at 60fps)
  useEffect(() => {
    if (!warpRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 768) return;
    const effects = new CanvasEffects(warpRef.current);
    effectsRef.current = effects;
    return () => effects.destroy();
  }, []);

  const applyCar = (id: string) => {
    const next = CARS_DATA.find((c) => c.id === id);
    if (!next) return;

    if (heroTitleRef.current) heroTitleRef.current.textContent = next.name;
    if (heroTaglineRef.current) heroTaglineRef.current.textContent = next.tagline;
    if (heroPriceRef.current) heroPriceRef.current.textContent = next.price;
    if (heroHpRef.current) heroHpRef.current.textContent = `${next.horsepower} HP`;
    if (heroSpeedRef.current) heroSpeedRef.current.textContent = `${next.topSpeed} km/h`;
    if (heroSprintRef.current) heroSprintRef.current.textContent = `${next.zeroToHundred}s`;
    if (heroEngineRef.current) heroEngineRef.current.textContent = next.engineDesc;
    if (kickerRef.current) kickerRef.current.textContent = `${next.brand.toUpperCase()}`;

    if (heroImageRef.current) {
      const img = heroImageRef.current;
      img.style.opacity = "0";
      img.style.transform = "scale(0.96) translateY(20px)";
      setTimeout(() => {
        img.src = next.images.hero;
        img.srcset = heroSrcSet(next.images.hero);
        img.alt = next.name;
        img.style.opacity = "1";
        img.style.transform = "scale(1) translateY(0px)";
      }, 150);
    }
  };

  // Sync hero with holodeck selection
  useEffect(() => {
    applyCar(heroCarId);
  }, [heroCarId]);

  return (
    <section id="hero-runway" className="hero-section">
      <div className="hero-backdrop">
        <canvas ref={warpRef} className="hero-warp-canvas"></canvas>
        <img
          ref={heroImageRef}
          src={car.images.hero}
          srcSet={heroSrcSet(car.images.hero)}
          sizes="100vw"
          alt={car.name}
          className="hero-bg-img"
          decoding="async"
        />
        <div className="hero-scrim"></div>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-top-status">
          <div className="live-status-pill">
            <span className="live-dot"></span>
            <span>APEX MOTORS - PRIVATE HYPERCAR COLLECTION</span>
          </div>
        </div>

        <div className="hero-main-showcase">
          <div className="hero-copy-block">
            <span ref={kickerRef} className="hero-kicker">
              {car.brand.toUpperCase()}
            </span>
            <h1 ref={heroTitleRef} className="hero-headline">
              {car.name}
            </h1>
            <span className="hero-slogan-line"></span>
            <p className="hero-slogan">
              Where velocity becomes an{" "}
              <span className="slogan-accent">art form</span>.
            </p>
            <p ref={heroTaglineRef} className="hero-subtext">
              {car.tagline}
            </p>
            <div className="hero-price-row">
              <span className="price-caption">FROM</span>
              <span ref={heroPriceRef} className="hero-price-display">
                {car.price}
              </span>
            </div>
            <div className="hero-cta-row">
              <a href="#holodeck-3d" className="btn-primary-glow">
                Explore in 3D
              </a>
              <a href="#hypercar-roster" className="btn-secondary-outline">
                View the Fleet
              </a>
            </div>
          </div>

          <div className="hero-hud-dock">
            <div className="hud-telemetry-cluster">
              <div className="hud-stat-box">
                <span className="hud-stat-label">POWER</span>
                <span ref={heroHpRef} className="hud-stat-val">
                  {car.horsepower} HP
                </span>
              </div>
              <div className="hud-stat-box">
                <span className="hud-stat-label">TOP SPEED</span>
                <span ref={heroSpeedRef} className="hud-stat-val">
                  {car.topSpeed} km/h
                </span>
              </div>
              <div className="hud-stat-box">
                <span className="hud-stat-label">0-100 KM/H</span>
                <span ref={heroSprintRef} className="hud-stat-val">
                  {car.zeroToHundred}s
                </span>
              </div>
              <div className="hud-stat-box wide">
                <span className="hud-stat-label">POWERTRAIN</span>
                <span ref={heroEngineRef} className="hud-stat-val">
                  {car.engineDesc}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-roster-switcher">
          {heroCars.map((hc) => (
            <button
              key={hc.id}
              className={`hero-car-nav-btn ${hc.id === heroCarId ? "active" : ""}`}
              data-hero-car={hc.id}
              type="button"
              onClick={() => setHeroCarId(hc.id)}
            >
              <span className="h-car-name">
                {hc.name
                  .replace(/Bugatti /i, "")
                  .replace(/Koenigsegg /i, "")
                  .replace(/Rimac /i, "")
                  .replace(/Pagani /i, "")
                  .replace(/Porsche /i, "")
                  .toUpperCase()}
              </span>
              <span className="h-car-hp">{hc.horsepower} HP</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}