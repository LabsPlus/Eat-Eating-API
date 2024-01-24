import express, { Application } from 'express';
import { LoginRoutes } from './routes/login.routes';
import cors, { CorsOptions } from 'cors';

export class App {
  private app: Application;

  constructor(corsConfig?: CorsOptions) {
    this.app = express();
    this.middleware(corsConfig || {});
    this.setupLoginRoutes();
  }

  private middleware(corsConfig?: CorsOptions) {
    this.app.use(express.json());
    this.app.use(cors(corsConfig));
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  private setupLoginRoutes() {
    const loginRoutes = new LoginRoutes();
    const loginBaseRoute = '/login';

    this.app.use(loginBaseRoute, loginRoutes.patchRoutes());
    this.app.use(loginBaseRoute, loginRoutes.getRoutes());
    this.app.use(loginBaseRoute, loginRoutes.postRoutes());
  }
}
