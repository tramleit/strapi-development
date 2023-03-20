import { StrapiContext } from "strapi-typed";
import merge from "lodash/fp/merge";
import { AdminService, CommonService, Localization } from "../../types";
import { getPluginConfig, getPluginService } from "../utils/functions";

const adminService: (context: StrapiContext) => AdminService = ({
  strapi,
}) => ({
  // TODO: Prepare locale combination
  async get(this: AdminService, withFallback) {
    const commonService = getPluginService<CommonService>("common");
    const locales = await commonService.getLocales();
    const fallback = await commonService.getDefaultLocale();

    return await locales.reduce(
      async (acc, { code }) => ({
        ...(await acc),
        [code]: await this.getByLocale(
          code,
          withFallback ? fallback : undefined
        ),
      }),
      Promise.resolve({})
    );
  },

  async getByLocale(locale, namespace, fallback) {
    const commonService = getPluginService<CommonService>("common");
    const locales = await commonService.getLocales();
    const isFallbackValid = locales.find(({ code }) => code === fallback);

    const localeLocalization = await commonService.getLocalizations(locale);
    const fallbackLocalization = isFallbackValid
      ? await commonService.getLocalizations(fallback!)
      : null;

    const resultLocalization = fallbackLocalization
      ? merge(fallbackLocalization, localeLocalization)
      : localeLocalization;

    if (namespace) {
      return resultLocalization[namespace] as unknown as Localization;
    }

    return resultLocalization;
  },

  async post(locale, payload) {
    const commonService = getPluginService<CommonService>("common");

    return await commonService.setLocalizations(payload, locale);
  },

  async put(locale, payload) {
    const adminService = getPluginService<AdminService>("admin");
    const sourceLocalization = await adminService.getByLocale(locale);
    const localizationUpdates = payload || {};
    const updatedLocalization = merge(sourceLocalization, localizationUpdates);

    return await adminService.post(locale, updatedLocalization);
  },

  async delete(locale) {
    const commonService = getPluginService<CommonService>("common");

    return commonService.setLocalizations({}, locale);
  },

  config() {
    return getPluginConfig();
  },
});

export default adminService;
