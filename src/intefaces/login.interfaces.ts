export interface ILoginCreate {
  email: string;
  password: string;
  emailRecovery: string;
}

export interface ILoginAuth {
  email: string;
  password: string;
}

export interface ILoginUpdatePassword {
  newPassword: string;
  token?: string | undefined;
  email?: string;
}

export interface ILoginForgotPassword {
  email: string;
  ip: string | undefined;
}

export interface ILoginUpdatePassword {
  newPassword: string;
  token?: string | undefined;
  email?: string;
}
export interface ILoginUpdateResetToken {
  resetToken: string;
  resetTokenExpiry: Date;
  email: string;
}

export interface ILoginUserUpdate {
  id: number;
  email: string;
  emailRecovery: string;
  password: string;
}

export interface ILoginFind{
  email?: string;
  emailRecovery?: string;
}


