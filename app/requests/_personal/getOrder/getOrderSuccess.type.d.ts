export interface GetOrderSuccess {
  data: {
    id: number;
    selfEmployed: boolean;
    status: 1 | 2 | 3 | 4 | 5;
    place: {
      id: number;
      name: string;
      latitude: string;
      longitude: string;
      address_kladr: string;
      logo: string;
      region: {
        id: number;
        name: string;
        [k: string]: unknown;
      };
      brand: {
        id: number;
        name: string;
        logo: string;
        description: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    user: {
      id: number;
      phone: number;
      name: string;
      email: string;
      logo: string;
      roles: {
        id: number;
        name: "client" | "manager" | "specialist" | "supervisor";
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    orderActivities: {
      viewActivity: {
        id: number;
        name: string;
        detailName: string;
        previewText: string;
        logo: string;
        traveling: boolean;
        [k: string]: unknown;
      };
      id: number;
      count: number;
      dateStart: string;
      dateEnd: string;
      needFoto: boolean;
      dateActivity: {
        timeStart: string;
        timeEnd: string;
        places: {
          id: number;
          name: string;
          latitude: string;
          longitude: string;
          address_kladr: string;
          logo?: null | string;
          region: {
            id: number;
            name: string;
            [k: string]: unknown;
          };
          brand: {
            id: number;
            name: string;
            logo?: null | string;
            description: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    }[];
    acceptUser: {
      id: number;
      phone: number;
      name: string;
      email: string;
      logo: string;
      roles: {
        id: number;
        name: "client" | "manager" | "specialist" | "supervisor";
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
