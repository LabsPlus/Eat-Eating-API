import {prisma} from  '../../../prisma.databases'
import {IPictureCreate} from '../../../../intefaces/picture.interfaces'

class PictureDALs{
    async createPicture({url, userId}: IPictureCreate){
        const result = await prisma.picture.create({
            data:{
                url,
                userId
            }
        })

        return result;
    }
    async findPictureByUserId(userId: number){
        const result = await prisma.picture.findUnique({
            where:{
                userId: userId
            }
        });

        return result;
    }

    async findPictureByUrl(url: string){
        const result = await prisma.picture.findMany({
            where:{
                url: url,
            }
        });

        return result;
    }
}

export {PictureDALs};