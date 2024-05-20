import { Request, Response, NextFunction } from "express";
import { OperatedTicketServices } from "../services/operatedTIcket.services";

class OperatedTicketsController {
 operatedTicketServices: OperatedTicketServices;

constructor(){
    this.operatedTicketServices = new OperatedTicketServices();
}

async addOperatedTickets(request: Request, response: Response, next: NextFunction){
    const {ticketsQuantity} = request.body;
    const result = await this.operatedTicketServices.addOperatedTickets(ticketsQuantity);
    return response.status(200).json(result);
}
async removeOperatedTickets(request: Request, response: Response, next: NextFunction){
    const {ticketsQuantity} = request.body;
    const result = await this.operatedTicketServices.removeOperatedTickets(ticketsQuantity);
    return response.status(200).json(result);
} 



}

export {OperatedTicketsController}