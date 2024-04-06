export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "Admin" | "Devops" | "Developer";
}