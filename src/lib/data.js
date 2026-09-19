// Hypercar Roster & Specifications Data
export const CARS_DATA = [
  {
    id: "bugatti-chiron-ss",
    name: "Bugatti Chiron Super Sport 300+",
    brand: "Bugatti",
    category: "hypercar",
    tagline: "The World's First 300+ MPH Production Hypercar",
    year: 2024,
    price: "$3,900,000",
    engineType: "w16",
    engineDesc: "8.0L Quad-Turbocharged W16",
    horsepower: 1577,
    torque: 1600, // Nm
    topSpeed: 490, // km/h
    zeroToHundred: 2.2, // s
    zeroToTwoHundred: 5.8, // s
    weight: 1978, // kg
    transmission: "7-Speed Dual-Clutch Ricardo",
    drivetrain: "All-Wheel Drive (AWD)",
    downforce: "600 kg @ 400 km/h",
    soundProfile: {
      type: "w16",
      baseFreq: 58,
      maxFreq: 420,
      rumbleDepth: 0.85,
      turboSpool: true,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Jet Carbon Black", hex: "#0b0c10", accent: "#ff3e3e" },
      { name: "Le Mans French Racing Blue", hex: "#0047bb", accent: "#ffffff" },
      { name: "Titanium Silver", hex: "#d1d5db", accent: "#ff6b00" }
    ],
    features: [
      "Longtail aerodynamic carbon fiber body",
      "Magnesium wheels with Michelin Pilot Sport Cup 2 tires",
      "Quad active titanium exhaust system",
      "Monocoque structure with structural rigidity of 50,000 Nm/deg"
    ],
    badges: ["Record Breaker", "Quad-Turbo", "Iconic W16"]
  },
  {
    id: "koenigsegg-jesko-absolut",
    name: "Koenigsegg Jesko Absolut",
    brand: "Koenigsegg",
    category: "hypercar",
    tagline: "The Fastest Koenigsegg Ever Made, And Ever Will Be Made",
    year: 2025,
    price: "$3,400,000",
    engineType: "v8",
    engineDesc: "5.0L Twin-Turbo Flat-Plane V8 (E85)",
    horsepower: 1600,
    torque: 1500, // Nm
    topSpeed: 531, // km/h (Theoretical simulation)
    zeroToHundred: 2.1, // s
    zeroToTwoHundred: 4.8, // s
    weight: 1390, // kg
    transmission: "9-Speed Light Speed Transmission (LST)",
    drivetrain: "Rear-Wheel Drive (RWD) with e-diff",
    downforce: "150 kg (Low Drag Configuration)",
    soundProfile: {
      type: "v8",
      baseFreq: 75,
      maxFreq: 520,
      rumbleDepth: 0.9,
      turboSpool: true,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Stealth Satin Carbon", hex: "#1c1e24", accent: "#ff8c00" },
      { name: "Ghost White", hex: "#f3f4f6", accent: "#00d2ff" },
      { name: "Tang Orange", hex: "#ff5900", accent: "#111827" }
    ],
    features: [
      "Cd drag coefficient of just 0.278",
      "Twin fighter-jet vertical aero fins",
      "Patented 9-speed UPOD instantaneous gear shifting",
      "Triplex suspension with carbon fiber anti-roll bars"
    ],
    badges: ["Low Drag Beast", "1600 HP Flat-Plane", "Swedish Engineering"]
  },
  {
    id: "aston-martin-valkyrie",
    name: "Aston Martin Valkyrie AMR Pro",
    brand: "Aston Martin",
    category: "hypercar",
    tagline: "An F1 Car Unleashed for Ultra-High Performance Circuit Supremacy",
    year: 2025,
    price: "$3,500,000",
    engineType: "v12",
    engineDesc: "6.5L Cosworth Naturally Aspirated V12",
    horsepower: 1000,
    torque: 740, // Nm
    topSpeed: 362, // km/h
    zeroToHundred: 2.3, // s
    zeroToTwoHundred: 5.1, // s
    weight: 1000, // kg (1:1 Power-to-Weight Ratio)
    transmission: "7-Speed Single-Clutch Paddle Shift",
    drivetrain: "Rear-Wheel Drive (RWD)",
    downforce: "2660 kg Peak Aerodynamic Ground Effect",
    soundProfile: {
      type: "v12",
      baseFreq: 100,
      maxFreq: 850,
      rumbleDepth: 0.7,
      turboSpool: false,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Aston Racing Green", hex: "#004225", accent: "#b4ff00" },
      { name: "Stratos Silver", hex: "#e5e5e5", accent: "#003b46" },
      { name: "Obsidian Black Carbon", hex: "#121214", accent: "#ff3366" }
    ],
    features: [
      "11,100 RPM maximum engine scream developed with Cosworth",
      "Full Venturi aerodynamic underfloor producing 2.6+ tons of downforce",
      "Pure carbon fiber wishbone pushrod suspension",
      "Lateral acceleration exceeding 3.5G in high-speed corners"
    ],
    badges: ["11,100 RPM V12", "1:1 Power-to-Weight", "3.5G Lateral"]
  },
  {
    id: "rimac-nevera",
    name: "Rimac Nevera Time Attack",
    brand: "Rimac",
    category: "electric-concept",
    tagline: "Next-Generation Electric Warp Acceleration",
    year: 2025,
    price: "$2,200,000",
    engineType: "ev",
    engineDesc: "Quad Bespoke Permanent Magnet Electric Motors",
    horsepower: 1914,
    torque: 2360, // Nm
    topSpeed: 412, // km/h
    zeroToHundred: 1.81, // s
    zeroToTwoHundred: 4.42, // s
    weight: 2150, // kg
    transmission: "4 Independent Single-Speed Direct Gearboxes",
    drivetrain: "All-Wheel Torque Vectoring (R-AWTV)",
    downforce: "880 kg in High Downforce Mode",
    soundProfile: {
      type: "ev",
      baseFreq: 110,
      maxFreq: 980,
      rumbleDepth: 0.3,
      turboSpool: false,
      pops: false
    },
    images: {
      hero: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1570356528233-b4426ab7e9a8?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Squadron Black & Lightning Green", hex: "#0c0d10", accent: "#00ff66" },
      { name: "Riviera Electric Blue", hex: "#00b4d8", accent: "#ffffff" },
      { name: "Glacier White Pearl", hex: "#edf2f4", accent: "#00b4d8" }
    ],
    features: [
      "120 kWh liquid-cooled 800V battery system",
      "0-400-0 km/h in world record 29.93 seconds",
      "All-Wheel Torque Vectoring recalculating 100 times per second",
      "Active aerodynamic rear wing with airbrake functionality"
    ],
    badges: ["World Record 1.81s", "1914 HP Quad Motor", "Full EV Warp"]
  },
  {
    id: "pagani-utopia",
    name: "Pagani Utopia",
    brand: "Pagani",
    category: "art-in-motion",
    tagline: "A Sculptural Masterpiece of Pure Mechanical Passion",
    year: 2024,
    price: "$2,500,000",
    engineType: "v12",
    engineDesc: "6.0L Twin-Turbo AMG V12",
    horsepower: 864,
    torque: 1100, // Nm
    topSpeed: 380, // km/h
    zeroToHundred: 2.8, // s
    zeroToTwoHundred: 7.6, // s
    weight: 1280, // kg
    transmission: "7-Speed Xtrac Gated Pure Manual",
    drivetrain: "Rear-Wheel Drive (RWD)",
    downforce: "750 kg @ 280 km/h",
    soundProfile: {
      type: "v12",
      baseFreq: 85,
      maxFreq: 640,
      rumbleDepth: 0.7,
      turboSpool: false,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Rinascimento Gold", hex: "#c5a059", accent: "#231f20" },
      { name: "Carbo-Titanium Silver", hex: "#8a959e", accent: "#b33939" },
      { name: "Midnight Sapphire", hex: "#0f2027", accent: "#c5a059" }
    ],
    features: [
      "Exposed mechanical linkage gated manual shifter",
      "Carbo-Titanium HP62 G2 monocoque chassis",
      "Quad titanium central exhaust system",
      "Analogue precision skeletonized instrumentation"
    ],
    badges: ["Pure Gated Manual", "Bespoke AMG V12", "Carbo-Titanium"]
  },
  {
    id: "ferrari-daytona-sp3",
    name: "Ferrari Daytona SP3",
    brand: "Ferrari",
    category: "art-in-motion",
    tagline: "The Pinnacle of Maranello's V12 Mid-Rear Masterpieces",
    year: 2024,
    price: "$2,250,000",
    engineType: "v12",
    engineDesc: "6.5L Naturally Aspirated 65° V12 (F140HC)",
    horsepower: 829,
    torque: 697, // Nm
    topSpeed: 340, // km/h
    zeroToHundred: 2.85, // s
    zeroToTwoHundred: 7.4, // s
    weight: 1485, // kg
    transmission: "7-Speed Dual-Clutch F1 Gearbox",
    drivetrain: "Rear-Wheel Drive (RWD) with E-Diff 3.0",
    downforce: "500 kg @ 200 km/h",
    soundProfile: {
      type: "v12",
      baseFreq: 90,
      maxFreq: 720,
      rumbleDepth: 0.75,
      turboSpool: false,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Rosso Corsa Maranello", hex: "#c30010", accent: "#ffd60a" },
      { name: "Giallo Modena Yellow", hex: "#ffcc00", accent: "#000000" },
      { name: "Nero Daytona Metallic", hex: "#141414", accent: "#c30010" }
    ],
    features: [
      "Icona Series inspired by legendary 1967 24 Hours of Daytona 1-2-3 finish",
      "Horizontal blade slats on rear fascia directing aerodynamic flow",
      "Seats integrated directly into the carbon chassis tub",
      "9,500 RPM maximum engine rev capability"
    ],
    badges: ["Icona Series", "9,500 RPM V12", "Targa Roof"]
  },
  {
    id: "mclaren-senna-gtr",
    name: "McLaren Senna GTR",
    brand: "McLaren",
    category: "track-beast",
    tagline: "Uncompromising Track Domination Free from All Road Regulations",
    year: 2024,
    price: "$1,650,000",
    engineType: "v8",
    engineDesc: "4.0L Twin-Turbo V8 (M840TR)",
    horsepower: 814,
    torque: 800, // Nm
    topSpeed: 340, // km/h
    zeroToHundred: 2.7, // s
    zeroToTwoHundred: 6.8, // s
    weight: 1188, // kg
    transmission: "7-Speed Dual-Clutch Seamless Shift (SSG)",
    drivetrain: "Rear-Wheel Drive (RWD)",
    downforce: "1000 kg Extreme Downforce",
    soundProfile: {
      type: "v8",
      baseFreq: 80,
      maxFreq: 560,
      rumbleDepth: 0.88,
      turboSpool: true,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Volcano Orange & Carbon", hex: "#ff5e00", accent: "#111827" },
      { name: "Chalk Matte Grey", hex: "#ced4da", accent: "#00f0ff" },
      { name: "Pure Gloss Carbon Fiber", hex: "#16181d", accent: "#ff0055" }
    ],
    features: [
      "Giant LMP1-style rear wing and active front aero blades",
      "Extreme dry weight of just 1,188 kg (Power-to-weight: 694 HP/ton)",
      "Inconel and titanium side-exit race exhaust pipes",
      "Race-spec telemetry with onboard HD camera suite"
    ],
    badges: ["1,000 kg Downforce", "Track Only", "Sub-1200 kg"]
  },
  {
    id: "porsche-911-gt3rs",
    name: "Porsche 911 GT3 RS (992)",
    brand: "Porsche",
    category: "track-beast",
    tagline: "Born from Motorsport. Pure Aerodynamic Perfection",
    year: 2024,
    price: "$241,300",
    engineType: "boxer6",
    engineDesc: "4.0L High-Revving Naturally Aspirated Boxer-6",
    horsepower: 518,
    torque: 465, // Nm
    topSpeed: 296, // km/h
    zeroToHundred: 3.2, // s
    zeroToTwoHundred: 10.6, // s
    weight: 1450, // kg
    transmission: "7-Speed Porsche Doppelkupplung (PDK)",
    drivetrain: "Rear-Wheel Drive (RWD) with Rear-Axle Steering",
    downforce: "860 kg @ 285 km/h",
    soundProfile: {
      type: "boxer6",
      baseFreq: 95,
      maxFreq: 750,
      rumbleDepth: 0.65,
      turboSpool: false,
      pops: true
    },
    images: {
      hero: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1920&q=85",
      studio: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      front: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      cockpit: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    },
    colors: [
      { name: "Guards Red / Weissach Package", hex: "#d90429", accent: "#111827" },
      { name: "Shark Blue Metallic", hex: "#0077b6", accent: "#ff006e" },
      { name: "Python Green", hex: "#2dc653", accent: "#000000" }
    ],
    features: [
      "Swan-neck active rear wing with DRS (Drag Reduction System)",
      "9,000 RPM redline atmospheric flat-six symphony",
      "Four rotary controls on steering wheel for PASM, PTV+, and TC",
      "Magnesium lightweight forged center-lock wheels"
    ],
    badges: ["9,000 RPM Screamer", "Active DRS Wing", "Nürburgring Weapon"]
  }
];
