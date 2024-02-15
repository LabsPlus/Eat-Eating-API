import {UserDALs} from '../database/data.access/user.dals';
import {ErrorsHelpers} from '../helpers/errors.helpers';
import {IUserCreate, IUserUpdate} from '../intefaces/user.interfaces';
import dotenv from 'dotenv';

dotenv.config();

const {Link} = process.env;

class UserServices {
    userDALs: UserDALs;

    constructor() {
        this.userDALs = new UserDALs();
    }

    async createUser({
                         name,
                         enrollment,
                         categoryId,
                         typeStudentGrantId,
                         dailyMeals,
                     }: IUserCreate) {
        if (enrollment === undefined || enrollment === null || enrollment === '') {
            throw new ErrorsHelpers({
                message: 'Enrollment is required',
                statusCode: 401,
            });
        }

        if (dailyMeals < 0 || dailyMeals > 3) {
            throw new ErrorsHelpers({
                message: 'Daily meals must be between 0 and 3',
                statusCode: 401,
            });
        }

        const findUserByEnrollment = await this.userDALs.existsUserByEnrollment(
            enrollment,
        );

        if (findUserByEnrollment) {
            throw new ErrorsHelpers({
                message: 'User enrollment already exists',
                statusCode: 401,
            });
        }

        const result = await this.userDALs.createUser({
            name,
            enrollment,
            categoryId,
            typeStudentGrantId,
            dailyMeals,
        });

        return result;
    }

    async findUserByEnrollment(enrollment: string) {
        const result = await this.userDALs.existsUserByEnrollment(enrollment);
        if (!result) {
            throw new ErrorsHelpers({message: 'User not found', statusCode: 401});
        }

        return result;
    }

    async listAllUsers() {
        const users = await this.userDALs.listAllUsers();
        return users.map((user: any) => {
            const {typeStudentGrantId, categoryId, ...userWithoutUnwantedFields} =
                user;
            return userWithoutUnwantedFields;
        });
    }

    async updateUser({
                         id,
                         name,
                         enrollment,
                         categoryId,
                         typeStudentGrantId,
                         dailyMeals,
                     }: IUserUpdate) {
        const user = await this.userDALs.findUserById(id);
        if (!user) {
            throw new ErrorsHelpers({message: 'User not found', statusCode: 401});
        }

        if (enrollment === undefined || enrollment === null || enrollment === '') {
            throw new ErrorsHelpers({
                message: 'Enrollment is required',
                statusCode: 401,
            });
        }

        if (dailyMeals < 0 || dailyMeals > 3) {
            throw new ErrorsHelpers({
                message: 'Daily meals must be between 0 and 3',
                statusCode: 401,
            });
        }

        const result = await this.userDALs.updateUser({
            id,
            name,
            enrollment,
            categoryId,
            typeStudentGrantId,
            dailyMeals,
        });
        return result;
    }

    async deleteById(id: string) {
        const user = await this.userDALs.deleteUserById(id);
        if (!user) {
            throw new ErrorsHelpers({message: 'User not found', statusCode: 401});
        }
        return user;
    }

    async deleteAllUsers() {
        const users = await this.userDALs.deleteAllUsers();
        if (!users) {
            throw new ErrorsHelpers({message: 'Users not found', statusCode: 401});
        }

        return users;
    }
}

export {UserServices};
