"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { CARS_DATA } from "@/lib/data";
import type { Hypercar } from "@/lib/types";

export default function CarModal() {
  const { modalCarId, closeCarModal, toggleCar, hasCar } = useApp();
  const car = modalCarId ? (CARS_DATA.find((c) => c.id === modalCarId) ?? null) : null;

  if (!car) return null;

  return (
    <>
      <div
        id="modal-backdrop"
        className="modal-backdrop open"
        onClick={closeCarModal}
      ></div>
      <div id="car-detail-modal" className="detail-modal open">
        <button
          id="close-car-modal"
          className="modal-close-btn"
          type="button"
          title="Close"
          onClick={closeCarModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <CarDetailBody
          car={car}
          hasCar={hasCar(car.id)}
          onToggle={() => toggleCar(car.id)}
          onClose={closeCarModal}
        />
      </div>
    </>
  );
}

function CarDetailBody({
  car,
  hasCar,
  onToggle,
  onClose,
}: {
  car: Hypercar;
  hasCar: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const [activeImg, setActiveImg] = useState<string>(
    car.images.studio || car.images.hero
  );

  return (
    <div id="modal-car-content" className="modal-scroll-body">
      <div className="modal-blueprint-layout">
        <div className="modal-left-media">
          <img src={activeImg} alt={car.name} className="modal-hero-photo" />
          <div className="modal-gallery-thumbs">
            {(
              [
                ["hero", car.images.hero],
                ["studio", car.images.studio],
                ["front", car.images.front],
                ["cockpit", car.images.cockpit],
              ] as const
            ).map(([key, src]) => (
              <img
                key={key}
                src={src}
                alt={key}
                className={`modal-thumb ${activeImg === src ? "active" : ""}`}
                onClick={() => setActiveImg(src)}
              />
            ))}
          </div>
        </div>

        <div className="modal-right-specs">
          <div className="modal-badge-row">
            {car.badges.map((b) => (
              <span key={b} className="badge-tag">
                {b}
              </span>
            ))}
          </div>
          <h2 className="modal-car-name">{car.name}</h2>
          <p className="modal-tagline">{car.tagline}</p>
          <div className="modal-price-hero">{car.price}</div>

          <div className="modal-spec-grid">
            <SpecBox label="POWERTRAIN" value={car.engineDesc} />
            <SpecBox label="HORSEPOWER" value={`${car.horsepower} HP`} />
            <SpecBox label="PEAK TORQUE" value={`${car.torque} Nm`} />
            <SpecBox label="TOP SPEED" value={`${car.topSpeed} km/h`} />
            <SpecBox label="0-100 KM/H" value={`${car.zeroToHundred}s`} />
            <SpecBox label="DRY WEIGHT" value={`${car.weight} kg`} />
            <SpecBox label="TRANSMISSION" value={car.transmission} />
            <SpecBox label="DOWNFORCE" value={car.downforce} />
          </div>

          <div className="modal-features-list">
            <h4>ENGINEERING HIGHLIGHTS</h4>
            <ul>
              {car.features.map((f) => (
                <li key={f}>
                  <span className="bullet-glow"></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-actions-row">
            <button className="btn-primary-glow" type="button" onClick={onToggle}>
              {hasCar ? "REMOVE FROM GARAGE" : "ADD TO GARAGE"}
            </button>
            <button className="btn-secondary-outline" type="button" onClick={onClose}>
              CLOSE SPEC SHEET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="modal-spec-box">
      <span className="ms-lbl">{label}</span>
      <span className="ms-val">{value}</span>
    </div>
  );
}