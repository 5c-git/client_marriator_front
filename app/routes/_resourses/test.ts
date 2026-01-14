const customers = {
  data: [
    {
      id: "cl9putjgo0002x7yxd8sw8frm",
      name: "Santa Monica",
      email: "santa@monica.jk",
    },
    {
      id: "cl9putjgr000ox7yxy0zb3tca",
      name: "Stankonia",
      email: "stan@konia.jk",
    },
    {
      id: "cl9putjh0002qx7yxkrwnn69i",
      name: "Wide Open Spaces",
      email: "wideopen@spaces.jk",
    },
  ],
};

export async function clientLoader() {
  return customers;
}
