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

    async deletePerson(id: number){
        const result = prisma.person.delete({
            where: {
                id: id,
            }
        })

        return result
    }
}

export {PersonDALs};

