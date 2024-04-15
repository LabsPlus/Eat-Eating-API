import { TicketServices } from '../services/ticket.services';
import { NotFoundError } from '../helpers/errors.helpers';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { UserTicketsCountDALs } from '../database/repositories/ticket.repositories/userTicketsCount.dals';
import { OperatedTicketsDALs } from '../database/repositories/ticket.repositories/operatedTickets.dals';
import { TicketDALs } from '../database/repositories/ticket.repositories/ticket.dals';
import { IPurchaseTicket } from '../intefaces/ticket.interfaces';

jest.mock('../database/repositories/user.repositories/user.dals/user.dals', () => ({
  UserDALs: jest.fn(() => ({
    existsUserById: jest.fn().mockResolvedValue(false), // Mock para simular usuário não existente
  })),
}));

jest.mock('../database/repositories/ticket.repositories/userTicketsCount.dals');
jest.mock('../database/repositories/ticket.repositories/operatedTickets.dals');
jest.mock('../database/repositories/ticket.repositories/ticket.dals');

describe('TicketServices', () => {
  let ticketServices: TicketServices;

  beforeEach(() => {
    ticketServices = new TicketServices();
  });

  describe('purchaseTicket', () => {
    it('should throw NotFoundError if user does not exist', async () => {
      // Configuração de dados de teste
      const userId = 1;
      const quantity = 3;

      // Chamada ao método purchaseTicket com os dados de teste
      await expect(ticketServices.purchaseTicket({ userId, quantity })).rejects.toThrowError(NotFoundError);
    });

  
  });
});

