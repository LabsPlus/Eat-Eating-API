export interface IAdministratorData {
  email: string;
  password: string;
  emailRecovery: string;
  name: string;
  phone: string;
  picture: string;
}
export interface IAdministratorUpdate {
  adminId:number;
  personId: number;
  email: string;
  password: string;
  emailRecovery: string;
  name: string;
  phone: string;
  picture: string;
}