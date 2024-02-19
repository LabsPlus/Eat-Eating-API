import {prisma} from '../../../prisma.databases';
import {IUserCreate} from '../../../../intefaces/user.interfaces';

class UserDALs {
    async createUser({categoryId, personId, typeGrantId}: IUserCreate){
        const result = await prisma.user.create({
            data:{
                categoryId,
                personId,
                typeGrantId,
            }
        })

        return result
    }

    async listAllUsers() {
        const result = await  prisma.user.findMany()

        return result;
    }

    async deleteUserById(id: number) {
        const result = await   prisma.user.delete({
            where: {id},
        });

        return result
    }
}

export {UserDALs};
