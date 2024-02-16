import {CategoryName, TypeGrantName} from "@prisma/client";

export interface IUserData {
    name: string;
    enrollment?: string;
    cpf?: string;
    born?: Date;
    category: CategoryName;
    typeGrant: TypeGrantName;
    dailyMeals: number;
    picture?: string;
    course?: string
}

export interface IUserCreate {
    personId: number;
    categoryId: number;
    typeGrantId: number;
    loginUserId?: number
}
