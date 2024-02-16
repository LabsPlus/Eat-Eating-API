import {EmployeeDALs} from "../database/repositories/user.repositories/user.dals/employee.dals";
import {IUserData} from "../intefaces/user.interfaces";

export class EmployeeService {

    private readonly employeeDALs: EmployeeDALs;

    constructor() {
        this.employeeDALs = new EmployeeDALs();
    }
    async createEmployee({}: IUserData) {
        return await this.employeeDALs.createEmployee(employee);
    }
}

export default {EmployeeService};
