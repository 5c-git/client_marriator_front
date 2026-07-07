import { injected } from "brandi";

import type {
  GetUserInfo,
  GetTasks,
  RepeatTask,
  CancelTask,
} from "./tasks.private-tokens";

import { tasksPrivateTokens } from "./tasks.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { statusCodeMap } from "~/shared/status";

export class TasksService {
  constructor(
    private readonly appService: AppService,
    private readonly loadTasks: GetTasks,
    private readonly loadUserInfo: GetUserInfo,
    private readonly _repeatTask: RepeatTask,
    private readonly _cancelTask: CancelTask,
  ) {}

  getUserRole() {
    return this.appService.getUserRole();
  }

  async getTasks() {
    const token = this.appService.getToken();

    const tasksData = await this.loadTasks(token);

    return tasksData.data.map((item) => {
      const earliestStartDate: string[] = [];
      const latestEndDate: string[] = [];

      item.orderActivities.forEach((item) => {
        earliestStartDate.push(item.dateStart);
      });

      item.orderActivities.forEach((item) => {
        latestEndDate.push(item.dateEnd);
      });

      earliestStartDate.sort(
        (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
      );

      latestEndDate.sort(
        (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
      );

      return {
        id: item.id,
        userId: item.user.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.orderActivities.length.toString(),
        subHeader: item.orderActivities
          .map((activity) => `${activity.viewActivity.name}`)
          .join(", "),
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
          end: latestEndDate.length > 0 ? latestEndDate[0] : null,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
        units: "",
        currency: "₽",
        createdAt: item.createdAt,
      };
    });
  }

  async getUserIntervals() {
    const token = this.appService.getToken();

    const userData = await this.loadUserInfo(token);

    let cancel_task_interval = 6;
    let repeat_task_interval = 6;

    if (userData.result.userData.cancel_task) {
      const date = new Date(
        `2026-03-12T${userData.result.userData.cancel_task.startsWith("0") ? userData.result.userData.cancel_task : `0${userData.result.userData.cancel_task}`}`,
      );
      cancel_task_interval = date.getHours();
    }
    if (userData.result.userData.change_order) {
      const date = new Date(
        `2026-03-12T${userData.result.userData.change_order.startsWith("0") ? userData.result.userData.change_order : `0${userData.result.userData.change_order}`}`,
      );
      repeat_task_interval = date.getHours();
    }

    return {
      id: userData.result.userData.id,
      cancel_task_interval,
      repeat_task_interval,
    };
  }

  async repeatTask(taskId: string) {
    const token = this.appService.getToken();

    return this._repeatTask(token, taskId);
  }

  async cancelTask(taskId: string) {
    const token = this.appService.getToken();

    return this._cancelTask(token, taskId);
  }
}

injected(
  TasksService,
  appTokens.appService,
  tasksPrivateTokens.getTasks,
  tasksPrivateTokens.getUserInfo,
  tasksPrivateTokens.repeatTask,
  tasksPrivateTokens.cancelTask,
);
