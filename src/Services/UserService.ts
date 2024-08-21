import { ApiService } from '../API/ApiService';
import { User, mockUsers } from '../Models/User'

export class UserService {
  static setCurrentUser(user: User) {
    ApiService.setData("logged-user", user);
  }
  static getLoggedInUser(): User {
  return ApiService.getData("logged-user")  ;
 }

  static getAllUsers(): User[] {
    return mockUsers;
  }

  static getAllDevs(): User[] {
    const users = this.getAllUsers(); 
    return users.filter((user) => user.role === "Devops" || user.role === "Developer");
  }

  static getUserById(userId: string): User | undefined {
    const users = this.getAllUsers();
    return users.find((user) => user.id === userId);
  }
}