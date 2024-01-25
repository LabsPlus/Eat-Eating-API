import {prisma} from "../prisma.databases";
import {ITypeStudentGrantCreate} from "../../intefaces/type.student.grant.interfaces";

class TypeStudentGrantDALs {

    async createTypeGrant(
        {name, description}: ITypeStudentGrantCreate) {
        const result = await prisma.typeStudentGrant.create({
            data: {name, description},
        });

        return result;
    }

    async findTypeGrantByName(name: string) {
        const result = await prisma.typeStudentGrant.findFirst({
            where: {
                name: name,
            },
        });
        return result;
    }

    async getAllTypeGrant() {
        const tipoBolsa = await prisma.typeStudentGrant.findMany();
        return tipoBolsa;
    }

    async deleteAllTypeGrant() {
        const result = await prisma.typeStudentGrant.deleteMany();
        return result;
    }

    async existsTipoBolsa(typeGrantId: number | undefined): Promise<boolean> {
        const result = await prisma.typeStudentGrant.findUnique({
            where: {
                id: typeGrantId,
            },
        });
        return Boolean(result); // Retorna true se result não for nulo, e false caso contrário
    }
}

export {TypeStudentGrantDALs};