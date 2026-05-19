import type { GetUserPersonalMenuSuccess } from "~/api/_personal/getUserPersonalMenu/getUserPersonalMenu.schema";

import type { MyProfileLoaderData } from "./my-profile.service";

export class MyProfileMapper {
  static toLoaderData(data: GetUserPersonalMenuSuccess): MyProfileLoaderData {
    const sections = data.result.section.map((item) => ({
      name: item.name,
      value: item.value,
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
