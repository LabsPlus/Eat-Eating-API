import {TypeStudentGrantServices} from "../services/type.student.grant.services";
import {NextFunction, Request, Response} from 'express';

class TypeStudentGrantControllers {
    private typeStudentGrantServices: TypeStudentGrantServices;

    constructor() {
        this.typeStudentGrantServices = new TypeStudentGrantServices();
    }

    async createTypeGrant(request: Request, response: Response, next: NextFunction) {
        const {name, description} = request.body;
        try {
            const result = await this.typeStudentGrantServices.createTypeGrant({
                name,
                description,
            });

            return response.status(201).json(result);
        } catch (error: any) {
            next(error);

            return response.status(401).json(error.message);
        }
    }

    async listAllTypeGrant(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.typeStudentGrantServices.getAllTypeGrant();
            return response.status(200).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async deleteAllTypeGrant(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.typeStudentGrantServices.deleteAllTypeGrant();
            return response.status(204).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
}

export {TypeStudentGrantControllers};