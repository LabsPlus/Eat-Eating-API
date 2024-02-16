import {prisma} from "../../../prisma.databases";
import {IEmployeeCreate} from "../../../../intefaces/employee.interfaces";


class EmployeeDALs {
    async createEmployee({userId, enrollment}: IEmployeeCreate) {
        const result = await prisma.employee.create({
            data: {
                userId,
                enrollment
            }
        });

        return result
    }
}

export {EmployeeDALs}
