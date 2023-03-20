// @ts-ignore
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { isEqual } from "lodash/fp";
import { useLocalizationStore } from "../stores/localizationStore";
import { LocalizationRepository } from "../utils/repositories";

export const useData = () => {
  const queryClient = useQueryClient();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const jsonObject = useLocalizationStore((store) => store.data);
  const setJsonObject = useLocalizationStore((store) => store.setData);
  const hasBeenChanged = useLocalizationStore((store) => store.hasBeenChanged);
  const setHasBeenChanged = useLocalizationStore(
    (store) => store.setHasBeenChanged
  );

  const handleSelectLanguage = useCallback(
    (cb) => {
      if (hasBeenChanged) {
        const confirmation = confirm(
          "You've got unsaved changes. Proceed anwyay?"
        );

        if (!confirmation) {
          return;
        }
      }

      queryClient.invalidateQueries({
        queryKey: ["current-localization", selectedLanguage],
      });

      return setSelectedLanguage(cb);
    },
    [setSelectedLanguage]
  );

  const { data: defaultLocale, isFetched: defaultLocaleLoaded } = useQuery({
    queryKey: ["default-locale"],
    queryFn: LocalizationRepository.fetchDefaultLocale,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  const { data: config, isFetched: configIsLoaded } = useQuery({
    queryKey: ["config"],
    queryFn: LocalizationRepository.fetchConfig,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const foundationsLoaded = defaultLocaleLoaded && configIsLoaded;

  const {
    data: availableLocales,
    isSuccess: localesLoaded,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["locales"],
    queryFn: LocalizationRepository.fetchAvailableLocales,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: foundationsLoaded,
    onSuccess: () => {
      setSelectedLanguage(
        config?.fallbackLanguage?.default?.[0] || defaultLocale
      );
    },
  });
  const { data: currentLocalization, isSuccess: currentLocalizationLoaded } =
    useQuery({
      queryKey: ["current-localization", selectedLanguage],
      queryFn: () => LocalizationRepository.fetchByLocale(selectedLanguage!),
      enabled: localesLoaded,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setJsonObject(data);
        setHasBeenChanged(false);
      },
    });

  const updateLocale = useMutation(
    () => LocalizationRepository.updateLocale(selectedLanguage!, jsonObject),
    {
      onSuccess: () => {
        setHasBeenChanged(false);
      },
    }
  );

  return {
    currentLocalization,
    currentLocalizationLoaded,
    selectedLanguage,
    setSelectedLanguage: handleSelectLanguage,
    config,
    availableLocales,
    updateLocale,
    isFetching,
    isError,
  };
};
