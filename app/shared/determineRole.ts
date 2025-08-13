export const determineRole = (
  roles: {
    id: number;
    name:
      | "admin"
      | "supervisor"
      | "manager"
      | "client"
      | "recruiter"
      | "specialist";
  }[]
) => {
  let role:
    | "admin"
    | "supervisor"
    | "manager"
    | "client"
    | "recruiter"
    | "specialist" = "specialist";

  const rolePoints = {
    admin: 12,
    supervisor: 10,
    manager: 8,
    client: 6,
    recruiter: 4,
    specialist: 2,
  };

  let currentPoints = 2;

  roles.forEach((item) => {
    if (rolePoints[item.name] > currentPoints) {
      currentPoints = rolePoints[item.name];
      role = item.name;
    }
  });

  return role;
};
