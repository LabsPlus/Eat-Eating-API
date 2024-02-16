import {prisma} from "../../../prisma.databases";

export class TypeGrantDALs {
    getTypeGrantByName(name: string) {
        return prisma.typeGrant.findUnique({
            where: {
                name,
            }
        })
    }

    async getTypeGrantById(id: number) {
        const result = await prisma.typeGrant.findUnique({
            where: {
                id
            }
        })

        return result;
    }
}

export default {TypeGrantDALs};
