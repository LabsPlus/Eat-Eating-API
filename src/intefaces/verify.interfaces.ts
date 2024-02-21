import { CategoryName } from "@prisma/client";

export interface IVerifyUpdateByCategory{
    userId: number,
    oldCategory: CategoryName,
    category: CategoryName,
    enrollment: string
}