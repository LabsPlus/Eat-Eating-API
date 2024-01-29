export interface IUserCreate {
    name: string;
    enrollment: string;
    categoryId?: number;
    typeStudentGrantId?: number;
    dailyMeals:  number;
}
export interface IUserUpdate{
    id: number;
    name: string;
    enrollment: string;
    categoryId?: number;
    typeStudentGrantId?: number;
    dailyMeals:  number;
}