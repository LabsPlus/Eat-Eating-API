import {Router} from 'express'
import { OperatedTicketsController } from '../controllers/operatedTickets.controller';

class OperatedTicketsRoutes {
    private readonly router: Router;
    private readonly operatedTicketsController: OperatedTicketsController;

    constructor(){
        this.router = Router()
        this.operatedTicketsController = new OperatedTicketsController()
    }


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