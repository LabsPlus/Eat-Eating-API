import {Router} from 'express';
import {LoginControllers} from '../controllers/login.controllers';

class LoginRoutes {
    private router: Router;
    private loginController: LoginControllers;

    constructor() {
        this.router = Router();
        this.loginController = new LoginControllers();
    }

    postRoutes() {
        this.router.post(
            '/createLogin',
            this.loginController.createUser.bind(this.loginController),
        );

        this.router.post(
            '/authLogin',
            this.loginController.authUser.bind(this.loginController),
        );

        this.router.post(
            '/refreshTokenLogin',
            this.loginController.refreshToken.bind(this.loginController),
        );

        return this.router;
    }

    patchRoutes() {
        this.router.post(
            '/updatePasswordLogin',
            this.loginController.updatePassword.bind(this.loginController),
        );

        this.router.post(
            '/forgotPasswordLogin',
            this.loginController.forgotPassword.bind(this.loginController),
        );
        return this.router;
    }
}

export {LoginRoutes};