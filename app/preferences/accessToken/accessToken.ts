import { Preferences } from "@capacitor/preferences";

export const setAccessToken = async (accessToken: string) => {
  await Preferences.set({
    key: "accessToken",
    value: accessToken,
  });
};

export const getAccessToken = async () => {
  const { value } = await Preferences.get({ key: "accessToken" });

  return value;
};

export const removeAccessToken = async () => {
  await Preferences.remove({ key: "accessToken" });
};
