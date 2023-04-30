
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations from "./locales/translations";

/* This code initializes the i18n library for internationalization and localization in a React
application. It sets up the language detection mechanism, defines the translation resources, sets
the fallback language, and configures the interpolation and key separator options. It also enables
the use of Suspense for loading translations asynchronously in React components. */
i18n.
  use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: "resources",
    resources: translations,
    detection: { order: ['querystring', 'navigator'] },
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: "en",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      skipOnVariables: false
    },
    react: {
      useSuspense: true
    }
  });

export default i18n;