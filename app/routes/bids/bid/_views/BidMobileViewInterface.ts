export type BidMobileViewInterface = {
  translation: "bid";
  bid: {
    id: string;
    projectId: null | string;
    place: {
      id: string;
      name: string;
      region: string;
    };
    selfEmployed: boolean;
    isNewTask: boolean;
    taskServices: {
      id: number;
      count: number;
      name: string;
    }[];
    invitedSupervisors: {
      id: number;
      phone: number;
      email: string;
      name: string;
      logo: string;
    }[];
    responsibleSupervisorId: null | number;
  };
};
