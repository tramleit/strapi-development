type MergeBy<T, K> = Omit<T, keyof K> & K;

type Localizations = Record<string, any>;

type LocalizationOptions = {
  fallbackLocales?: string[];
  nonExplicitSupportedLocales?: boolean;
};

type LocalizationContext<T = Record<string, any>> = {
  options?: LocalizationOptions;
  translations: T;
};

type TInternalFunction = (
  options: {
    path: string;
    fallbackLocales?: string[];
    fallbacked?: boolean;
  } & TFunctionOptions
) => string;

type TFunctionOptions = {
  count?: number;
  locale?: string;
  variables?: Record<string, string | number>;
};

type TFunction = (path: string, options?: TFunctionOptions) => string;

type UseTranslation<TVars = {}> = (
  keyPrefix: string,
  options?: MergeBy<TFunctionOptions, TVars>
) => {
  t: TFunction;
  i18n: Localizations;
};

type Plural = "zero" | "one" | "two" | "few" | "many" | "other";
