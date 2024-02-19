import {Router} from 'express';
import {LoginControllers} from '../controllers/login.controllers';

class LoginRoutes {
    private readonly router: Router;
    private readonly loginController: LoginControllers;

    constructor() {
        this.router = Router();
        this.loginController = new LoginControllers();
    }

    postRoutes() {
        this.router.post(
            '/createLogin',
            this.loginController.createLogin.bind(this.loginController),
        );

        this.router.post(
            '/authLogin',
            this.loginController.authLogin.bind(this.loginController),
        );

        this.router.post(
            '/refreshTokenLogin',
            this.loginController.refreshToken.bind(this.loginController),
        );

        return this.router;
    }

    patchRoutes() {
        this.router.patch(
            '/updatePasswordLogin',
            this.loginController.updatePassword.bind(this.loginController),
        );

        this.router.patch(
            '/forgotPasswordLogin',
            this.loginController.forgotPassword.bind(this.loginController),
        );
        return this.router;
    }
}

export {LoginRoutes};
