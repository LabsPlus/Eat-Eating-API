import {prisma} from "../prisma.databases";

export class PersonRepositories {
    async createPerson(name: string) {
        const result = prisma.person.create({
            data: {
                name,
            }
        })

        return result
    }
}

