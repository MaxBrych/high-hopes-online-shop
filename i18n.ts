import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['de', 'en'] as const;
export const defaultLocale = 'de' as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and use default if invalid
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;
  
  return {
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
}); 