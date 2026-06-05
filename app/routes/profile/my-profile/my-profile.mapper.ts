import type { GetUserPersonalMenuSuccess } from "~/api/_personal/getUserPersonalMenu/getUserPersonalMenu.schema";


export type MyProfileSection = {
  name: string;
  value: string;
  hasNotification: boolean;
};

export type MyProfileData = {
  sections: MyProfileSection[];
  hasSectionsWithNotifications: boolean;
};

export class MyProfileMapper {
  static toData(data: GetUserPersonalMenuSuccess): MyProfileData {
    const sections = data.result.section.map((item) => ({
      name: item.name,
      value: item.value.toString(),
      hasNotification: item.notification,
    }));

    return {
      sections,
      hasSectionsWithNotifications: sections.some(
        (section) => section.hasNotification,
      ),
    };
  }
}
