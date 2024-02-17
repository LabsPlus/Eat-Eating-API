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

    async listAllEmployees() {
        const result = await prisma.employee.findMany({
            select: {
                id: true,
                enrollment: true,
                user: {
                    select: {
                        id: true,
                        person: {
                            select: {
                                name: true
                            }
                        },
                        category: {
                            select: {
                                name: true
                            }
                        },
                        typeGrant: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return result;
    }

    async getEmployeeByEnrollment(enrollment: string) {
        const result = await prisma.employee.findUnique({
            where: {
                enrollment: enrollment
            },
            select: {
                id: true,
                enrollment: true,
                user: {
                    select: {
                        id: true,
                        person: {
                            select: {
                                name: true
                            }
                        },
                        category: {
                            select: {
                                name: true
                            }
                        },
                        typeGrant: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return result;
    }
}

export {EmployeeDALs}
