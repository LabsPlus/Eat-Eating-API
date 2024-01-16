export interface IUsersCreate {
  email: string;
  password: string;
  emailRecovery: string;
}

export interface IUsersAuth {
  email: string;
  password: string;
}
