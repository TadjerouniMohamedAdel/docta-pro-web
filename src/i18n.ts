import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    whitelist: ['ar', 'en', 'fr'],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
