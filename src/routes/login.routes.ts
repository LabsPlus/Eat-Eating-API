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
    /**
     * @swagger
     * /login/create-login:
     *   post:
     *     summary: Cria um login para o Adminidastro de usuários
     *     description: Cria um login para o Adminidastro de usuários
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               emailRecovery:
     *                 type: string
     *     responses:
     *       '201':
     *         description: Login criado com sucesso
     *       '401':
     *         description: User email already exists
     */

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
