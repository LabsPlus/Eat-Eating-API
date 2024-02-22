import {prisma} from "../../../prisma.databases";
import {IEmployeeCreate, IEmployeeUpdate} from "../../../../intefaces/employee.interfaces";

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
    async updateEmployee({ enrollment, userId}: IEmployeeUpdate){
        const result = await prisma.student.update({
                where: {userId: userId},
                data:{
                    enrollment: enrollment,
                }
        })
        return result;
    }
    async checkEnrollmentUnique(enrollment: string): Promise<boolean> {
        const existingEmployee = await prisma.employee.findUnique({
            where: {
                enrollment: enrollment
            }
        });

        return !existingEmployee; // Retorna true se o funcionário não existir, caso contrário retorna false
    }

    async deleteByUserId(userId: number){
        const result = await prisma.employee.deleteMany({
            where:{
                userId: userId,
            }
        });
        return result;
    }

    async findEmployeeByUserId(userId: number){
        const result = await prisma.employee.findUnique(
            {where: {userId}},
        )
        return result;
    }
}

export {EmployeeDALs}
