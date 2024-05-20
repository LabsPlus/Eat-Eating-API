import { NotFoundError} from '../helpers/errors.helpers';
import { OperatedTicketsDALs } from '../database/repositories/ticket.repositories/operatedTickets.dals';
class OperatedTicketServices {
    operatedTicketDALs: OperatedTicketsDALs;
    constructor(){
        this.operatedTicketDALs = new OperatedTicketsDALs();
    }
    async addOperatedTickets(ticketsQuantity: number){
        const operatedTicket = await this.operatedTicketDALs.findOperatedTicketsById(1);
        if(!operatedTicket){
            throw new NotFoundError({message: 'operatedTicket not found'});
        }
        const sumTicketsAvailable = operatedTicket.ticketsAvailable + ticketsQuantity;
        const sumTicketsopened = operatedTicket.ticketsAvailable + ticketsQuantity;

        const updatedOperatedTickets = await this.operatedTicketDALs.updateOperatedTickets({
            id: 1,
            ticketsOpened: sumTicketsopened,
            ticketsAvailable: sumTicketsAvailable,
            ticketsConsumed: operatedTicket.ticketsConsumed,
            ticketsSold: operatedTicket.ticketsSold
        })

        return updatedOperatedTickets;

    }

     async removeOperatedTickets(ticketsQuantity: number){
         const operatedTicket = await this.operatedTicketDALs.findOperatedTicketsById(1);
        if(!operatedTicket){
            throw new NotFoundError({message: 'operatedTicket not found'});
        }
        const subTicketsAvailable = operatedTicket.ticketsAvailable - ticketsQuantity;
        const subTicketsopened = operatedTicket.ticketsAvailable - ticketsQuantity;

        const updatedOperatedTickets = await this.operatedTicketDALs.updateOperatedTickets({
            id: 1,
            ticketsOpened: subTicketsopened,
            ticketsAvailable: subTicketsAvailable,
            ticketsConsumed: operatedTicket.ticketsConsumed,
            ticketsSold: operatedTicket.ticketsSold
        })

        return updatedOperatedTickets;

    }
}

export {OperatedTicketServices}