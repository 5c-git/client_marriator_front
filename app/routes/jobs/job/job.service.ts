import { injected } from "brandi";
import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import { jobPrivateTokens } from "./job.private-tokens";
import {
  type GetJob,
  type AcceptBid,
  type StartDay,
  type RejectBid,
  type EndDay,
  type PayReport,
  type GetSettings,
} from "./job.private-tokens";
import { Setting } from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";

export class JobService {
  constructor(
    private readonly appSerivice: AppService,
    private readonly _getJob: GetJob,
    private readonly _acceptBid: AcceptBid,
    private readonly _startDay: StartDay,
    private readonly _rejectBid: RejectBid,
    private readonly _endDay: EndDay,
    private readonly _payReport: PayReport,
    private readonly _getSettings: GetSettings,
  ) {}

  async getJob(specialistId: string, bidId: string) {
    const token = this.appSerivice.getToken();

    return this._getJob(token, specialistId, bidId);
  }

  async getSettings(setting: Setting) {
    const token = this.appSerivice.getToken();

    return this._getSettings(token, setting);
  }

  async acceptBid(bidId: string) {
    const token = this.appSerivice.getToken();

    return this._acceptBid(token, bidId);
  }

  async rejectBid(bidId: string) {
    const token = this.appSerivice.getToken();

    return this._rejectBid(token, bidId);
  }

  async startDay(bidId: string) {
    const token = this.appSerivice.getToken();

    return this._startDay(token, bidId);
  }

  async payReport(reportId: string) {
    const token = this.appSerivice.getToken();

    return this._payReport(token, reportId);
  }

  async endDay(bidId: string, files?: File[]) {
    const token = this.appSerivice.getToken();

    return this._endDay(token, bidId, files);
  }
}

injected(
  JobService,
  appTokens.appService,
  jobPrivateTokens.getJob,
  jobPrivateTokens.acceptBid,
  jobPrivateTokens.startDay,
  jobPrivateTokens.rejectBid,
  jobPrivateTokens.endDay,
  jobPrivateTokens.payReport,
  jobPrivateTokens.getSettings,
);
