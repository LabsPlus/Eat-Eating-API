import {Router} from 'express';
import {UserControllers} from '../controllers/user.controllers';

class UserRoutes {

    private readonly router: Router;
    private readonly userController: UserControllers;

    constructor() {
        this.router = Router();
        this.userController = new UserControllers();
    }

    getRoutes() {
        return this.router;
    }

    deleteRoutes() {
        return this.router;
    }

    postRoutes() {
        this.router.post('/create-user', this.userController.createUser.bind(this.userController))

        return this.router;
    }

    putRoutes() {
        return this.router;
    }
}

export {UserRoutes};
