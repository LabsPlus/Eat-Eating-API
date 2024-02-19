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
        this.router.get('/list-all-users', this.userController.getAllUsers.bind(this.userController))
        return this.router;
    }

    deleteRoutes() {
        this.router.delete('/delete-user/:id', this.userController.deleteUserById.bind(this.userController))
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
