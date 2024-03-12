import { Router } from 'express';
import { UserControllers } from '../controllers/user.controllers';

class UserRoutes {
  private readonly router: Router;
  private readonly userController: UserControllers;

  constructor() {
    this.router = Router();
    this.userController = new UserControllers();
  }

  getRoutes() {
    this.router.get(
      '/list-all-users',
      this.userController.getAllUsers.bind(this.userController),
    );
    return this.router;
  }

  deleteRoutes() {
    this.router.delete(
      '/delete-user/:id',
      this.userController.deleteUserById.bind(this.userController),
    );
    return this.router;
  }

  /**
   * @swagger
   * /user/create-user:
   *   post:
   *     summary: Criar usuários do sistema
   *     description: Criar usuários do sistema
   *     tags:
   *       - Usuários
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               enrollment:
   *                 type: string
   *               category:
   *                 type: string
   *                 default: "ESTUDANTE"
   *               typeGrant:
   *                 type: string
   *                 default: "INTEGRAL"
   *               dailyMeals:
   *                 type: number
   *                 default: 2
   *               picture:
   *                 type: string
   *               cpf:
   *                 type: string
   *               born:
   *                 type: string
   *                 default: "2024-03-08T13:35:27.896Z"
   *               course:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               emailRecovery:
   *                 type: string
   *     responses:
   *       '201':
   *         description: Usuários criado com sucesso
   *         content:
   *           application/json:
   *             examples:
   *               exemple:
   *                 value:
   *                   id: 1
   *                   studentId: 1
   *                   enrollment: "1234567"
   *                   personName: "name test"
   *                   categoryName: "ESTUDANTE"
   *                   typeGrantName: "INTEGRAL"
   *                   dailyMeals: 2
   *                   loginData:
   *                     email: "emailtest@gmail.com"
   *                     emailRecovery: "emailrecoverytest@gmail.com"
   *       '400':
   *         description: |
   *          Bad Request
   *          - Enrollment is required
   *          - Enrollment already exists, only one enrollment is allowed.
   *          - Email already exists, only one email is allowed.
   *          - Category NotFound
   *       '404':
   *         description: |
   *            Not Found
   *            - Enrollment is undefined
   *            - Category or Type Grant not found
   *       '422':
   *         description: Daily meals must be between 1 and 3
   */
  postRoutes() {
    this.router.post(
      '/create-user',
      this.userController.createUser.bind(this.userController),
    );
    return this.router;
  }

  /**
   * @swagger
   * /user/update-user/{id}:
   *   put:
   *     summary: Atualizar usuários do sistema
   *     description: Atualizar usuários do sistema
   *     tags:
   *       - Usuários
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do usuário a ser atualizado
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               enrollment:
   *                 type: string
   *               category:
   *                 type: string
   *                 default: "ESTUDANTE"
   *               typeGrant:
   *                 type: string
   *                 default: "INTEGRAL"
   *               dailyMeals:
   *                 type: number
   *                 default: 2
   *               picture:
   *                 type: string
   *               password:
   *                 type: string
   *               emailRecovery:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Usuários atualizado com sucesso
   *         content:
   *           application/json:
   *             examples:
   *               exemple:
   *                 value:
   *                   id: 1
   *                   enrollment: "1234567"
   *                   personName: "name test"
   *                   categoryName: "ESTUDANTE"
   *                   typeGrantName: "INTEGRAL"
   *                   dailyMeals: 2
   *                   loginData:
   *                     email: "emailtest@gmail.com"
   *                     emailRecovery: "emailrecoverytest@gmail.com"
   *       '400':
   *          description: Enrollment is required
   *       '404':
   *          description: |
   *            Not Found
   *             - User not Found!
   *             - Login not Found!
   *             - Category or Type Grant not found
   *             - Old category not founded
   *       '422':
   *          description:
   */
  putRoutes() {
    this.router.put(
      '/update-user/:id',
      this.userController.updateAnUser.bind(this.userController),
    );
    return this.router;
  }
}

export { UserRoutes };
