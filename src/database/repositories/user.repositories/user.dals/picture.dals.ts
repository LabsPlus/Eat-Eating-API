import {prisma} from  '../../../prisma.databases'
import {IPictureData} from '../../../../intefaces/picture.interfaces'
class PictureDALs{
    async createPicture({url, userId}: IPictureData){
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select:{
                personId: true,
            }
        });
        if(!user){
            throw new Error('User not found');
        }
        let personId = user.personId;
        const result = await prisma.picture.create({
            data:{
                url,
                personId,
            }
        })
        return result;
    }
    async findPictureByUserId(userId: number){
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select:{
                personId: true,
            }
        });
        if(!user){
            throw new Error('User not found');
        }
        let personId = user.personId;
        const result = await prisma.picture.findUnique({
            where:{
                personId: personId
            }
        });
        return result;
    }
    async findPictureByUrl(url: string){
        const result = await prisma.picture.findMany({
            where:{
                url: url,
            },
        });
        return result;
    }
    async updatePicture({url, userId}: IPictureData){
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select:{
                personId: true,
            }
        });
        if(!user){
            throw new Error('User not found');
        }
        let personId = user.personId;
        const result = await prisma.picture.update({
            where:{
                personId: personId,
            },
            data:{
                url,
            }
        })
        return result;
    }

    async userHasPicture(userId: number){
        
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select:{
                personId: true,
            }
        });

        if(!user){
            throw new Error('User not found');
        }

        let personId = user.personId;

        const result = await prisma.picture.findUnique({
            where:{
                personId: personId,
            }
        });

        return result;
        
    };
}
export {PictureDALs};