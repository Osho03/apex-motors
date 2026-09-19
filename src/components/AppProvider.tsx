"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CARS_DATA } from "@/lib/data";

interface ToastItem {
  id: number;
  msg: string;
}

interface AppContextValue {
  garage: string[];
  hasCar: (id: string) => boolean;
  toggleCar: (id: string) => boolean;
  garageCount: number;
  garageValue: string;
  toast: ToastItem | null;
  showToast: (msg: string) => void;
  modalCarId: string | null;
  openCarModal: (id: string) => void;
  closeCarModal: () => void;
  vipOpen: boolean;
  setVipOpen: (v: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  heroCarId: string;
  setHeroCarId: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "apex_motors_garage_v1";
const DEFAULT_GARAGE = ["bugatti-chiron-ss", "koenigsegg-jesko-absolut"];

function loadGarage(): string[] {
  if (typeof window === "undefined") return DEFAULT_GARAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : DEFAULT_GARAGE;
  } catch {
    return DEFAULT_GARAGE;
  }
}

let toastId = 0;

export function AppProvider({ children }: { children: ReactNode }) {
  const [garage, setGarage] = useState<string[]>(() => loadGarage());
  const [toast, setToast] = useState<ToastItem | null>(null);
  const [modalCarId, setModalCarId] = useState<string | null>(null);
  const [vipOpen, setVipOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [heroCarId, setHeroCarId] = useState("bugatti-chiron-ss");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(garage));
    } catch {
      /* ignore */
    }
  }, [garage]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const hasCar = (id: string) => garage.includes(id);

  const toggleCar = (id: string) => {
    const added = !garage.includes(id);
    setGarage((prev) =>
      added ? [...prev, id] : prev.filter((g) => g !== id)
    );
    setToast({
      id: ++toastId,
      msg: added
        ? "Vehicle added to your Dream Garage"
        : "Vehicle removed from Dream Garage",
    });
    return added;
  };

  const showToast = (msg: string) => setToast({ id: ++toastId, msg });

  const openCarModal = (id: string) => setModalCarId(id);
  const closeCarModal = () => setModalCarId(null);

  const garageValue = useMemo(() => {
    const total = garage.reduce((sum, id) => {
      const car = CARS_DATA.find((c) => c.id === id);
      if (!car) return sum;
      const num = parseInt(car.price.replace(/[^0-9]/g, ""), 10) || 0;
      return sum + num;
    }, 0);
    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }, [garage]);

  const value: AppContextValue = {
    garage,
    hasCar,
    toggleCar,
    garageCount: garage.length,
    garageValue,
    toast,
    showToast,
    modalCarId,
    openCarModal,
    closeCarModal,
    vipOpen,
    setVipOpen,
    drawerOpen,
    setDrawerOpen,
    heroCarId,
    setHeroCarId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}