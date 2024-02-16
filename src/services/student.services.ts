import {StudentDALs} from '../database/repositories/user.repositories/user.dals/student.dals';
import {Student} from "@prisma/client";
import {IUserData} from "../intefaces/user.interfaces";

export class StudentService {

    private readonly studentDALs: StudentDALs;

    constructor() {
        this.studentDALs = new StudentDALs()
    }

    async createStudent({enrollment, userId}: IUserData) {
        
    }
}

export default {StudentService};
