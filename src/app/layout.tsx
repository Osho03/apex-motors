import type { Metadata } from "next";
import "./globals.css";
import "./legacy/style.css";
import "./legacy/animations.css";
import "./legacy/responsive.css";
import "./elevation.css";
import ClientShell from "./ClientShell";

export const metadata: Metadata = {
  title: "APEX MOTORS | The World's Ultimate Hypercar Showcase & Experience",
  description:
    "Explore the world's most extreme hypercars with a realtime 3D holodeck, GSAP scroll-driven exploded anatomy, launch control simulator, bespoke configurator, and realtime engine acoustics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="apex-dark-theme">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}