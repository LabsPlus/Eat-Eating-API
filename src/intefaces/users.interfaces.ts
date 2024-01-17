export interface IUsersCreate {
  email: string;
  password: string;
  emailRecovery: string;
}

export interface IUsersAuth {
  email: string;
  password: string;
}

export interface IUsersUpdatePassword {
    newPassword: string;
    token?: string | undefined;
    email?: string;
}

export interface IUserForgotPassword {
    email: string;
    ip: string | undefined;
}