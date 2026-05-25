export type SpecialistsMobileViewInterface = {
  bid: {
    id: number;
    dateStart: Date;
    dateEnd: Date;
  };
  activeService: string;
  startingRadius: number;
  specialists: {
    id: number;
    phone: number;
    email: string;
    logo: string;
    roles: {
      id: number;
      name: "admin" | "manager" | "supervisor" | "client" | "specialist";
    }[];
    radius: number;
    name: string;
    age: string;
    country: string;
    viewActivities: string[];
    status: 4 | 1 | 2 | 3 | 5 | 6 | 7;
    viewActivitiesAccurate: boolean;
  }[];
  radiuses: {
    value: string;
    label: string;
    disabled: boolean;
  }[];
};
