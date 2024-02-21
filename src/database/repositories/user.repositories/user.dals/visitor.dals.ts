import {prisma} from "../../../prisma.databases";

class VisitorDALs {

    async createVisitor(userId: number) {
        const result = await prisma.visitor.create({
            data: {
                userId
            }
        });

        return result
    }

    async deleteByUserId(userId: number){
        const result = await prisma.visitor.deleteMany({
            where:{
                userId: userId,
            }
        });
        return result;
    }

}

export {VisitorDALs}
