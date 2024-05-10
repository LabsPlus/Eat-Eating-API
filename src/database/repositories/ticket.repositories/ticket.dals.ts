import { IPurchaseTicket } from '../../../intefaces/ticket.interfaces';
import { IUserTicketCountFind } from '../../../intefaces/userTicketCount.interfaces';
import { prisma } from '../../prisma.databases';

class TicketDALs {
  constructor() {}

  async createTicket(userTicketsCountId: number) {
    const result = await prisma.ticket.create({
      data: {
        userTicketsCountId,
      },
    });

    return result;
  }
  async findQuantityTickets({userTicketsCountId, quantity}: IUserTicketCountFind){
   const ticketsToDelete = await prisma.ticket.findMany({
      where: { userTicketsCountId },
      take: quantity
    });

    return ticketsToDelete;
  }

  async removeTickets(ticketIdsToDelete: number[]){
     const result = await prisma.ticket.deleteMany({
      where: {
        id: {
          in: ticketIdsToDelete // Remova os tickets cujos IDs estão na lista de IDs a serem excluídos
        }
      }
    });

    return result;
  }

  
}

export { TicketDALs };
