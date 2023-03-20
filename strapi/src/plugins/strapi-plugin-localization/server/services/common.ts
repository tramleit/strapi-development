import { StrapiContext } from "strapi-typed";
import { CommonService } from "../../types";
import LocalizationError from "../../utils/LocalizationError";
import { getPluginService } from "../utils/functions";

const commonService: (context: StrapiContext) => CommonService = ({
  strapi,
}) => ({
  async getPluginStore() {
    return await strapi.store({ type: "plugin", name: "localization" });
  },

  async getLocalizations(locale) {
    const commonService = await getPluginService<CommonService>("common");
    const pluginStore = await commonService.getPluginStore();

    return await pluginStore.get({ key: locale });
  },

  async setLocalizations(data, locale) {
    if (typeof data === "undefined") {
      throw new LocalizationError("No localization data");
    }

    const commonService = await getPluginService<CommonService>("common");
    const pluginStore = await commonService.getPluginStore();

    await pluginStore.set({ key: locale, value: data });

    return data;
  },

  async initializeLocalizations(this: CommonService) {
    const locales = await this.getLocales();

    for await (const { code: locale } of locales) {
      if (!(await this.getLocalizations(locale))) {
        await this.setLocalizations({}, locale);
      }
    }
  },

  async getLocales() {
    return await strapi.service("plugin::i18n.locales").find();
  },

  getDefaultLocale() {
    return strapi.service("plugin::i18n.locales").getDefaultLocale();
  },
});

export default commonService;
