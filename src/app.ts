import express, { Application } from 'express';
import { Routers } from './routes/routes';
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
    const routers = new Routers();
    this.app.use('/', routers.getRoutes());
  }
}
