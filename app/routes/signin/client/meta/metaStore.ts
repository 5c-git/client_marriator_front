import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  fio: string;
  setFio: (newFio: string) => void;

  clearStore: () => void;
};

export const useMetaStore = create<State>()(
  persist(
    (set) => ({
      fio: "",
      setFio: (newFio) => set({ fio: newFio }),
      clearStore: () =>
        set({
          fio: "",
        }),
    }),
    {
      name: "metaStore",
    },
  ),
);
