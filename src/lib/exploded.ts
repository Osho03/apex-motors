const ICON_STROKE = "#f5f6f7";
const ICON_PARAMS = `fill="none" stroke="${ICON_STROKE}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;

export const PART_ICON_SVG = {
  shield: `<svg viewBox="0 0 24 24" ${ICON_PARAMS}><path d="M12 3l7 2.6v5.1c0 4.4-2.9 7.7-7 9.3-4.1-1.6-7-4.9-7-9.3V5.6L12 3z"/><path d="M9 11.5l2.2 2.2 4-4"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" ${ICON_PARAMS}><path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" ${ICON_PARAMS}><circle cx="12" cy="12" r="3.1"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.1 5.1l2.1 2.1M16.8 16.8l2.1 2.1M18.9 5.1l-2.1 2.1M7.2 16.8l-2.1 2.1"/></svg>`,
  wing: `<svg viewBox="0 0 24 24" ${ICON_PARAMS}><path d="M3 12.5h13"/><path d="M11 8l5 4.5-5 4.5"/><path d="M19 8v10"/></svg>`,
  disc: `<svg viewBox="0 0 24 24" ${ICON_PARAMS}><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3"/></svg>`,
};

export interface PartHotspot {
  top: string;
  left: string;
}

export interface ExplodedPartData {
  id: string;
  name: string;
  desc: string;
  spec: string;
  weight: string;
  icon: string;
  hotspot: PartHotspot;
}

export interface BrandParts {
  brandName: string;
  modelName: string;
  accentColor: string;
  glowColor: string;
  parts: ExplodedPartData[];
}

export type ExplodedPart = string;

export const BRAND_PARTS_DATA: Record<string, BrandParts> = {
  bugatti: {
    brandName: "BUGATTI",
    modelName: "Chiron Super Sport 300+",
    accentColor: "#0047bb",
    glowColor: "rgba(0, 71, 187, 0.4)",
    parts: [
      {
        id: "monocoque",
        name: "Full Carbon-Fiber Monocoque",
        desc: "Structural torsional rigidity of 50,000 Nm per degree, matching Le Mans LMP1 race prototypes.",
        spec: "50,000 Nm/deg",
        weight: "148 kg",
        icon: "shield",
        hotspot: { top: "30%", left: "45%" },
      },
      {
        id: "powertrain",
        name: "8.0L Quad-Turbocharged W16",
        desc: "Four two-stage turbochargers delivering 1,577 HP and 1,600 Nm of torque across a massive rev range.",
        spec: "1,577 HP - 1,600 Nm",
        weight: "436 kg",
        icon: "bolt",
        hotspot: { top: "52%", left: "62%" },
      },
      {
        id: "wheels",
        name: "Magnesium Forged Wheels & Michelin Pilot Sport Cup 2",
        desc: "Tested on military aircraft testbenches up to 500 km/h (300+ mph) under extreme centrifugal load.",
        spec: "300+ MPH Rated",
        weight: "19 kg / wheel",
        icon: "gear",
        hotspot: { top: "68%", left: "25%" },
      },
      {
        id: "aero",
        name: "Active Aerodynamic Longtail Wing & Airbrake",
        desc: "Hydraulically actuated rear wing deploying from 0° downforce to full 600 kg high-speed attack mode.",
        spec: "600 kg Downforce",
        weight: "32 kg",
        icon: "wing",
        hotspot: { top: "18%", left: "80%" },
      },
      {
        id: "brakes",
        name: "AP Racing Carbon-Ceramic Brakes (420mm)",
        desc: "8-piston front monobloc calipers forged from aerospace-grade titanium with high heat dissipation.",
        spec: "420mm Front Rotors",
        weight: "8.4 kg",
        icon: "disc",
        hotspot: { top: "62%", left: "75%" },
      },
    ],
  },
  porsche: {
    brandName: "PORSCHE",
    modelName: "911 GT3 RS (992)",
    accentColor: "#d90429",
    glowColor: "rgba(217, 4, 41, 0.4)",
    parts: [
      {
        id: "monocoque",
        name: "Lightweight Aluminum-Steel Hybrid Chassis",
        desc: "Integrated carbon-fiber roll cage with high-strength structural bonding engineered in Weissach.",
        spec: "Weissach Light Tub",
        weight: "135 kg",
        icon: "shield",
        hotspot: { top: "30%", left: "45%" },
      },
      {
        id: "powertrain",
        name: "4.0L High-Revving Atmospheric Boxer-6",
        desc: "Naturally aspirated screamer revving to 9,000 RPM with individual throttle valves and dry sump lubrication.",
        spec: "518 HP @ 8,500 RPM",
        weight: "204 kg",
        icon: "bolt",
        hotspot: { top: "54%", left: "72%" },
      },
      {
        id: "wheels",
        name: "Forged Magnesium Center-Lock Wheels",
        desc: "Saves 8.6 kg of unsprung rotational mass, wrapped in ultra-sticky Michelin Cup 2 R rubber.",
        spec: "Center-Lock Alloy",
        weight: "14.5 kg / wheel",
        icon: "gear",
        hotspot: { top: "68%", left: "25%" },
      },
      {
        id: "aero",
        name: "Swan-Neck Active Rear Wing with DRS",
        desc: "F1-style Drag Reduction System actuated via steering wheel button, delivering up to 860 kg of downforce.",
        spec: "860 kg @ 285 km/h",
        weight: "22 kg",
        icon: "wing",
        hotspot: { top: "15%", left: "82%" },
      },
      {
        id: "brakes",
        name: "Porsche Ceramic Composite Brakes (PCCB)",
        desc: "410mm internal vented and cross-drilled ceramic discs with 6-piston aluminum monobloc fixed calipers.",
        spec: "410mm PCCB Discs",
        weight: "6.2 kg",
        icon: "disc",
        hotspot: { top: "62%", left: "75%" },
      },
    ],
  },
  koenigsegg: {
    brandName: "KOENIGSEGG",
    modelName: "Jesko Absolut",
    accentColor: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.4)",
    parts: [
      {
        id: "monocoque",
        name: "Carbon-Fiber Honeycomb Monocoque",
        desc: "World's highest production torsional rigidity at 65,000 Nm per degree with integrated fuel tank.",
        spec: "65,000 Nm/deg",
        weight: "128 kg",
        icon: "shield",
        hotspot: { top: "30%", left: "45%" },
      },
      {
        id: "powertrain",
        name: "5.0L Twin-Turbo Flat-Plane V8 (E85)",
        desc: "World's lightest V8 crankshaft (12.5 kg), 1,600 HP output, and Koenigsegg Air-Injection spool system.",
        spec: "1,600 HP - 1,500 Nm",
        weight: "189 kg",
        icon: "bolt",
        hotspot: { top: "52%", left: "62%" },
      },
      {
        id: "wheels",
        name: "Aircore Hollow Carbon-Fiber Wheels",
        desc: "Super-lightweight 100% hollow pre-preg carbon fiber wheels with integrated center-lock nut.",
        spec: "Hollow Carbon-Fiber",
        weight: "5.9 kg / wheel",
        icon: "gear",
        hotspot: { top: "68%", left: "25%" },
      },
      {
        id: "aero",
        name: "Low-Drag Twin Fighter-Jet Vertical Fins",
        desc: "Replaces traditional spoiler to achieve unprecedented low drag coefficient of Cd 0.278 for 530+ km/h.",
        spec: "Cd 0.278 Low-Drag",
        weight: "11 kg",
        icon: "wing",
        hotspot: { top: "18%", left: "80%" },
      },
      {
        id: "brakes",
        name: "Koenigsegg In-House Ventilated Ceramic Rotors",
        desc: "397mm front and 380mm rear ceramic discs engineered for 500+ km/h to zero emergency deceleration.",
        spec: "397mm F1 Spec",
        weight: "5.6 kg",
        icon: "disc",
        hotspot: { top: "62%", left: "75%" },
      },
    ],
  },
};