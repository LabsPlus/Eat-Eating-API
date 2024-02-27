import {prisma} from "../../../prisma.databases";

class EnrollmentDALs {
    async createEnrollment(enrollment: string) {
        const result = await prisma.enrollment.create({
            data: {
                enrollment: enrollment
            }
        });

        return result
    }

    async checkEnrollmentUnique(enrollment: string): Promise<boolean> {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                enrollment: enrollment
            }
        });

        return !existingEnrollment; // Retorna true se a matrícula não existir, caso contrário retorna false
    }

    async deleteEnrollmentById(id: number) {
        const result = await prisma.enrollment.delete({
            where: {
                id: id
            }
        });
        return result;

    }

    async getEnrollmentById(id: number) {
        const result = await prisma.enrollment.findUnique({
            where: {
                id: id
            }
        });
        return result;

    }

    async deleteEnrollment(enrollment: string) {
        const result = await prisma.enrollment.delete({
            where: {
                enrollment: enrollment
            }
        });
        return result;

    }
}

export {EnrollmentDALs}
