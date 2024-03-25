import {prisma} from  '../../../prisma.databases'
import {IPictureData} from '../../../../intefaces/picture.interfaces'

class PictureDALs{
    async createPicture({url, userId}: IPictureData){
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
            },
        });

        return result;
    }

    async updatePicture({url, userId}: IPictureData){
        const result = await prisma.picture.update({
            where:{
                userId,
            },
            data:{
                url,
                
            }
        })

        return result;
    }
}

export {PictureDALs};