export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "Admin" | "Devops" | "Developer";
}

export const mockUsers: User[] = [
    {
      id: "1",
      firstName: "Julia",
      lastName: "Kućmierczyk",
      role: "Admin"
    },
    {
        id: "2",
        firstName: "Izabela",
        lastName: "Radzik",
        role: "Devops"
    },
    {
        id: "3",
        firstName: "Adrian",
        lastName: "Kosiński",
        role: "Developer"
    },
    {
        id: "4",
        firstName: "Piotr",
        lastName: "Dziadkowiec",
        role: "Developer"
    },
];