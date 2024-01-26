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
        this.router.get(
            '/listAllUsers',
            this.userController.listAllUsers.bind(this.userController),
        );
        return this.router;
    }

    deleteRoutes() {
        this.router.delete(
            '/deleteAllUsers',
            this.userController.deleteAllUsers.bind(this.userController),
        );
        this.router.delete(
            '/deleteUser/:id',
            this.userController.deleteUserById.bind(this.userController),
        );
        return this.router;
    }

    postRoutes() {
        this.router.post(
            '/createUser',
            this.userController.createAnUser.bind(this.userController),
        );

        return this.router;
    }
}

export {UserRoutes};