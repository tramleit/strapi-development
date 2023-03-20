export const keySeparator = ".";

export const plurals: Plural[] = ["zero", "one", "two", "few", "many", "other"];

const matchHtmlEntity =
  /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;

const htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/",
} as Record<string, string>;

const unescapeHtmlEntity = (m: string) => htmlEntities[m];

export const unescape = (text: string) =>
  text.replace(matchHtmlEntity, unescapeHtmlEntity);

export const formatToNonExplicit = (locale?: string) => {
  if (!locale) return locale;

  return locale.replace(/-.*$/, "");
};

export const formatVariables = (
  text: string,
  variables: Record<string, string | number> = {}
) => {
  return Object.keys(variables).reduce((acc, cur) => {
    const regex = new RegExp("{{ *" + `${cur}` + " *}}", "g");

    return acc.replace(regex, `${variables[cur]}`);
  }, text);
};

export const get = (
  path: string,
  object: Record<string, any>,
  variables: Record<string, string | number> = {}
) => {
  try {
    const arr = path.split(".");
    const result = arr.reduce((acc, cur) => acc[cur], object);

    if (typeof result !== "string") {
      throw new Error("Get function result should be a string.");
    }

    return formatVariables(result, variables);
  } catch (err) {
    return path;
  }
};

export const isPathValid = (path: string, object: any) =>
  get(path, object) !== path;

export const constructPaths = ({
  path,
  locale,
  keyPrefix,
  count,
}: {
  path: string;
  locale: string;
  keyPrefix: string;
  count: number;
}) => {
  const pr = new Intl.PluralRules(locale);
  const _locale = `${locale}.`;
  const _keyPrefix = keyPrefix.length ? `${keyPrefix}.` : "";
  const _pluralSuffix = `_${pr.select(count ?? 1)}`;
  const fullPath = `${_locale}${_keyPrefix}${path}`;
  const fullPathPlural = `${fullPath}${_pluralSuffix}`;

  return {
    path: fullPath,
    pathPlural: fullPathPlural,
  };
};
