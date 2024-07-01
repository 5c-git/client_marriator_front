import { Preferences } from "@capacitor/preferences";

export const setRefreshToken = async (refreshToken: string) => {
  await Preferences.set({
    key: "refreshToken",
    value: refreshToken,
  });
};

export const getRefreshToken = async () => {
  const { value } = await Preferences.get({ key: "refreshToken" });

  return value;
};

export const removeRefreshToken = async () => {
  await Preferences.remove({ key: "refreshToken" });
};
