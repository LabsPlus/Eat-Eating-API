import { Router } from 'express';
import { RfidCardControllers } from '../controllers/rfidCard.controllers';

class RfidCardRoutes {

    private readonly router: Router;
    private readonly rfidCardControllers: RfidCardControllers;

    constructor() {
        this.router = Router();
        this.rfidCardControllers = new RfidCardControllers();
    }

    getRoutes() {
        this.router.get(
            '/generate-rfid-card-number',
            this.rfidCardControllers.generateRfidCardNumber.bind(this.rfidCardControllers),
        );
        return this.router;
    }
}

export { RfidCardRoutes };