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
    this.router.post(
      '/createUser',
      this.userController.createUser.bind(this.userController),
    );

    this.router.post(
      '/auth',
      this.userController.authUser.bind(this.userController),
    );

    this.router.post(
      '/refreshtoken',
      this.userController.refreshToken.bind(this.userController),
    );

    this.router.post(
      '/updatePassword',
      this.userController.updatePassword.bind(this.userController),
    );
    this.router.post(
      '/forgotPassword',
      this.userController.forgotPassword.bind(this.userController),
    );
    return this.router;
  }

  
}
export { Routers };
