import { Router } from 'express';
import { UsersController } from '../controller/users.controlers';

class UsersRouters {
  private router: Router;
  private userController: UsersController;
  constructor() {
    this.router = Router();
    this.userController = new UsersController();
  }

   getRoutes() {
    //this.router.get('/', this.userController.Hello.bind(this.userController));
    return this.router;
  }
  
  postRoutes() {
    this.router.post(

      '/create',
      this.userController.createUser.bind(this.userController),
    );

    this.router.post(
      '/auth',
      this.userController.authUser.bind(this.userController),
    );

    this.router.post(
      '/refresh',
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
export { UsersRouters };
