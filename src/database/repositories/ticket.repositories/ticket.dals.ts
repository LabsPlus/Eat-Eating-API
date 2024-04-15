import {prisma} from '../../prisma.databases'

class TicketDALs{


    constructor(){

    }

    async createTicket(userTicketsCountId: number){
        const result = await prisma.ticket.create({
            data:{
                userTicketsCountId,
            }
        });

        return result;
    }

}

export {TicketDALs}