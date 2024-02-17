import {prisma} from "../prisma.databases";

class PersonDALs {
    async createPerson(name: string) {
        const result = prisma.person.create({
            data: {
                name,
            }
        })

        return result
    }
}

export {PersonDALs};

