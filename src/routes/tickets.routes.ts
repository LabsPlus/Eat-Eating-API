import {Router} from 'express'
import { TicketsController } from '../controllers/ticket.controller'

class TicketsRoutes {
    private readonly router: Router;
    private readonly ticketsController: TicketsController

    constructor(){
        this.router = Router()
        this.ticketsController = new TicketsController()
    }

    getRoutes(){
        this.router.get(
            '/info',
            this.ticketsController.getInfoTickets.bind(this.ticketsController),
        );
        return this.router
    }

    postRoutes(){
        this.router.post(
            '/purchase',
            this.ticketsController.purchaseTickets.bind(this.ticketsController),
        );
        return this.router;
    }

    putRoutes(){
        this.router.put(
            '/update',
            this.ticketsController.removeTickets.bind(this.ticketsController),
        );
        return this.router;
    }

}

export {TicketsRoutes}