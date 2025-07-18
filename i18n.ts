import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['de', 'en'] as const;
export const defaultLocale = 'de' as const;

export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 