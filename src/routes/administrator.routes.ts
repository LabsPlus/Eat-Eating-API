import { Router } from 'express';

import { AdministratorController } from '../controllers/administrator.controller';

class AdministratorRoutes {
  private readonly router: Router;
  private readonly administratorController: AdministratorController;

  constructor() {
    this.router = Router();
    this.administratorController = new AdministratorController();
  }

  postRoutes() {
    /**
     * @swagger
     * /administrator/create-administrator:
     *   post:
     *     summary: Criar administradores comuns
     *     description:  rota paraCriar administradores comuns
     *     tags:
     *       - Admin
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name: 
     *                   type: string
     *               phone:
     *                  type: string
     *               picture:
     *                  type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               emailRecovery:
     *                 type: string
     *     responses:
     *       '201':
     *         description: Administrador criado com sucesso
     *       '401':
     *         description: Email or Email Recovery already exists, only one email is allowed.
     */

    this.router.post(
      '/create-administrator',
      this.administratorController.createAdministrator.bind(this.administratorController),
    );
    return this.router;

  }
}

export { AdministratorRoutes };