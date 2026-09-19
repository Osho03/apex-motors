"use client";

import { useEffect, useRef, useState } from "react";
import { audioEngine } from "@/lib/audioEngine";

export default function Chamber() {
  const [engineType, setEngineType] = useState("v8");
  const pedalRef = useRef<HTMLButtonElement | null>(null);
  const rpmRef = useRef<HTMLSpanElement | null>(null);
  const needleRef = useRef<HTMLDivElement | null>(null);
  const shiftLedsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Connect audio engine RPM listener to visual HUD
    return audioEngine.onRPMChange((data) => {
      if (rpmRef.current) rpmRef.current.textContent = data.rpm.toLocaleString();
      if (needleRef.current) {
        const degrees = -120 + data.percent * 240;
        needleRef.current.style.transform = `rotate(${degrees}deg)`;
      }
      const leds = shiftLedsRef.current;
      if (leds) {
        const ledEls = Array.from(leds.querySelectorAll(".shift-light-led"));
        const activeCount = Math.floor(data.percent * ledEls.length);
        ledEls.forEach((led, i) => {
          led.classList.toggle("lit", i <= activeCount);
          if (data.percent > 0.88) {
            led.classList.add("flash-redline");
          } else {
            led.classList.remove("flash-redline");
          }
        });
      }
    });
  }, []);

  const handleEngineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEngineType(e.target.value);
    audioEngine.setEngineType(e.target.value as never);
  };

  const startRev = (e: React.SyntheticEvent) => {
    e.preventDefault();
    pedalRef.current?.classList.add("pressed");
    audioEngine.pressThrottle();
  };

  const stopRev = (e: React.SyntheticEvent) => {
    e.preventDefault();
    pedalRef.current?.classList.remove("pressed");
    audioEngine.releaseThrottle();
  };

  const handleStop = () => {
    pedalRef.current?.classList.remove("pressed");
    audioEngine.stop();
  };

  return (
    <section id="acoustic-chamber" className="chamber-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">ACOUSTIC SYNTHESIZER</div>
          <h2 className="section-title">The Symphony of Horsepower</h2>
          <p className="section-desc">
            Experience real-time engine acoustics synthesized with the Web Audio
            API. Hold down the gas pedal to rev up to the 9,500 RPM redline,
            trigger turbo spool, and hear exhaust backfires.
          </p>
        </div>

        <div className="acoustic-chamber-box">
          <div className="chamber-engine-header">
            <label>ENGINE ARCHITECTURE:</label>
            <select
              id="chamber-engine-select"
              className="chamber-engine-select"
              value={engineType}
              onChange={handleEngineChange}
            >
              <option value="v8">5.0L Flat-Plane Twin-Turbo V8 (Jesko)</option>
              <option value="boxer6">4.0L Atmospheric Flat-6 (Porsche GT3 RS)</option>
              <option value="ev">Quad Permanent-Magnet EV Hyperdrive (Rimac)</option>
            </select>
          </div>

          <div className="tachometer-instrument-cluster">
            <div className="shift-lights-bar" ref={shiftLedsRef}>
              <div className="shift-light-led green"></div>
              <div className="shift-light-led green"></div>
              <div className="shift-light-led yellow"></div>
              <div className="shift-light-led yellow"></div>
              <div className="shift-light-led red"></div>
              <div className="shift-light-led red"></div>
              <div className="shift-light-led blue"></div>
              <div className="shift-light-led blue"></div>
            </div>

            <div className="tachometer-gauge-wrapper">
              <div className="gauge-dial-outer">
                <div className="gauge-tick-marks"></div>
                <div ref={needleRef} id="rev-tachometer-needle" className="gauge-needle"></div>
                <div className="gauge-center-cap">
                  <div className="center-rpm-display">
                    <span ref={rpmRef} id="rev-chamber-rpm-val">
                      900
                    </span>
                    <span className="center-rpm-label">RPM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="throttle-pedal-stage">
            <button
              id="interactive-gas-pedal"
              ref={pedalRef}
              className="interactive-pedal-btn"
              type="button"
              onMouseDown={startRev}
              onMouseUp={stopRev}
              onMouseLeave={stopRev}
              onTouchStart={startRev}
              onTouchEnd={stopRev}
            >
              <div className="pedal-ribs"></div>
              <div className="pedal-content">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <span className="pedal-title">HOLD THROTTLE PEDAL</span>
                <span className="pedal-sub">REV ENGINE TO REDLINE</span>
              </div>
            </button>
            <p className="pedal-instructions">
              Click and HOLD pedal (or touch screen) to spool boost and open
              throttle valves
            </p>
            <button
              id="chamber-engine-stop-btn"
              className="chamber-stop-btn"
              type="button"
              onClick={handleStop}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="5" width="14" height="14" rx="2"></rect>
              </svg>
              <span>SHUT DOWN ENGINE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}