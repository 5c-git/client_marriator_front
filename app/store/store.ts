import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  userEmail: null | string;
  userPhone: null | string;
  accessToken: null | string;
  refreshToken: null | string;

  setUserEmail: (newUserEmail: string) => void;
  setUserPhone: (newUserPhone: string) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;

  removeUserEmail: () => void;
  removeUserPhone: () => void;
  removeAccessToken: () => void;
  removeRefreshToken: () => void;

  clearStore: () => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      userEmail: null,
      userPhone: null,
      accessToken: null,
      refreshToken: null,

      setUserEmail: (newUserEmail) => set({ userEmail: newUserEmail }),
      setUserPhone: (newUserPhone) => set({ userPhone: newUserPhone }),
      setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
      setRefreshToken: (newRefreshToken) =>
        set({ refreshToken: newRefreshToken }),

      removeUserEmail: () => set({ userEmail: null }),
      removeUserPhone: () => set({ userPhone: null }),
      removeAccessToken: () => set({ accessToken: null }),
      removeRefreshToken: () => set({ refreshToken: null }),

      clearStore: () =>
        set({
          userEmail: null,
          userPhone: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "store",
    }
  )
);
