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
      name: "manager" | "supervisor" | "client" | "specialist";
    }[];
    radius: string;
    name: string;
    age: string;
    country: string;
    viewActivities: string[];
    status: 4 | 1 | 2 | 3 | 5;
  }[];
  radiuses: {
    value: string;
    label: string;
    disabled: boolean;
  }[];
};
