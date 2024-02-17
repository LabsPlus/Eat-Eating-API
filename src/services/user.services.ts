import {UserDALs} from '../database/repositories/user.repositories/user.dals/user.dals';
import dotenv from 'dotenv';

dotenv.config();

const {Link} = process.env;

class UserServices {
    userDALs: UserDALs;

    constructor() {
        this.userDALs = new UserDALs();
    }

    async listAllUsers() {
        return this.userDALs.listAllUsers();
    }

    async deleteById(id: number) {
        return this.userDALs.deleteUserById(id);
    }
}

export {UserServices};
