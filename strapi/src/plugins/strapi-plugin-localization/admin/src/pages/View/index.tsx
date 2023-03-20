import React, { useMemo, useState } from "react";
import pluginId from "../../pluginId";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  // @ts-ignore
} from "@strapi/design-system/Layout";
import {
  TabGroup,
  Tabs,
  Tab,
  // @ts-ignore
} from "@strapi/design-system/Tabs";
// @ts-ignore
import { Box } from "@strapi/design-system/Box";
// @ts-ignore
import { Button } from "@strapi/design-system/Button";
// @ts-ignore
import { Icon } from "@strapi/design-system/Icon";
// @ts-ignore
import { Typography } from "@strapi/design-system/Typography";
// @ts-ignore
import { Divider } from "@strapi/design-system/Divider";
// @ts-ignore
import { Status } from "@strapi/design-system/Status";
// @ts-ignore
import { Select, Option } from "@strapi/design-system/Select";
// @ts-ignore
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
// @ts-ignore
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Check } from "@strapi/icons";
import { useLocalizationStore } from "../../stores/localizationStore";
import { I18nLocale } from "../../../../types";
import { useData } from "../../hooks/useData";
import JSONEditor from "../../components/JSONEditor";

const View = () => {
  const {
    currentLocalizationLoaded,
    availableLocales,
    selectedLanguage,
    setSelectedLanguage,
    updateLocale,
    isFetching,
    isError,
  } = useData();
  const hasError = useLocalizationStore((store) => store.editor.hasError);
  const hasBeenChanged = useLocalizationStore((store) => store.hasBeenChanged);

  const [activeTab, setActiveTab] = useState(0);
  const activeStatus = useMemo<(typeof status)[keyof typeof status]>(() => {
    if (hasError) {
      return status.error;
    }

    if (hasBeenChanged) {
      return status.editing;
    }

    return status.published;
  }, [hasError, hasBeenChanged]);

  return (
    <Layout>
      <HeaderLayout
        title="Localizations"
        subtitle="Organize your localizations in one place"
        as="h2"
        primaryAction={
          <Button
            disabled={isFetching || hasError || !hasBeenChanged}
            onClick={updateLocale.mutate}
            startIcon={<Check />}
          >
            Save
          </Button>
        }
        secondaryAction={
          <Status
            variant={activeStatus.variant}
            size="S"
            showBullet={activeStatus.showBullet}
          >
            <Typography fontWeight="bold" textColor={activeStatus.textColor}>
              {activeStatus.message}
            </Typography>
          </Status>
        }
      />
      {!currentLocalizationLoaded ? (
        <LoadingIndicatorPage />
      ) : isError ? (
        <Box padding={8} background="neutral100">
          <EmptyStateLayout content="Can't load available locales..." />
        </Box>
      ) : (
        <ContentLayout>
          <Grid gap={"1rem"}>
            <GridItem xs={12} s={9} col={9}>
              <TabGroup
                label="Localization editor view"
                onTabChange={setActiveTab}
                initialSelectedTabIndex={activeTab}
              >
                <Tabs>
                  <Tab>Tree view</Tab>
                  <Tab>Code view</Tab>
                </Tabs>
              </TabGroup>
              <Box
                color="neutral800"
                padding={4}
                background="neutral0"
                shadow="tableShadow"
                hasRadius
              >
                <JSONEditor
                  locale={selectedLanguage}
                  mode={activeTab === 0 ? "tree" : "code"}
                />
              </Box>
            </GridItem>
            <GridItem xs={12} s={3} col={3}>
              <Box
                component="aside"
                color="neutral800"
                padding={4}
                background="neutral0"
                shadow="tableShadow"
                hasRadius
              >
                <Typography variant="sigma" color="neutral600">
                  Locale
                </Typography>
                <Divider
                  marginTop=".5rem !important"
                  marginBottom="1rem !important"
                />
                <Select
                  id="locale"
                  aria-label="Select locale"
                  selectButtonTitle="Carret Down Button"
                  size="S"
                  placeholder="Loading..."
                  disabled={isFetching}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                >
                  {!isFetching &&
                    (availableLocales ?? []).map((locale: I18nLocale) => (
                      <Option key={locale.code} value={locale.code}>
                        {locale.name}
                      </Option>
                    ))}
                </Select>
              </Box>
            </GridItem>
          </Grid>
        </ContentLayout>
      )}
    </Layout>
  );
};

const status = {
  published: {
    variant: "success",
    showBullet: false,
    textColor: "sucess700",
    message: "Published",
  },
  editing: {
    variant: "secondary",
    showBullet: true,
    textColor: "secondary700",
    message: "Editing",
  },
  error: {
    variant: "danger",
    showBullet: true,
    textColor: "danger700",
    message: "Errors",
  },
};

export default View;
