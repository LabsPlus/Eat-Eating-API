import {Router} from 'express'
import { OperatedTicketsController } from '../controllers/operatedTickets.controller';

class OperatedTicketsRoutes {
    private readonly router: Router;
    private readonly operatedTicketsController: OperatedTicketsController;

    constructor(){
        this.router = Router()
        this.operatedTicketsController = new OperatedTicketsController()
    }

     /**
 * @swagger
 * /operated-tickets/add-operated-tickets:
 *   put:
 *     summary: adiciona tickets da tabela de tickets operados
 *     description: adiciona tickets da tabela de tickets operados.
 *     tags:
 *       - Operated Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketsQuantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Tickets atualizado com sucesso
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value:
 *                     id: '1'
 *                     ticketsOpened: '286'
 *                     ticketsSold: '122'
 *                     ticketsAvailable: '277'
 *                     ticketsConsumed: '0'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |  
 *                     - Operated tickets not found
 *                     
 *       '500':
 *         description: Internal Server Error
 */

         /**
 * @swagger
 * /operated-tickets/remove-operated-tickets:
 *   put:
 *     summary: remove tickets da tabela de tickets operados
 *     description: remove tickets da tabela de tickets operados.
 *     tags:
 *       - Operated Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketsQuantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Tickets atualizado com sucesso
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value:
 *                     id: '1'
 *                     ticketsOpened: '286'
 *                     ticketsSold: '122'
 *                     ticketsAvailable: '277'
 *                     ticketsConsumed: '0'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |  
 *                     - Operated tickets not found
 *                     
 *       '500':
 *         description: Internal Server Error
 */
    putRoutes(){
        this.router.put(
            '/add-operated-tickets',
            this.operatedTicketsController.addOperatedTickets.bind(this.operatedTicketsController),
        );
        this.router.put(
            '/remove-operated-tickets',
            this.operatedTicketsController.removeOperatedTickets.bind(this.operatedTicketsController),
        );
        return this.router;
    }

}

export {OperatedTicketsRoutes}