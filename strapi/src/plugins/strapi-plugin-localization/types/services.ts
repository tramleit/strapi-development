import { StrapiStore } from "strapi-typed";
import { Localization, LocalizationConfig } from ".";
import { I18nLocale } from "./i18n";

export type LocalizationServiceName = "common" | "admin";
export type LocalizationService = CommonService | AdminService;

export type AdminService = {
  get: (withFallback?: boolean) => Promise<Localization>;
  getByLocale: (
    locale: string,
    namespace?: string,
    fallback?: string
  ) => Promise<Localization>;
  post: (locale: string, payload: Localization) => Promise<Localization>;
  put: (locale: string, payload: Localization) => Promise<Localization>;
  delete: (locale: string) => Promise<Localization>;
  config: () => LocalizationConfig;
};

export type CommonService = {
  getPluginStore: () => Promise<StrapiStore>;
  getLocalizations: (locale: string) => Promise<Localization>;
  setLocalizations: (
    data: Localization,
    locale: string
  ) => Promise<Localization>;
  initializeLocalizations: () => Promise<void>;
  getLocales: () => Promise<I18nLocale[]>;
  getDefaultLocale: () => Promise<string>;
};
