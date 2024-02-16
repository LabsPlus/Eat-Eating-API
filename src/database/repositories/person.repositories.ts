import {prisma} from "../prisma.databases";
import {IPersonCreate} from "../../intefaces/person.interfaces";

export class PersonRepositories {
    async createPerson({name}: IPersonCreate) {
        const result = prisma.person.create({
            data: {
                name,
            }
        })

        return result
    }
}

