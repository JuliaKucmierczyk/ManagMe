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
}