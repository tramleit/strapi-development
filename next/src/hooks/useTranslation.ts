import { useLocalizationContext } from "@/components/LocalizationProvider/LocalizationProvider";
import {
  constructPaths,
  formatToNonExplicit,
  get,
  isPathValid,
} from "@/lib/localization";
import { merge } from "lodash/fp";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const useTranslation: UseTranslation = (keyPrefix, options) => {
  const { locale } = useRouter();
  const usedLocale = options?.locale || locale;
  const defaultOptions = useMemo(
    () =>
      merge(
        {
          count: 1,
          locale: usedLocale,
          variables: {
            count: 1,
          },
        } as TFunctionOptions,
        options
      ),
    [options, usedLocale]
  );
  const { translations, options: localizationOptions } =
    useLocalizationContext();

  const _translate: TInternalFunction = ({
    path,
    fallbackLocales = localizationOptions?.fallbackLocales || [],
    fallbacked = false,
    ...options
  }) => {
    const tVariables = merge(defaultOptions.variables, {
      count: options.count,
      ...options.variables,
    });
    const tOptions = merge(defaultOptions, {
      ...options,
      variables: tVariables,
    });
    const canFallback = !!fallbackLocales.length;

    const paths = constructPaths({
      path,
      locale: fallbacked ? fallbackLocales[0] : usedLocale!,
      keyPrefix,
      count: tOptions.count ?? 1,
    });

    if (isPathValid(paths.pathPlural, translations))
      return get(paths.pathPlural, translations, tOptions.variables);

    if (isPathValid(paths.path, translations))
      return get(paths.path, translations, tOptions.variables);

    if (!!localizationOptions?.nonExplicitSupportedLocales) {
      const nonExplicitLocale = formatToNonExplicit(usedLocale);

      const paths = constructPaths({
        path,
        locale: nonExplicitLocale!,
        keyPrefix,
        count: tOptions.count ?? 1,
      });

      if (isPathValid(paths.pathPlural, translations))
        return get(paths.pathPlural, translations, tOptions.variables);

      if (isPathValid(paths.path, translations))
        return get(paths.path, translations, tOptions.variables);
    }

    if (canFallback) {
      return _translate({
        path,
        fallbackLocales: fallbacked
          ? fallbackLocales.slice(1)
          : fallbackLocales,
        fallbacked: true,
        ...tOptions,
      });
    }

    const failedPath = constructPaths({
      path,
      locale: usedLocale!,
      count: tOptions.count ?? 1,
      keyPrefix,
    });
    console.warn(`Couldn't find translation for ${failedPath.path}`);

    return path;
  };

  const translate = (path: string, options?: TFunctionOptions) =>
    _translate({ path, ...options });

  return {
    t: translate,
    i18n: translations,
  };
};
