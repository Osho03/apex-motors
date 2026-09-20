"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { CARS_DATA } from "@/lib/data";

export default function MobileDock() {
  const { garageCount, openCarModal, setDrawerOpen } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return CARS_DATA.slice(0, 5);
    return CARS_DATA.filter((car) =>
      [car.name, car.brand, car.category, car.engineDesc]
        .join(" ")
        .toLowerCase()
        .includes(term)
    ).slice(0, 8);
  }, [query]);

  const goHome = () => {
    document.querySelector("#hero-runway")?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseCar = (id: string) => {
    setSearchOpen(false);
    setQuery("");
    openCarModal(id);
  };

  return (
    <>
      <nav className="mobile-dock" aria-label="Quick navigation">
        <button className="mobile-dock-button" type="button" onClick={goHome} aria-label="Home">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 9.2 8.3v10.7h-5.7v-6.4H8.5v6.4H2.8V10.8L12 2.5Z" /></svg>
          <span>Home</span>
        </button>
        <button className="mobile-dock-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search vehicles">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
          <span>Search</span>
        </button>
        <a className="mobile-dock-button" href="/signin" aria-label="Sign in">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a5.5 5.5 0 0 1 3.1 10 9 9 0 0 1 5.9 8.2.75.75 0 1 1-1.5 0 7.5 7.5 0 0 0-15 0 .75.75 0 1 1-1.5 0 9 9 0 0 1 5.9-8.2A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" /></svg>
          <span>Account</span>
        </a>
        <button className="mobile-dock-button mobile-dock-garage" type="button" onClick={() => setDrawerOpen(true)} aria-label={`Open garage, ${garageCount} vehicles`}>
          <span className="mobile-dock-count" aria-hidden="true">{garageCount}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M2 3h3l2.5 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.5L22 7H6" /></svg>
          <span>Garage</span>
        </button>
      </nav>

      <div className={`mobile-search-sheet ${searchOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Search the fleet" aria-hidden={!searchOpen}>
        <button className="mobile-search-backdrop" type="button" tabIndex={searchOpen ? 0 : -1} onClick={() => setSearchOpen(false)} aria-label="Close search" />
        <section className="mobile-search-panel">
          <div className="mobile-search-heading">
            <div><small>APEX DATABASE</small><h2>Find your machine</h2></div>
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button>
          </div>
          <label className="mobile-search-input">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
            <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a car or brand" />
          </label>
          <p className="mobile-search-status">{query ? `${results.length} matching vehicles` : "Featured vehicles"}</p>
          <div className="mobile-search-results">
            {results.map((car) => <button key={car.id} type="button" onClick={() => chooseCar(car.id)}><span><small>{car.brand}</small><strong>{car.name}</strong></span><em>{car.price}</em></button>)}
            {results.length === 0 && <p className="mobile-search-empty">No vehicle found. Try a brand, model, or engine.</p>}
          </div>
        </section>
      </div>
    </>
  );
}
