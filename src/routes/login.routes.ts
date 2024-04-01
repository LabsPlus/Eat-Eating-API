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
     *     summary: Criar login para os administradores de usuários
     *     description: Criar login para os administradores de usuários
     *     tags:
     *       - Login Admin
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
     *         description: Email or Email Recovery already exists, only one email is allowed.
     */

    this.router.post(
      '/create-login',
      this.loginController.createLogin.bind(this.loginController),
    );

    /**
     * @swagger
     * /login/auth-login:
     *   post:
     *     summary: Fazer autenticação e login dos administradores
     *     description: Fazer autenticação e login dos administradores
     *     tags:
     *       - Login Admin
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
     *     responses:
     *       '200':
     *         description: Login feito com sucesso
     *       '401':
     *         description: Invalid email or password
     */
    this.router.post(
      '/auth-login',
      this.loginController.authLogin.bind(this.loginController),
    );

    /**
     * @swagger
     * /login/refresh-token-login:
     *   post:
     *     summary: Fazer atualização do token para validação de autenticação
     *     description: Fazer atualização do token para validação de autenticação
     *     tags:
     *       - Login Admin
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               refreshToken:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Token atualizado com sucesso
     *       '401':
     *         description: There is no refresh token key
     */
    this.router.post(
      '/refresh-token-login',
      this.loginController.refreshToken.bind(this.loginController),
    );

    return this.router;
  }

  patchRoutes() {
    /**
     * @swagger
     * /login/update-password-login:
     *   patch:
     *     summary: Atualizar senha do administrador que solicitou o forgot password
     *     description: Atualizar senha do administrador que solicitou o forgot password
     *     tags:
     *       - Login Admin
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               newPassword:
     *                 type: string
     *               token:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Senha atualizada com sucesso
     *       '401':
     *         description: There is no user.repositories with this token.
     */
    this.router.patch(
      '/update-password-login',
      this.loginController.updatePassword.bind(this.loginController),
    );

    /**
     * @swagger
     * /login/forgot-password-login:
     *   patch:
     *     summary: Enviar token para o email do administrador que solicitou o forgot password
     *     description: Enviar token para o email do administrador que solicitou o forgot password
     *     tags:
     *       - Login Admin
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Senha atualizada com sucesso
     *       '401':
     *         description: Too many requests. This IP has been blocked for 15 minutes.
     */
    this.router.patch(
      '/forgot-password-login',
      this.loginController.forgotPassword.bind(this.loginController),
    );
    return this.router;
  }
}

export { LoginRoutes };
