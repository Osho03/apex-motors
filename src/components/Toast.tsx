"use client";

import { useApp } from "@/components/AppProvider";

export default function Toast() {
  const { toast } = useApp();
  return (
    <div id="app-toast" className={`app-toast ${toast ? "visible" : ""}`}>
      {toast?.msg ?? ""}
    </div>
  );
}