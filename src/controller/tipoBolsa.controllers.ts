import {TipoBolsaServices} from "../services/tipoBolsa.services";
import {NextFunction, Request, Response} from 'express';

class TipoBolsaController {
    private tipoBolsaServices: TipoBolsaServices;

    constructor() {
        this.tipoBolsaServices = new TipoBolsaServices();
    }

    async createTipoBolsa(request: Request, response: Response, next: NextFunction) {
        const {name, description} = request.body;
        try {
            const result = await this.tipoBolsaServices.createTipoBolsa({
                name,
                description,
            });

            return response.status(201).json(result);
        } catch (error: any) {
            next(error);

            return response.status(401).json(error.message);
        }
    }

    async listAllTipoBolsas(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.tipoBolsaServices.getAllTipoBolsas();
            return response.status(200).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async deleteAllTipoBolsas(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.tipoBolsaServices.deleteAllTipoBolsas();
            return response.status(204).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
}

export {TipoBolsaController};