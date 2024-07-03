import { Preferences } from "@capacitor/preferences";

export const clearPreferences = async () => {
  await Preferences.clear();
};
