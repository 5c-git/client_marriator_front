import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  userEmail: null | string;
  userPhone: null | string;
  accessToken: null | string;
  refreshToken: null | string;
  userRole:
    | "admin"
    | "supervisor"
    | "manager"
    | "client"
    | "specialist"
    | "recruiter";
  userId: null | number;

  setUserEmail: (newUserEmail: string) => void;
  setUserPhone: (newUserPhone: string) => void;
  setUserRole: (
    userRole:
      | "admin"
      | "supervisor"
      | "manager"
      | "client"
      | "specialist"
      | "recruiter"
  ) => void;
  setUserId: (newUserId: number) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;

  removeUserEmail: () => void;
  removeUserPhone: () => void;
  removeUserId: () => void;
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
      userRole: "specialist",
      userId: null,

      setUserEmail: (newUserEmail) => set({ userEmail: newUserEmail }),
      setUserPhone: (newUserPhone) => set({ userPhone: newUserPhone }),
      setUserRole: (newUserRole) => set({ userRole: newUserRole }),
      setUserId: (newUserId) => set({ userId: newUserId }),
      setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
      setRefreshToken: (newRefreshToken) =>
        set({ refreshToken: newRefreshToken }),

      removeUserEmail: () => set({ userEmail: null }),
      removeUserPhone: () => set({ userPhone: null }),
      removeUserRole: () => set({ userRole: "specialist" }),
      removeUserId: () => set({ userId: null }),
      removeAccessToken: () => set({ accessToken: null }),
      removeRefreshToken: () => set({ refreshToken: null }),

      clearStore: () =>
        set({
          userEmail: null,
          userPhone: null,
          userRole: "specialist",
          userId: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "store",
    }
  )
);
