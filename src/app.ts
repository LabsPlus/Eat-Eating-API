import express, { Application } from 'express';
import { UsersRouters } from './routes/login.routes';
import morgan from 'morgan';
import cors from 'cors';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.setupRoutes();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  private setupRoutes() {
    const usersRouters = new UsersRouters();
    const userBaseRoute = '/users';

    this.app.use(userBaseRoute, usersRouters.getRoutes());
    this.app.use(userBaseRoute, usersRouters.postRoutes());
  }
}
