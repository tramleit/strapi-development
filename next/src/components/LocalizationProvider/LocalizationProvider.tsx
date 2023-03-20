import { createContext, PropsWithChildren, useContext } from "react";
import { merge } from "lodash/fp";

const initialState = {
  options: {
    fallbackLocales: [],
    nonExplicitSupportedLocales: false,
  },
  translations: {},
};

const localizationContext = createContext<LocalizationContext>(initialState);

export const useLocalizationContext = () => useContext(localizationContext);

const LocalizationProvider = ({
  translations,
  options = {},
  children,
}: PropsWithChildren<LocalizationContext>) => {
  return (
    <localizationContext.Provider
      value={{
        options: merge(initialState, options),
        translations,
      }}
    >
      {children}
    </localizationContext.Provider>
  );
};

export default LocalizationProvider;
