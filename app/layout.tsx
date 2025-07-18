import type { Metadata } from "next";
import { locales } from "../i18n";

export const metadata: Metadata = {
  title: "GrowHigh - Ihr vertrauensvoller Partner im Cannabis-Anbau",
  description: "Premium Cannabis-Genetik, professionelle Anbau-Ausrüstung und Experten-Unterstützung. Schließen Sie sich 25.000+ erfolgreichen Züchtern mit 98% Erfolgsrate an.",
  keywords: "Cannabis Samen, Anbau-Ausrüstung, Kultivierungs-Zubehör, Cannabis-Genetik, Grow-Lights, Nährstoffe, Hydroponik-Systeme, organische Düngemittel, Anbau-Anleitungen",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
} 