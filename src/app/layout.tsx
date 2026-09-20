import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./legacy/style.css";
import "./legacy/animations.css";
import "./legacy/responsive.css";
import "./elevation.css";
import ClientShell from "./ClientShell";

// Self-hosted via next/font (preloaded, zero layout shift, no external CSS round-trip).
// Each exposes a CSS variable consumed by the theme in legacy/style.css.
const fontDisplay = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fontQuote = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APEX MOTORS | The World's Ultimate Hypercar Showcase & Experience",
  description:
    "Explore the world's most extreme hypercars with a realtime 3D holodeck, GSAP scroll-driven exploded anatomy, launch control simulator, bespoke configurator, and realtime engine acoustics.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} ${fontQuote.variable}`}
    >
      <body className="apex-dark-theme">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}