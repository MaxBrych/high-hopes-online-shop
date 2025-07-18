import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrowHigh - Ihr vertrauensvoller Partner im Cannabis-Anbau",
  description: "Premium Cannabis-Genetik, professionelle Anbau-Ausrüstung und Experten-Unterstützung. Schließen Sie sich 25.000+ erfolgreichen Züchtern mit 98% Erfolgsrate an.",
  keywords: "Cannabis Samen, Anbau-Ausrüstung, Kultivierungs-Zubehör, Cannabis-Genetik, Grow-Lights, Nährstoffe, Hydroponik-Systeme, organische Düngemittel, Anbau-Anleitungen",
  generator: 'v0.dev'
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for this specific locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

