import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserStatus } from './user.model';
import { v4 as UUID } from 'uuid';
import { CreateUserDto } from './dto/createuser.dto';
import { filterUsersDto } from './dto/filterUsers.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }
  getUserById(id: string): User {
    return this.users.find((user) => {
      if (user.id === id) {
        return user;
      }
    });
  }
  getUserByFilter(filterdto: filterUsersDto): User[] {
    const { status, search } = filterdto;
    let user = this.getAllUsers();
    if (status) {
      user = user.filter((user) => user.Status === status);
    }
    if (search) {
      user = user.filter((user) => {
        if (user.UserName.includes(search) || user.email.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return user;
  }
  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
  updateUserStatus(id: string, Status: UserStatus): User {
    const user = this.getUserById(id);
    user.Status = Status;
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { UserName, email } = createUserDto;
    const user: User = {
      id: UUID(),
      UserName,
      email,
      Status: UserStatus.Employed,
    };
    this.users.push(user);
    return user;
  }
}
