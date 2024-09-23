// CS
import type csCommon from './locales/cs/common.json';
import type csComponents from './locales/cs/components.json';
import type csFields from './locales/cs/fields.json';
import type csPages from './locales/cs/pages.json';
// EN
import type enCommon from './locales/en/common.json';
import type enComponents from './locales/en/components.json';
import type enFields from './locales/en/fields.json';
import type enPages from './locales/en/pages.json';

type Messages = {
  fields: typeof csFields & typeof enFields;
  common: typeof csCommon & typeof enCommon;
  pages: typeof csPages & typeof enPages;
  components: typeof csComponents & typeof enComponents;
};

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line no-unused-vars
  interface IntlMessages extends Messages {}
}
