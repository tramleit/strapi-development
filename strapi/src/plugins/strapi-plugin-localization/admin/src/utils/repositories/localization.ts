import { request } from "@strapi/helper-plugin";
import { I18nLocale, LocalizationConfig } from "../../../../types";
import pluginId from "../../pluginId";

type LocalizationRepository = {
  fetchConfig: () => Promise<LocalizationConfig>;
  fetchAvailableLocales: () => Promise<I18nLocale[]>;
  fetchDefaultLocale: () => Promise<string>;
  fetchByLocale: <T = unknown>(locale: string) => Promise<T>;
  updateLocale: <TBody = unknown, TResponse = unknown>(
    locale: string,
    body: TBody
  ) => Promise<TResponse>;
};

export const LocalizationRepository: LocalizationRepository = {
  fetchConfig: () => request(`/${pluginId}/config`, { method: "GET" }),
  fetchAvailableLocales: () => request(`/i18n/locales`, { method: "GET" }),
  fetchDefaultLocale: () =>
    request(`/${pluginId}/default-locale`, {
      method: "GET",
    }),
  fetchByLocale: (locale) =>
    request(`/${pluginId}/${locale}`, {
      method: "GET",
    }),
  updateLocale: (locale, body) =>
    request(`/${pluginId}/${locale}`, {
      method: "POST",
      body,
    }),
};
