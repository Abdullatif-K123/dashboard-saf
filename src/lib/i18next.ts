import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { storage } from "utils/storage";
import ar from "../localization/ar.json";
import en from "../localization/en.json";
const resources = {
  en,
  ar,
};
declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
export const availableLanguages = Object.keys(resources);
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  fallbackLng: "ar",
  returnNull: false,
  debug: false,
});

export const changeLanguage = (lang: string) => {
  storage.setLanguage(lang);
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  switch (lang) {
    case "ar":
      document.dir = "rtl";
      break;
    default:
      document.dir = "ltr";
  }
};
export default i18n;
