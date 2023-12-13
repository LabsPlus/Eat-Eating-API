import { Router } from 'express';
import { UserController } from '../controller/user';

class Routers {
  private router: Router;
  private userController: UserController;
  constructor() {
    this.router = Router();
    this.userController = new UserController();
  }

  getRoutes() {
    this.router.get(
      '/',
      this.userController.createUser.bind(this.userController),
    );

    return this.router;
  }
}
export { Routers };
