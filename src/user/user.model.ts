export interface User {
  id: string;
  UserName: string;
  email: string;
  Status: UserStatus;
}
export enum UserStatus {
  Employed = 'Employed',
  Unemployed = 'Unemployed',
}
