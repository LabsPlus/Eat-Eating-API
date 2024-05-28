import {Router} from 'express'
import { TicketsController } from '../controllers/ticket.controller'

class TicketsRoutes {
    private readonly router: Router;
    private readonly ticketsController: TicketsController

    constructor(){
        this.router = Router()
        this.ticketsController = new TicketsController()
    }
    /**
   * @swagger
   * /tickets/info:
   *   get:
   *     summary: Listar os dados referentes a tickets
   *     description: Listar os dados referentes a tickets
   *     tags:
   *       - Tickets
   *     responses:
   *       '200':
   *         description: Tickets retornados com sucesso
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
   *         description: |
   *           Not Found
   *           - Operated ticket not found
   *       '500':
   *         description: Internal Server Error
   */
    getRoutes(){
        this.router.get(
            '/info',
            this.ticketsController.getInfoTickets.bind(this.ticketsController),
        );
        return this.router
    }
   /**
 * @swagger
 * /tickets/purchase:
 *   post:
 *     summary: Compra tickets para um usuario.
 *     description: Compra tickets para um usuario.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Tickets comprados com sucesso
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value:
 *                   purchaseTickets: 
 *                     - id: '207'
 *                       status: 'NAO_USADO'
 *                       purchaseDate: '2024-05-21T17:50:59.223Z'
 *                       ticketPrice: '0'
 *                       userTicketsCountId: '6'
 *                   ticketUserCount: 
 *                     id: '6'
 *                     totalTicketsOfUser: '120'
 *                     totalTicketsOfUserActive: '120'
 *                     userId: '3'
 *                   operatedTickets: 
 *                     id: '1'
 *                     ticketsOpened: '286'
 *                     ticketsSold: '122'
 *                     ticketsAvailable: '277'
 *                     ticketsConsumed: '0'
 *       '422':
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |
 *                     - Total user tickets cannot exceed tickets opened
 *                     - Available tickets cannot be negative
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |
 *                     - Tickets not found
 *                     - Operated tickets not found
 *                     - User not found
 *       '500':
 *         description: Internal Server Error
 */

    postRoutes(){
        this.router.post(
            '/purchase',
            this.ticketsController.purchaseTickets.bind(this.ticketsController),
        );
        return this.router;
    }
   /**
 * @swagger
 * /tickets/update:
 *   post:
 *     summary: Ajusta a quantidade de tickets para um usuario.
 *     description: Ajusta a quantidade de tickets para um usuario.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Tickets atualizados com sucesso.
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value:
 *                   ticketUserCount: 
 *                     id: '6'
 *                     totalTicketsOfUser: '120'
 *                     totalTicketsOfUserActive: '120'
 *                     userId: '3'
 *                   operatedTickets: 
 *                     id: '1'
 *                     ticketsOpened: '286'
 *                     ticketsSold: '122'
 *                     ticketsAvailable: '277'
 *                     ticketsConsumed: '0'
 *       '422':
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |
 *                     - The user does not have tickets to remove
 *                     - The total ticket count cannot be negative
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 value: 
 *                   message: |
 *                     - Tickets not found
 *                     - Operated tickets not found
 *                     - User not found
 *       '500':
 *         description: Internal Server Error
 */


    putRoutes(){
        this.router.put(
            '/update',
            this.ticketsController.removeTickets.bind(this.ticketsController),
        );
        return this.router;
    }

}

export {TicketsRoutes}