import {
  AdminController,
  AdminService,
  CommonService,
  LocalizationService,
  LocalizationServiceName,
} from "../../types";
import { errorHandler, getPluginService } from "../utils/functions";

const adminControllers: AdminController = {
  getService<T extends LocalizationService = AdminService>(
    name: LocalizationServiceName = "admin"
  ) {
    return getPluginService<T>(name);
  },

  async get(this: AdminController) {
    return await this.getService().get(true);
  },

  async getByLocale(this: AdminController, ctx) {
    const { params } = ctx;

    return await this.getService().getByLocale(params.locale);
  },

  async post(this: AdminController, ctx) {
    const { params, request } = ctx;

    return await this.getService()
      .post(params.locale, request.body!)
      .catch(errorHandler(ctx));
  },

  async put(this: AdminController, ctx) {
    const { params, request } = ctx;

    return await this.getService()
      .put(params.locale, request.body!)
      .catch(errorHandler(ctx));
  },

  async delete(this: AdminController, ctx) {
    const { params } = ctx;

    return await this.getService()
      .delete(params.locale)
      .catch(errorHandler(ctx));
  },

  async config(this: AdminController) {
    return this.getService().config();
  },

  async getLocales(this: AdminController) {
    return await this.getService<CommonService>("common").getLocales();
  },

  async getDefaultLocale(this: AdminController) {
    return this.getService<CommonService>("common").getDefaultLocale();
  },
};

export default adminControllers;
