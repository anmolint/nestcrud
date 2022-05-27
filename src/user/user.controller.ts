import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { filterUsersDto } from './dto/filterUsers.dto';
import { User, UserStatus } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers(@Query() filterdto: filterUsersDto): User[] {
    if (Object.keys(filterdto).length) {
      return this.userService.getUserByFilter(filterdto);
    } else {
      return this.userService.getAllUsers();
    }
  }
  @Get('/:id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(id);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(id);
  }
  @Put('/:id/status')
  updateUserStatus(
    @Param('id') id: string,
    @Body('status') status: UserStatus,
  ): User {
    return this.userService.updateUserStatus(id, status);
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }
}
