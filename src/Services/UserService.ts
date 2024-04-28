import { User } from '../Models/User'

export class UserService {
  static getLoggedInUser(): User {
    return {
      id: '1',
      firstName: 'Julia',
      lastName: 'Kućmierczyk',
      role: 'Admin'
    };
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch("/api/users"); 
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const users = await response.json() as User[];
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; 
    }
  }
}