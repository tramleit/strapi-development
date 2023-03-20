import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
  // @ts-ignore
} from "@strapi/design-system/Accordion";
// @ts-ignore
import { Flex } from "@strapi/design-system/Flex";
// @ts-ignore
import { Box } from "@strapi/design-system/Box";
// @ts-ignore
import { TextButton } from "@strapi/design-system/TextButton";
// @ts-ignore
import { IconButton } from "@strapi/design-system/IconButton";
// @ts-ignore
import { TextInput } from "@strapi/design-system/TextInput";
import { Plus, User, Pencil, Trash } from "@strapi/icons";
import { useMap } from "usehooks-ts";
import OGJSONEditor, { JSONEditorOptions } from "jsoneditor";
import { useLocalizationStore } from "../../stores/localizationStore";
import { useQueryClient } from "@tanstack/react-query";
import "jsoneditor/dist/jsoneditor.min.css";
import "../../styles/jsoneditor.css";

const JSONEditor = ({
  locale,
  mode,
  ...options
}: {
  locale: string | undefined;
} & JSONEditorOptions) => {
  const queryClient = useQueryClient();
  const editor = useRef<OGJSONEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setJsonObject = useLocalizationStore((state) => state.setData);
  const setError = useLocalizationStore((state) => state.editor.setError);
  const setHasBeenChanged = useLocalizationStore(
    (state) => state.setHasBeenChanged
  );

  useEffect(() => {
    if (!editor.current) {
      editor.current = new OGJSONEditor(containerRef.current!, {
        statusBar: true,
        sortObjectKeys: true,

        ...options,
        onChange() {
          setHasBeenChanged(true);
        },
        onChangeJSON(json) {
          setJsonObject(json);
        },
        onChangeText(jsonString) {
          try {
            setJsonObject(JSON.parse(jsonString));
          } catch (err) {
            console.error(err);
          }
        },
        onError() {
          setError(true);
        },
      });
    }

    editor.current?.set(
      queryClient.getQueryData(["current-localization", locale])
    );
  }, [queryClient.getQueryData(["current-localization", locale])]);

  useEffect(() => {
    editor.current?.setMode(mode || "tree");
  }, [mode]);

  return <Box ref={containerRef} />;
};

export default JSONEditor;
