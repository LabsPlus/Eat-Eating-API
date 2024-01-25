import express, {Application} from 'express';
import {LoginRoutes} from './routes/login.routes';
import cors, {CorsOptions} from 'cors';
import {CategoryRoutes} from "./routes/category.routes";
import {UserRoutes} from "./routes/user.routes";
import {TypeStudentGrantRoutes} from "./routes/type.student.grant.routes";

export class App {
    private app: Application;

    constructor(corsConfig?: CorsOptions) {
        this.app = express();
        this.middleware(corsConfig || {});
        this.setupLoginRoutes();
        this.setupCategoryRoutes();
        this.setupTypeStudentGrantRoutes();
        this.setupUserRoutes();
    }

    private middleware(corsConfig?: CorsOptions) {
        this.app.use(express.json());
        this.app.use(cors(corsConfig));
        this.app.use(express.urlencoded({extended: true}));
    }

    listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }

    private setupCategoryRoutes() {
        const categoryRoutes = new CategoryRoutes();
        const categoryBaseRoute = '/category';

        this.app.use(categoryBaseRoute, categoryRoutes.postRoutes());
        this.app.use(categoryBaseRoute, categoryRoutes.getRoutes());
        this.app.use(categoryBaseRoute, categoryRoutes.deleteRoutes());
    }

    private setupUserRoutes() {
        const userRoutes = new UserRoutes();
        const userBaseRoute = '/user';

        this.app.use(userBaseRoute, userRoutes.postRoutes());
        this.app.use(userBaseRoute, userRoutes.getRoutes());
        this.app.use(userBaseRoute, userRoutes.deleteRoutes());
    }

    private setupTypeStudentGrantRoutes() {
        const typeStudentGrantRoutes = new TypeStudentGrantRoutes();
        const typeStudentGrantBaseRoute = '/typeStudentGrant';

        this.app.use(typeStudentGrantBaseRoute, typeStudentGrantRoutes.postRoutes());
        this.app.use(typeStudentGrantBaseRoute, typeStudentGrantRoutes.getRoutes());
        this.app.use(typeStudentGrantBaseRoute, typeStudentGrantRoutes.deleteRoutes());
    }

    private setupLoginRoutes() {
        const loginRoutes = new LoginRoutes();
        const loginBaseRoute = '/login';

        this.app.use(loginBaseRoute, loginRoutes.patchRoutes());
        this.app.use(loginBaseRoute, loginRoutes.postRoutes());
    }
}