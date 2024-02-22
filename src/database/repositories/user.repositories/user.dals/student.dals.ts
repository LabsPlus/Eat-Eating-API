import {prisma} from "../../../prisma.databases";
import {IStudentCreate, IStudentUpdate} from "../../../../intefaces/student.interfaces";

class StudentDALs {

    async createStudent({userId, enrollment}: IStudentCreate) {
        const result = await prisma.student.create({
            data: {
                userId,
                enrollment,
            }
        });

        return result
    }

    async updateStudent({ enrollment, userId}: IStudentUpdate){
        const result = await prisma.student.update({
                where: {userId: userId},
                data:{
                    enrollment: enrollment,
                }
        })
        return result;
    }
    async deleteByUserId(userId: number){
        const result = await prisma.student.deleteMany({
            where:{
                userId: userId,
            }
        });
        return result;
    }
    async checkEnrollmentUnique(enrollment: string): Promise<boolean> {
        const existingStudent = await prisma.student.findUnique({
            where: {
                enrollment: enrollment
            }
        });

        return !existingStudent; // Retorna true se o estudante não existir, caso contrário retorna false

    }

    async findStudentByUserId(userId: number){
        const result = await prisma.student.findUnique(
            {where: {userId}},
        )

        return result;
    }
}

export {StudentDALs}
