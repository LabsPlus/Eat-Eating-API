import {StudentDALs} from '../database/repositories/user.repositories/user.dals/student.dals';

export class StudentService{

    private readonly studentDALs: StudentDALs;

    constructor() {
        this.studentDALs = new StudentDALs()
    }
}

export default {StudentService};
