const I18NextHttpBackend = require("i18next-http-backend");

/** @type {import("next-i18next").UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "it", "fr"],
  },
  backend: {
    loadPath: `${process.env.NEXT_PUBLIC_INTERNAL_API_URI}/localization/{{lng}}/{{ns}}`,
  },
  fallbackLng: {
    default: ["en"],
  },
  debug: true,
  serializeConfig: false,
  nonExplicitSupportedLngs: true,
  ns: ["common"],
  defaultNS: ["common"],
  use: [I18NextHttpBackend],
};
