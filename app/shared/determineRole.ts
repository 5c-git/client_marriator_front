export const determineRole = (
  roles: {
    id: number;
    name: "manager" | "supervisor" | "client" | "specialist";
  }[],
) => {
  let role: "manager" | "supervisor" | "client" | "specialist" = "specialist";

  const rolePoints = {
    // admin: 12,
    manager: 10,
    supervisor: 8,
    client: 6,
    // recruiter: 4,
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
