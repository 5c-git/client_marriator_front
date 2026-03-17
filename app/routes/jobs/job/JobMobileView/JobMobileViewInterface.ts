export type JobMobileViewInterface = {
  entity: {
    id: number;
    logo: string;
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    place: {
      id: number;
      name: string;
      logo: string;
    };
    activity: string;
    activityDetailsText: string;
    unitPrice: number;
    dateStart: Date;
    dateEnd: Date;
    days: {
      id: number;
      reportId?: number;
      timeStart: Date;
      timeEnd: Date;
      needRoute: boolean;
      locations: {
        id: number;
        name: string;
        logo: string;
      }[];
      action:
        | "start"
        | "inProgress"
        | "end"
        | "reported"
        | "accept"
        | "forPay"
        | "paid"
        | "notEnded"
        | "none";
    }[];
    forPay: number;
    income: number;
    needDays: boolean;
    needPhoto: boolean;
    travelling: boolean;
    user: {
      id: number;
      logo: string;
      name: string;
      role: string;
      phone: string;
    };
    oneDayJob: boolean;
    oneDayJobAction:
      | "start"
      | "inProgress"
      | "end"
      | "reported"
      | "accept"
      | "forPay"
      | "paid"
      | "notEnded"
      | "none";
    oneDayReportId: number | null;
  };
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
  defaultTimeRange: {
    start: Date;
    end: Date;
  };
};
