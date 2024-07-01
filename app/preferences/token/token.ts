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

export const validateToken = async () => {
  const { value } = await Preferences.get({ key: "accessToken" });

  if (value === null) {
    // const { value } = await Preferences.get({ key: "refreshToken" });

    // const newAccessToken = await updateToken(value);

    // await setAccessToken(newAccessToken);

    const { value: updatedAccessToken } = await Preferences.get({
      key: "accessToken",
    });

    return updatedAccessToken;
  }

  return value;
};

export const removeToken = async () => {
  await Preferences.remove({ key: "accessToken" });
  await Preferences.remove({ key: "refreshToken" });
};
