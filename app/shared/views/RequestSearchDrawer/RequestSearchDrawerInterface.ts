export type RequestSearchDrawerInterface = {
  entity: {
    id: number;
    logo: string;
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
    amount: number;
    needDays: boolean;
    needFoto: boolean;
    days: {
      timeStart: Date;
      timeEnd: Date;
      needRoute: boolean;
      locations: { id: string; name: string; logo: string }[];
    }[];
  };
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
};
