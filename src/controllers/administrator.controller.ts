import { Request, Response, NextFunction } from "express";
import {TicketServices} from "../services/ticket.services"
import { AdministratorServices } from "../services/administrator.services";

class AdministratorController {
 AdministratorServices: AdministratorServices;

constructor(){
    this.AdministratorServices = new AdministratorServices();
}

async createAdministrator(request: Request, response: Response, next: NextFunction){
        const {email, password, emailRecovery, name, phone, picture} = request.body;
        const result = await this.AdministratorServices.createAdministrator({email, password, emailRecovery, phone, picture, name});

        return response.status(200).json(result);
} 

async updateAdministrator(request: Request, response: Response, next: NextFunction){
        const {email, password, emailRecovery, name, phone, picture} = request.body;
        const {id} = request.params;
        const result = await this.AdministratorServices.updateAdministrator(Number(id), {email, password, emailRecovery, phone, picture, name});

        return response.status(200).json(result);
} 



}

export {AdministratorController}