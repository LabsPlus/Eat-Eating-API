import {CategoriaServices} from "../services/categoria.services";
import {NextFunction, Request, Response} from 'express';

class CategoryController {
    private categoriaServices: CategoriaServices;

    constructor() {
        this.categoriaServices = new CategoriaServices();
    }

    async createCategoria(request: Request, response: Response, next: NextFunction) {
        const {name, description} = request.body;
        try {
            const result = await this.categoriaServices.createCategoria({
                name,
                description,
            });

            return response.status(201).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async listAllCategorias(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.categoriaServices.getAllCategorias();
            return response.status(200).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async deleteAllCategorias(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.categoriaServices.deleteAllCategorias();
            return response.status(204).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
}

export {CategoryController};