import {Router} from 'express';
import {LoginController} from '../controller/login.controllers';
import {UserController} from '../controller/user.controllers';
import {CategoryController} from "../controller/categoria.controllers";
import {TipoBolsaController} from "../controller/tipoBolsa.controllers";

class LoginRoutes {
    private router: Router;
    private loginController: LoginController;
    private userController: UserController;
    private categoryController: CategoryController;
    private tipoBolsaController: TipoBolsaController

    constructor() {
        this.router = Router();
        this.loginController = new LoginController();
        this.userController = new UserController();
        this.categoryController = new CategoryController();
        this.tipoBolsaController = new TipoBolsaController();
    }

    getRoutes() {
        this.router.get(
            '/listAllUsers',
            this.userController.listAllUsers.bind(this.userController),
        );

        this.router.get(
            '/listAllCategorias',
            this.categoryController.listAllCategorias.bind(this.categoryController),
        );

        this.router.get(
            '/listAllTipoBolsa',
            this.tipoBolsaController.listAllTipoBolsas.bind(this.tipoBolsaController),
        );

        return this.router;
    }

    deleteRoutes() {
        this.router.delete(
            '/deleteUser',
            this.userController.deleteAllUsers.bind(this.userController),
        );

        this.router.delete(
            '/deleteCategoria',
            this.categoryController.deleteAllCategorias.bind(this.categoryController),
        );

        this.router.delete(
            '/deleteTipoBolsa',
            this.tipoBolsaController.deleteAllTipoBolsas.bind(this.tipoBolsaController),
        );

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

        this.router.post(
            '/createUser',
            this.userController.createAnUser.bind(this.userController),
        );

        this.router.post(
            '/createCategoria',
            this.categoryController.createCategoria.bind(this.categoryController),
        );

        this.router.post(
            '/createTipoBolsa',
            this.tipoBolsaController.createTipoBolsa.bind(this.tipoBolsaController),
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

export {LoginRoutes};