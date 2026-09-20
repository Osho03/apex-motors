"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { HOLO_CONFIGS } from "@/lib/holodeck-config";
import type { ThreeDStage } from "@/lib/holodeck";

export default function Holodeck() {
  const { heroCarId, setHeroCarId } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<ThreeDStage | null>(null);
  const [noWebGL, setNoWebGL] = useState(false);
  const [stageReady, setStageReady] = useState(false);
  const [autoOrbit, setAutoOrbit] = useState(true);
  const lastAppliedRef = useRef<string | null>(null);

  const cfg = HOLO_CONFIGS[heroCarId] ?? HOLO_CONFIGS["bugatti-chiron-ss"];
  const embedSrc = cfg.embed;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || embedSrc) return;

    let stage: ThreeDStage | null = null;
    let disposed = false;

    void import("@/lib/holodeck").then(({ ThreeDStage }) => {
      if (disposed || !canvasRef.current || !containerRef.current) return;
      stage = new ThreeDStage(
      canvasRef.current,
      containerRef.current,
      (id) => setHeroCarId(id)
      );
      stage.onNoWebGL = () => setNoWebGL(true);
      stageRef.current = stage;
      stage.init();
    });

    return () => {
      disposed = true;
      stage?.destroy();
      stageRef.current = null;
    };
  }, [embedSrc, setHeroCarId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || stageReady) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStageReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [stageReady]);

  // Pause the procedural renderer while a Sketchfab embed is active
  useEffect(() => {
    stageRef.current?.setPaused(Boolean(embedSrc));
  }, [embedSrc]);

  // Sync 3D stage when the shared hero/holodeck car changes
  useEffect(() => {
    if (lastAppliedRef.current === heroCarId) return;
    lastAppliedRef.current = heroCarId;
    stageRef.current?.setCar(heroCarId, true);
  }, [heroCarId]);

  const handleSelect = (id: string) => {
    if (id === heroCarId) return;
    setHeroCarId(id);
  };

  const handleOrbitChange = (checked: boolean) => {
    setAutoOrbit(checked);
    stageRef.current?.setOrbitEnabled(checked);
  };

  return (
    <section id="holodeck-3d" className="holodeck-section">
      <div className="holo-backdrop-glow"></div>

      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">REALTIME 3D HOLODECK</div>
          <h2 className="section-title">The Museum of Speed in Living 3D</h2>
          <p className="section-desc">
            Procedurally rendered in real-time WebGL. Drag to orbit, scroll to
            zoom. Every hypercar is displayed with cinematic studio reflections,
            painted underglow, and a slowly revolving turntable stage.
          </p>
        </div>

        <div id="holo-stage" ref={containerRef} className="holo-canvas-frame">
          <canvas
            ref={canvasRef}
            id="holodeck-canvas"
            style={{ display: embedSrc ? "none" : "block" }}
          ></canvas>

          {embedSrc && stageReady && (
            <iframe
              src={embedSrc}
              title={cfg.name}
              className="holo-embed-frame"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              web-share="true"
              loading="lazy"
            ></iframe>
          )}

          <div className="holo-hud-chip">
            <span className="live-dot"></span>
            <span>{embedSrc ? "3D MODEL RENDER - LIVE" : "WEBGL RENDER - LIVE"}</span>
          </div>

          {!embedSrc && (
            <div className="holo-hint-corner">
              DRAG TO ORBIT&nbsp;&nbsp;-&nbsp;&nbsp;SCROLL TO ZOOM
            </div>
          )}

          <div className="holo-model-tag">
            <span id="holo-model-name">{cfg.name}</span>
            <span id="holo-model-stat">{cfg.stat}</span>
          </div>

          <div id="holo-no-webgl" className="holo-no-webgl" hidden={!noWebGL}>
            WEBGL IS NOT AVAILABLE ON THIS DEVICE
          </div>
        </div>

        <div className="holo-controls-row">
          <div className="holo-car-selector">
            {Object.entries(HOLO_CONFIGS).map(([id, item]) => (
              <button
                key={id}
                className={`holo-car-btn ${heroCarId === id ? "active" : ""}`}
                data-holo-car={id}
                type="button"
                onClick={() => handleSelect(id)}
              >
                <span className="hc-name">
                  {item.name.replace("BUGATTI ", "").replace("KOENIGSEGG ", "").replace("RIMAC ", "").replace("PAGANI ", "").replace("PORSCHE ", "").replace(" SUPER SPORT", "").replace(" 911 GT3 RS", " GT3 RS")}
                </span>
                <span className="hc-hp">{item.stat.split(" // ")[0]}</span>
              </button>
            ))}
          </div>

          <label className="holo-auto-orbit-toggle">
            <input
              type="checkbox"
              id="holo-auto-orbit"
              checked={autoOrbit}
              onChange={(e) => handleOrbitChange(e.target.checked)}
            />
            <span>AUTO ORBIT</span>
          </label>
        </div>
      </div>
    </section>
  );
}
