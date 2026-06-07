export type UserRole = "Manager" | "Admin";
export type UserStatus = "Accepted" | "Pending";

export type ManagerUser = {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  scope: string;
};

export const managerUsers: ManagerUser[] = [
  {
    id: "1",
    name: "DigitalZini Ltd",
    email: "digitalziniaus@gmail.com",
    firstName: "DigitalZini",
    lastName: "Ltd",
    role: "Manager",
    status: "Accepted",
    scope: "Maikhana Adelaide",
  },
  {
    id: "2",
    name: "Amandeep Sohal",
    email: "aman@digitalzini.com",
    firstName: "Amandeep",
    lastName: "Sohal",
    role: "Manager",
    status: "Accepted",
    scope: "Maikhana Adelaide",
  },
  {
    id: "3",
    name: "Mohit Gupta",
    email: "mohitgupta2306@gmail.com",
    firstName: "Mohit",
    lastName: "Gupta",
    role: "Admin",
    status: "Accepted",
    scope: "Maikhana Adelaide",
  },
];

export const orderManagerCredentials: Record<string, string> = {
  "Maikhana Adelaide": "little-india-adelaide@ubereats.com",
  "Scoop Shoppe": "scoop-shoppe@ubereats.com",
};

export const userShops = ["Maikhana Adelaide", "Scoop Shoppe"] as const;
export const userRoles: UserRole[] = ["Manager", "Admin"];
