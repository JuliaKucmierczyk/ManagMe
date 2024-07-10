import { User, mockUsers } from '../Models/User'

export class UserService {
  static getLoggedInUser(): User {
    return {
      id: '1',
      firstName: 'Julia',
      lastName: 'Kućmierczyk',
      role: 'Admin',
      username: "user1",
      password: "test"
    };
  }

  static getAllUsers(): User[] {
    return mockUsers;
  }

  static getAllDevs(): User[] {
    const users = this.getAllUsers(); 
    return users.filter((user) => user.role === "Devops" || user.role === "Developer");
  }
}