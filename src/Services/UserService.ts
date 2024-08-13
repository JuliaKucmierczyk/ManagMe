import { ApiService } from '../API/ApiService';
import { User, mockUsers } from '../Models/User'

export class UserService {
  static setCurrentUser(username: string) {
    ApiService.setData("logged-user", username);
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
}