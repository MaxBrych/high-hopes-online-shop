import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['de', 'en'] as const;
export const defaultLocale = 'de' as const;

export function hasLocale(locales: readonly string[], locale: string): boolean {
  return locales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  const locale = (requested && hasLocale(locales, requested)) 
    ? requested 
    : defaultLocale;

  try {
    return {
      locale,
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fall back to default locale messages if specific locale fails
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }
}); 