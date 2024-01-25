import {UserDALs} from "../database/data.access/user.dals";
import {IUserCreate} from "../intefaces/user.interfaces";
import dotenv from 'dotenv';
dotenv.config();

const {Link} = process.env;

class UserServices {

    private userDALs: UserDALs;

    constructor() {
        this.userDALs = new UserDALs();
    }

    async createUser({name, enrollment, categoryId, typeStudentGrantId, dailyMeals}: IUserCreate) {

        if (enrollment === undefined || enrollment === null || enrollment === '') {
            throw new Error('Enrollment is required');
        }

        const findUserByEnrollment = await this.userDALs.findUserByEnrollment(enrollment);

        if (findUserByEnrollment) {
            throw new Error('User enrollment already exists');
        }

        const result = await this.userDALs.createUser({
            name,
            enrollment,
            categoryId,
            typeStudentGrantId,
            dailyMeals
        });

        return result;
    }

    async listAllUsers() {
        const users = await this.userDALs.listAllUsers();
        return users.map(user => {
            const { typeStudentGrantId, categoryId, ...userWithoutUnwantedFields } = user;
            return userWithoutUnwantedFields;
        });
    }
    

    async deleteAllUsers() {
        const users = await this.userDALs.deleteAllUsers();
        return users;
    }
}


export {UserServices};
