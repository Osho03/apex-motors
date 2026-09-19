"use client";

import { useApp } from "@/components/AppProvider";
import { CARS_DATA } from "@/lib/data";

export default function GarageDrawer() {
  const { drawerOpen, setDrawerOpen, garage, toggleCar, garageValue, setVipOpen } =
    useApp();

  const cars = garage
    .map((id) => CARS_DATA.find((c) => c.id === id))
    .filter(Boolean) as (typeof CARS_DATA)[0][];

  const handleInquire = () => {
    setDrawerOpen(false);
    setVipOpen(true);
  };

  return (
    <>
      <div
        id="garage-backdrop"
        className={`modal-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <div
        id="garage-drawer"
        className={`garage-drawer ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Dream Garage"
      >
        <div className="garage-drawer-header">
          <div>
            <div className="section-badge">CURATED FLEET</div>
            <h3 className="garage-drawer-title">My Dream Garage</h3>
          </div>
          <button
            id="close-garage-drawer"
            className="drawer-close-btn"
            type="button"
            title="Close Drawer"
            onClick={() => setDrawerOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="garage-portfolio-summary">
          <span className="port-lbl">ESTIMATED PORTFOLIO VALUE</span>
          <span id="garage-total-value" className="port-val">
            {garageValue}
          </span>
        </div>

        <div
          id="garage-empty-state"
          className="garage-empty-state"
          style={{ display: cars.length === 0 ? "block" : "none" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h4>Your Garage is Empty</h4>
          <p>
            Browse our hypercar collection and click the heart emblem on any
            machine to add it to your fleet.
          </p>
        </div>

        <div id="garage-items-list" className="garage-items-list">
          {cars.map((car) => (
            <div key={car.id} className="garage-item-card" data-car-id={car.id}>
              <img
                src={car.images.studio || car.images.hero}
                alt={car.name}
                className="garage-item-img"
              />
              <div className="garage-item-info">
                <h4>{car.name}</h4>
                <span className="garage-item-engine">{car.engineDesc}</span>
                <span className="garage-item-price">{car.price}</span>
              </div>
              <button
                className="garage-remove-btn"
                data-remove-id={car.id}
                type="button"
                title="Remove from garage"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCar(car.id);
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="garage-drawer-footer">
          <button
            className="btn-primary-glow full-width"
            type="button"
            onClick={handleInquire}
          >
            INQUIRE ON SAVED FLEET
          </button>
        </div>
      </div>
    </>
  );
}