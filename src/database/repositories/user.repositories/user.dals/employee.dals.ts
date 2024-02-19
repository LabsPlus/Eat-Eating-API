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

    async checkEnrollmentUnique(enrollment: string): Promise<boolean> {
        const existingEmployee = await prisma.employee.findUnique({
            where: {
                enrollment: enrollment
            }
        });

        return !existingEmployee; // Retorna true se o funcionário não existir, caso contrário retorna false
    }
}

export {EmployeeDALs}
