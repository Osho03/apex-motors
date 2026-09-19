"use client";

import { useEffect, useRef, useState } from "react";
import { CARS_DATA } from "@/lib/data";
import type { Hypercar } from "@/lib/types";

export default function Arena() {
  const [carAId, setCarAId] = useState(CARS_DATA[0].id);
  const [carBId, setCarBId] = useState(CARS_DATA[1].id);
  const [isRacing, setIsRacing] = useState(false);
  const [raceStatus, setRaceStatus] = useState("READY ON THE STARTING GRID");
  const [raceClass, setRaceClass] = useState("ready");

  const carA = CARS_DATA.find((c) => c.id === carAId) ?? CARS_DATA[0];
  const carB = CARS_DATA.find((c) => c.id === carBId) ?? CARS_DATA[1];

  const trackARef = useRef<HTMLDivElement | null>(null);
  const trackBRef = useRef<HTMLDivElement | null>(null);
  const speedARef = useRef<HTMLSpanElement | null>(null);
  const speedBRef = useRef<HTMLSpanElement | null>(null);
  const raceBtnRef = useRef<HTMLButtonElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const raceState = useRef({ isRacing: false });

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startSprintRace = () => {
    if (raceState.current.isRacing) return;
    raceState.current.isRacing = true;
    setIsRacing(true);
    setRaceStatus("SIMULATING 0-400 KM/H DRAG SPRINT...");
    setRaceClass("racing");
    if (raceBtnRef.current) raceBtnRef.current.setAttribute("disabled", "disabled");

    let progressA = 0;
    let progressB = 0;
    let speedA = 0;
    let speedB = 0;

    const accelA = (100 / carA.zeroToHundred) * 0.45;
    const accelB = (100 / carB.zeroToHundred) * 0.45;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      speedA += accelA * (Math.random() * 0.4 + 0.8);
      speedB += accelB * (Math.random() * 0.4 + 0.8);

      if (speedA > carA.topSpeed) speedA = carA.topSpeed;
      if (speedB > carB.topSpeed) speedB = carB.topSpeed;

      progressA += (speedA / 400) * 2.8;
      progressB += (speedB / 400) * 2.8;

      if (trackARef.current)
        trackARef.current.style.transform = `translateX(${Math.min(92, progressA)}%)`;
      if (trackBRef.current)
        trackBRef.current.style.transform = `translateX(${Math.min(92, progressB)}%)`;

      if (speedARef.current) speedARef.current.textContent = `${Math.round(speedA)} km/h`;
      if (speedBRef.current) speedBRef.current.textContent = `${Math.round(speedB)} km/h`;

      if (progressA >= 92 || progressB >= 92) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        raceState.current.isRacing = false;
        setIsRacing(false);
        if (raceBtnRef.current) raceBtnRef.current.removeAttribute("disabled");

        const winner = progressA > progressB ? carA : carB;
        setRaceStatus(`VICTORY: ${winner.name.toUpperCase()} DOMINATES THE SPRINT!`);
        setRaceClass("victory");
      }
    }, 40);
  };

  return (
    <section id="telemetry-arena" className="arena-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">HEAD-TO-HEAD</div>
          <h2 className="section-title">Telemetry & Sprint Comparison Arena</h2>
          <p className="section-desc">
            Select two machines from the fleet to analyze power-to-weight ratios,
            torque delivery, top speed dynamics, and simulate a real-time 0-400
            km/h drag sprint.
          </p>
        </div>

        <div className="arena-card-wrapper">
          <div className="arena-selectors-grid">
            <div className="selector-box">
              <label>CONTENDER A</label>
              <select
                id="compare-select-a"
                className="arena-select-box"
                value={carAId}
                onChange={(e) => setCarAId(e.target.value)}
              >
                {CARS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="vs-emblem">VS</div>
            <div className="selector-box">
              <label>CONTENDER B</label>
              <select
                id="compare-select-b"
                className="arena-select-box"
                value={carBId}
                onChange={(e) => setCarBId(e.target.value)}
              >
                {CARS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="arena-cards-row">
            <div id="compare-card-a" className="arena-contender-card">
              <CompareCard car={carA} label="A" />
            </div>
            <div id="compare-card-b" className="arena-contender-card">
              <CompareCard car={carB} label="B" />
            </div>
          </div>

          <div className="telemetry-hud-block">
            <h4 className="hud-block-title">
              HEAD-TO-HEAD TELEMETRY SPECIFICATIONS
            </h4>
            <div id="compare-telemetry-metrics" className="telemetry-bars-container">
              <MetricBar
                label="Horsepower"
                valA={carA.horsepower}
                valB={carB.horsepower}
                unit="HP"
                maxVal={2000}
                higherIsBetter
                format={(v) => `${v}`}
              />
              <MetricBar
                label="Peak Torque"
                valA={carA.torque}
                valB={carB.torque}
                unit="Nm"
                maxVal={2500}
                higherIsBetter
                format={(v) => `${v}`}
              />
              <MetricBar
                label="Top Speed"
                valA={carA.topSpeed}
                valB={carB.topSpeed}
                unit="km/h"
                maxVal={550}
                higherIsBetter
                format={(v) => `${v}`}
              />
              <MetricBar
                label="0-100 km/h Sprint"
                valA={carA.zeroToHundred}
                valB={carB.zeroToHundred}
                unit="s"
                maxVal={4.0}
                higherIsBetter={false}
                format={(v) => v.toFixed(1)}
              />
              <MetricBar
                label="Curb Weight"
                valA={carA.weight}
                valB={carB.weight}
                unit="kg"
                maxVal={2500}
                higherIsBetter={false}
                format={(v) => `${v}`}
              />
              <MetricBar
                label="Power-to-Weight"
                valA={carA.horsepower / (carA.weight / 1000)}
                valB={carB.horsepower / (carB.weight / 1000)}
                unit="HP/Ton"
                maxVal={1200}
                higherIsBetter
                format={(v) => v.toFixed(1)}
              />
            </div>
          </div>

          <div className="drag-race-simulator">
            <div className="race-header">
              <div className="race-title">0-400 KM/H DRAG STRIP SIMULATOR</div>
              <div id="race-winner-banner" className={`race-banner ${raceClass}`}>
                {raceStatus}
              </div>
            </div>

            <div className="drag-track-lane">
              <div className="lane-label">LANE 1</div>
              <div className="lane-surface">
                <div id="race-car-track-a" ref={trackARef} className="race-car-dot">
                  <span className="race-tag">A</span>
                  <span ref={speedARef} className="race-speed-tag">
                    0 km/h
                  </span>
                </div>
              </div>
            </div>

            <div className="drag-track-lane">
              <div className="lane-label">LANE 2</div>
              <div className="lane-surface">
                <div id="race-car-track-b" ref={trackBRef} className="race-car-dot alt">
                  <span className="race-tag">B</span>
                  <span ref={speedBRef} className="race-speed-tag">
                    0 km/h
                  </span>
                </div>
              </div>
            </div>

            <div className="race-action-footer">
              <button
                ref={raceBtnRef}
                id="btn-start-sim-race"
                className="btn-start-race"
                type="button"
                onClick={startSprintRace}
                disabled={isRacing}
              >
                <span>LAUNCH DRAG SPRINT</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareCard({ car, label }: { car: Hypercar; label: string }) {
  return (
    <div className="compare-car-box" style={{ "--accent-car": car.colors[0]?.accent || "#00f0ff" } as React.CSSProperties}>
      <div className="compare-badge-pill">CONTENDER {label}</div>
      <img
        src={car.images.studio || car.images.hero}
        alt={car.name}
        className="compare-car-thumb"
      />
      <h3 className="compare-car-title">{car.name}</h3>
      <p className="compare-car-engine">{car.engineDesc}</p>
      <div className="compare-price-tag">{car.price}</div>
    </div>
  );
}

function MetricBar({
  label,
  valA,
  valB,
  unit,
  maxVal,
  higherIsBetter,
  format,
}: {
  label: string;
  valA: number;
  valB: number;
  unit: string;
  maxVal: number;
  higherIsBetter: boolean;
  format: (v: number) => string;
}) {
  const pctA = Math.min(100, (valA / maxVal) * 100);
  const pctB = Math.min(100, (valB / maxVal) * 100);
  const aWins = higherIsBetter ? valA > valB : valA < valB;
  const bWins = higherIsBetter ? valB > valA : valB < valA;

  return (
    <div className="telemetry-bar-row">
      <div className="metric-header">
        <span className={`val-a ${aWins ? "winner-text" : ""}`}>
          {format(valA)} {unit}
        </span>
        <span className="metric-name">{label}</span>
        <span className={`val-b ${bWins ? "winner-text" : ""}`}>
          {format(valB)} {unit}
        </span>
      </div>
      <div className="metric-bars-track">
        <div className="bar-left-wrapper">
          <div
            className={`metric-bar bar-a ${aWins ? "bar-winner" : ""}`}
            style={{ width: `${pctA}%` }}
          ></div>
        </div>
        <div className="bar-divider"></div>
        <div className="bar-right-wrapper">
          <div
            className={`metric-bar bar-b ${bWins ? "bar-winner" : ""}`}
            style={{ width: `${pctB}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}