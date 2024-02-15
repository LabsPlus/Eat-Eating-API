import {EmployeeDALs} from "../database/repositories/user.repositories/user.dals/employee.dals";

export class EmployeeService {

    private readonly employeeDALs: EmployeeDALs;

    constructor() {
        this.employeeDALs = new EmployeeDALs();
    }

}

export default {EmployeeService};
