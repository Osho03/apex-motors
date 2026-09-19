export type EngineType = "w16" | "v12" | "v8" | "boxer6" | "ev";
export type CarCategory = "hypercar" | "electric-concept" | "art-in-motion" | "track-beast";

export interface CarImageSet {
  hero: string;
  studio: string;
  front: string;
  cockpit: string;
}

export interface CarColor {
  name: string;
  hex: string;
  accent: string;
}

export interface SoundProfile {
  type: EngineType;
  baseFreq: number;
  maxFreq: number;
  rumbleDepth: number;
  turboSpool: boolean;
  pops: boolean;
}

export interface Hypercar {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  tagline: string;
  year: number;
  price: string;
  engineType: EngineType;
  engineDesc: string;
  horsepower: number;
  torque: number;
  topSpeed: number;
  zeroToHundred: number;
  zeroToTwoHundred: number;
  weight: number;
  transmission: string;
  drivetrain: string;
  downforce: string;
  soundProfile: SoundProfile;
  images: CarImageSet;
  colors: CarColor[];
  features: string[];
  badges: string[];
}