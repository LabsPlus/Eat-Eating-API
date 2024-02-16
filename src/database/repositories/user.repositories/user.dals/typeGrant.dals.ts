import {prisma} from "../../../prisma.databases";
import {TypeGrantName} from "@prisma/client";

export class TypeGrantDALs {
    getTypeGrantByName(name: TypeGrantName) {
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
