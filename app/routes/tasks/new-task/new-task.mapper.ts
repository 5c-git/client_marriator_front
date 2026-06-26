import type { GetPlaceForTaskSuccess } from "~/api/_personal/getPlaceForTask/getPlaceForTaskSuccess.schema";
import type { GetTaskSuccess } from "~/api/_personal/getTask/getTaskSuccess.schema";

import type { NewTaskMobileViewInterface } from "./_views/NewTaskMobileViewInterface";

export class NewTaskMapper {
  static mapDataToNewTask(
    data: GetTaskSuccess,
  ): NewTaskMobileViewInterface["task"] {
    return {
      id: data.data.id.toString(),
      projectId: data.data.project.id.toString(),
      place: {
        id: data.data.place.id.toString(),
        name: data.data.place.name,
        region: data.data.place.region.name,
      },
      selfEmployed: data.data.selfEmployed,
      isNewTask: false,
      taskServices: data.data.orderActivities.map((item) => ({
        id: item.id,
        count: item.count,
        name: item.viewActivity.name,
      })),
      invitedSupervisors: data.data.acceptedUser.map((item) => ({
        id: item.id,
        phone: item.phone,
        email: item.email,
        name: item.name,
        logo: item.logo,
      })),
      responsibleSupervisorId: data.data.acceptUser
        ? data.data.acceptUser.id
        : null,
    };
  }

  static placesToSelectOptions(data: GetPlaceForTaskSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: `${item.name} ${item.region.name}`,
      disabled: false,
    }));
  }
}
