import type { IntlConfig } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export type RequestConfig = Omit<IntlConfig, 'locale'> & {
  /**
   * Instead of reading a `locale` from the argument that's passed to the
   * function within `getRequestConfig`, you can include a locale as part of the
   * returned request configuration.
   *
   * This is helpful for apps that only support a single language and for apps
   * where the locale should be read from user settings instead of the pathname.
   **/
  locale?: IntlConfig['locale'];
};

export type GetRequestConfigParams = {
  locale: string;
};

export type GetRequestConfig = (
  params: GetRequestConfigParams,
) => RequestConfig | Promise<RequestConfig>;

export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

export const requestConfig: GetRequestConfig = getRequestConfig(
  async ({ locale }) => {
    if (!locales.includes(locale)) notFound();

    return {
      timeZone: 'Europe/Prague',
      now: new Date(),
      messages: {
        fields: (await import(`./locales/${locale}/fields.json`)).default,
        common: (await import(`./locales/${locale}/common.json`)).default,
        pages: (await import(`./locales/${locale}/pages.json`)).default,
        components: (await import(`./locales/${locale}/components.json`))
          .default,
      },
    };
  },
);
