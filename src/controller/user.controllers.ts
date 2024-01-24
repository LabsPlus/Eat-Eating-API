import {Request, Response, NextFunction} from "express";
import {UserServices} from '../services/user.services';

class UserController {
    private userServices: UserServices;

    constructor() {
        this.userServices = new UserServices();
    }

    async createAnUser(request: Request, response: Response, next: NextFunction) {
        const {name, matricula, categoriaId, tipoDeBolsaId, refeicoesDiarias} = request.body;

        try {
            const user = await this.userServices.createUser({
                name,
                matricula,
                categoriaId,
                tipoDeBolsaId,
                refeicoesDiarias,
            });

            return response.status(201).json(user);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async listAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.userServices.listAllUsers();
            return response.status(200).json(users);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async deleteAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.userServices.deleteAllUsers();
            return response.status(204).json(users);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
}

export {UserController};