import {prisma} from "../../../prisma.databases";
import {IEmployeeCreate, IEmployeeUpdate} from "../../../../intefaces/employee.interfaces";

class EmployeeDALs {
    async createEmployee({userId, enrollmentId}: IEmployeeCreate) {
        const result = await prisma.employee.create({
            data: {
                userId,
                enrollmentId
            }
        });

        return result
    }

    async updateEmployee({enrollmentId, userId}: IEmployeeUpdate) {
        const result = await prisma.student.update({
            where: {userId: userId},
            data: {
                enrollmentId: enrollmentId,
            }
        })
        return result;
    }

    async deleteByUserId(userId: number) {
        const result = await prisma.employee.delete({
            where: {
                userId: userId,
            }
        });
        return result;
    }

    async findEnrrolmentByUserId(userId: number) {
        const result = await prisma.employee.findUnique(
            {where: {userId}},
        )

        const employee = await prisma.employee.findUnique({
            where: {userId},
            select: {
                enrollment: {
                    select: {
                        enrollment: true
                    }
                }
            }
        })
        return employee?.enrollment;
    }

    async findEmployeeByUserId(userId: number){
        const employee = await prisma.employee.findUnique({
            where:{
                userId: userId,
            }
        });

        return employee;
    }
}

export {EmployeeDALs}
