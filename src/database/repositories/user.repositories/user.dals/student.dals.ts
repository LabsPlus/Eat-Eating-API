import {prisma} from "../../../prisma.databases";
import {IStudentCreate} from "../../../../intefaces/student.interfaces";

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

    async checkEnrollmentUnique(enrollment: string): Promise<boolean> {
        const existingStudent = await prisma.student.findUnique({
            where: {
                enrollment: enrollment
            }
        });

        return !existingStudent; // Retorna true se o estudante não existir, caso contrário retorna false

    }
}

export {StudentDALs}
