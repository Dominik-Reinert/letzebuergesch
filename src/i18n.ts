import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";

enum SupportedLanguages {
  "lu" = "lu",
}

interface LanguageResource {
  welcome: string;
}

interface DefaultNamespaceWrapper {
  translation: LanguageResource;
}

type LanguageResources = {
  [key in SupportedLanguages]: DefaultNamespaceWrapper;
};

const resources: LanguageResources = {
  lu: {
    translation: {
      welcome: "Léiert lëtzebuergesch!",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "lu",
    resources: resources as any,
  });

export function useLanguageTranslation(): [
  t: (key: keyof LanguageResource, param?: any) => string,
  i18n: typeof i18n,
  ready: boolean
] {
  return useTranslation();
}
