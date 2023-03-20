import { Strapi } from "@strapi/strapi";
import { CommonService } from "../types";
import { getPluginService } from "./utils/functions";

export default async ({ strapi }: { strapi: Strapi }) => {
  // Initialize locales with empty objects
  const commonService = getPluginService<CommonService>("common");
  commonService.initializeLocalizations();
};
