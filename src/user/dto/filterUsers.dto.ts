import { UserStatus } from '../user.model';

export class filterUsersDto {
  status?: UserStatus;
  search?: string;
}
