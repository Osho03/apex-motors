"use client";

import type { ReactNode } from "react";
import { AppProvider } from "@/components/AppProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import MotionDirector from "@/components/MotionDirector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarModal from "@/components/CarModal";
import VipModal from "@/components/VipModal";
import GarageDrawer from "@/components/GarageDrawer";
import Toast from "@/components/Toast";

export default function ClientShell({ children }: { children: ReactNode }) {
  const handleRevealed = () => {
    window.dispatchEvent(new Event("apex:revealed"));
    document.body.classList.remove("preloader-lock");
  };

  return (
    <AppProvider>
      <SmoothScroll>
        <Preloader onDone={handleRevealed} />
        <ScrollProgress />
        <CursorGlow />
        <MotionDirector />
        <Header />
        {children}
        <Footer />
        <CarModal />
        <VipModal />
        <GarageDrawer />
        <Toast />
      </SmoothScroll>
    </AppProvider>
  );
}
