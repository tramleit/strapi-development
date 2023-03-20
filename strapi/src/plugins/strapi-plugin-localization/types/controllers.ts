import { StrapiController, StringMap } from "strapi-typed";
import { Localization, LocalizationConfig } from "./config";
import { I18nLocale } from "./i18n";
import {
  AdminService,
  CommonService,
  LocalizationService,
  LocalizationServiceName,
} from "./services";

export type LocalizationController = {
  admin: AdminController;
};

export type AdminController = {
  getService: <T extends LocalizationService = AdminService>(
    name?: LocalizationServiceName
  ) => T;
  get: StrapiController<Promise<Localization>>;
  getByLocale: StrapiController<
    Promise<Localization>,
    never,
    never,
    { locale: string; namespace?: string }
  >;
  post: StrapiController<
    Promise<Localization>,
    Localization,
    never,
    { locale: string }
  >;
  put: StrapiController<
    Promise<Localization>,
    Localization,
    never,
    { locale: string }
  >;
  delete: StrapiController<
    Promise<Localization>,
    never,
    never,
    { locale: string }
  >;
  config: StrapiController<Promise<LocalizationConfig>>;
  getLocales: StrapiController<Promise<I18nLocale[]>>;
  getDefaultLocale: StrapiController<Promise<string>>;
};
