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
  let operatedTicketDALs: OperatedTicketsDALs;

  beforeEach(() => {
    ticketServices = new TicketServices();
    operatedTicketDALs = new OperatedTicketsDALs();
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

   describe('getOperatedTicked', () => {
  it('should return operated ticket when found', async () => {
    // Mock do resultado retornado por findOperatedTicketsById
    const operatedTicket = { id: 1, name: 'Operated Ticket', quantity: 5 };

    // Mock do método findOperatedTicketsById para retornar o ticket operado
    operatedTicketDALs.findOperatedTicketsById = jest.fn().mockResolvedValue(operatedTicket);

    // Chama a função getOperatedTicked
    const result = await ticketServices.getOperatedTicked();

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(operatedTicket);
  });

  it('should throw NotFoundError if operated ticket not found', async () => {
    // Mock do método findOperatedTicketsById para simular o caso em que o ticket operado não é encontrado
    operatedTicketDALs.findOperatedTicketsById = jest.fn().mockResolvedValue(null);

    // Chama a função getOperatedTicked e verifica se lança a NotFoundError
    await expect(ticketServices.getOperatedTicked()).rejects.toThrowError(NotFoundError);
  });
});

 describe('removeTicket', () => {
    it('should remove tickets and update counts', async () => {
      // Mock input data
      const userId = 1;
      const quantity = 3;

      // Call the method
      const result = await ticketServices.removeTicket({ userId, quantity });

      // Assertions
      expect(result).toEqual({
        ticketUserCount: { id: 1 },
        operatedTickets: { id: 1 },
      });
    });

    it('should throw NotFoundError if tickets not found', async () => {
      // Re-mock findQuantityTickets to return empty array
      require('../database/repositories/ticket.repositories/ticket.dals').TicketDALs.mockImplementationOnce(() => ({
        findQuantityTickets: jest.fn().mockResolvedValue([]),
      }));

      // Mock input data
      const userId = 1;
      const quantity = 3;

      // Call the method and expect NotFoundError
      await expect(ticketServices.removeTicket({ userId, quantity })).rejects.toThrowError(NotFoundError);
    });

    // Add more test cases for other scenarios
  });
});

