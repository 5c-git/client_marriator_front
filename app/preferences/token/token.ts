import { Preferences } from "@capacitor/preferences";

export const setAccessToken = async (accessToken: string) => {
  await Preferences.set({
    key: "accessToken",
    value: accessToken,
  });
};

export const setRefreshToken = async (refreshToken: string) => {
  await Preferences.set({
    key: "refreshToken",
    value: refreshToken,
  });
};

export const getAccessToken = async () => {
  const { value } = await Preferences.get({ key: "accessToken" });

  return value;
};

export const getRefreshToken = async () => {
  const { value } = await Preferences.get({ key: "refreshToken" });

  return value;
};

export const removeToken = async () => {
  await Preferences.remove({ key: "accessToken" });
  await Preferences.remove({ key: "refreshToken" });
};
