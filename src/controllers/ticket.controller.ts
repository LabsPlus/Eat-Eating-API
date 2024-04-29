import { Request, Response, NextFunction } from "express";
import {TicketServices} from "../services/ticket.services"

class TicketsController {
 ticketServices: TicketServices;

constructor(){
    this.ticketServices = new TicketServices();
}

async getInfoTickets(request: Request, response: Response, next: NextFunction){

    const result =  await this.ticketServices.getOperatedTicked();
    return response.status(200).json(result);
}

async purchaseTickets(request: Request, response: Response, next: NextFunction){
    const {userId, quantity} = request.body;

    const result = await this.ticketServices.purchaseTicket({userId, quantity});
    return response.status(200).json(result);
}
    



}

export {TicketsController}