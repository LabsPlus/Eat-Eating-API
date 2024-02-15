import { Router } from 'express';
import { UserControllers } from '../controllers/user.controllers';

class UserRoutes {

    private router: Router;
    private userController: UserControllers;

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
        return this.router;
    }

    putRoutes(){
        return this.router;
    }
}

export {UserRoutes};
