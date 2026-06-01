export type BidMobileViewInterface = {
  entity: {
    logo: string;
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    place: {
      id: number;
      name: string;
      logo: string;
    };
    project: {
      id: number;
      name: string;
    };
    activity: { id: number; name: string; travelling: boolean };
    unitPrice: number;
    finalPrice: number;
    radius: number;
    dateStart: Date;
    dateEnd: Date;
    responsiblePerson: {
      id: number;
      phone: number;
      email: string;
      logo: string;
      roles: {
        id: number;
        name: "admin" | "manager" | "supervisor" | "client" | "specialist";
      }[];
    };
    taskId: number | null;
    orderId: number | null;
    selfEmployed: boolean;
    progress: number;
    counters: { label: string; count: number; color: string }[];
    amount: number;
    needDays: boolean;
    needFoto: boolean;
    days: {
      timeStart: Date;
      timeEnd: Date;
      needRoute: boolean;
      locations: { id: string; name: string; logo: string }[];
    }[];
    units: string;
    currency: string;
  };
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
  radiuses: {
    value: string;
    label: string;
    disabled: boolean;
  }[];
  defaultTimeRange: {
    start: Date;
    end: Date;
  };
  projectTimeRange: {
    start: Date;
    end: Date;
  };
};
