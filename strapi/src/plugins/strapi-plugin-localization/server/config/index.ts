import { LocalizationConfig, StrapiConfig } from "../../types";

const config: StrapiConfig<LocalizationConfig> = {
  default: {
    fallbackLanguage: {
      default: ["en"],
    },
    nonExplicitSupportedLanguages: false,
  },
};

export default config;
