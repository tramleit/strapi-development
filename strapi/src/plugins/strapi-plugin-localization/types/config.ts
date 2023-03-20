import { StringMap } from "strapi-typed";
import { z } from "zod";

export type StrapiConfig<T> = {
  default: T;
};

export const localizationSchema = z.object({
  fallbackLanguage: z
    .object({
      default: z.array(z.string()),
    })
    .optional(),
  nonExplicitSupportedLanguages: z.boolean(),
});

export type LocalizationConfig = z.infer<typeof localizationSchema>;

export type Localization = StringMap<string | null>;
