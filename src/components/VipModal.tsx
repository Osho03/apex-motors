"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/AppProvider";
import { CONTACT_FORM_ENDPOINT } from "@/lib/site-config";

type Status = "idle" | "sending" | "success" | "error";

const VENUES = [
  "Circuit Paul Ricard (France)",
  "Nürburgring Nordschleife (Germany)",
  "Yas Marina F1 Circuit (Abu Dhabi)",
  "The Thermal Club (California)",
  "Silverstone Circuit (UK)",
];

const VEHICLES = [
  "Bugatti Chiron Super Sport 300+",
  "Koenigsegg Jesko Absolut",
  "Porsche 911 GT3 RS",
  "Pagani Utopia (Manual V12)",
  "Rimac Nevera Time Attack",
  "Aston Martin Valkyrie AMR Pro",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  venue: VENUES[0],
  vehicle: VEHICLES[0],
  message: "",
};

export default function VipModal() {
  const { vipOpen, setVipOpen, showToast } = useApp();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const update = (field: keyof typeof EMPTY_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const close = () => setVipOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "VIP Consultation Request — APEX MOTORS",
          _template: "table",
          _captcha: "false",
          _honey: "",
          name: form.name,
          email: form.email,
          phone: form.phone || "—",
          venue: form.venue,
          vehicle: form.vehicle,
          message: form.message || "—",
        }),
      });

      if (!res.ok) throw new Error(`Delivery failed (HTTP ${res.status})`);
      const data = await res.json();
      if (data.success === "false") {
        throw new Error(data.message || "Delivery failed");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
      showToast("Request delivered. Our concierge will contact you within 2 hours.");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Delivery failed");
    }
  };

  return (
    <Dialog.Root open={vipOpen} onOpenChange={setVipOpen}>
      <AnimatePresence>
        {vipOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="modal-backdrop open motion-host"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                id="vip-booking-modal"
                className="detail-modal vip-modal open motion-host"
                initial={{ opacity: 0, x: "-50%", y: "-46%", scale: 0.96 }}
                animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                exit={{ opacity: 0, x: "-50%", y: "-46%", scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Close asChild>
                  <button
                    id="close-vip-modal"
                    className="modal-close-btn"
                    type="button"
                    title="Close"
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
                </Dialog.Close>

        <div className="vip-layout" data-lenis-prevent>
          <aside className="vip-aside">
            <div className="vip-aside-emblem">◆</div>
            <div className="section-badge">PRIVATE CONSULTANCY</div>
            <h3 className="vip-aside-title">
              A private office for automotive acquisition.
            </h3>
            <ul className="vip-aside-list">
              <li>Bespoke allocation of limited production hypercars</li>
              <li>Private track sessions with factory telemetry support</li>
              <li>Discreet logistics, registration &amp; delivery worldwide</li>
            </ul>
            <div className="vip-aside-spacer"></div>
            <div className="vip-aside-meta">
              <span>RESPONSE WITHIN 24 HOURS</span>
              <span>STRICTLY CONFIDENTIAL</span>
            </div>
          </aside>

          <div className="vip-form-side">
            {status === "success" ? (
              <div className="vip-success">
                <div className="vip-success-mark">✓</div>
                <Dialog.Title asChild>
                  <h3 className="vip-modal-title">Request received</h3>
                </Dialog.Title>
                <p className="vip-modal-desc">
                  Our concierge will contact you within two hours to schedule your
                  consultation.
                </p>
                <button type="button" className="btn-primary-glow" onClick={close}>
                  DONE
                </button>
              </div>
            ) : (
              <>
                <div className="section-badge">BOOK A CONSULTATION</div>
                <Dialog.Title asChild>
                  <h2 className="vip-modal-title">Private consultation</h2>
                </Dialog.Title>
                <p className="vip-modal-desc">
                  Share your requirements. A dedicated concierge will respond within two hours.
                </p>

                <form id="vip-booking-form" className="vip-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="vip-name">FULL NAME</label>
                      <input
                        id="vip-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={update("name")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="vip-email">EMAIL ADDRESS</label>
                      <input
                        id="vip-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={update("email")}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="vip-phone">PHONE <span className="opt-tag">OPTIONAL</span></label>
                      <input
                        id="vip-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+00 000 000 0000"
                        value={form.phone}
                        onChange={update("phone")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="vip-vehicle">VEHICLE OF INTEREST</label>
                      <select
                        id="vip-vehicle"
                        value={form.vehicle}
                        onChange={update("vehicle")}
                      >
                        {VEHICLES.map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vip-venue">PREFERRED VENUE</label>
                    <select id="vip-venue" value={form.venue} onChange={update("venue")}>
                      {VENUES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vip-message">PREFERENCES</label>
                    <textarea
                      id="vip-message"
                      rows={3}
                      placeholder="Telemetry analysis, delivery logistics, or bespoke specification..."
                      value={form.message}
                      onChange={update("message")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-glow full-width"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "SUBMITTING..." : "SUBMIT REQUEST"}
                  </button>

                  {status === "error" && (
                    <p className="vip-form-error">Unable to deliver request. {error}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}