import { CategoryName, TypeGrantName } from '@prisma/client';

export interface IUserData {
  name: string;
  enrollment?: string;
  cpf?: string;
  born?: Date;
  category: CategoryName;
  typeGrant: TypeGrantName;
  dailyMeals: number;
  picture?: string;
  course?: string;
}

export interface IUserDataCreate extends IUserData {
  email: string;
  password: string;
  emailRecovery: string;
}
export interface IUSerDataUpdate extends IUserData{
  emailRecovery: string;
  password: string;
}

export interface IUserCreate {
  personId: number;
  categoryId: number;
  typeGrantId: number;
  loginUserId: number;
  dailyMeals: number;
}

export interface IUserUpdate {
  id: number;
  name: string;
  enrollment?: string;
  cpf?: string;
  born?: Date;
  categoryId: number;
  typeGrantId: number;
  dailyMeals: number;
  picture?: string;
  course?: string;
}
