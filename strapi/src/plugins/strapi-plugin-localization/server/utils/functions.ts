import { IStrapi, Primitive, StringMap } from "strapi-typed";
import {
  LocalizationConfig,
  LocalizationService,
  LocalizationServiceName,
} from "../../types";
import LocalizationError from "../../utils/LocalizationError";

declare var strapi: IStrapi;

export const getPluginService = <T extends LocalizationService>(
  name: LocalizationServiceName
): T => strapi.plugin("localization").service(name);

export const getPluginConfig = (): LocalizationConfig =>
  strapi.config.get("plugin.localization");

export const errorHandler =
  (ctx: any) => (error: LocalizationError | string) => {
    if (error instanceof LocalizationError) {
      return ctx.badRequest(error.message, error.additionalInfo);
    }
    throw error;
  };

export const parseParams = <
  TParams extends StringMap<string> = StringMap<string>,
  TResult extends StringMap<Primitive> = StringMap<Primitive>
>(
  params: TParams
): TResult =>
  Object.keys(params).reduce((prev, curr) => {
    const value = params[curr];
    const parsedValue = isNaN(Number(value)) ? value : parseInt(value, 10);
    return {
      ...prev,
      [curr]: parsedValue,
    };
  }, {} as TResult);
