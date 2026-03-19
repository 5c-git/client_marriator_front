export type SpecialistMobileViewInterface = {
  entity: {
    id: number;
    logo: string;
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    place: {
      id: number;
      name: string;
      logo: string;
    };
    activity: string;
    unitPrice: number;
    dateStart: string;
    dateEnd: string;
    days: {
      id: number;
      reportId?: number;
      timeStart: string;
      timeEnd: string;
      places: {
        id: number;
        logo: string;
        text: string;
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
    needPhoto: boolean;
    user: {
      id: number;
      logo: string;
      name: string;
      role: "admin" | "manager" | "supervisor" | "client" | "specialist";
      phone: string;
    };
    specialist: {
      id: number;
      logo: string;
      name: string;
      role: "admin" | "manager" | "supervisor" | "client" | "specialist";
      phone: string;
    };
    canCheckAll: boolean;
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
    units: string;
    currency: string;
  };
};
