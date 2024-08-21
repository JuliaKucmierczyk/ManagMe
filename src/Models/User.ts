export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "Admin" | "Devops" | "Developer";
    username: string;
    password: string;
}

export const mockUsers: User[] = [
    {
      id: "1",
      firstName: "Julia",
      lastName: "Kućmierczyk",
      role: "Admin",
      username: "user1",
      password: "test123",
    },
    {
        id: "2",
        firstName: "Izabela",
        lastName: "Radzik",
        role: "Devops",
        username: "user2",
        password: "password2",
    },
    {
        id: "3",
        firstName: "Adrian",
        lastName: "Kosiński",
        role: "Developer",
        username: "user3",
        password: "password3",
    },
    {
        id: "4",
        firstName: "Piotr",
        lastName: "Dziadkowiec",
        role: "Developer",
        username: "user4",
        password: "password4",
    },
    {
        id: "5",
        firstName: "Marek",
        lastName: "Ćwioro",
        role: "Devops",
        username: "user24",
        password: "password24",
    },
];