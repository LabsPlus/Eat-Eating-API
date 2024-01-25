import {prisma} from "../prisma.databases";
import {IUserCreate} from "../../intefaces/user.interfaces";

class UserDALs {

    async createUser(
        {
            name,
            enrollment,
            categoryId,
            typeStudentGrantId,
            dailyMeals
        }: IUserCreate) {

        const result = await prisma.user.create({
            data: {
                name,
                enrollment,
                categoryId,
                typeStudentGrantId,
                dailyMeals
            },
        });

        return result;
    }

    async listAllUsers() {
        const users = await prisma.user.findMany({
            include: {
                Category: true,
                TypeStudentGrant: true,
            },
        });
        return users;
    }

    async deleteAllUsers() {
        const users = await prisma.user.deleteMany();
        return users;
    }

    async findUserByEnrollment(enrollment: string) {
        const user = await prisma.user.findUnique({
            where: {
                enrollment,
            },
        });
        return user;
    }
}

export {UserDALs};