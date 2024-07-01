import { Preferences } from "@capacitor/preferences";

export const setUserPhone = async (phone: string) => {
  await Preferences.set({
    key: "userPhone",
    value: phone,
  });
};

export const getUserPhone = async () => {
  const { value } = await Preferences.get({ key: "userPhone" });

  return value;
};

export const removeUserPhone = async () => {
  await Preferences.remove({ key: "userPhone" });
};
