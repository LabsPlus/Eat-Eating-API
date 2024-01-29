import {CategoryServices} from "../services/category.services";
import {NextFunction, Request, Response} from 'express';

class CategoryControllers {
    private categoryServices: CategoryServices;

    constructor() {
        this.categoryServices = new CategoryServices();
    }

    async createCategory(request: Request, response: Response, next: NextFunction) {
        const {name, description} = request.body;
        try {
            const result = await this.categoryServices.createCategory({
                name,
                description,
            });

            return response.status(201).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }

    async listAllCategories(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.categoryServices.getAllCategories();
            return response.status(200).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
       async updateCategory(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params;
        const {name, description} = request.body;
        
        try {
            const idnumber: number = parseInt(id);
            const category = await this.categoryServices.updateCategory({
                id: idnumber,
                name,
                description,
            });

            return response.status(201).json(category);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
     async deleteCategoryById(request: Request, response: Response, next: NextFunction) {
        try {
            const {id} = request.params;
            const result = await this.categoryServices.deleteById(id);
            return response.status(200).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
    async deleteAllCategories(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await this.categoryServices.deleteAllCategories();
            return response.status(204).json(result);
        } catch (error: any) {
            next(error);
            return response.status(401).json(error.message);
        }
    }
}

export {CategoryControllers};