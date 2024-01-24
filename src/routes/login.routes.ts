import { Router } from 'express';
import { LoginController } from '../controller/login.controlers';

class LoginRoutes {
  private router: Router;
  private loginController: LoginController;
  constructor() {
    this.router = Router();
    this.loginController = new LoginController();
  }

  getRoutes() {
    //this.router.get('/', this.loginController.Hello.bind(this.loginController));
    return this.router;
  }

  postRoutes() {
    this.router.post(
      '/create',
      this.loginController.createUser.bind(this.loginController),
    );

    this.router.post(
      '/auth',
      this.loginController.authUser.bind(this.loginController),
    );

    this.router.post(
      '/refresh',
      this.loginController.refreshToken.bind(this.loginController),
    );

    return this.router;
  }

  patchRoutes() {
    this.router.post(
      '/updatePassword',
      this.loginController.updatePassword.bind(this.loginController),
    );

    this.router.post(
      '/forgotPassword',
      this.loginController.forgotPassword.bind(this.loginController),
    );
    return this.router;
  }
}
export { LoginRoutes };
