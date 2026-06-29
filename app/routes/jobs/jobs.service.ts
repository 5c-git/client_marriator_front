import { injected } from "brandi";

import type { GetJobs } from "./jobs.private-tokens";

import { jobsPrivateTokens } from "./jobs.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { statusCodeMap } from "~/shared/specialistStatus";

export class JobsService {
  constructor(
    private readonly appService: AppService,
    private readonly _getJobs: GetJobs,
  ) {}

  getUserRole() {
    return this.appService.getUserRole();
  }

  async getJobs() {
    const token = this.appService.getToken();

    const jobsData = await this._getJobs(token);

    jobsData.data.sort(
      (a, b) => new Date(a.dateStart).valueOf() - new Date(b.dateEnd).valueOf(),
    );

    return jobsData.data.map((item) => ({
      id: item.id,
      userId: item.acceptingUser.id,
      status: item.acceptingUser.status,
      statusColor: statusCodeMap[item.acceptingUser.status].color,
      header: item.viewActivity.name,
      subHeader: item.price.toString(),
      address: {
        logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
        text: item.place.address_kladr,
      },
      duration: {
        start: item.dateStart,
        end: item.dateEnd,
      },
      coordinates: [Number(item.place.latitude), Number(item.place.longitude)],
      units: item.viewActivity.standard.name,
      currency: "₽",
    }));
  }
}

injected(JobsService, appTokens.appService, jobsPrivateTokens.getJobs);
