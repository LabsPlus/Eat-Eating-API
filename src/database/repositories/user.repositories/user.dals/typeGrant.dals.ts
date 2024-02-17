import {prisma} from "../../../prisma.databases";
import {TypeGrantName} from "@prisma/client";

class TypeGrantDALs {
    async getTypeGrantByName(name: TypeGrantName) {
        const result = await prisma.typeGrant.findUnique({
            where: {
                name
            }
        })

        return result;
    }
}

export {TypeGrantDALs};
