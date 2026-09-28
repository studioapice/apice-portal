import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** NAVI's public site uses Space Grotesk for its headlines. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/** Serif used only inside the "¿Y si fueras tú?" program visuals. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NAVI OS — El sistema operativo detrás de cada episodio",
  description:
    "Propuesta para NAVI Centro Creativo: sistema operativo de producción, distribución e inteligencia.",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${fraunces.variable} antialiased`}
    >
      <body className="grain min-h-svh">{children}</body>
    </html>
  );
}
