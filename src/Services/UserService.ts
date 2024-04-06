import { User } from '../Models/User'

export class UserService {
  static getLoggedInUser(): User {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Developer'
    };
  }
}