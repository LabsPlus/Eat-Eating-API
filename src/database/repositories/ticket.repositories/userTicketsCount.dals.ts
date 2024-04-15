import { IUserTicketCountCreate, IUserTicketCountUpdate } from '../../../intefaces/userTicketCount.interfaces';
import {prisma} from '../../prisma.databases'

class UserTicketsCountDALs{


    constructor(){

    }

    async createUserTicketsCount({userId, totalTicketsOfUser , totalTicketsOfUserActive}: IUserTicketCountCreate){
        const result = await prisma.userTicketsCount.create({
            data:{
                userId,
                totalTicketsOfUser ,
                totalTicketsOfUserActive
            }
        });

        return result;
    }

      async updateUserTicketsCount({userId, totalTicketsOfUser , totalTicketsOfUserActive}: IUserTicketCountUpdate){
        const result = await prisma.userTicketsCount.update({
            where:{
                userId,
            },
            data:{
                totalTicketsOfUser,
                totalTicketsOfUserActive,
               
            }
        });

        return result;
    }

    async findUserTicketsCountDALsByUserId(userId: number){
        const result = await prisma.userTicketsCount.findUnique({
            where:{
                userId,
            }
        });

        return result;
    }

}

export {UserTicketsCountDALs}