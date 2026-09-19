import type { Hypercar } from "./types";
import { CARS_DATA as LegacyCARS_DATA } from "./data.js";

export const CARS_DATA: Hypercar[] = LegacyCARS_DATA as Hypercar[];

export const CATEGORY_LABELS: Record<string, string> = {
  all: "ALL ICONICS",
  hypercar: "HYPERCARS (300+ MPH)",
  "electric-concept": "EV WARP SPEED",
  "art-in-motion": "ART IN MOTION",
  "track-beast": "TRACK WEAPONS",
};

export const HERO_CAR_IDS = [
  "bugatti-chiron-ss",
  "koenigsegg-jesko-absolut",
  "rimac-nevera",
  "pagani-utopia",
  "porsche-911-gt3rs",
];

export function getHeroCars(): Hypercar[] {
  return HERO_CAR_IDS.map((id) => CARS_DATA.find((c) => c.id === id)).filter(
    Boolean
  ) as Hypercar[];
}