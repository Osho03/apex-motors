"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useApp } from "@/components/AppProvider";
import { CARS_DATA, CATEGORY_LABELS } from "@/lib/data";

const FILTERS = ["all", "hypercar", "electric-concept", "art-in-motion", "track-beast"];

export default function Roster() {
  const { hasCar, toggleCar, openCarModal } = useApp();
  const [activeCat, setActiveCat] = useState("all");

  const filtered =
    activeCat === "all"
      ? CARS_DATA
      : CARS_DATA.filter((c) => c.category === activeCat);

  return (
    <section id="hypercar-roster" className="roster-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">THE APEX VAULT</div>
          <h2 className="section-title">World&apos;s Most Prestigious Fleet</h2>
          <p className="section-desc">
            Engineered beyond the boundaries of physics. Select any machine to
            inspect full telemetry, powertrain blueprints, and track capability.
          </p>

          <div className="roster-filters-bar">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                className={`roster-filter-pill ${activeCat === cat ? "active" : ""}`}
                data-category={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        <div id="roster-cards-grid" className="roster-cards-grid">
          {filtered.map((car, index) => (
            <SupercarCard
              key={car.id}
              car={car}
              index={index}
              inGarage={hasCar(car.id)}
              onFav={() => toggleCar(car.id)}
              onExplore={() => openCarModal(car.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SupercarCard({
  car,
  index,
  inGarage,
  onFav,
  onExplore,
}: {
  car: (typeof CARS_DATA)[0];
  index: number;
  inGarage: boolean;
  onFav: () => void;
  onExplore: () => void;
}) {
  const shellRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const shell = shellRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    if (shell) {
      shell.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleLeave = () => {
    const shell = shellRef.current;
    if (shell) {
      shell.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div
      className="supercar-card"
      data-car-id={car.id}
      style={{ "--i": index } as React.CSSProperties}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={shellRef} className="card-glass-shell">
        <div className="card-top-row">
          <span className="card-brand">{car.brand}</span>
          <button
            className={`card-garage-fav-btn ${inGarage ? "active" : ""}`}
            data-fav-id={car.id}
            type="button"
            title="Add to Dream Garage"
            onClick={(e) => {
              e.stopPropagation();
              onFav();
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={inGarage ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div className="card-image-wrapper">
          <Image
            src={car.images.studio || car.images.hero}
            alt={car.name}
            className="card-car-img"
            width={640}
            height={380}
            quality={80}
            sizes="(max-width: 767px) 94vw, (max-width: 1280px) 50vw, 640px"
          />
          <div
            className="card-glow-halo"
            style={{ "--halo-color": car.colors[0]?.hex || "#00f0ff" } as React.CSSProperties}
          ></div>
        </div>

        <div className="card-info-content">
          <h3 className="card-car-name">{car.name}</h3>
          <p className="card-car-engine">{car.engineDesc}</p>

          <div className="card-specs-matrix">
            <div className="spec-matrix-item">
              <span className="spec-lbl">POWER</span>
              <span className="spec-val">{car.horsepower} HP</span>
            </div>
            <div className="spec-matrix-item">
              <span className="spec-lbl">0-100</span>
              <span className="spec-val">{car.zeroToHundred}s</span>
            </div>
            <div className="spec-matrix-item">
              <span className="spec-lbl">MAX</span>
              <span className="spec-val">{car.topSpeed} km/h</span>
            </div>
          </div>

          <div className="card-footer-action">
            <span className="card-price-value">{car.price}</span>
            <button
              className="btn-card-explore"
              data-explore-id={car.id}
              type="button"
              onClick={onExplore}
            >
              <span>TELEMETRY</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}