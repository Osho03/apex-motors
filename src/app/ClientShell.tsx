"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
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
import HelpWidget from "@/components/HelpWidget";
import MobileDock from "@/components/MobileDock";

export default function ClientShell({ children }: { children: ReactNode }) {
  const handleRevealed = () => {
    window.dispatchEvent(new Event("apex:revealed"));
    document.body.classList.remove("preloader-lock");
  };

  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <SmoothScroll>
        <Preloader onDone={handleRevealed} />
        <ScrollProgress />
        <CursorGlow />
        <MotionDirector />
        <Header />
        {children}
        <Footer />
        <MobileDock />
        <CarModal />
        <VipModal />
        <GarageDrawer />
        <Toast />
        <HelpWidget />
        </SmoothScroll>
      </AppProvider>
    </MotionConfig>
  );
}
