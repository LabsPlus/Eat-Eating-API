import { Request, Response, NextFunction } from 'express';
import { RfidCardServices } from '../services/rfidCard.services';
import { IRfidCard } from '../intefaces/rfidCard.interfaces';

class RfidCardControllers {

    private readonly rfidCardServices: RfidCardServices;

    constructor() {
        this.rfidCardServices = new RfidCardServices();
    }

    async generateRfidCardNumber( request: Request, response: Response ) {
        
        const result = await this.rfidCardServices.generateRfidCardNumber();

        return response.status(201).json(result);
    }
}

export { RfidCardControllers };