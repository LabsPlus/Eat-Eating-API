import {Router} from 'express';
import {CategoryControllers} from "../controllers/category.controllers";

class CategoryRoutes {

    private readonly router: Router;
    private readonly categoryControllers: CategoryControllers;

    constructor() {
        this.router = Router();
        this.categoryControllers = new CategoryControllers();
    }

    postRoutes() {
        this.router.post(
            '/createCategory',
            this.categoryControllers.createCategory.bind(this.categoryControllers),
        );

        return this.router;
    }

    getRoutes() {

        this.router.get(
            '/listAllCategories',
            this.categoryControllers.listAllCategories.bind(this.categoryControllers),
        );

        return this.router;
    }

    deleteRoutes() {

        this.router.delete(
            '/deleteCategories',
            this.categoryControllers.deleteAllCategories.bind(this.categoryControllers),
        );
        this.router.delete(
            '/deleteCategory/:id',
            this.categoryControllers.deleteCategoryById.bind(this.categoryControllers),
        );
        return this.router;
    }
}

export {CategoryRoutes};