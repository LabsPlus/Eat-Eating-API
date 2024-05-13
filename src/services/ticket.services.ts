import { TicketDALs } from '../database/repositories/ticket.repositories/ticket.dals';
import { UserTicketsCountDALs } from '../database/repositories/ticket.repositories/userTicketsCount.dals';
import { OperatedTicketsDALs } from '../database/repositories/ticket.repositories/operatedTickets.dals';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { IPurchaseTicket } from '../intefaces/ticket.interfaces';
import { NotFoundError, UnprocessedEntityError } from '../helpers/errors.helpers';

class TicketServices {
  ticketDALs: TicketDALs;
  userTicketCountDALs: UserTicketsCountDALs;
  operatedTicketDALs: OperatedTicketsDALs;
  userDALs: UserDALs;
  constructor() {
    this.ticketDALs = new TicketDALs();
    this.userTicketCountDALs = new UserTicketsCountDALs();
    this.operatedTicketDALs = new OperatedTicketsDALs();
    this.userDALs = new UserDALs();
  }

  async purchaseTicket({ userId, quantity }: IPurchaseTicket) {
    const user = await this.userDALs.existsUserById(userId);

    if (!user) {
      throw new NotFoundError({ message: 'User not found' });
    }

    const userTicketCount =
      await this.userTicketCountDALs.findUserTicketsCountDALsByUserId(user.id);

    let createdOrUpdateTicketCount: any;
    if (!userTicketCount) {
      createdOrUpdateTicketCount =
        await this.userTicketCountDALs.createUserTicketsCount({
          userId: user.id,
          totalTicketsOfUser: quantity,
          totalTicketsOfUserActive: quantity,
        });
    } else {
      const sumTotalTickets = userTicketCount.totalTicketsOfUser + quantity;
      const sumTotalTicketsActive =
        userTicketCount.totalTicketsOfUserActive + quantity;
      createdOrUpdateTicketCount =
        await this.userTicketCountDALs.updateUserTicketsCount({
          userId,
          totalTicketsOfUser: sumTotalTickets,
          totalTicketsOfUserActive: sumTotalTicketsActive,
          
        });
    }
    const ticketCreationPromises = Array.from(
      { length: quantity },
      async () => {
        return await this.ticketDALs.createTicket(
          createdOrUpdateTicketCount.id,
        );
      },
    );

    const operatedTickets =
      await this.operatedTicketDALs.findOperatedTicketsById(1);
    if (!operatedTickets) {
      throw new NotFoundError({ message: 'tickets not founded!' });
    }
    const sumTicketsSold = operatedTickets.ticketsSold + quantity;
    const subTicketsAvailable = operatedTickets.ticketsAvailable - quantity;
    const updatedOperatedTickets =
      await this.operatedTicketDALs.updateOperatedTickets({
        id: 1,
        ticketsAvailable: subTicketsAvailable,
        ticketsSold: sumTicketsSold,
        ticketsConsumed: operatedTickets.ticketsConsumed,
      });

    const createdTickets = await Promise.all(ticketCreationPromises);

    return {purchaseTickets:createdTickets,
            ticketUserCount: createdOrUpdateTicketCount,
            operatedTickets: updatedOperatedTickets
            };
  }

  async getOperatedTicked(){
    const result = await this.operatedTicketDALs.findOperatedTicketsById(1);
    if(!result){
      throw new NotFoundError({message: 'Operated Ticket no found!'});
    }

    return result;
  }

   async removeTicket({ userId, quantity }: IPurchaseTicket) {
    const user = await this.userDALs.existsUserById(userId);

    if (!user) {
      throw new NotFoundError({ message: 'User not found' });
    }

    const userTicketCount =
      await this.userTicketCountDALs.findUserTicketsCountDALsByUserId(user.id);
    let UpdateTicketCount: any;
    if (!userTicketCount) {
      throw new UnprocessedEntityError({message: 'The user does not have tickets to remove'})
    } else {
      const subTotalTickets = userTicketCount.totalTicketsOfUser - quantity;
      const subTotalTicketsActive =
        userTicketCount.totalTicketsOfUserActive - quantity;
        if(subTotalTickets < 0 || subTotalTicketsActive < 0){
          throw new UnprocessedEntityError({message: 'The Total ticket cannot be under zero'});
        }
       UpdateTicketCount =
        await this.userTicketCountDALs.updateUserTicketsCount({
          userId,
          totalTicketsOfUser: subTotalTickets,
          totalTicketsOfUserActive: subTotalTicketsActive,
          
        });
    }
    
    const ticketsToDelete = await this.ticketDALs.findQuantityTickets({userTicketsCountId: UpdateTicketCount.id, quantity});
    const ticketIdsToDelete = ticketsToDelete.map(ticket => ticket.id);
    const removedTickets = await this.ticketDALs.removeTickets(ticketIdsToDelete);
    const operatedTickets =
      await this.operatedTicketDALs.findOperatedTicketsById(1);
    if (!operatedTickets) {
      throw new NotFoundError({ message: 'tickets not founded!' });
    }
    const subTicketsSold = operatedTickets.ticketsSold - quantity;
  
    const sumTicketsAvailable = operatedTickets.ticketsAvailable + quantity;
    const updatedOperatedTickets =
      await this.operatedTicketDALs.updateOperatedTickets({
        id: 1,
        ticketsAvailable: sumTicketsAvailable,
        ticketsSold: subTicketsSold,
        ticketsConsumed: operatedTickets.ticketsConsumed,
      });

   

    return {
            ticketUserCount: UpdateTicketCount,
            operatedTickets: updatedOperatedTickets
            };
  }

}

export { TicketServices };
