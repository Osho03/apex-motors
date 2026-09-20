"use client";

import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/AppProvider";

export default function Toast() {
  const { toast } = useApp();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          id="app-toast"
          className="app-toast visible motion-host"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
