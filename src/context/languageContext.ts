import React from "react";
import { storage } from "utils/storage";
export interface LanguageContext {
  lang: string;
  setLang: (value: string) => void;
}
export const initialContextValue = {
  lang: storage.getLanguage() ?? "ar",
  setLang: (value: string) => value,
};
const languageContext = React.createContext<LanguageContext>(initialContextValue);
export default languageContext;
