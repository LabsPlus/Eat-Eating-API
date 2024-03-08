import {Router} from 'express';
import {UserControllers} from '../controllers/user.controllers';

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
     */
    getRoutes() {
        this.router.get('/list-all-users', this.userController.getAllUsers.bind(this.userController))
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
     *         description: Usuário não encontrado
     */
    deleteRoutes() {
        this.router.delete('/delete-user/:id', this.userController.deleteUserById.bind(this.userController))
        return this.router;
    }
   
    postRoutes() {
        this.router.post('/create-user', this.userController.createUser.bind(this.userController))
        return this.router;
    }

    putRoutes() {
        this.router.put('/update-user/:id', this.userController.updateAnUser.bind(this.userController))
        return this.router;
    }
}

export {UserRoutes};
