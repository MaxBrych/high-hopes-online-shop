import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrowHigh - Ihr vertrauensvoller Partner im Cannabis-Anbau",
  description: "Premium Cannabis-Genetik, professionelle Anbau-Ausrüstung und Experten-Unterstützung. Schließen Sie sich 25.000+ erfolgreichen Züchtern mit 98% Erfolgsrate an.",
  keywords: "Cannabis Samen, Anbau-Ausrüstung, Kultivierungs-Zubehör, Cannabis-Genetik, Grow-Lights, Nährstoffe, Hydroponik-Systeme, organische Düngemittel, Anbau-Anleitungen",
  generator: 'v0.dev'
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={inter.className}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}

