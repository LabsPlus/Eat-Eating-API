import {prisma} from "../../../prisma.databases";
import {IStudentCreate, IStudentUpdate} from "../../../../intefaces/student.interfaces";

class StudentDALs {

    async createStudent({userId, enrollmentId}: IStudentCreate) {
        const result = await prisma.student.create({
            data: {
                userId,
                enrollmentId,
            }
        });

        return result
    }

    async updateStudent({enrollmentId, userId}: IStudentUpdate) {
        const result = await prisma.student.update({
            where: {userId: userId},
            data: {
                enrollmentId: enrollmentId,
            }
        })
        return result;
    }

    async deleteByUserId(userId: number) {
        const result = await prisma.student.delete({
            where: {
                userId: userId,
            }
        });
        return result;
    }


    async findEnrrolmentByUserId(userId: number) {
        const result = await prisma.student.findUnique(
            {where: {userId}},
        )

        const student = await prisma.student.findUnique({
            where: { userId },
            select: {
                enrollment: {
                    select: {
                        enrollment: true
                    }
                }
            }
        });

        return student?.enrollment;
    }

    async findStudentByUserId(userId: number){
        const result = await prisma.student.findUnique({
            where:{
                userId: userId,
            }
        })

        return result;
    }


}

export {StudentDALs}
