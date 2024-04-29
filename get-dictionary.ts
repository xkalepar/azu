import "server-only";
import type { Locale } from "../alzaiton-university/i18n-app/i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ar: () =>
    import("../alzaiton-university/i18n-app/dictionaries/ar.json").then(
      (module) => module.default
    ),
  en: () =>
    import("../alzaiton-university/i18n-app/dictionaries/en.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.ar();
