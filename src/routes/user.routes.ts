import { Router } from 'express';
import { UserControllers } from '../controllers/user.controllers';

class UserRoutes {
    private readonly router: Router;
    private readonly userController: UserControllers;

    constructor() {
        this.router = Router();
        this.userController = new UserControllers();
    }

     /**
     * @swagger
     * /user/list-all-users:
     *   get:
     *     summary: Listar os usuários do sistema
     *     description: Listar os usuários do sistema
     *     tags:
     *       - Usuários
     *     responses:
     *       '200':
     *         description: Usuários retornados com sucesso
     *         content:
     *           application/json:
     *             examples:
     *               exemple:
     *                 value:
     *                   user:
     *                     id: 1
     *                     dailyMeals: 1
     *                     person:
     *                       name: Nahueld
     *                       cpf: ''
     *                       born: '2024-03-08T13:35:27.896Z'
     *                       Administrator: null
     *                     category:
     *                       name: FUNCIONARIO
     *                     typeGrant:
     *                       name: INTEGRAL
     *                     loginUser:
     *                       email: Nahueld@labsif.com.br
     *                       emailRecovery: Nahueld@labsif.com.br
     *                   enrolment: '5555552'
     *       '404':
     *         description: |
     *           Not Found
     *           - Cannot GET
     *       '500':
     *         description: Internal Server Error
     */
    getRoutes() {
        this.router.get(
            '/list-all-users',
            this.userController.getAllUsers.bind(this.userController),
        );
        return this.router;
    }

    /**
     * @swagger
     * /user/delete-user/{id}:
     *   delete:
     *     summary: Excluir um usuário do sistema
     *     description: Excluir um usuário do sistema
     *     tags:
     *       - Usuários
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do usuário
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: User successfully deleted
     *       '404':
     *         description: |
     *           Not Found
     *           - Usuário não encontrado
     *       '500':
     *         description: Internal Server Error
     */
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
     *          description: Daily meals must be between 1 and 3
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
