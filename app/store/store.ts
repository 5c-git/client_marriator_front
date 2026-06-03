import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  userEmail: null | string;
  userPhone: null | string;
  accessToken: null | string;
  refreshToken: null | string;
  userRole: "admin" | "manager" | "supervisor" | "client" | "specialist";
  userId: null | number;
  mapView: boolean;

  userManager: {
    id: number,
    name: string,
    email: string,
    phone: number
  } | null
  userSupervisor: {
    id: number,
    name: string,
    email: string,
    phone: number
  } | null

  setUserEmail: (newUserEmail: string) => void;
  setUserPhone: (newUserPhone: string) => void;
  setUserRole: (
    userRole: "admin" | "supervisor" | "manager" | "client" | "specialist",
  ) => void;
  setUserId: (newUserId: number) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setMapView: (mapView: boolean) => void;
  removeUserEmail: () => void;
  removeUserPhone: () => void;
  removeUserId: () => void;
  removeAccessToken: () => void;
  removeRefreshToken: () => void;

  setUserManager: (manager: {
    id: number,
    name: string,
    email: string,
    phone: number
  }| null) => void;
  setUserSupervisor: (manager: {
    id: number,
    name: string,
    email: string,
    phone: number
  } | null) => void;

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
      mapView: true,
      userManager: null,
      userSupervisor: null,

      setUserEmail: (newUserEmail) => set({ userEmail: newUserEmail }),
      setUserPhone: (newUserPhone) => set({ userPhone: newUserPhone }),
      setUserRole: (newUserRole) => set({ userRole: newUserRole }),
      setUserId: (newUserId) => set({ userId: newUserId }),
      setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
      setRefreshToken: (newRefreshToken) =>
        set({ refreshToken: newRefreshToken }),
      setMapView: (newMapView) => set({ mapView: newMapView }),

      removeUserEmail: () => set({ userEmail: null }),
      removeUserPhone: () => set({ userPhone: null }),
      removeUserRole: () => set({ userRole: "specialist" }),
      removeUserId: () => set({ userId: null }),
      removeAccessToken: () => set({ accessToken: null }),
      removeRefreshToken: () => set({ refreshToken: null }),
      setUserManager: (manager) => set({ userManager: manager }),
      setUserSupervisor: (supervisor) => set({ userSupervisor: supervisor }),

      clearStore: () =>
        set({
          userEmail: null,
          userPhone: null,
          userRole: "specialist",
          userId: null,
          accessToken: null,
          refreshToken: null,
          mapView: true,
          userManager: null,
          userSupervisor: null,
        }),
    }),
    {
      name: "store",
    },
  ),
);
