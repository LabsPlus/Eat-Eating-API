import {UserDALs} from '../database/repositories/user.repositories/user.dals/user.dals';
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


    async listAllUsers() {

    }

    async updateUser({}) {

    }

    async deleteById(id: string) {

    }
}

export {UserServices};
