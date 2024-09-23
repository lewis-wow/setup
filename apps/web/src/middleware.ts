import { defaultLocale, locales } from '@repo/translation';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/signin', '/signup', '/(en|cs)/:path*'],
};
