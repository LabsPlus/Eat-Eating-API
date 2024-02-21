import { Router } from 'express';
import { LoginControllers } from '../controllers/login.controllers';

class LoginRoutes {
  private readonly router: Router;
  private readonly loginController: LoginControllers;

  constructor() {
    this.router = Router();
    this.loginController = new LoginControllers();
  }

  postRoutes() {
    this.router.post(
      '/create-login',
      this.loginController.createLogin.bind(this.loginController),
    );

    this.router.post(
      '/auth-login',
      this.loginController.authLogin.bind(this.loginController),
    );

    this.router.post(
      '/refresh-token-login',
      this.loginController.refreshToken.bind(this.loginController),
    );

    return this.router;
  }

  patchRoutes() {
    this.router.patch(
      '/update-password-login',
      this.loginController.updatePassword.bind(this.loginController),
    );

    this.router.patch(
      '/forgot-password-login',
      this.loginController.forgotPassword.bind(this.loginController),
    );
    return this.router;
  }
}

export { LoginRoutes };
