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
        const result = await prisma.employee.deleteMany({
            where: {
                userId: userId,
            }
        });
        return result;
    }

    async findEmployeeByUserId(userId: number) {
        const result = await prisma.employee.findUnique(
            {where: {userId}},
        )

        const student = await prisma.employee.findUnique({
            where: {userId},
            select: {
                enrollment: {
                    select: {
                        enrollment: true
                    }
                }
            }
        })
        return student?.enrollment;
    }
}

export {EmployeeDALs}
