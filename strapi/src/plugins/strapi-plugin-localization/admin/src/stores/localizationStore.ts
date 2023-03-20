import { z } from "zod";
import { create } from "zustand";
import produce from "immer";

const storeSchema = z.object({
  editor: z.object({
    hasError: z.boolean(),
    setError: z.function().args(z.boolean()).returns(z.void()),
  }),
  hasBeenChanged: z.boolean(),
  setHasBeenChanged: z.function().args(z.boolean()),
  data: z.unknown(),
  setData: z.function().args(z.unknown()),
});

export const useLocalizationStore = create<z.infer<typeof storeSchema>>(
  (set) => ({
    editor: {
      hasError: false,
      setError: (hasError: boolean) =>
        set(
          produce((state) => {
            state.editor.hasError = hasError;
          })
        ),
    },
    hasBeenChanged: false,
    setHasBeenChanged: (newState: boolean) =>
      set(
        produce((state) => {
          state.hasBeenChanged = newState;
        })
      ),
    data: {} as unknown,
    setData: (data: unknown) =>
      set(
        produce((state) => {
          state.data = data;
        })
      ),
  })
);
