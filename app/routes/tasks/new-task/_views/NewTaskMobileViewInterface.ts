export type NewTaskMobileViewInterface = {
  task: {
    id: string;
    projectId: null | string;
    place: {
      id: string;
      name: string;
      region: string;
    } | null;
    selfEmployed: boolean;
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
  placesOptions: { value: string; label: string; disabled: boolean }[];
  projectsOptions: { value: string; label: string; disabled: boolean }[];
  headerBackAction: () => void;
  submitAction: (
    placeId: string,
    projectId: string,
    selfEmployed: boolean,
  ) => void;
  cancelAction: () => void;
  deleteAction: (serviceId: number) => void;
  drawerAction: () => void;
};
