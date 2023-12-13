export interface IUserCreate {
  email: string;
  password: string;
  emailRecovery: string;
}

export interface IUserAuth {
  email: string;
  password: string;
}
