import translations, { defaultNS } from "../locales/translations";

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        translations: typeof translations['en']
    }
}