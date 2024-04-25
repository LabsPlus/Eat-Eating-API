import { IOperatedTicketsUpdate } from '../../../intefaces/operatedTickets.interfaces'
import {prisma} from '../../prisma.databases'


class OperatedTicketsDALs{
    constructor(){
        
    }

    async updateOperatedTickets({id, ticketsAvailable, ticketsSold, ticketsConsumed}: IOperatedTicketsUpdate){
            const result = await prisma.operatedTickets.update({
                where: {id},
                data:{
                    ticketsAvailable,
                    ticketsSold,
                    ticketsConsumed,
                }
            })
            return result;
    }

    async findOperatedTicketsById(id: number){
        const result = await prisma.operatedTickets.findUnique({
            where:{id},
        })
        return result;
    }
}
export {OperatedTicketsDALs}