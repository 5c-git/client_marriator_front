import { Preferences } from "@capacitor/preferences";

export const setUserEmail = async (email: string) => {
  await Preferences.set({
    key: "userEmail",
    value: email,
  });
};

export const getUserEmail = async () => {
  const { value } = await Preferences.get({ key: "userEmail" });

  return value;
};

export const removeUserEmail = async () => {
  await Preferences.remove({ key: "userEmail" });
};
