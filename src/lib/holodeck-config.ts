export interface HoloConfig {
  name: string;
  stat: string;
  body: number;
  accent: number;
  embed?: string;
}

export const HOLO_CONFIGS: Record<string, HoloConfig> = {
  "bugatti-chiron-ss": {
    name: "BUGATTI CHIRON SUPER SPORT",
    stat: "1577 HP // W16",
    body: 0x1746d4,
    accent: 0x4dc8ff,
    embed: "https://sketchfab.com/models/6a7520f6853f433eb200ed10fef96f94/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "koenigsegg-jesko-absolut": {
    name: "KOENIGSEGG JESKO ABSOLUT",
    stat: "1600 HP // V8",
    body: 0xe8eaf0,
    accent: 0x00f0ff,
    embed: "https://sketchfab.com/models/79d63459afd347c1999e9c0312c3b756/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "rimac-nevera": {
    name: "RIMAC NEVERA",
    stat: "1914 HP // EV",
    body: 0x0f1013,
    accent: 0x00ff8c,
    embed: "https://sketchfab.com/models/d3700fc37a2c4a61adb33ac3ffedd787/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "pagani-utopia": {
    name: "PAGANI UTOPIA",
    stat: "864 HP // V12",
    body: 0xb0893f,
    accent: 0xffbf59,
    embed: "https://sketchfab.com/models/6234da4b156440a6bd9ae8e95cd410f7/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "porsche-911-gt3rs": {
    name: "PORSCHE 911 GT3 RS",
    stat: "518 HP // BOXER-6",
    body: 0xd90429,
    accent: 0xff7182,
    embed: "https://sketchfab.com/models/0120592500644be08f935399d1e05d6c/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
};
